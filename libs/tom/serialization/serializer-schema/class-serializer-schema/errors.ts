import { Type } from '@pebula/decorate';
import { serializerTargetToString } from '../../utils';
import { Serializer } from '../../serializers';

export function missingPropertySerializerSchema(serializer: Serializer, target: Type<any>, propertyName: string) {
  const error = new Error(`Invalid Class serializer schema definitions, mapping is missing for property "${propertyName}". ${serializerTargetToString(serializer, target)}`);
  error.name = 'MissingPropertySerializerSchema';
  return error;
}

export function mapperSealedError(serializer: Serializer, target: Type<any>) {
  const error = new Error(`Can not seal an already sealed mapper. ${serializerTargetToString(serializer, target)}`);
  error.name = 'MapperSealed';
  return error;
}

export function missingPropertySchema(serializer: Serializer, target: Type<any>, propertyName: string) {
  const error = new Error(`Target property schema is missing for property "${propertyName}". ${serializerTargetToString(serializer, target)}`);
  error.name = 'MissingPropertySchema';
  return error;
}
