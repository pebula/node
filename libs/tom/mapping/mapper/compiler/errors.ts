import { stringify, Type } from '@pebula/decorate';
import { TypeSystem } from '@pebula/tom';

/**
 * Returns a string that logs the name identifiers for a serializer and a class to be used in error messages.
 * @param serializer
 * @param target
 */
export const serializerSourceTargetToString = <T extends Type<any>>(source: Type<any>,
                                                                    target: T,
                                                                    prop?: string | keyof T) => `[Source: ${stringify(source)} | Target: ${stringify(target)}${prop ? '.' + prop : ''}]`;


export function unsupportedMappingSource(mapperType: TypeSystem.TypeDef,
                                         missingType: TypeSystem.TypeDef,
                                         source: Type<any>,
                                         target: Type<any>,
                                         propName: string) {
  const error = new Error(`Mapper compiler "${mapperType}" does not support mapping from "${missingType}" ${serializerSourceTargetToString(source, target, propName)}`);
  error.name = 'UnsupportedMappingSource';
  return error;
}

export function jitCompilerStrict(source: Type<any>, target: Type<any>, propName: string) {
  const error = new Error(`Class mapping JIT compilation failed because there is no mapping running in "strict" compilation mode. ${serializerSourceTargetToString(source, target, propName)}`);
  error.name = 'JitCompilerStrict';
  return error;
}

export function invalidDiscriminatorError(source: Type<any>, target: Type<any>, propName: string) {
  const error = new Error(`Invalid discriminator value. ${serializerSourceTargetToString(source, target, propName)}`);
  error.name = 'InvalidDiscriminatorError';
  return error;
}

export function classIdentificationMissingError(source: Type<any>, target: Type<any>) {
  const error = new Error(`No identification mechanism defined for class. ${serializerSourceTargetToString(source, target)}`);
  error.name = 'ClassIdentificationMissingError';
  return error;
}
