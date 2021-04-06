import { Schema } from '@pebula/tom';
import { ClassMappingContext } from '../../../class-mapping-schema-context';
import { mapperRuntimeTypeDetectorRegistry } from '../../mapping';

export function classRuntimeTypeDetector(v: any, context: ClassMappingContext<any, any>, tProp: Schema.TomPropertySchema, sProp: Schema.TomPropertySchema) {
  return v instanceof sProp.type;
  /** We don't need the discriminator here, if the source value is an instance of the source property, it's a match */

  // const classSchema = getSchema(sProp.type);
  // const { discriminator } = classSchema;

  // if (discriminator) {
  //   const discriminatorValue = discriminator.typeDef.type === 'literal' ? discriminator.typeDef.typeParams : discriminator.defaultValue?.();
  //   if (discriminatorValue === undefined) {
  //     throw invalidDiscriminatorError(prop.propMapSchema.sourcePropMeta.type, classSchema.type, discriminator.name as string);
  //   }
  //   return v[discriminator.name] === discriminatorValue;
  // } else {
  //   return v instanceof sProp.type;
  // }
}

mapperRuntimeTypeDetectorRegistry.set('class', classRuntimeTypeDetector);
