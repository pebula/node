import { Type } from '@pebula/decorate';
import { schemaRegistry } from './registry';
import { serializerSchemaNotFoundError } from './errors';
import { Serializer, SerializerOptions } from './serializers';

/**
* @param input The source object to serialize into T using serializer S
* @param serializer The serializer to use
* @param options
* @param target The target class to serialize from
* You would want to specify the target when the defined serializer is based on a base class of the current instance.
*/
export function serialize<S extends Serializer, T>(input: T,
                                                   serializer: S,
                                                   options?: Omit<SerializerOptions<T>, 'target'>,
                                                   target?: Type<T>): any {
  const targetType: Type<T> = target || input?.constructor as Type<T>;

  options = { ...(options || {}) };

  const schema = schemaRegistry.getOperation<S, T, 'serialize'>(serializer, targetType, 'serialize');

  if (!schema) {
    throw serializerSchemaNotFoundError(serializer, targetType, 'serialize');
  }

  return schema.transform(input, options);
}


export function deserialize<S extends Serializer, T>(input: any,
                                                     serializer: S,
                                                     target: Type<T>,
                                                     options?: SerializerOptions<T>): T {
  options = { ...(options || {}) };

  const schema = schemaRegistry.getOperation<S, T, 'deserialize'>(serializer, target, 'deserialize');
  if (!schema) {
    throw serializerSchemaNotFoundError(serializer, target, 'deserialize');
  }

  return schema.transform(input, options);
}
