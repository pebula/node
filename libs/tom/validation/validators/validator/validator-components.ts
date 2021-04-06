import { Code as C, Schema, TypeSystem } from '@pebula/tom';
import { ValidatorInfo, ValidatorInfoTypeMap } from '../../known-validators';
import { ClassValidatorContext } from './class-validator-context';
import { CompilerCodeBlockContext, CompilerPropertyContext } from './compiler/context';
import { Validator } from './validator';

export interface ValidationCompilerHandler<BIn extends C.Block<C.Block<any>> = C.Block<C.Block<any>>,
                                           BOut extends C.Block<C.Block<any>> = C.Block<C.Block<any>>,
                                           TValidatorId extends keyof ValidatorInfoTypeMap = keyof ValidatorInfoTypeMap> {
  (codeBlockContext: CompilerCodeBlockContext<BIn>, propContext: CompilerPropertyContext, validatorMeta: ValidatorInfo<TValidatorId>): CompilerCodeBlockContext<BOut> | void;
}

/***
 * The runtime validator function to validate a specific property.
 * To report an error, return false or manually report the error using `ClassValidatorContext`
 *
 * When false is returned, an automatic error is created, specific to the validator used, which is the preferred way in most scenarios.
 * In edge cases, where a custom error is required create your own instance/s of `ValidationError` and add them to the `ClassValidatorContext`
 */
export type RuntimeValidatorHandler<T = any,
                                    TValidatorId extends keyof ValidatorInfoTypeMap = keyof ValidatorInfoTypeMap> = (value: T,
                                                                                                             ctx: ClassValidatorContext<any>,
                                                                                                             prop: Schema.TomPropertySchema,
                                                                                                             validatorMeta: ValidatorInfo<TValidatorId>) => void | boolean;

export class ValidatorCompiler<BIn extends C.Block<C.Block<any>> = C.Block<C.Block<any>>, BOut extends C.Block<C.Block<any>> = C.Block<C.Block<any>>> {
  protected defaultHandler: ValidationCompilerHandler<BIn, BOut>;

  constructor(protected readonly parent?: ValidatorCompiler<BIn, BOut>) {
    if (parent) {
      this.defaultHandler = parent.defaultHandler;
    }
  }

  /**
   * Set a default, wildcard handler to be used to map from source to the target T when a specific handler does not exists
   * @param handler
   * @returns
   */
  setDefaultHandler(handler: ValidationCompilerHandler<BIn, BOut>): this {
    this.defaultHandler = handler;
    return this;
  }

  clone(): ValidatorCompiler<BIn, BOut> {
    return new ValidatorCompiler(this);
  }

  findHandler() {
    return this.defaultHandler;
  }
}

export class TypeValidatorCompiler<BIn extends C.Block<C.Block<any>> = C.Block<C.Block<any>>, BOut extends C.Block<C.Block<any>> = C.Block<C.Block<any>>> extends ValidatorCompiler<BIn, BOut> {
  protected readonly handlers: Map<keyof ValidatorInfoTypeMap, ValidationCompilerHandler<BIn, BOut>>;

  constructor(public readonly type: TypeSystem.TypeDef, parent?: TypeValidatorCompiler<BIn, BOut>) {
    super(parent);
    this.handlers = new Map<keyof ValidatorInfoTypeMap, ValidationCompilerHandler<BIn, BOut>>(parent?.handlers);
  }

  /**
   * Set the handler to handle mapping from the type defined in `type` to the target type of this handler (`this.type`).
   * @param type The source type
   * @param handler Handler from source type to T
   */
  setHandler<P extends keyof ValidatorInfoTypeMap>(validatorId: P, handler: ValidationCompilerHandler<BIn, BOut, P>): this {
    this.handlers.set(validatorId, handler);
    return this;
  }

  clone(): TypeValidatorCompiler<BIn, BOut> {
    return new TypeValidatorCompiler(this.type, this);
  }

  findHandler(validatorId?: keyof ValidatorInfoTypeMap) {
    return this.handlers.get(validatorId) || this.defaultHandler;
  }
}

export class TypeRuntimeValidator<V extends Validator = Validator, T = any> {

  protected readonly handlers: Map<keyof ValidatorInfoTypeMap, RuntimeValidatorHandler<T>>;
  protected defaultHandler: RuntimeValidatorHandler<T>;

  constructor(public readonly type: TypeSystem.TypeDef, protected readonly parent?: TypeRuntimeValidator<V, T>) {
    this.handlers = new Map<keyof ValidatorInfoTypeMap, RuntimeValidatorHandler<T>>(parent?.handlers);
  }

  clone(): TypeRuntimeValidator<V, T> {
    return new TypeRuntimeValidator<V, T>(this.type, this);
  }

  setHandler<P extends keyof ValidatorInfoTypeMap>(validatorId: P, handler: RuntimeValidatorHandler<T, P>): this {
    this.handlers.set(validatorId, handler);
    return this;
  }

  setDefaultHandler(handler: RuntimeValidatorHandler<T>): this {
    this.defaultHandler = handler;
    return this;
  }

  findHandler(validatorId?: keyof ValidatorInfoTypeMap) {
    return this.handlers.get(validatorId) || this.defaultHandler;
  }
}
