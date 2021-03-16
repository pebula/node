import { ClassSerializerSchema } from '../../../serializer-schema';
import { ClassSerializerContext, Serializer, SerializerOptions } from '../../serializer';
import { serializeSchema, transform } from '../_runtime';

export function runtimeTransformSerialize<S extends Serializer, T>(this: ClassSerializerSchema<S, T, 'serialize'>, input: T, options: SerializerOptions<T, any>, ctx?: ClassSerializerContext<T>): object {
  const output = {};
  return serializeSchema(this, input, output, ctx || new ClassSerializerContext<T>(this, input, output as any, options), transform);
}

export function runtimeTransformDeserialize<S extends Serializer, T>(this: ClassSerializerSchema<S, T, 'deserialize'>, input: object, options: SerializerOptions<T, any>, ctx?: ClassSerializerContext<T>): T {
  const output = new this.target();
  return serializeSchema(this, input, output, ctx || new ClassSerializerContext<T>(this, input, output as any, options), transform);
}
