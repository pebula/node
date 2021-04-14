import { Schema } from '@pebula/tom';

export function *getValidators(prop: Schema.TomPropertySchema) {
  let negate = false;
  for (const constraint of prop.validators) {
    if (constraint.id === 'not') {
      negate = !negate;
    } else {
      constraint.negate = negate;
      negate = false;
      yield constraint;
    }
  }
}
