import { TomPropertySchema } from '../../../../../../schema';
import { ClassSerializerContext } from '../../../../serializer';
import { ARRAY_BUFFER_KEY } from '../utils';

export function arrayBufferSerialize(v: any, context: ClassSerializerContext<any>, prop: TomPropertySchema) {
  return v instanceof ArrayBuffer;
}

export function arrayBufferDeserialize(v: any, context: ClassSerializerContext<any>, prop: TomPropertySchema) {
  return typeof v === 'object' && ARRAY_BUFFER_KEY in v
}

