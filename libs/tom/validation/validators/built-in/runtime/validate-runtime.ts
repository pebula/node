import { ClassValidationSchema } from '../../../schema/class-validation-schema';
import { ClassValidatorContext, getValidatorContext, Validator, ValidatorFactoryOptions } from '../../validator';
import { ValidationResult } from '../../../validation-result';
import { invalidOrMissingValidator } from '../../errors';
import { addValidationError } from '../add-error';

export function validateRuntime<T = any>(this: ClassValidationSchema<Validator, T>,
                                         target: T,
                                         options: ValidatorFactoryOptions,
                                         ctx?: ClassValidatorContext<T>,
                                         lockSync?: any[]): ValidationResult<T> {
  ctx = ctx?.createChild(target) ?? new ClassValidatorContext(target, this, options);
  const { validator } = ctx.schema;
  const validatorContext = getValidatorContext(validator);

  for (const prop of ctx.schema.classSchema.getProperties()) {
    if (!prop.skipValidation) {
      // TODO: check circular ref
      for (const v of prop.validators) {
        const runtimeValidator = validatorContext.findRuntimeValidator(prop.typeDef.type)?.findHandler(v.id);
        if (runtimeValidator) {
          if (runtimeValidator(target[prop.name], ctx, prop, v) === false) {
            addValidationError(ctx, prop, v);
          }
        } else {
          throw invalidOrMissingValidator(validator, ctx.schema.target, prop.name as string, v, 'runtime');
        }
      }
    }
  }
  return ctx.result;
}
