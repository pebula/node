import { Type, stringify } from '@pebula/decorate';
import { Validator } from './validator';
import { ValidatorInfo } from '../known-validators';

/**
 * Returns a string that logs the name identifiers for a Validator and a class to be used in error messages.
 * @param validator
 * @param target
 */
export const validatorTargetToString = <T extends Type<any>>(validator: Validator,
                                                             target: T,
                                                             prop?: string | keyof T) => `[Validator: ${validator.name} | Class: ${stringify(target)}${prop ? '.' + prop : ''}]`;

export const REQUIRED_VALIDATOR_INFO: ValidatorInfo<'required'> = { id: 'required' };
export const TYPE_VALIDATOR_INFO: ValidatorInfo<'type'> = { id: 'type' };
