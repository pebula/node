import { Code as C, Schema, TypeSystem } from '@pebula/tom';
import { ValidatorInfo, ValidatorInfoTypeMap } from '../../known-validators';
import { ClassValidatorContext } from './class-validator-context';
import { TypeValidationCompilerHandler, ValidationCompilerHandler } from './compiler';
import { Validator } from './validator';

/**
 * The signature for a validator function that validate the value of a property.
 * A property might have multiple validators, each of them must implement `RuntimeValidatorHandler`
 *
 * If validation fails, return `true` otherwise return false or nothing.
 *
 * The framework will execute this function and based on the return value will perform framework related logic (e.g. short circuiting, validation error reporting, etc...)
 *
 * While you can use the provided `ClassValidatorContext` to manually report an error instead of returning `true`, it is not recommended as behavior will be unexpected.
 * If you choose to take this path, make sure you know what you're doing.
 */
export type RuntimeValidatorHandler<T = any,
                                    TValidatorId extends keyof ValidatorInfoTypeMap = keyof ValidatorInfoTypeMap> = (value: T,
                                                                                                                     ctx: ClassValidatorContext<any>,
                                                                                                                     prop: Schema.TomPropertySchema,
                                                                                                                     validatorMeta: ValidatorInfo<TValidatorId>) => void | boolean;

/**
 * Post validation handler used for customized validation in addition to the specific validators defined for the property and type.
 * This is optional and will run after all validator for the property has invoked.
 *
 * For example, in containers (array, set, map, objectMap) this is how we validate the items in the container.
 * In classes this is how nested classes are validated.
 *
 * Note that if validation error short-circuit, it will fail before reaching the post validation handler.
 * In addition, failing to validate against the `type` validator will result in skipping the entire validation for the property, including the post validation handler.
 */
export type RuntimePostValidatorHandler<T = any> = (value: T,
                                                    ctx: ClassValidatorContext<any>,
                                                    prop: Schema.TomPropertySchema) => void;

export class ValidatorCompiler<BIn extends C.Block<C.Block<any>> = C.Block<C.Block<any>>, BOut extends C.Block<C.Block<any>> = C.Block<C.Block<any>>> {
  get handler(): ValidationCompilerHandler<BIn, BOut> {
    return this._handler;
  }

  private _handler: ValidationCompilerHandler<BIn, BOut>;

  constructor(protected readonly parent?: ValidatorCompiler<BIn, BOut>) {
    this._handler = parent?._handler;
  }

  /**
   * Set a default, wildcard handler to be used to map from source to the target T when a specific handler does not exists
   * @param handler
   * @returns
   */
  setHandler(handler: ValidationCompilerHandler<BIn, BOut>): this {
    this._handler = handler;
    return this;
  }

  clone(): ValidatorCompiler<BIn, BOut> {
    return new ValidatorCompiler(this);
  }
}

export class TypeValidatorCompiler<BIn extends C.Block<C.Block<any>> = C.Block<C.Block<any>>, BOut extends C.Block<C.Block<any>> = C.Block<C.Block<any>>> {

  get postValidationHandler(): ValidationCompilerHandler<BIn, BOut> {
    return this._postValidationHandler;
  }

  protected defaultHandler: TypeValidationCompilerHandler<BIn>;
  protected readonly handlers: Map<keyof ValidatorInfoTypeMap, TypeValidationCompilerHandler<BIn>>;
  private _postValidationHandler: ValidationCompilerHandler<BIn, BOut>;

  constructor(public readonly type: TypeSystem.TypeDef, parent?: TypeValidatorCompiler<BIn, BOut>) {
    this.defaultHandler = parent?.defaultHandler;
    this.handlers = new Map<keyof ValidatorInfoTypeMap, TypeValidationCompilerHandler<BIn>>(parent?.handlers);
    this._postValidationHandler = parent?.postValidationHandler;
  }

  /**
   * Set the handler to handle mapping from the type defined in `type` to the target type of this handler (`this.type`).
   * @param type The source type
   * @param handler Handler from source type to T
   */
  setHandler<P extends keyof ValidatorInfoTypeMap>(validatorId: P, handler: TypeValidationCompilerHandler<BIn, P>): this {
    this.handlers.set(validatorId, handler);
    return this;
  }

  removeHandler<P extends keyof ValidatorInfoTypeMap>(...validatorIds: P[]): this {
    for (const id of validatorIds) {
      this.handlers.delete(id);
    }
    return this;
  }

  /**
   * Set a default, wildcard handler to be used to map from source to the target T when a specific handler does not exists
   * @param handler
   * @returns
   */
  setDefaultHandler(handler: TypeValidationCompilerHandler<BIn>): this {
    this.defaultHandler = handler;
    return this;
  }

  /**
   * Set the post validation handler which allows customized validation in addition to the specific validators defined for the property and type.
   * This is optional and will run after all validator for the property has invoked.
   *
   * For example, in containers (array, set, map, objectMap) this is how we validate the items in the container.
   * In classes this is how nested classes are validated.
   */
  setPostValidationHandler(handler: ValidationCompilerHandler<BIn, BOut>): this {
    this._postValidationHandler = handler;
    return this;
  }

  clone(type?: TypeSystem.TypeDef): TypeValidatorCompiler<BIn, BOut> {
    return new TypeValidatorCompiler(type || this.type, this);
  }

  copyFrom<P extends keyof ValidatorInfoTypeMap>(vc: TypeValidatorCompiler, ...validatorIds: P[]): this {
    for (const id of validatorIds) {
      const handler = vc.handlers.get(id) as TypeValidationCompilerHandler<BIn, P>;
      if (!handler) {
        throw new Error(`Could not find validator ${id} in source.`);
      }
      this.handlers.set(id, handler);
    }
    return this;
  }

  findHandler(validatorId?: keyof ValidatorInfoTypeMap) {
    return this.handlers.get(validatorId) || this.defaultHandler;
  }
}

export class TypeRuntimeValidator<V extends Validator = Validator, T = any> {

  get postValidationHandler(): RuntimePostValidatorHandler<T> {
    return this._postValidationHandler;
  }

  protected readonly handlers: Map<keyof ValidatorInfoTypeMap, RuntimeValidatorHandler<T>>;
  protected defaultHandler: RuntimeValidatorHandler<T>;
  private _postValidationHandler: RuntimePostValidatorHandler<T>;

  constructor(public readonly type: TypeSystem.TypeDef, protected readonly parent?: TypeRuntimeValidator<V, any>) {
    this.handlers = new Map<keyof ValidatorInfoTypeMap, RuntimeValidatorHandler<T>>(parent?.handlers);
    this.defaultHandler = parent?.defaultHandler;
    this._postValidationHandler = parent?.postValidationHandler;
  }

  clone<TNew = T>(type?: TypeSystem.TypeDef): TypeRuntimeValidator<V, TNew> {
    return new TypeRuntimeValidator<V, TNew>(type || this.type, this);
  }

  setHandler<P extends keyof ValidatorInfoTypeMap>(validatorId: P, handler: RuntimeValidatorHandler<T, P>): this {
    this.handlers.set(validatorId, handler);
    return this;
  }

  removeHandler<P extends keyof ValidatorInfoTypeMap>(...validatorIds: P[]): this {
    for (const id of validatorIds) {
      this.handlers.delete(id);
    }
    return this;
  }

  copyFrom<P extends keyof ValidatorInfoTypeMap>(vc: TypeRuntimeValidator, ...validatorIds: P[]): this {
    for (const id of validatorIds) {
      const handler = vc.handlers.get(id) as RuntimeValidatorHandler<T, P>;
      if (!handler) {
        throw new Error(`Could not find validator ${id} in source.`);
      }
      this.handlers.set(id, handler);
    }
    return this;
  }

  setDefaultHandler(handler: RuntimeValidatorHandler<T>): this {
    this.defaultHandler = handler;
    return this;
  }

  /**
   * Set the post validation handler which allows customized validation in addition to the specific validators defined for the property and type.
   * This is optional and will run after all validator for the property has invoked.
   *
   * For example, in containers (array, set, map, objectMap) this is how we validate the items in the container.
   * In classes this is how nested classes are validated.
   */
  setPostValidationHandler(handler: RuntimePostValidatorHandler<T>): this {
    this._postValidationHandler = handler;
    return this;
  }

  findHandler(validatorId?: keyof ValidatorInfoTypeMap) {
    return this.handlers.get(validatorId) || this.defaultHandler;
  }
}
