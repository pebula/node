import { Schema } from '@pebula/tom';
import { Constraint, createConstraintErrorMsg, ConstraintNames } from '../../constraints';
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

  /**
   * If set, indicates that we are currently processing a child of a container item.
   * If the container is an `array` or `set` it will be the index number.
   * If the container is an `objectMap` it will be the object key, string or symbol
   * If the container is an `map` it will be the map key, which is any value type.
   */
  currentIndexOrKey?: string | number | symbol | any;

  private validatorContext: ValidatorContext;
  private classParentProp: Schema.TomPropertySchema;

  protected constructor(public readonly target: T,
                        public readonly schema: ClassValidationSchema<Validator, T>,
                        public readonly options: ValidatorOptions<T, D>,
                        public readonly recursionStack: any[],
                        public readonly result: ValidationResult<T>,
                        public readonly parent: ClassValidatorContext<any, D> | null) {
    this.validatorContext = parent?.validatorContext ?? getValidatorContext(schema.validator);
  }

  static create<T, D = any>(target: T, schema: ClassValidationSchema<Validator, T>, options: ValidatorOptions<T, D>): ClassValidatorContext<T, D> {
    return new ClassValidatorContext<T>(target, schema, options, [], new ValidationResult(target), null);
  }

  addValidationError<T extends ConstraintNames = ConstraintNames>(value: any,
                                                                prop: Schema.TomPropertySchema,
                                                                validatorMeta: Constraint<T>) {
    const paths = this.getPath(prop);
    const msg = createConstraintErrorMsg(value, paths, prop, validatorMeta);
    const error = new ValidationError(paths, prop.typeDef.type, validatorMeta.id, msg);
    this.result.errors.push(error);
  }

  createChild<TC>(target: TC, schema?: ClassValidationSchema<Validator, TC>): ClassValidatorContext<TC, D> {
    return new ClassValidatorContext<TC, D>(
      target,
      schema || (this.schema as any),
      this.options,
      this.recursionStack,
      this.result as ValidationResult,
      this
    );
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
  validateSchema<Q = any>(value: Q, prop: Schema.TomPropertySchema<Q>): ValidationResult<Q> {
    const schema = this.schema.validator.create(prop.type);
    const childCtx = this.createChild(value, schema);
    childCtx.classParentProp = prop;
    return schema.validate(childCtx);
  }

  /**
   * Executes a runtime property validation
   */
  validateProperty(value: any, prop: Schema.TomPropertySchema) {
    this.validatorContext.runtimeRootValidators.property(value, this, prop);
  }

  private getPath(prop: Schema.TomPropertySchema, paths: Array<string | number | symbol | any> = []): Array<string | number | symbol | any> {
    if (this.classParentProp) {
      this.parent.getPath(this.classParentProp, paths);
    }
    paths.push(prop.name);
    if (this.currentIndexOrKey !== undefined) {
      paths.push(this.currentIndexOrKey);
    }
    return paths;
  }
}
