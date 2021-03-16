import { Type, stringify } from '@pebula/decorate';
import { serializerTargetToString } from '../../utils';
import { SerializerOp } from '../../types';
import { Serializer } from './serializer';

export function typeSchemaNotFoundError(serializer: Serializer, target: Type<any>) {
  const error = new Error(`Class Schema not found. ${serializerTargetToString(serializer, target)}`);
  error.name = 'TypeSchemaNotFoundError';
  return error;
}

export function serializerBindingsExists(serializer: Serializer, target: Type<any>, operation?: SerializerOp) {
  const msg = operation
    ? `Serializer binding for the operation ${operation} exists.`
    : `Serializer binding exists, try to specify the specific operation or remove the bindings.`
  ;
  const error = new Error(`${msg}. ${serializerTargetToString(serializer, target)}`);
  error.name = 'SerializerBindingsExists';
  return error;
}
