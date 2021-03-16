import { Decorator, Abstract, DecoratorInitializer, DecoratorOptions, Class, AnyDecorator } from '../types';
import { ensureClass, iterateClassHierarchy } from '../utils';
import { TargetClassifier } from './target-classifier';
import { DecoratorArgs, ALLOWED_SCOPE_OPTIONS_TO_DECORATOR_FLAG_MAP, BaseDecoratorArgs } from './decorator-args';

/**
 * The `TargetClassifier` type with a static method `create`.
 * A `Classifier` is a `TargetClassifier` that has a static factory method called `create`.
 * If you provide a custom classifier class it must inherit from `TargetClassifier` and als provide a factory method called `create`.
 */
export type Classifier<T extends TargetClassifier> = Class<T, { create(target: Abstract<any>, parent: DecoratedDomain<T>): T; }>;

export type InternalDecoratorOptions = Required<DecoratorOptions> & { numericAllowedScopes?: number[] };

const DECORATOR_OPTIONS = Symbol('DecoratorOptions');
const DECORATOR_INITIALIZER = Symbol('DecoratorInitializer');
const STORES = new Set<DecoratedDomain<TargetClassifier<any>>>();

export function isDecoratorInitializer(decorator: Decorator | DecoratorInitializer): decorator is DecoratorInitializer {
  return decorator?.[DECORATOR_INITIALIZER] === true;
}

/**
 * A decorator domain which create it's own decorators that will register metadata and types to the domain.
 *
 * The domain uses a classifier to parse and analyze the decorator metadata and decorated tokens.
 * For each new decorated class, a new classifier instance is created and all data is stored there, grouped by the calling decorator.
 *
 * By default, `TargetClassifier` is used as the `classifier` but you can provide your own implementation.
 * The `classifier` MUST inherit from `TargetClassifier` and contain a static `create` method.
 */
export class DecoratedDomain<T extends TargetClassifier<any, any> = TargetClassifier> {

  private decorators = new Set<Decorator | DecoratorInitializer>();
  private metadata = new Map<Abstract<any>, T>();
  private readonly classifier: Classifier<T>;

  constructor(classifier?: Classifier<T>) {
    this.classifier = classifier || TargetClassifier as any;
  }

  /**
   * Extending the all of the metadata known for `source` into `target`.
   * All existing domains that has metadata on `store` will have their metadata for `source` extended into `target`.
   *
   * `target` does not need to be known for the domains.
   * If A domain that has metadata for `source` but not for `target` then `target` will be added to that domain.
   */
  static extendDecoratorMetadata(source: Abstract<any>, target: Abstract<any>) {
    for (const s of STORES) {
      s.extendDecoratorMetadata(source, target);
    }
  }

  /**
   * Create a decorator initializer with no metadata input.
   * Usd the generic `TDecor` to define the tokens this decorator can decorate.
   */
  createDecorator<TDecor extends Decorator = AnyDecorator>(options?: DecoratorOptions<never>): () => TDecor;
  /**
   * Create a decorator initializer with required metadata input.
   */
  createDecorator<TDecor extends Decorator, TArgs>(options?: DecoratorOptions<TArgs>): (metadata: TArgs) => TDecor;
  /**
   * Create a decorator initializer with optional metadata input.
   */
  createDecorator<TDecor extends Decorator, TArgs, TArgsOptional extends true>(options?: DecoratorOptions<TArgs>): (metadata?: TArgs) => TDecor;
  createDecorator<TDecor extends Decorator, TArgs = any>(options: DecoratorOptions<TArgs> = {}): (metadata?: TArgs) => TDecor {
    const decor = (metadata?: any): TDecor => {
      return ((target: object | Function, key?: string | symbol, indexOrDescriptor?: PropertyDescriptor | number) => {
        this.addMetadata(decor, BaseDecoratorArgs.create(target, key, indexOrDescriptor), metadata);
      }) as any;
    };

    decor[DECORATOR_INITIALIZER] = true;
    this.setOptions(decor, options);
    this.decorators.add(decor);
    return decor as any;
  }

  /**
   * Create an immediate decorator.
   * Usd the generic `TDecor` to define the tokens this decorator can decorate.
   *
   * An immediate decorator is a decorator applied directly without invoking it.
   * A decorator initializer is a function that you must invoke to get the immediate decorator.
   *
   * For example:
   *
   * ```typescript
   * const domain = new DecoratedDomain();
   * const MyEntityImmediate = domain.createImmediateDecorator<ClassDecoratorOf<any>>();
   * const MyEntity = domain.createDecorator<ClassDecoratorOf<any>>();
   *
   * @MyEntityImmediate
   * class X { }
   *
   * @MyEntity()
   * class Y { }
   * ```
   */
  createImmediateDecorator<TDecor extends Decorator = AnyDecorator>(options: DecoratorOptions<never> = {}): TDecor {
    const decor = (target: object | Function, key?: string | symbol, indexOrDescriptor?: PropertyDescriptor | number) => {
      this.addMetadata(decor, BaseDecoratorArgs.create(target, key, indexOrDescriptor));
    }
    this.setOptions(decor, options);
    this.decorators.add(decor);
    return decor as any;
  }

  exists<TArgs>(decor: DecoratorInitializer<TArgs>): boolean {
    return this.decorators.has(decor);
  }

  hasTarget(type: Abstract<any>): boolean {
    return this.metadata.has(type);
  }

  /**
   * Retrieve the classifier for this target, if exists.
   *
   * @param type The class decorated with decorators created by this domain
   * @param checkDerived When true, if the target does not exist will try to search the hierarchy tree to see if it has base classes which have a target
   * This is useful for api classes that does not have decorators and all of their metadata is added through inheritance / mixins [default: false]
   */
  getTarget(type: Abstract<any>, checkDerived?: boolean) {
    const classifier = this.metadata.get(type);
    if (!classifier && checkDerived) {
      return this.getContainerMetadata(BaseDecoratorArgs.create(type));
    }
    return classifier;
  }

  removeTarget(type: Abstract<any>): boolean {
    const result = this.metadata.delete(type);
    if (result && this.metadata.size === 0) {
      STORES.delete(this);
    }
    return result;
  }

  getTargets() {
    return this.metadata.values();
  }

  getOptions<TArgs>(decorator: DecoratorInitializer<TArgs>): DecoratorOptions<TArgs>;
  getOptions(decorator: Decorator): DecoratorOptions;
  getOptions(decorator: Decorator | DecoratorInitializer): DecoratorOptions {
    return decorator[DECORATOR_OPTIONS];
  }

  /**
   * Extend the domain's local metadata known for `source` into `target`.
   *
   * The `target` does not need to be known in the domain.
   * If the domain has metadata for `source` but not for `target` then `target` will be added to it.
   * @returns true when metadata found for source and was copied.
   */
  extendDecoratorMetadata<T = any>(source: Abstract<any>, target: Abstract<any>): boolean {
    const sourceClassifier = this.getTarget(source);
    if (sourceClassifier) {
      TargetClassifier.extendDecoratorMetadata<T>(sourceClassifier, this.getTarget(target) || this.getContainerMetadata(BaseDecoratorArgs.create(target)));
      return true;
    }
    return false;
  }

  private setOptions(decorator: Decorator | DecoratorInitializer, options?: DecoratorOptions): void {
    options = options || {};
    const opt: InternalDecoratorOptions = {
      name: options.name || 'Anonymous',
      allowMulti: options.allowMulti !== false,
      allowedScopes: options.allowedScopes,
      classifierData: options.classifierData,
      onExecute: typeof options.onExecute === 'function' ? options.onExecute : undefined,
    };
    opt.numericAllowedScopes = Array.isArray(options.allowedScopes) ? options.allowedScopes.map( s => ALLOWED_SCOPE_OPTIONS_TO_DECORATOR_FLAG_MAP[s] ) : undefined;
    decorator[DECORATOR_OPTIONS] = opt;
  }

  private addMetadata<TArgs>(decor: DecoratorInitializer<TArgs>, decoratorArgs: DecoratorArgs, metadata: TArgs): void;
  private addMetadata(decor: Decorator, decoratorArgs: DecoratorArgs): void;
  private addMetadata(decor: Decorator | DecoratorInitializer, decoratorArgs: DecoratorArgs, metadata?: unknown): void {
    const containerMetadata = this.getContainerMetadata(decoratorArgs);
    TargetClassifier.addMetadata(containerMetadata, decor, decoratorArgs, metadata, decor[DECORATOR_OPTIONS] as InternalDecoratorOptions);
  }

  private findFirstKnownAncestor(cls: Abstract<any>): Abstract<any> | undefined {
    for (const subClass of iterateClassHierarchy(cls, { emitSelf: false })) {
      if (this.hasTarget(subClass)) {
        return subClass;
      }
    }
  }

  private getContainerMetadata(decoratorArgs: DecoratorArgs) {
    const cls = ensureClass<unknown>(decoratorArgs.target);
    let container: T = this.metadata.get(cls);
    if (!container) {
      if (this.metadata.size === 0) {
        STORES.add(this);
      }
      this.metadata.set(cls, container = this.classifier.create(cls, this));
      for (const subClass of iterateClassHierarchy(cls, { emitSelf: false })) {
        this.extendDecoratorMetadata(subClass, cls);
      }
    }
    return container;
  }
}
