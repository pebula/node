import { TypeSystem, TomPropertySchema } from '../../../../../../schema';
import { ClassSerializerContext } from '../../../../serializer';
import { ARRAY_BUFFER_KEY } from '../utils';

export function typedArraySerialize(v: any, context: ClassSerializerContext<any>, prop: TomPropertySchema) {
  return { [ARRAY_BUFFER_KEY]: Buffer.from(v.buffer, v.byteOffset, v.byteLength).toString('base64') };
}

export function typedArrayDeserialize(v: any, context: ClassSerializerContext<any>, prop: TomPropertySchema) {
  if (typeof v === 'object' && ARRAY_BUFFER_KEY in v && typeof v[ARRAY_BUFFER_KEY] === 'string') {
    const b = Buffer.from(v[ARRAY_BUFFER_KEY], 'base64');
    return new prop.type(b.buffer, b.byteOffset, b.length / (prop.type as TypeSystem.TypedBufferRuntimeTypes).BYTES_PER_ELEMENT);
  }
}
