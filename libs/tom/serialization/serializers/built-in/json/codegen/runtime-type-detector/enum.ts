import { Schema } from '@pebula/tom';
import { ClassSerializerSchema } from '../../../../../serializer-schema';
import { ClassSerializerContext } from '../../../../serializer';
import { JsonSerializer } from '../../json';

export function enumSerialize(v: string | number, context: ClassSerializerContext<any>, prop: Schema.TomPropertySchema) {
  return (typeof v === 'string' ||  typeof v === 'number') && !!(prop.type as Schema.EnumClassType).findByValue(v);
}

export function enumDeserialize(v: string | number, context: ClassSerializerContext<any>, prop: Schema.TomPropertySchema) {
  const schema = context.schema as ClassSerializerSchema<JsonSerializer, any>;
  if (schema.options.enumAsLabels) {
    return (prop.type as Schema.EnumClassType).labels.indexOf(v as string) !== -1;
  } else {
    return (prop.type as Schema.EnumClassType).values.indexOf(v) !== -1;
  }
}

