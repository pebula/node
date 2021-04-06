import { TypeSystem } from '@pebula/tom';
import { ValidatorNames } from '../../known-validators';
import { ClassValidationSchema } from '../../schema';
import { ValidationError, ValidationResult } from '../../validation-result';
import { ValidatorOptions } from './types';
import { Validator } from './validator';

export interface PropertyValidatorContext<T, D = any> {
  readonly target: T;
  readonly options: ValidatorOptions<T, D>;
  getTargetValue<TKey extends keyof T>(key: TKey): T[TKey];
}

export class ClassValidatorContext<T, D = any> implements PropertyValidatorContext<T ,D> {

  readonly schema: ClassValidationSchema<Validator, T>;
  readonly options: ValidatorOptions<T, D>;
  readonly parent?: ClassValidatorContext<any, D>
  readonly recursionStack?: any[];

  readonly result: ValidationResult<T>;

  constructor(target: T, parent: ClassValidatorContext<any, D>);
  constructor(target: T, schema: ClassValidationSchema<Validator, T>, options: ValidatorOptions<T, D>);
  constructor(public readonly target: T,
              parentOrSchema: ClassValidationSchema<Validator, T> | ClassValidatorContext<T, D>,
              options?: ValidatorOptions<T, D>) {
    if (parentOrSchema instanceof ClassValidatorContext) {
      this.parent = parentOrSchema;
      this.schema = parentOrSchema.schema;
      this.options = parentOrSchema.options;
      this.recursionStack = parentOrSchema.recursionStack;
      this.result = parentOrSchema.result;
    } else {
      this.schema = parentOrSchema;
      this.options = options;
      this.recursionStack = [];
      this.result = new ValidationResult(target);
    }
  }

  addError(path: string | keyof T, type: TypeSystem.TypeDef, validator: ValidatorNames, message: string): void {
    this.result.errors.push(new ValidationError(path as string, type, validator, message));
  }

  createChild<TC>(target: TC): ClassValidatorContext<TC, D> {
    return new ClassValidatorContext<TC, D>(target, this);
  }

  getTargetValue<TKey extends keyof T>(key: TKey): T[TKey] {
    return this.target[key];
  }
}
