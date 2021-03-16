import { TomPropertySchema, EnumClassType } from '../../../../../../schema';
import { ClassSerializerSchema } from '../../../../../serializer-schema';
import { ClassSerializerContext } from '../../../../serializer';
import { JsonSerializer } from '../../json';

export function enumSerialize(v: string | number, context: ClassSerializerContext<any>, prop: TomPropertySchema) {
  return (typeof v === 'string' ||  typeof v === 'number') && !!(prop.type as EnumClassType).findByValue(v);
}

export function enumDeserialize(v: string | number, context: ClassSerializerContext<any>, prop: TomPropertySchema) {
  const schema = context.schema as ClassSerializerSchema<JsonSerializer, any>;
  if (schema.options.enumAsLabels) {
    return typeof v === 'string' && !!(prop.type as EnumClassType).findByLabel(v);
  } else {
    return (typeof v === 'string' ||  typeof v === 'number') && !!(prop.type as EnumClassType).findByValue(v);
  }
}

