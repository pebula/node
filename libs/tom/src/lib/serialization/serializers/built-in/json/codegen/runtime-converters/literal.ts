import { TomPropertySchema } from '../../../../../../schema';
import { TomTypeInstance } from '../../../../../../schema/type-system';
import { ClassSerializerContext } from '../../../../serializer';

export function literalDeserialize(v: string | number, context: ClassSerializerContext<any>, prop: TomPropertySchema) {
  return (prop.typeDef as TomTypeInstance<'literal'>).typeParams
}
