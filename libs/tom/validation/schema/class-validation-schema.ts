import { Type } from '@pebula/decorate';
import { Schema } from '@pebula/tom';
import { ValidationResult } from '../validation-result';
import { Validator, ClassValidatorContext, getValidatorContext } from '../validators';
import { schemaValidatorCompiler } from '../validators/validator/compiler';

export type SchemaValidationFn<T = any> = (this: ClassValidationSchema<Validator, T>,
                                           ctx: ClassValidatorContext<T>,
                                           lockSync?: any[]) => ValidationResult<T>;

export type PropertyValidationFn<T = any> = (value: T[keyof T],
                                             ctx: ClassValidatorContext<T>,
                                             prop: Schema.TomPropertySchema<T>) => void;

export class ClassValidationSchema<S extends Validator, T, TData = any> {

  readonly target: Type<T>;
  private _validate: SchemaValidationFn<T>;

  constructor(public readonly validator: S,
              public readonly classSchema: Schema.TomClassSchema<T>,
              public readonly options: S extends Validator<infer U> ? U : never) {
    this.target = classSchema.type;
  }

  validate(ctx: ClassValidatorContext<T>,
           lockSync?: any[]): ValidationResult<T> {
    if (!this._validate) {
      this._validate = this.options.jitCompiler === 'disabled'
        ? getValidatorContext(this.validator).runtimeRootValidators.schema
        : schemaValidatorCompiler(this)
      ;
    }
    return this._validate(ctx, lockSync);
  }
}
