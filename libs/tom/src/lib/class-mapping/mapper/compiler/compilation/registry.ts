import { TypeSystem } from '../../../../schema';
import { MapperTypeCompiler, MapperTypeDetectorCompilerHandler } from './mapper-type-compiler';

const typeCompilerRegistry = new Map<TypeSystem.TypeDef, MapperTypeCompiler<TypeSystem.TypeDef>>();

export interface MapperTypeCompilerRegistry {
  get<T extends TypeSystem.TypeDef>(type: T): MapperTypeCompiler<T> | undefined;
  set(c: MapperTypeCompiler<TypeSystem.TypeDef>): this;
}
export const mapperTypeCompilerRegistry: MapperTypeCompilerRegistry = {
  get<T extends TypeSystem.TypeDef>(type: T): MapperTypeCompiler<T> | undefined {
    return typeCompilerRegistry.get(type) as any;
  },
  set(c: MapperTypeCompiler<TypeSystem.TypeDef>) {
    typeCompilerRegistry.set(c.type, c);
    return this;
  },
};

const typeDetectorCompilerRegistry = new Map<TypeSystem.TypeDef, MapperTypeDetectorCompilerHandler>();

export interface MapperTypeDetectorCompilerRegistry {
  get<T extends TypeSystem.TypeDef>(type: T): MapperTypeDetectorCompilerHandler | undefined;
  set(type: TypeSystem.TypeDef, handler: MapperTypeDetectorCompilerHandler): this;
}
export const mapperTypeDetectorCompilerRegistry: MapperTypeDetectorCompilerRegistry = {
  get<T extends TypeSystem.TypeDef>(type: T): MapperTypeDetectorCompilerHandler | undefined {
    return typeDetectorCompilerRegistry.get(type) as any;
  },
  set(type: TypeSystem.TypeDef, handler: MapperTypeDetectorCompilerHandler) {
    typeDetectorCompilerRegistry.set(type, handler);
    return this;
  },
};
