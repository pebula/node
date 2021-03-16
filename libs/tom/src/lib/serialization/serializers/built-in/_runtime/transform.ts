import { TomPropertySchema } from '../../../../schema';
import { ClassSerializerContext, getSerializerContext } from '../../serializer';

/**
 * A transformer that invokes the runtime converter for the type.
 * It will also handle/protect for null & undefined values.
 *
 * You can provide a `missToken` which is returned if no runtime converter was found.
 */
export function transform(context: ClassSerializerContext<any, any>,
                          value: any,
                          prop: TomPropertySchema<any>,
                          missToken?: any): any {
  // exist quickly if null/undefined...
  if (value === undefined) {
    let defaultValue = prop.defaultValue ? prop.defaultValue() : prop.nullable ? null : undefined;
    if (defaultValue === undefined && !prop.optional && prop.typeDef.type === 'literal') {
      defaultValue = prop.typeDef.typeParams;
    }
    return defaultValue;
  }
  if (value === null) {
    let defaultValue = prop.defaultValue ? prop.defaultValue() : prop.nullable ? null : undefined;
    if (defaultValue === undefined && !prop.nullable && prop.typeDef.type === 'literal') {
      defaultValue = prop.typeDef.typeParams;
    }
    return defaultValue;
  }

  const rtConverter = getSerializerContext(context.schema.serializer).findRuntimeConverterHandler(prop.typeDef.type, context.isSerialize);
  if (rtConverter) {
    return rtConverter(value, context, prop);
  }
  return missToken;
}
