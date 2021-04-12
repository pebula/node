import { Type, MixinFw } from '@pebula/decorate';
import { Schema, TypeSystem } from '@pebula/tom';
import { ClassValidationSchema, SchemaValidationFn, PropertyValidationFn } from '../../schema';
import { validatorRegistry } from '../../registry';
import { FnInitCompilerHandler, ValidatorContext } from './validator-context';
import { typeSchemaNotFoundError } from './errors';
import { TypeRuntimeValidator, ValidatorCompiler, TypeValidatorCompiler } from './validator-components';
import { ValidatorOptions } from './types';
import { ClassValidatorContext } from './class-validator-context';
import { ValidationResult } from '../../validation-result';

export interface ValidatorFactoryOptions {
  jitCompiler?: 'disabled' | 'enabled' | 'strict';

  /**
   * When true, will stop processing on first validation error
   */
  shortCircuit?: boolean;
}

export abstract class Validator<TOptions extends ValidatorFactoryOptions = ValidatorFactoryOptions> {
  abstract readonly name: string;

  readonly defaultFactoryOptions: Partial<TOptions>;
  private readonly context: ValidatorContext<this>;

  protected constructor(parent?: Validator) {
    this.defaultFactoryOptions = parent ? { ...parent.defaultFactoryOptions as any } : {};
    this.context = new ValidatorContext(this, parent?.context);
    this.configure();
  }

  /**
   * Set the default factory options for this serializer.
   * Note that new options will NOT apply on existing, already created & sealed, serialization bindings.
   * It will only effect those created after the update.
   */
  setDefault<P extends keyof TOptions>(key: P, value: TOptions[P]) {
    this.defaultFactoryOptions[key] = value;
    return this;
  }

  resetBindings(...types: Array<Type<any>>): boolean {
    types = types.filter(t => !!t);
    if (types.length === 0) {
      return validatorRegistry.delete(this);
    } else {
      let count = 0;
      for (const t of types) {
        count += +(validatorRegistry.delete(this, t));
      }
      return count === types.length;
    }
  }

  /**
   * Returns a new abstract serializer class that initialize new instances that contains the serializer state of the calling instance.
   *
   * - The forked serializer class extends from the `Serializer` class
   * - The calling instance type is mixed into the forked serializer class
   * - The initial context of the forked serializer class is set to the current instance context (at the time the forked class is initialized).
   *
   * The current instance is used as parent which means we need to skip any initialization logic it has:
   *
   * - The constructor of the forked type will call the `Serializer` constructor and not the current instance type constructor, we will not call it.
   * - The `configure` method is a no-op and it will not go through the current instance type `configure` method`.
   *
   * Note that we use the context of the current instance as the base context so we don't need to re-run the configuration.
   *
   * Any new instance of the forked type will contains all block compilers, type compilers and runtime converters of it's parent but WILL not
   * extend existing model bindings of the current instance type, these must be created again.
   *
   * To override block/type compilers, runtime converters etc just override the `configure` method and re-set what you need.
   *
   * If you want a new ad-hoc serializer instance method use the `fork()` method.
   * @param name
   */
  forkType(name: string): Type<this> {
    return this._forkType(name);
  }

  /**
   * Like forkType but instead of a type returns a new instance of it.
   * Good for direct serializers that want to extend post-init functionality.
   * @param name
   */
  fork(name: string, configure?: (this: this) => void): this {
    return new (this._forkType(name, configure))();
  }

  protected configure(): void { }

  /** Returns the existing bound serializer for the type */
  get<T = any>(type: Type<T>): ClassValidationSchema<this, T> | undefined {
    return validatorRegistry.get(this, type);
  }

  /**
   * Create new bound serializer for the type, if a serializer already exists returns it.
   * Creation will automatically define the serialization operations (serialize/deserialize) and seal them
   * so you can use serialization right away.
   */
  create<T = any>(type: Type<T>, options?: TOptions): ClassValidationSchema<this, T> {
    let vSchema = validatorRegistry.get(this, type);
    if (!vSchema) {
      const schema = Schema.getSchema(type);
      if (!schema) {
        throw typeSchemaNotFoundError(this, type);
      }

      options = { ...this.defaultFactoryOptions, ...(options || {}) } as TOptions;
      vSchema = new ClassValidationSchema(this, schema, options as any);
      validatorRegistry.register(vSchema);
    }
    return vSchema;
  }

  /**
   * Identical to `create` but allows multiple types at onces and return the serializer for fluent-api fans.
   */
  add(type: Type<any> | Array<Type<any>>, options?: TOptions): this {
    const types = Array.isArray(type) ? type : [type];
    for (const t of types) {
      this.create(t, options);
    }
    return this;
  }

  /**
   * Validates the target object.
   *
   * Note that this is a new validation run.
   * Do not use this to validated nested types, if you need to validate a nested type use the context's `validateSchema` method.
   */
  validate<T = any>(target: T, options?: ValidatorOptions<T>): ValidationResult<T> {
    const schema = this.create<T>((target as any).constructor);
    const ctx = ClassValidatorContext.create<T>(target, schema, options || {});
    return schema.validate(ctx);
  }

  protected addPropertyBlockCompiler(validatorCompiler: ValidatorCompiler): this
  protected addPropertyBlockCompiler(): ValidatorCompiler;
  protected addPropertyBlockCompiler(validatorCompiler?: ValidatorCompiler): ValidatorCompiler | this {
    const compiler = validatorCompiler || new ValidatorCompiler();
    this.context.propertyBlockCompilers.push(compiler);
    return validatorCompiler ? this : compiler;
  }

  protected addValidatorCompiler(compiler: TypeValidatorCompiler): this {
    this.context.validatorCompilers.set(compiler.type, compiler);
    return this;
  }

  protected setValidatorCompiler(type: TypeSystem.TypeDef): TypeValidatorCompiler {
    const compiler = new TypeValidatorCompiler(type);
    this.context.validatorCompilers.set(type, compiler);
    return compiler;
  }

  /** Set the initial handlers for runtime transformation. */
  protected setRuntimeRootValidator(schema: SchemaValidationFn, property: PropertyValidationFn): this {
    this.context.runtimeRootValidators.schema = schema;
    this.context.runtimeRootValidators.property = property;
    return this;
  }

  protected addRuntimeValidator<T = any>(rtValidator: TypeRuntimeValidator<this, T>): this {
    this.context.runtimeValidators.set(rtValidator.type, rtValidator);
    return this;
  }

  protected setRuntimeValidator<T = any>(type: TypeSystem.TypeDef): TypeRuntimeValidator<this, T> {
    const rtValidator = new TypeRuntimeValidator(type);
    this.context.runtimeValidators.set(type, rtValidator);
    return rtValidator;
  }

  protected setFnInitCompiler(handler: FnInitCompilerHandler<this, any>): this {
    this.context.fnInitCompiler = handler
    return this;
  }

  protected setFnDisposeCompiler(handler: FnInitCompilerHandler<this, any>): this {
    this.context.fnDisposeCompiler = handler
    return this;
  }

  private _forkType(name: string): Type<this>;
  private _forkType(name: string, configure: (this: this) => void): Type<this>;
  private _forkType(name: string, configure?: (this: this) => void): Type<this> | Type<this> {

    const baseInstance = this;
    class _Validator extends Validator {
      readonly name: string = name;

      protected constructor() {
        super(baseInstance);
      }

      // We don't want to call the parent's configure here, we have the `parent` object for that.
      configure(): void { }
    }

    if (configure) {
      Object.defineProperty(_Validator.prototype, 'configure', { value: configure });
    }
    MixinFw.mixIntoClass(_Validator, [this.constructor]);

    return _Validator as any;
  }
}
