import { Type, stringify } from '@pebula/decorate';

export function schemaNotFoundError(source: Type<any>, target: Type<any>) {
  const error = new Error(`Schema not found for source "${stringify(source)}" and target "${stringify(target)}".`);
  error.name = 'SchemaNotFound';
  return error;
}

export function typeUnrecognizedForMapperError(type: Type<any>) {
  const error = new Error(`Can not create a mapper because the type "${stringify(type)}" is not recognized.`);
  error.name = 'TypeUnrecognizedForMapper';
  return error;
}
