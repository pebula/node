import { TypeRuntimeValidator, Validator } from '../../../validator';
import { ALPHA_REGEX, ALPHA_NUMERIC_REGEX } from '../../utils';

export const boolean = new TypeRuntimeValidator<Validator, boolean>('boolean')
  .setHandler('type', (value) => {
    return typeof value !== 'boolean';
  });

export const number = new TypeRuntimeValidator<Validator, number>('number')
  .setHandler('type', (value) => {
    return typeof value !== 'number' || isNaN(value) || !isFinite(value);
  })
  .setHandler('min', (value, ctx, prop, constraintData) => {
    return value < constraintData.args[0];
  })
  .setHandler('max', (value, ctx, prop, constraintData) => {
    return value > constraintData.args[0];
  })
  .setHandler('equal', (value, ctx, prop, constraintData) => {
    return value !== constraintData.args[0];
  })
  .setHandler('integer', (value) => {
    return value % 1 !== 0;
  })
  .setHandler('positive', (value) => {
    return value <= 0;
  })
  .setHandler('negative', (value) => {
    return value >= 0;
  });

export const bigint = number.clone<bigint>('bigInt')
  .setHandler('type', (value) => {
    return typeof value !== 'bigint';
  })
  .removeHandler('integer');

export const string = new TypeRuntimeValidator<Validator, string>('string')
  .setHandler('type', (value) => {
    return typeof value !== 'string';
  })
  // length based
  .setHandler('length', (value, ctx, prop, constraintData) => {
    return value.length !== constraintData.args[0];
  })
  .setHandler('minLength', (value, ctx, prop, constraintData) => {
    return value.length < constraintData.args[0];
  })
  .setHandler('maxLength', (value, ctx, prop, constraintData) => {
    return value.length > constraintData.args[0];
  })
  .setHandler('empty', (value) => {
    return value.length !== 0;
  })
  // string
  .setHandler('pattern', (value, ctx, prop, constraintData) => {
    return !constraintData.args[0].test(value);
  })
  .setHandler('contains', (value, ctx, prop, constraintData) => {
    return value.indexOf(constraintData.args[0]) === -1;
  })
  .setHandler('alpha', (value) => {
    return !ALPHA_REGEX.test(value);
  })
  .setHandler('alphaNumeric', (value) => {
    return !ALPHA_NUMERIC_REGEX.test(value);
  })

export const date = new TypeRuntimeValidator<Validator, Date>('date')
  .setHandler('type', (value) => {
    return !(value instanceof Date) || isNaN(value.getTime());
  });
