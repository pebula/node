import { Type } from '@pebula/decorate';
import { TypeRuntimeValidator, Validator } from '../../../validator';

export const classRuntimeValidator = new TypeRuntimeValidator<Validator, Type<any>>('class')
  .setHandler('type', (value, ctx, prop, validatorMeta) => {
    return !(value instanceof prop.type)
  })
  .setPostValidationHandler((value, ctx, prop) => {
    ctx.validateSchema(value, prop.type);
  });
