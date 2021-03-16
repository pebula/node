import { TypeSystem } from '../../../../../schema';
import { enumMappingRegistry } from '../../../../../enum-mapping';
import { unsupportedMappingSource } from '../../errors';
import { MapperTypeConverter, MapperTypeConverterHandler, mapperTypeConverterRegistry } from '../../mapping';

const enumNativeHandler: MapperTypeConverterHandler<string | number, string | number> = (v, ctx, tProp, sProp) => {
  const enumType = tProp.type as TypeSystem.EnumClassType;
  for (const record of enumType.records) {
    if (v === record.value) {
      return v;
    }
  }
};

export const enumRuntimeConverter = new MapperTypeConverter<'enum', string | number>('enum')
  .setHandler<string | number>('enum', (v, ctx, tProp, sProp) => {
    if (sProp.enum) {
    // For identical enums, directly assign
      if (tProp.enum === sProp.enum) {
        return v;
      } else {
        const schema = enumMappingRegistry.get(sProp.enum, tProp.enum);
        if (schema) {
          return schema.get(v);
        } else {
          throw unsupportedMappingSource('enum', 'enum', ctx.source.constructor as any, ctx.target.constructor as any, tProp.name as string);
        }
      }
    }
  })
  .setHandler('number', enumNativeHandler)
  .setHandler('string', enumNativeHandler);

mapperTypeConverterRegistry.set(enumRuntimeConverter);

