import { Type } from '@pebula/decorate';
import { SerializerOp } from './types';
import { Serializer } from './serializers';
import { serializerTargetToString } from './utils';

export function serializerSchemaNotFoundError(serializer: Serializer, target: Type<any>, op?: SerializerOp) {
  const opText = op
    ? ` for operation ${op}`
    : ''
  ;
  const error = new Error(`Serializer <-> Class schema definitions not found${opText}. ${serializerTargetToString(serializer, target)}`);
  error.name = 'SerializerSchemaNotFound';
  return error;
}
