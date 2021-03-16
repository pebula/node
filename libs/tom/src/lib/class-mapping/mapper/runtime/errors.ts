import { stringify, Type } from '@pebula/decorate';
import { TypeSystem } from '../../../schema';

/**
 * Returns a string that logs the name identifiers for a serializer and a class to be used in error messages.
 * @param serializer
 * @param target
 */
 export const serializerSourceTargetToString = <T extends Type<any>>(source: Type<any>,
                                                                     target: T,
                                                                     prop?: string | keyof T) => `[Source: ${stringify(source)} | Target: ${stringify(target)}${prop ? '.' + prop : ''}]`;

export function invalidDataObjectError(source: Type<any>, target: Type<any>, msg: boolean | string) {
  let error: Error;
  if (typeof msg !== 'string') {
    error = new Error(`Invalid or Missing data object in schema. [source: ${stringify(source)}, target: ${stringify(target)}]`);
  } else {
    error = new Error(`${msg}. [source: ${stringify(source)}, target: ${stringify(target)}]`);
  }

  error.name = 'InvalidDataObject';
  return error;
}

export function unsupportedMappingSource(mapperType: TypeSystem.TypeDef,
                                         missingType: TypeSystem.TypeDef,
                                         source: Type<any>,
                                         target: Type<any>,
                                         propName: string) {
  const error = new Error(`Mapper converter "${mapperType}" does not support mapping from "${missingType}" ${serializerSourceTargetToString(source, target, propName)}`);
  error.name = 'UnsupportedMappingSource';
  return error;
}
