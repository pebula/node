import { TypeSystem } from '../../../../schema';
import { MapperRuntimeTypeDetectorHandler, MapperTypeConverter } from './mapper-type-converter';

const typeCompilerRegistry = new Map<TypeSystem.TypeDef, MapperTypeConverter<TypeSystem.TypeDef>>();

export interface MapperTypeConverterRegistry {
  get<T extends TypeSystem.TypeDef>(type: T): MapperTypeConverter<T> | undefined;
  set(c: MapperTypeConverter<TypeSystem.TypeDef>): this;
}
export const mapperTypeConverterRegistry: MapperTypeConverterRegistry = {
  get<T extends TypeSystem.TypeDef>(type: T): MapperTypeConverter<T> | undefined {
    return typeCompilerRegistry.get(type) as any;
  },
  set(c: MapperTypeConverter<TypeSystem.TypeDef>) {
    typeCompilerRegistry.set(c.type, c);
    return this;
  },
};

const runtimeTypeDetectorRegistry = new Map<TypeSystem.TypeDef, MapperRuntimeTypeDetectorHandler>();

export interface MapperRuntimeTypeDetectorRegistry {
  get<T extends TypeSystem.TypeDef>(type: T): MapperRuntimeTypeDetectorHandler | undefined;
  set(type: TypeSystem.TypeDef, handler: MapperRuntimeTypeDetectorHandler): this;
}
export const mapperRuntimeTypeDetectorRegistry: MapperRuntimeTypeDetectorRegistry = {
  get<T extends TypeSystem.TypeDef>(type: T): MapperRuntimeTypeDetectorHandler | undefined {
    return runtimeTypeDetectorRegistry.get(type) as any;
  },
  set(type: TypeSystem.TypeDef, handler: MapperRuntimeTypeDetectorHandler) {
    runtimeTypeDetectorRegistry.set(type, handler);
    return this;
  },
};
