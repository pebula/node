import { Schema } from '@pebula/tom';
import { ClassSerializerSchema } from '../../../../../serializer-schema';
import { ClassSerializerContext } from '../../../../serializer';
import { JsonSerializer } from '../../json';

export function enumSerialize(v: string | number, context: ClassSerializerContext<any>, prop: Schema.TomPropertySchema) {
  const schema = context.schema as ClassSerializerSchema<JsonSerializer, any>;
  if (schema.options.enumAsLabels) {
    const enumType = prop.type as Schema.EnumClassType;
    return enumType.findByValue(v)?.label;
  } else {
    return v;
  }
}

export function enumDeserialize(v: string | number, context: ClassSerializerContext<any>, prop: Schema.TomPropertySchema) {
  const schema = context.schema as ClassSerializerSchema<JsonSerializer, any>;
  const enumType = prop.type as Schema.EnumClassType;

  if (schema.options.enumAsLabels) {
    return enumType.findByLabel(v as string)?.value;
  } else {
    return enumType.findByValue(v)?.value;
  }
}
