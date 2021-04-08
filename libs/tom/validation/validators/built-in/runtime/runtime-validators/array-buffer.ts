import { TypeRuntimeValidator, Validator } from '../../../validator';

export const arrayBuffer = new TypeRuntimeValidator<Validator, ArrayBuffer>('arrayBuffer')
  .setHandler('type', (value, ctx, prop, validatorMeta) => {
    return !(value instanceof ArrayBuffer)
  });
