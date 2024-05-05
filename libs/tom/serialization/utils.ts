import { Type, stringify } from '@pebula/decorate';
import { Serializer } from './serializers';

/**
 * Returns a string that logs the name identifiers for a serializer and a class to be used in error messages.
 * @param serializer
 * @param target
 */
export const serializerTargetToString = <T extends Type<any>>(serializer: Serializer,
                                                              target: T,
                                                              prop?: string | keyof T) => `[Serializer: ${serializer.name} | Class: ${stringify(target)}${prop ? '.' + prop.toString() : ''}]`;
