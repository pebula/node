import { TomPropertySchema } from '../../../../../../schema';
import { TomTypeInstance } from '../../../../../../schema/type-system';
import { ClassSerializerContext } from '../../../../serializer';

export function literal(v: string | number, context: ClassSerializerContext<any>, prop: TomPropertySchema) {
  return v === (prop.typeDef as TomTypeInstance<'literal'>).typeParams;
}
