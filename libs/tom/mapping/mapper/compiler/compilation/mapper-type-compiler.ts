import { Code as C, Schema, TypeSystem } from '@pebula/tom';
import { CompilerCodeBlockContext, CompilerPropertyContext } from './context';

export interface MapperTypeDetectorCompilerHandler {
  (codeBlockContext: CompilerCodeBlockContext<C.ConditionalBlock<any>>, propContext: CompilerPropertyContext): CompilerCodeBlockContext | void;
}

export interface MapperTypeCompilerHandler {
  (codeBlockContext: CompilerCodeBlockContext, propContext: CompilerPropertyContext): CompilerCodeBlockContext | void;
}

export class MapperTypeCompiler<T extends TypeSystem.TypeDef> {

  get sourceWildcardHandler(): MapperTypeCompilerHandler { return this._sourceWildcardHandler; }

  private readonly handlers: Map<TypeSystem.TypeDef, MapperTypeCompilerHandler>;
  private defaultHandler: MapperTypeCompilerHandler;
  private _sourceWildcardHandler: MapperTypeCompilerHandler;

  constructor(public readonly type: T, handlers? : Iterable<[TypeSystem.TypeDef, MapperTypeCompilerHandler]>) {
    this.handlers = handlers ? new Map(handlers) : new Map<TypeSystem.TypeDef, MapperTypeCompilerHandler>();
  }

  /**
   * Set the handler to handle mapping from the type defined in `type` to the target type of this handler (`this.type`).
   * @param type The source type
   * @param handler Handler from source type to T
   */
  setHandler(type: TypeSystem.TypeDef, handler: MapperTypeCompilerHandler): this {
    this.handlers.set(type, handler);
    return this;
  }

  /**
   * Set a default, wildcard handler to be used to map from source to the target T when a specific handler does not exists
   * @param handler
   * @returns
   */
  setDefaultHandler(handler: MapperTypeCompilerHandler): this {
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
  setSourceWildcardHandler(handler: MapperTypeCompilerHandler): this {
    this._sourceWildcardHandler = handler;
    return this;
  }

  findHandler(sourcePropMeta: Schema.TomPropertySchema) {
    return this.handlers.get(sourcePropMeta.typeDef.type) || this.defaultHandler;
  }

  clone(): MapperTypeCompiler<T> {
    return new MapperTypeCompiler<T>(this.type, this.handlers);
  }
}

