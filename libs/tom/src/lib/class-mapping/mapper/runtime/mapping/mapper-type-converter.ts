import { TomPropertySchema, TypeSystem } from '../../../../schema';
import { ClassMappingContext } from '../../class-mapping-schema-context';

export interface MapperRuntimeTypeDetectorHandler<S = any, T = any> {
  (value: S, context: ClassMappingContext<S, T>, tProp: TomPropertySchema<T>, sProp: TomPropertySchema<S>): boolean;
}

export interface MapperTypeConverterHandler<S = any, T = any> {
  (value: S, context: ClassMappingContext<S, T>, tProp: TomPropertySchema, sProp: TomPropertySchema): T;
}

export class MapperTypeConverter<T extends TypeSystem.TypeDef, TType = any> {

  get sourceWildcardHandler(): MapperTypeConverterHandler { return this._sourceWildcardHandler; }

  private readonly handlers: Map<TypeSystem.TypeDef, MapperTypeConverterHandler>;
  private defaultHandler: MapperTypeConverterHandler;
  private _sourceWildcardHandler: MapperTypeConverterHandler;

  constructor(public readonly type: T, handlers? : Iterable<[TypeSystem.TypeDef, MapperTypeConverterHandler]>) {
    this.handlers = handlers ? new Map(handlers) : new Map<TypeSystem.TypeDef, MapperTypeConverterHandler>();
  }

  setHandler<SType = any>(type: TypeSystem.TypeDef, handler: MapperTypeConverterHandler<SType, TType>): this {
    this.handlers.set(type, handler);
    return this;
  }

  setDefaultHandler(handler: MapperTypeConverterHandler<any, TType>): this {
    this.defaultHandler = handler;
    return this;
  }

  /**
   * Set a global, wildcard handler, to be used map when the target is the type T and the source is unknown.
   * When set, this handler will be used when a source handler does not exists on the target type compiler and there is no default handler as well.
   *
   * For example:
   * X is a `MapperTypeCompiler<number>` which maps to the type `number` and has handler for the sources `string` and `boolean` and DOES not have a default handler.
   * If we want to map from `union of literal 500, 50` to `number` we will not find the union handler on X.
   * If Y is `MapperTypeCompiler<union>` and we will register a source wildcard handler for it, the source wildcard handler will emit allowing us
   * to handle the mapping.
   * @param handler
   * @returns
   */
    setSourceWildcardHandler(handler: MapperTypeConverterHandler): this {
    this._sourceWildcardHandler = handler;
    return this;
  }

  findHandler(sourcePropMeta: TomPropertySchema) {
    return this.handlers.get(sourcePropMeta.typeDef.type) || this.defaultHandler;
  }

  clone(): MapperTypeConverter<T, TType> {
    return new MapperTypeConverter<T, TType>(this.type, this.handlers);
  }
}

