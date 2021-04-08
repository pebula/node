import { Schema } from '@pebula/tom';
import { TypeRuntimeValidator, Validator } from '../../../validator';

export const enumRuntimeValidator = new TypeRuntimeValidator<Validator, string | number>('enum')
  .setHandler('type', (value, ctx, prop, validatorMeta) => {
    return (prop.type as Schema.EnumClassType).values.indexOf(value) === -1;
  });
