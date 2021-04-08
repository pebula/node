import { TypeRuntimeValidator, Validator } from '../../../validator';

export const boolean = new TypeRuntimeValidator<Validator, boolean>('boolean')
  .setHandler('type', (value) => {
    return typeof value !== 'boolean';
  });

export const number = new TypeRuntimeValidator<Validator, number>('number')
  .setHandler('type', (value) => {
    return typeof value !== 'number' || isNaN(value) || !isFinite(value);
  })
  .setHandler('min', (value, ctx, prop, validatorMeta) => {
    return value < validatorMeta.args;
  })
  .setHandler('max', (value, ctx, prop, validatorMeta) => {
    return value > validatorMeta.args;
  })
  .setHandler('equal', (value, ctx, prop, validatorMeta) => {
    return value !== validatorMeta.args;
  })
  .setHandler('notEqual', (value, ctx, prop, validatorMeta) => {
    return value === validatorMeta.args;
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
  .setHandler('type', (value, ctx, prop, validatorMeta) => {
    return typeof value !== 'bigint';
  })
  .removeHandler('integer');

export const string = new TypeRuntimeValidator<Validator, string>('string')
  .setHandler('type', (value) => {
    return typeof value !== 'string';
  })
  .setHandler('length', (value, ctx, prop, validatorMeta) => {
    return value.length !== validatorMeta.args;
  })
  .setHandler('minLength', (value, ctx, prop, validatorMeta) => {
    return value.length < validatorMeta.args;
  })
  .setHandler('maxLength', (value, ctx, prop, validatorMeta) => {
    return value.length > validatorMeta.args;
  })
  .setHandler('empty', (value) => {
    return value.length !== 0;
  })

export const date = new TypeRuntimeValidator<Validator, Date>('date')
  .setHandler('type', (value) => {
    return !(value instanceof Date) || isNaN(value.getTime());
  });
