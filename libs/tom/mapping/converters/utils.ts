import { Type } from '@pebula/decorate';
import { Schema } from '@pebula/tom';
import { converterRegistry, ConverterRegistry } from './converter-registry';

const PASSTHROUGH = value => value;

export function tryFindConverter(targetPropSchema: Schema.TomPropertySchema,
                                 sourceType: Type<any>,
                                 registry: ConverterRegistry = converterRegistry) {
  if (targetPropSchema?.enum && Schema.EnumClass.isEnum(sourceType)) {
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
