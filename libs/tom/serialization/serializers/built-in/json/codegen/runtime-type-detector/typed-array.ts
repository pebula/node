import { Schema } from '@pebula/tom';
import { ClassSerializerContext } from '../../../../serializer';
import { ARRAY_BUFFER_KEY } from '../utils';

export function typedArraySerialize(v: any, context: ClassSerializerContext<any>, prop: Schema.TomPropertySchema) {
  return ArrayBuffer.isView(v);
}

export function typedArrayDeserialize(v: any, context: ClassSerializerContext<any>, prop: Schema.TomPropertySchema) {
  return typeof v === 'object' && ARRAY_BUFFER_KEY in v
}

