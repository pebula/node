import { TomPropertySchema } from '../../../../../../schema';
import { ClassSerializerContext } from '../../../../serializer';
import { object } from './primitive';

export function array(v: any, context: ClassSerializerContext<any>, prop: TomPropertySchema) {
  return Array.isArray(v);
}

export function set(v: any, context: ClassSerializerContext<any>, prop: TomPropertySchema) {
  return context.isSerialize ? v instanceof Set : Array.isArray(v);
}

export function map(v: Map<any, any>, context: ClassSerializerContext<any>, prop: TomPropertySchema) {
  return context.isSerialize ? v instanceof Map : object(v);
}

export const objectMap = object;
