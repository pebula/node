import { Schema, TypeSystem } from '@pebula/tom';
import { ClassSerializerContext } from '../../../../serializer';

export function literal(v: string | number, context: ClassSerializerContext<any>, prop: Schema.TomPropertySchema) {
  return v === (prop.typeDef as TypeSystem.TomTypeInstance<'literal'>).typeParams;
}
