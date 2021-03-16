import { Decorator, DecoratorInitializer, DecoratorOptions, Type } from '../types';
import { Reflector } from '../utils';
import { DecoratedDomain, InternalDecoratorOptions, isDecoratorInitializer } from './decorated-domain';
import { DecoratorArgs, DecoratorArgsType } from './decorator-args';
import { invalidDecorationScope, multipleDecorationsNotAllowed } from './errors';

export interface ClassifierRecord<T = any, TArgs extends DecoratorArgs = DecoratorArgs> {
  metadata: T;
  decoratorArgs: TArgs;
  derived?: boolean;
}

/**
 * Represents all metadata decorated with decorators of the domain that created this classifier.
 *
 * You can extend this class to modifier the behavior, override `createRecord` to get
 * a handle when decoration happen.
 */
export class TargetClassifier<T = any,
                              TRecord extends ClassifierRecord = ClassifierRecord,
                              TRecordMeta extends TRecord['metadata'] = TRecord['metadata']> {

  protected metadata = new Map<Decorator | DecoratorInitializer, TRecord[]>();
  private extending = new Set<TargetClassifier>();
  private extendLock: boolean;

  constructor(public readonly target: Type<T>, protected readonly parent: DecoratedDomain<TargetClassifier>) { }

  static create(target: Type<any>, parent: DecoratedDomain<TargetClassifier>) {
    return new TargetClassifier(target, parent);
  }

  /**
   * Extend the metadata in `sourceClassifier` into `targetOrTargetClassifier`.
   * If the target has an existing classifier on the same domain as `sourceClassifier`, please provide it otherwise provide the target class.
   *
   * @param targetOrTargetClassifier Either the target classifier of the target.
   * @internal
   */
  static extendDecoratorMetadata<T = any>(sourceClassifier: TargetClassifier<T>,
                                          targetClassifier: TargetClassifier) {
    sourceClassifier.extendDecoratorMetadata(targetClassifier);
  }

  /** @internal */
  static addMetadata<TRecord extends ClassifierRecord = ClassifierRecord>(classifier: TargetClassifier<any, TRecord>,
                                                                          decor: Decorator | DecoratorInitializer<TRecord['metadata']>,
                                                                          decoratorArgs: DecoratorArgs,
                                                                          metadata: TRecord['metadata'],
                                                                          options: InternalDecoratorOptions): void {
    const derived = classifier.extendLock;
    const metaInfos = classifier.getMetadataFor(decor);

    // If we're in the the process of extending but we already have, we stop
    if (!!metaInfos && derived) {
      for (const m of metaInfos) {
        if (decoratorArgs.memberEqual(m.decoratorArgs)) {
          return;
        }
      }
    }

    if (!options.allowMulti && !!metaInfos) {
      throw multipleDecorationsNotAllowed(options.name, decoratorArgs.classType);
    }

    if (options.numericAllowedScopes?.indexOf(decoratorArgs.flag) === -1) {
      throw invalidDecorationScope(options.name, decoratorArgs, options.allowedScopes);
    }

    if (options.onExecute) {
      metadata = options.onExecute(decoratorArgs, metadata) || metadata;
    }

    const record = classifier.createRecord(decor, { metadata, decoratorArgs, derived }, options);

    if (!derived && !!metaInfos && classifier.extending.size > 0) {
      for (let i = 0; i < metaInfos.length; i++) {
        if (decoratorArgs.memberEqual(metaInfos[i].decoratorArgs)) {
          metaInfos[i] = record;
          return;
        }
      }
    }

    const _metaInfos = metaInfos || [];
    if (_metaInfos.push(record) === 1) {
      classifier.metadata.set(decor, _metaInfos);
    }
  }

  hasMetadataFor(decor: Decorator | DecoratorInitializer): boolean {
    return this.metadata.has(decor);
  }

  getMetadataFor(decor: Decorator | DecoratorInitializer): TRecord[] {
    return this.metadata.get(decor);
  }

  extendsClassifier(classifier: TargetClassifier): boolean {
    for (const c of this.extending) {
      if (classifier === c || c.extendsClassifier(classifier)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Extend the metadata from this classifier into the `target`.
   * If the target has an existing classifier on the same domain as this classifier, please provide it.
   *
   * > Note that it is important to provide the target classifier when one exist as it effect the logic.
   * When exists, existing metadata on the target is not overwritten.
   *
   * The modifier for this method is `protected` to allow derived classes to modify the extending logic.
   *
   * @param target the target type (class)
   * @param targetClassifier An existing classifier for the target on the same domain as this classifier, if exist.
   */
  protected extendDecoratorMetadata(targetClassifier: TargetClassifier) {
    if (targetClassifier.extendsClassifier(this)) {
      return;
    }

    targetClassifier.extendLock = true;

    for (const [decor, metadataInfos] of this.metadata.entries()) {
      const decorExecuter = isDecoratorInitializer(decor)
        ? (meta: TRecord, ...args: [any, any?, any?]) => decor(meta.metadata)(...args)
        : (meta: TRecord, ...args: any[]) => (decor as any)(...args);

      const decorMetadata = targetClassifier.metadata.get(decor) || [];
      for (const meta of metadataInfos) {
        const { decoratorArgs } = meta;

        if (DecoratorArgsType.isClass(decoratorArgs)) {
          if (decorMetadata.length === 0) {
            decorExecuter(meta, targetClassifier.target);
          }
        } else if (!decorMetadata.find( d => d.decoratorArgs.memberEqual(decoratorArgs))) {
          const tTarget = DecoratorArgsType.isStatic(decoratorArgs) ? targetClassifier.target : targetClassifier.target.prototype;
          const key = DecoratorArgsType.isCtorParam(decoratorArgs) ? undefined : decoratorArgs.key;
          const indexOrDescriptor = DecoratorArgsType.isMethod(decoratorArgs) || DecoratorArgsType.isProperty(decoratorArgs)
            ? decoratorArgs.descriptor
            : DecoratorArgsType.isParameterLike(decoratorArgs)
                ? decoratorArgs.index
                : undefined
          ;

          Reflector.extend(decoratorArgs.target, tTarget, key, false);
          decorExecuter(meta, tTarget, key, indexOrDescriptor);
        }
      }
    }

    targetClassifier.extending.add(this);
    targetClassifier.extendLock = false;
  }

  /**
   * Transform the basic `record` into the proper `TRecord` declared.
   * Usually there is nothing to transform and you can return `record` as is.
   *
   * This method is called when a decorator in the domain has been invoked.
   * In the `record` you can find the metadata parameter provided when initializing the decorator (optional)
   * and the decorator arguments which contains decorator information based on the decorator type (see DecoratorArgs)
   *
   * You can use this method as a hook to implement internal logic like popping events or creating custom metadata classes, etc...
   * @param decor The decorator function used (E.G: In `@Prop myProp: string` it is `Prop`)
   * @param record The classifier record
   */
  protected createRecord(decor: Decorator | DecoratorInitializer<TRecordMeta>,
                         record: ClassifierRecord<TRecordMeta>,
                         options: DecoratorOptions): TRecord {
    return record as TRecord;
  }
}
