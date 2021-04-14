import { Schema } from '@pebula/tom';
import { ClassValidationSchema, getValidators } from '../../../schema';
import { ClassValidatorContext, TypeRuntimeValidator, Validator } from '../../validator';
import { ValidationResult } from '../../../validation-result';
import { missingValidator } from '../../errors';
import { Constraint, getConstraintDef } from '../../../constraints';
import { REQUIRED_VALIDATOR_INFO, TYPE_VALIDATOR_INFO } from '../../utils';

const SHORT_CIRCUIT_ERROR = new Error();

export function runtimeSchemaValidator<T = any>(this: ClassValidationSchema<Validator, T>,
                                                target: T,
                                                ctx: ClassValidatorContext<T>): ValidationResult<T> | true {

  if (ctx.parent) {
    for (const prop of this.classSchema.getProperties()) {
      runtimePropertyValidator(target[prop.name], ctx, prop);
    }
  } else {
    try {
      for (const prop of this.classSchema.getProperties()) {
        runtimePropertyValidator(target[prop.name], ctx, prop);
      }
    } catch (err) {
      if (err !== SHORT_CIRCUIT_ERROR) {
        throw err;
      }
    }
  }

  return !ctx.hasError || ctx.result;
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
        ctx.addValidationError<'required'>(value, prop, REQUIRED_VALIDATOR_INFO);
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
      ctx.addValidationError(value, prop, TYPE_VALIDATOR_INFO);
      if (shortCircuit) {
        throw SHORT_CIRCUIT_ERROR;
      }
    } else {
      for (const constraint of getValidators(prop)) {
        if (executeRuntimeValidator(value, ctx, prop, constraint, typeRuntimeValidator) === true) {
          ctx.addValidationError(value, prop, constraint);
          if (shortCircuit) {
            throw SHORT_CIRCUIT_ERROR;
          }
        }
      }
      if (typeRuntimeValidator.postValidationHandler?.(value, ctx, prop) == true) {
        if (shortCircuit) {
          throw SHORT_CIRCUIT_ERROR;
        }
      }
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
                                                 constraint: Constraint,
                                                 typeRuntimeValidator: TypeRuntimeValidator) {

  const runtimeValidator = typeRuntimeValidator.findHandler(constraint.id);
  if (runtimeValidator) {
    // return !!runtimeValidator(value, ctx, prop, constraint) !== constraint.negate;
    const result = runtimeValidator(value, ctx, prop, constraint);
    return getConstraintDef(constraint.id).handlesNegate
      ? result
      : (!!result) !== !!constraint.negate
    ;
  } else {
    throw missingValidator(ctx.schema.validator, ctx.schema.target, prop.name as string, prop.typeDef, constraint, 'runtime');
  }
}
