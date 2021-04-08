import { stringify, Type } from '@pebula/decorate';
import { TypeSystem } from '@pebula/tom';
import { ValidatorInfo } from '../known-validators';
import { validatorTargetToString } from './utils';
import { Validator } from './validator';

/**
 * Return an Error describing that a validator does not exist for a type and the target & property the validator was requested for.
 */
export function missingValidator(validator: Validator,
                                 target: Type<any>,
                                 prop: string,
                                 typeDef: TypeSystem.TomTypeInstance,
                                 validatorMeta: ValidatorInfo,
                                 registry: 'runtime' | 'jit') {
  const error = new Error(`The "${TypeSystem.tomTypeInstanceToString(typeDef)}" ${registry} type validator does not contain the validator "${validatorMeta.id}" required by ${stringify(target)}.${prop} in validator ${validator.name}`);
  error.name = 'MissingValidator';
  return error;
}

/**
 * Return an Error describing that a type validator does not exist and the target & property the type validator was requested for.
 */
export function missingTypeValidator(validator: Validator,
                                     target: Type<any>,
                                     prop: string,
                                     typeDef: TypeSystem.TomTypeInstance,
                                     registry: 'runtime' | 'jit') {
  const error = new Error(`Missing ${registry} type validator "${TypeSystem.tomTypeInstanceToString(typeDef)}" required by ${stringify(target)}.${prop} in validator ${validator.name}`);
  error.name = 'MissingTypeValidator';
  return error;
}
