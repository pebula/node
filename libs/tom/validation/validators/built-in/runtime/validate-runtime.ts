import { Schema } from '@pebula/tom';
import { ClassValidationSchema } from '../../../schema/class-validation-schema';
import { ClassValidatorContext, addValidationError, TypeRuntimeValidator, Validator, ValidatorFactoryOptions } from '../../validator';
import { ValidationResult } from '../../../validation-result';
import { missingValidator } from '../../errors';
import { ValidatorInfo } from '../../../known-validators';
import { REQUIRED_VALIDATOR_INFO, TYPE_VALIDATOR_INFO } from '../../utils';

const SHORT_CIRCUIT_ERROR = new Error();

export function runtimeSchemaValidator<T = any>(this: ClassValidationSchema<Validator, T>,
                                                target: T,
                                                options: ValidatorFactoryOptions,
                                                ctx?: ClassValidatorContext<T>): ValidationResult<T> {

  ctx = ctx?.createChild(target, this) ?? new ClassValidatorContext(target, this, options);

  if (ctx.parent) {
    for (const prop of this.classSchema.getProperties()) {
      runtimePropertyValidator(ctx.getTargetValue(prop.name), ctx, prop);
    }
  } else {
    try {
      for (const prop of this.classSchema.getProperties()) {
        runtimePropertyValidator(ctx.getTargetValue(prop.name), ctx, prop);
      }
    } catch (err) {
      if (err !== SHORT_CIRCUIT_ERROR) {
        throw err;
      }
    }
  }

  return ctx.result;
}

/**
 * Execute a property validation.
 * A property validation consist of internal validation (e.g. "required", "type") and additional validations the user opt-in to.
 */
export function runtimePropertyValidator<T = any>(value: T[keyof T],
                                                  ctx: ClassValidatorContext<T>,
                                                  prop: Schema.TomPropertySchema<T>) {

  if (prop.skipValidation) {
    return;
  }

  const { shortCircuit } = ctx.schema.options;

  // Doing the "required" checking (optional, nullable, default)
  if (value === undefined || value === null) {
    const skip = value === undefined
      ? prop.hasDefaultValue ? false : prop.optional === true
      : prop.hasDefaultValue ? prop.nullable === true : prop.optional === true || prop.nullable === true
    ;

    if (!skip) {
      if (prop.hasDefaultValue) {
        ctx.target[prop.name] = prop.defaultValue();
      } else {
        addValidationError<'required'>(ctx, prop, REQUIRED_VALIDATOR_INFO);
        if (shortCircuit) {
          throw SHORT_CIRCUIT_ERROR;
        }
      }
    }
  } else {
    // cyclic reference protection
    if (prop.typeDef.type === 'class' || (prop.isUnion && prop.possibleCustomTypes().some( t => value instanceof t)) ) {
      if (ctx.recursionStack.indexOf(value) !== -1) {
        return;
      }
      ctx.recursionStack.push(value);
    }

    const typeRuntimeValidator = ctx.findRuntimeValidator(prop, true); // will throw if not found

    // if type checking fails, don't continue!
    if (executeRuntimeValidator(value, ctx, prop, TYPE_VALIDATOR_INFO, typeRuntimeValidator) === true) {
      addValidationError(ctx, prop, TYPE_VALIDATOR_INFO);
      if (shortCircuit) {
        throw SHORT_CIRCUIT_ERROR;
      }
    } else {
      for (const validatorMeta of prop.validators) {
        if (executeRuntimeValidator(value, ctx, prop, validatorMeta, typeRuntimeValidator) === true) {
          addValidationError(ctx, prop, validatorMeta);
          if (shortCircuit) {
            throw SHORT_CIRCUIT_ERROR;
          }
        }
      }
      typeRuntimeValidator.postValidationHandler?.(value, ctx, prop);
    }

  }
}

/**
 * Execute a single validator on value of a property.
 * See `RuntimeValidatorHandler` for more information about the return value.
 * @returns boolean | void
 * @throws `InvalidOrMissingValidator` when there is no matching runtime validator defined for this property.
 */
export function executeRuntimeValidator<T = any>(value: T[keyof T],
                                                 ctx: ClassValidatorContext<T>,
                                                 prop: Schema.TomPropertySchema<T>,
                                                 validatorInfo: ValidatorInfo,
                                                 typeRuntimeValidator: TypeRuntimeValidator) {

  const runtimeValidator = typeRuntimeValidator.findHandler(validatorInfo.id);
  if (runtimeValidator) {
    return runtimeValidator(value, ctx, prop, validatorInfo);
  } else {
    throw missingValidator(ctx.schema.validator, ctx.schema.target, prop.name as string, prop.typeDef, validatorInfo, 'runtime');
  }
}
