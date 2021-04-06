import { Type } from '@pebula/decorate';
import { validatorTargetToString } from '../utils';
import { Validator } from './validator';

export function typeSchemaNotFoundError(validator: Validator, target: Type<any>) {
  const error = new Error(`Class Schema not found. ${validatorTargetToString(validator, target)}`);
  error.name = 'TypeSchemaNotFoundError';
  return error;
}
