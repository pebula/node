import { Schema } from '@pebula/tom';
import { TypeRuntimeValidator, Validator } from '../../../validator';
import { executeRuntimeValidator, runtimePropertyValidator } from '../validate-runtime';

export const union = new TypeRuntimeValidator<Validator, any>('union')
  .setHandler('type', (value, ctx, prop, Constraint) => {
    const { sorted, classLikeProperties } = Schema.determineUnionListResolveOrder(prop);
    for (const subProp of sorted) {
      // We execute the type validation for every sub type until we find one that matches
      // We don't report or throw if it fails, only if nothing matched, we will return an error
      if (executeRuntimeValidator(value, ctx, subProp, Constraint, ctx.findRuntimeValidator(subProp, true)) !== true) {
        // When a match is found, we run internal validation on the matched sub type.
        runtimePropertyValidator(value, ctx, subProp);
        return;
      }
    }

    // nothing matched, reporting error...
    return true;
  });
