import { Type } from '@pebula/decorate';
import { ValidatorInfo } from '../known-validators';
import { validatorTargetToString } from './utils';
import { Validator } from './validator';

export function invalidOrMissingValidator(validator: Validator,
                                          target: Type<any>,
                                          prop: string,
                                          validatorMeta: ValidatorInfo,
                                          registry: 'runtime' | 'jit') {
  const error = new Error(`Invalid or missing validation "${validatorMeta.id}" in ${registry} validation. ${validatorTargetToString(validator, target, prop)}`);
  error.name = 'InvalidOrMissingValidator';
  return error;
}
