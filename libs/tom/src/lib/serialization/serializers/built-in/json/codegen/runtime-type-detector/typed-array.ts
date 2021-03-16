import { TomPropertySchema } from '../../../../../../schema';
import { ClassSerializerContext } from '../../../../serializer';
import { ARRAY_BUFFER_KEY } from '../utils';

export function typedArraySerialize(v: any, context: ClassSerializerContext<any>, prop: TomPropertySchema) {
  return ArrayBuffer.isView(v);
}

export function typedArrayDeserialize(v: any, context: ClassSerializerContext<any>, prop: TomPropertySchema) {
  return typeof v === 'object' && ARRAY_BUFFER_KEY in v
}

