import { Type } from '@pebula/decorate';
import { Schema, TypeSystem } from '@pebula/tom';
import { ValidatorInfo, validatorInfoRegistry, ValidatorNames } from '../../known-validators';
import { ClassValidationSchema } from '../../schema';
import { ValidationError, ValidationResult } from '../../validation-result';
import { missingTypeValidator } from '../errors';
import { ValidatorOptions } from './types';
import { Validator } from './validator';
import { TypeRuntimeValidator } from './validator-components';
import { ValidatorContext, getValidatorContext } from './validator-context';

export interface PropertyValidatorContext<T, D = any> {
  readonly target: T;
  readonly options: ValidatorOptions<T, D>;
  getTargetValue<TKey extends keyof T>(key: TKey): T[TKey];
}

export class ClassValidatorContext<T, D = any> implements PropertyValidatorContext<T ,D> {

  readonly options: ValidatorOptions<T, D>;
  readonly parent?: ClassValidatorContext<any, D>
  readonly recursionStack?: any[];

  readonly result: ValidationResult<T>;

  private validatorContext: ValidatorContext;

  constructor(target: T, schema: ClassValidationSchema<Validator, T>, parent: ClassValidatorContext<any, D>);
  constructor(target: T, schema: ClassValidationSchema<Validator, T>, options: ValidatorOptions<T, D>);
  constructor(public readonly target: T,
              public readonly schema: ClassValidationSchema<Validator, T>,
              parentOrOptions: ClassValidatorContext<any, D> | ValidatorOptions<T, D>) {
    this.schema = schema;
    if (parentOrOptions instanceof ClassValidatorContext) {
      this.parent = parentOrOptions;
      this.options = parentOrOptions.options;
      this.recursionStack = parentOrOptions.recursionStack;
      this.result = parentOrOptions.result;
      this.validatorContext = parentOrOptions.validatorContext;
    } else {
      this.options = parentOrOptions;
      this.recursionStack = [];
      this.result = new ValidationResult(target);
      this.validatorContext = getValidatorContext(schema.validator);
    }
  }

  addError(path: string | keyof T, type: TypeSystem.TypeDef, validator: ValidatorNames, message: string): void {
    this.result.errors.push(new ValidationError(path as string, type, validator, message));
  }

  createChild<TC>(target: TC, schema?: ClassValidationSchema<Validator, TC>): ClassValidatorContext<TC, D> {
    return new ClassValidatorContext<TC, D>(target, schema || (this.schema as any), this);
  }

  getTargetValue<TKey extends keyof T>(key: TKey): T[TKey] {
    return this.target[key];
  }

  findRuntimeValidator(prop: Schema.TomPropertySchema, throwIfNotFound?: boolean): TypeRuntimeValidator {
    const typeRuntimeValidator = this.validatorContext.findRuntimeValidator(prop.typeDef.type);
    if (throwIfNotFound && !typeRuntimeValidator) {
      const { validator, target } = this.schema;
      const { name, typeDef } = prop;
      throw missingTypeValidator(validator, target, name as string, typeDef, 'runtime');
    }
    return typeRuntimeValidator;
  }

  /**
   * Executes a runtime schema validation
   */
  validateSchema<Q = any>(value: Q, type?: Type<Q>): ValidationResult<Q> {
    const schema = this.schema.validator.create(type || value.constructor as Type<Q>);
    return schema.validate(value, this.options, this.createChild(value, schema));
  }

  /**
   * Executes a runtime property validation
   */
  validateProperty(value: any, prop: Schema.TomPropertySchema) {
    this.validatorContext.runtimeRootValidators.property(value, this, prop);

  }
}

export function addValidationError<T extends ValidatorNames = ValidatorNames>(ctx: ClassValidatorContext<any>, prop: Schema.TomPropertySchema, validatorMeta: ValidatorInfo<T>) {
  const msg = validatorInfoRegistry.createErrorMsg(ctx.getTargetValue(prop.name), ctx, prop, validatorMeta);
  ctx.addError(prop.name, prop.typeDef.type, validatorMeta.id, msg);
}
