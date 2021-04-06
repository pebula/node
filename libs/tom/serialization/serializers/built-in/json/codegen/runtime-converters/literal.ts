import { Schema, TypeSystem } from '@pebula/tom';
import { ClassSerializerContext } from '../../../../serializer';

export function literalDeserialize(v: string | number, context: ClassSerializerContext<any>, prop: Schema.TomPropertySchema) {
  return (prop.typeDef as TypeSystem.TomTypeInstance<'literal'>).typeParams
}
