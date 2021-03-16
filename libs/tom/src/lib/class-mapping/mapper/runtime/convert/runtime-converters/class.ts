import { TypeSystem } from '../../../../../schema';
import { ClassMappingSchemaFactory } from '../../../../mapping-schema';
import { mapRegistry } from '../../../../registry';
import { MapperTypeConverter, mapperTypeConverterRegistry } from '../../mapping';
import { transformUnknown } from '../../transform';

export const classRuntimeConverter = new MapperTypeConverter<'class'>('class')
  .setHandler('class', (v, ctx, tProp, sProp) => {
    if (sProp) {
      let schema = mapRegistry.get(tProp.type, sProp.type);
      if (!schema && tProp.reflectedType === sProp.reflectedType) {
        ClassMappingSchemaFactory.autoDefineSelf(tProp.type).seal();
        schema = mapRegistry.get(tProp.type, sProp.type);
      }
      if (schema) {
        return schema.transform(v, ctx.options, ctx);
      }
    }
    return transformUnknown(ctx, v, tProp, sProp);
  });

mapperTypeConverterRegistry.set(classRuntimeConverter);

