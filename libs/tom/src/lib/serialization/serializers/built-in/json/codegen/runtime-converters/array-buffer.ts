import { TomPropertySchema } from '../../../../../../schema';
import { ClassSerializerContext } from '../../../../serializer';
import { ARRAY_BUFFER_KEY } from '../utils';

export function arrayBufferSerialize(v: any, context: ClassSerializerContext<any>, prop: TomPropertySchema) {
  return { [ARRAY_BUFFER_KEY]: Buffer.from(v).toString('base64') };
}

export function arrayBufferDeserialize(v: any, context: ClassSerializerContext<any>, prop: TomPropertySchema) {
  if (typeof v === 'object' && ARRAY_BUFFER_KEY in v && typeof v[ARRAY_BUFFER_KEY] === 'string') {
    const b = Buffer.from(v[ARRAY_BUFFER_KEY], 'base64');
    return b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength);
  }
}
