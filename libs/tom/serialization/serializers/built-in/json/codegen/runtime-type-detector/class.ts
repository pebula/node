import { Schema } from '@pebula/tom';
import { ClassSerializerContext } from '../../../../serializer';
import { invalidDiscriminatorError, classIdentificationMissingError } from '../../errors';

export function classIdentifierTypeDetectorSerializer(v: any, context: ClassSerializerContext<any>, prop: Schema.TomPropertySchema) {
  /** We don't need the discriminator here, if the source value is an instance of the class property, it's a match */
  return v instanceof prop.type;

  // const classSchema = getSchema(prop.type);
  // const { discriminator } = classSchema;

  // if (discriminator) {
  //   const discriminatorValue = discriminator.typeDef.type === 'literal' ? discriminator.typeDef.typeParams : discriminator.defaultValue?.();
  //   if (discriminatorValue === undefined) {
  //     throw invalidDiscriminatorError(context.schema.serializer, classSchema.type, discriminator.name as string);
  //   }
  //   return v[discriminator.name] === discriminatorValue;
  // } else {
  //   return v instanceof prop.type;
  // }
}

export function classIdentifierTypeDetectorDeserializer(v: any, context: ClassSerializerContext<any>, prop: Schema.TomPropertySchema) {
  const classSchema = Schema.getSchema(prop.type);
  const { discriminator } = classSchema;

  if (discriminator) {
    const discriminatorValue = discriminator.typeDef.type === 'literal' ? discriminator.typeDef.typeParams : discriminator.defaultValue?.();
    if (discriminatorValue === undefined) {
      throw invalidDiscriminatorError(context.schema.serializer, classSchema.type, discriminator.name as string);
    }
    return v[discriminator.name] === discriminatorValue;
  }

  throw classIdentificationMissingError(context.schema.serializer, context.schema.target);
}
