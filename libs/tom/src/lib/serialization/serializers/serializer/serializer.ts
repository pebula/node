import { Type, MixinFw } from '@pebula/decorate';
import * as C from '../../../js-code-builder';
import { getSchema } from '../../../schema';
import { TypeDef } from '../../../schema/type-system';
import { schemaRegistry } from '../../registry';
import { ClassSerializerSchemaFactory, SealableSchemaFactory, SerializerFactoryOptions, SerializeTransformFn } from '../../serializer-schema';
import { SerializerOp } from '../../types';
import { serializerBindingsExists, typeSchemaNotFoundError } from './errors';
import { FnInitCompilerHandler, SerializerContext } from './serializer-context';
import { BoundSerializer, RuntimeConverter, TypeCompiler } from './serializer-components';

export abstract class Serializer<TOptions extends SerializerFactoryOptions = SerializerFactoryOptions> {
  abstract readonly name: string;

  readonly defaultFactoryOptions: Partial<TOptions>;
  private readonly context: SerializerContext<this>;
  private readonly bindings: Map<Type<any>, BoundSerializer<this, any>>;

  protected constructor(parent?: Serializer) {
    this.bindings = new Map<Type<any>, BoundSerializer<this, any>>();
    this.defaultFactoryOptions = parent ? { ...parent.defaultFactoryOptions as any } : {};
    this.context = new SerializerContext(this, parent?.context);
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
      this.bindings.clear();
      return schemaRegistry.delete(this);
    } else {
      let count = 0;
      for (const t of types) {
        this.bindings.delete(t);
        count += +(schemaRegistry.delete(this, t));
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
  get<T = any>(type: Type<T>): BoundSerializer<this, T> | undefined {
    if (this.bindings.has(type)) {
      return this.bindings.get(type);
    } else if (schemaRegistry.has(this, type)) {
      const binding = new BoundSerializer(this, schemaRegistry.get(this, type));
      this.bindings.set(type, binding);
      return binding;
    }
  }

  /**
   * Create new bound serializer for the type, if a serializer already exists returns it.
   * Creation will automatically define the serialization operations (serialize/deserialize) and seal them
   * so you can use serialization right away.
   */
  create<T = any>(type: Type<T>, options?: TOptions): BoundSerializer<this, T> {
    let binding = this.get(type);
    if (!binding) {
      const schema = getSchema(type);
      if (!schema) {
        throw typeSchemaNotFoundError(this, type);
      }

      options = { ...this.defaultFactoryOptions, ...(options || {}) } as TOptions;
      ClassSerializerSchemaFactory.autoDefine(this, type, options).seal();
      binding = this.get(type);
    }
    return binding;
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
   * Provide custom control when creating and defining serialization bindings.
   * It is similar to `create()` but instead of sealing the serialization definitions and creating the bindings
   * it will return the definitions, allowing customization before sealing it.
   *
   * The returned factory is not bound to the operation specified.
   *
   * Note that if a schema binding, for the provided operation, exists it will throw.
   */
  define<T = any>(type: Type<T>, operation: SerializerOp, options?: TOptions): SealableSchemaFactory<this, T, any, T, never>
  /**
   * Provide custom control when creating and defining serialization bindings.
   * It is similar to `create()` but instead of sealing the serialization definitions and creating the bindings
   * it will return the definitions, allowing customization before sealing it.
   *
   * The returned factory is not bound to any operation.
   * When calling `seal()` you can omit the operation, creating 2 identical operations
   * or you can set an operation `seal('serialize')` and then use `forkDeserialize()` or `defineDDeserialize()` to define the next operation.
   * This can also occur in the opposite order (deserialize, then serialize).
   *
   * Note that if a schema binding exists it will throw.
   * It does not matter if it only has a serializer or a deserializer.
   * If you wish to define a specific operation, which doesn't exists but the other operation exists, use the other
   * signature, where you provide the operation and the validation is done only on the other operations.
   */
  define<T = any>(type: Type<T>, options?: TOptions): SealableSchemaFactory<this, T>
  define<T = any>(type: Type<T>, operation?: SerializerOp | TOptions, options?: TOptions): SealableSchemaFactory<this, T> {
    if (typeof operation !== 'string') {
      options = operation;
      operation = undefined;
    }
    const existing = this.get(type);
    if (!!existing) {
      if (!operation) {
        throw serializerBindingsExists(this, type);
      } else if (operation === 'serialize' && !!existing.serialize) {
        throw serializerBindingsExists(this, type, operation);
      } else if (operation === 'deserialize' && !!existing.deserialize) {
        throw serializerBindingsExists(this, type, operation);
      }
    }
    options = { ...this.defaultFactoryOptions, ...(options || {}) } as TOptions;
    return ClassSerializerSchemaFactory.autoDefine(this, type, options);
  }

  protected addPropertyBlockCompilers(typeCompiler: TypeCompiler): this
  protected addPropertyBlockCompilers(): TypeCompiler;
  protected addPropertyBlockCompilers(typeCompiler?: TypeCompiler): TypeCompiler | this {
    const compiler = typeCompiler || new TypeCompiler();
    this.context.propertyBlockCompilers.push(compiler);
    return typeCompiler ? this : compiler;
  }

  protected setTypeCompiler(type: TypeDef): TypeCompiler {
    const compiler = new TypeCompiler();
    this.context.typeCompilers.set(type, compiler);
    return compiler;
  }

  protected setTypeDetectorCompiler(type: TypeDef): TypeCompiler<C.ConditionalBlock<any>> {
    const compiler = new TypeCompiler<C.ConditionalBlock<any>>();
    this.context.typeDetectorCompilers.set(type, compiler);
    return compiler;
  }

  /** Set the initial handler for runtime transformation. */
  protected setRuntimeTransformer<T = any>(serialize: SerializeTransformFn<'serialize', T>, deserialize: SerializeTransformFn<'deserialize', T>): this {
    this.context.runtimeTransform.serialize = serialize;
    this.context.runtimeTransform.deserialize = deserialize;
    return this;
  }

  protected setRuntimeConverter<T = any>(type: TypeDef): RuntimeConverter<T> {
    const rtConverter = new RuntimeConverter();
    this.context.runtimeConverters.set(type, rtConverter);
    return rtConverter;
  }

  protected setDefaultRuntimeConverter<T = any>(): RuntimeConverter<T> {
    return this.context.defaultRuntimeConverter;
  }

  protected setRuntimeTypeDetector<T = any>(type: TypeDef): RuntimeConverter<T> {
    const rtConverter = new RuntimeConverter();
    this.context.runtimeTypeDetectors.set(type, rtConverter);
    return rtConverter;
  }

  protected setDefaultTypeCompiler(): TypeCompiler {
    return this.context.defaultTypeCompiler;
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
    class _Serializer extends Serializer {
      readonly name: string = name;

      protected constructor() {
        super(baseInstance);
      }

      // We don't want to call the parent's configure here, we have the `parent` object for that.
      configure(): void { }
    }

    if (configure) {
      Object.defineProperty(_Serializer.prototype, 'configure', { value: configure });
    }
    MixinFw.mixIntoClass(_Serializer, [this.constructor]);

    return _Serializer as any;
  }
}
