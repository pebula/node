import { Schema } from '@pebula/tom';
import { ValidatorInfo, validatorInfoRegistry } from '../../known-validators';
import { ClassValidatorContext } from '../validator';

export function addValidationError(ctx: ClassValidatorContext<any>, prop: Schema.TomPropertySchema, validatorMeta: ValidatorInfo) {
  const msg = validatorInfoRegistry.createErrorMsg(ctx.getTargetValue(prop.name), ctx, prop, validatorMeta);
  ctx.addError(prop.name, prop.typeDef.type, validatorMeta.id, msg);
}

