import { Type } from '@pebula/decorate';
import { TomPropertySchema, EnumClass } from '../schema';
import { converterRegistry, ConverterRegistry } from './converter-registry';

const PASSTHROUGH = value => value;

export function tryFindConverter(targetPropSchema: TomPropertySchema,
                                 sourceType: Type<any>,
                                 registry: ConverterRegistry = converterRegistry) {
  if (targetPropSchema?.enum && EnumClass.isEnum(sourceType)) {
    return {
      type: 'enum' as const,
      converter: targetPropSchema.enum === sourceType.type ? PASSTHROUGH : registry.get(targetPropSchema.enum, sourceType.type),
    };
  }
  if (sourceType && targetPropSchema?.type) {
    return {
      type: 'value' as const,
      converter: registry.get(targetPropSchema.type, sourceType),
    };
  }
}
