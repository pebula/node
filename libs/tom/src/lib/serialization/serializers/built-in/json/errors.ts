import { Type, stringify } from '@pebula/decorate';
import { serializerTargetToString } from '../../../utils';
import { Serializer } from '../../serializer';

export function invalidDiscriminatorError(serializer: Serializer, target: Type<any>, propName: string) {
  const error = new Error(`Invalid discriminator value. ${serializerTargetToString(serializer, target, propName)}`);
  error.name = 'InvalidDiscriminatorError';
  return error;
}

export function classIdentificationMissingError(serializer: Serializer, target: Type<any>) {
  const error = new Error(`No identification mechanism defined for class. ${serializerTargetToString(serializer, target)}`);
  error.name = 'ClassIdentificationMissingError';
  return error;
}
