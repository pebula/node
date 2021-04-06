import { TypeRuntimeValidator, Validator } from '../../../validator';

export const number = new TypeRuntimeValidator<Validator, number>('number')
  .setHandler('type', (value, ctx, prop, validatorMeta) => {
    return typeof value === 'number';
  })
  .setHandler('min', (value, ctx, prop, validatorMeta) => {
    return value >= validatorMeta.args;
  })
  .setHandler('max', (value, ctx, prop, validatorMeta) => {
    return value <= validatorMeta.args;
  });
