import { Type } from '@pebula/decorate';
import { ClassSerializerSchemaFactory, NominalKeys, SealableSchemaFactory, UnSealableSchemaFactory } from './serializer-schema';
import { Serializer } from './serializers';

/**
 * Define serialization for a serializer / type pair.
 * This is a custom way to define how to serialize a type as most definitions are set on the type itself using decorators.
 */
export function defineClassSerializer<S extends Serializer, T, TData = any>(serializer: S,
                                                                            target: Type<T>,
                                                                            options?: S['defaultFactoryOptions']): Exclude<keyof T, NominalKeys> extends never
                                                                                                                     ? SealableSchemaFactory<S, T, TData>
                                                                                                                     : UnSealableSchemaFactory<S, T, TData> {
  const factory = new ClassSerializerSchemaFactory<S, T, TData>(serializer, target, options);
  return factory as any;
}

export function clearSerializer(source: Serializer, target?: Type<any>) {
  return source.resetBindings(target);
}
