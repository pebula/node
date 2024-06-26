import { Type, stringify } from '@pebula/decorate';
import { Validator } from './validator';
import { Constraint } from '../constraints';

/**
 * Returns a string that logs the name identifiers for a Validator and a class to be used in error messages.
 * @param validator
 * @param target
 */
export const validatorTargetToString = <T extends Type<any>>(validator: Validator,
                                                             target: T,
                                                             prop?: string | keyof T) => `[Validator: ${validator.name} | Class: ${stringify(target)}${prop ? '.' + prop.toString() : ''}]`;

export const REQUIRED_VALIDATOR_INFO: Constraint<'required'> = { id: 'required' };
export const TYPE_VALIDATOR_INFO: Constraint<'type'> = { id: 'type' };
