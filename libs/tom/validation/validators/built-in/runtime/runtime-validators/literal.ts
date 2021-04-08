import { TypeSystem } from '@pebula/tom';
import { TypeRuntimeValidator, Validator } from '../../../validator';

export const literal = new TypeRuntimeValidator<Validator, string | number>('literal')
  .setHandler('type', (value, ctx, prop, validatorMeta) => {
    return value !== (prop.typeDef as TypeSystem.TomTypeInstance<'literal'>).typeParams;
  });
