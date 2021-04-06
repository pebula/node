import { Code as C, Schema, TypeSystem } from '@pebula/tom';
import { SerializeTransformFn } from '../../serializer-schema';
import type { Serializer } from './serializer';
import type { CompilerCodeBlockContext, CompilerContext, CompilerPropertyContext } from './local-context';
import { RuntimeConverter, TypeCompiler } from './serializer-components';
import { ClassSerializerContext } from './class-serializer-schema-context';

// A Passthrough type compiler
const DEFAULT_TYPE_COMPILER = new TypeCompiler().register(ctx => { ctx.currentBlock.addAssignment(ctx.targetSetter, ctx.sourceAccessor) }, true);

export interface TypeCompilerHandler<BIn extends C.Block<C.Block<any>> = C.Block<C.Block<any>>, BOut extends C.Block<C.Block<any>> = C.Block<C.Block<any>>> {
  (codeBlockContext: CompilerCodeBlockContext<BIn>, propContext: CompilerPropertyContext): CompilerCodeBlockContext<BOut> | void;
}

export type FnInitCompilerHandler<S extends Serializer, T = any> = (block: C.Block<C.Block<any>>, context: CompilerContext<S, T>) => void
export type RuntimeConverterHandler<S = any, T = any> = (value: S, schema: ClassSerializerContext<any>, prop: Schema.TomPropertySchema) => T;
export type SerializerTypeCompilers = Map<TypeSystem.TypeDef, TypeCompiler>;

export class SerializerContext<S extends Serializer = Serializer> {
  fnInitCompiler?: FnInitCompilerHandler<S, any>
  fnDisposeCompiler?: FnInitCompilerHandler<S, any>

  /** Property code block, used before the assignment expression to support logical flow, preparation and other things required. */
  readonly propertyBlockCompilers: TypeCompiler[];
  readonly typeCompilers: SerializerTypeCompilers;
  readonly typeDetectorCompilers: Map<TypeSystem.TypeDef, TypeCompiler<C.ConditionalBlock<any>>>;
  readonly defaultTypeCompiler: TypeCompiler;
  readonly defaultRuntimeConverter: RuntimeConverter;
  readonly runtimeConverters: Map<TypeSystem.TypeDef, RuntimeConverter>;
  readonly runtimeTypeDetectors: Map<TypeSystem.TypeDef, RuntimeConverter<boolean>>;
  readonly runtimeTransform: { serialize: SerializeTransformFn<'serialize', any>, deserialize: SerializeTransformFn<'deserialize', any> };

  constructor(serializer: Serializer, parent?: SerializerContext<S>) {
    serializer[SERIALIZER_CONTEXT] = this;
    this.propertyBlockCompilers = parent?.propertyBlockCompilers.map( p => p.clone() ) ?? [];
    this.typeCompilers = new Map<TypeSystem.TypeDef, TypeCompiler>(Array.from(parent?.typeCompilers.entries() ?? []).map(([t, c]) => [t, c.clone()]));
    this.typeDetectorCompilers = new Map<TypeSystem.TypeDef, TypeCompiler<C.ConditionalBlock<any>>>(Array.from(parent?.typeDetectorCompilers.entries() ?? []).map(([t, c]) => [t, c.clone()]));
    this.defaultTypeCompiler = new TypeCompiler(parent?.defaultTypeCompiler);
    this.runtimeConverters = new Map<TypeSystem.TypeDef, RuntimeConverter>(Array.from(parent?.runtimeConverters.entries() ?? []).map(([t, c]) => [t, c.clone()]));
    this.runtimeTypeDetectors = new Map<TypeSystem.TypeDef, RuntimeConverter<boolean>>(Array.from(parent?.runtimeTypeDetectors.entries() ?? []).map(([t, c]) => [t, c.clone()]));
    this.defaultRuntimeConverter = new RuntimeConverter(parent?.defaultRuntimeConverter);
    this.runtimeTransform = { serialize: parent?.runtimeTransform.serialize, deserialize: parent?.runtimeTransform.deserialize };
    this.fnInitCompiler = parent?.fnInitCompiler;
    this.fnDisposeCompiler = parent?.fnDisposeCompiler;

  }

  findTypeCompilerHandler(typeDef: TypeSystem.TypeDef, isSerialize: boolean) {
    const key = isSerialize ? 'serializer' : 'deserializer';
    return this.typeCompilers.get(typeDef)?.[key] || this.defaultTypeCompiler[key] || DEFAULT_TYPE_COMPILER[key];
  }

  findTypeDetectorCompilerHandler(typeDef: TypeSystem.TypeDef, isSerialize: boolean) {
    const key = isSerialize ? 'serializer' : 'deserializer';
    return this.typeDetectorCompilers.get(typeDef)?.[key];
  }

  findRuntimeConverterHandler(typeDef: TypeSystem.TypeDef, isSerialize: boolean) {
    const key = isSerialize ? 'serializer' : 'deserializer';
    return this.runtimeConverters.get(typeDef)?.[key] || this.defaultRuntimeConverter[key];
  }

  findRuntimeTypeDetectorHandler(typeDef: TypeSystem.TypeDef, isSerialize: boolean) {
    const key = isSerialize ? 'serializer' : 'deserializer';
    return this.runtimeTypeDetectors.get(typeDef)?.[key];
  }

}

const SERIALIZER_CONTEXT = Symbol('SerializerContext');

export function getSerializerContext<S extends Serializer>(serializer: S): SerializerContext<S> {
  return serializer[SERIALIZER_CONTEXT];
}
