import { Type } from '@pebula/decorate';
import { Schema } from '@pebula/tom';
import { ValidationResult } from '../validation-result';
import { Validator, ValidatorFactoryOptions, ValidatorOptions, ClassValidatorContext, getValidatorContext } from '../validators';
import { compileClassValidator } from '../validators/validator/compiler/validator-compiler';

export type ValidatorValidateFn<T = any> = (this: ClassValidationSchema<Validator, T>,
                                            target: T,
                                            options: ValidatorFactoryOptions,
                                            ctx?: ClassValidatorContext<T>,
                                            lockSync?: any[]) => ValidationResult<T>;

export class ClassValidationSchema<S extends Validator, T, TData = any> {

  readonly target: Type<T>;
  private _validate: ValidatorValidateFn<T>;

  constructor(public readonly validator: S,
              public readonly classSchema: Schema.TomClassSchema<T>,
              public readonly options: S extends Validator<infer U> ? U : never) {
    this.target = classSchema.type;
  }

  validate(target: T,
           options: ValidatorOptions<T, TData>,
           ctx?: ClassValidatorContext<T>,
           lockSync?: any[]): ValidationResult<T> {
    if (!this._validate) {
      this._validate = this.options.jitCompiler === 'disabled'
        ? getValidatorContext(this.validator).validateRuntime
        : compileClassValidator(this)
      ;
    }
    return this._validate(target, options, ctx, lockSync);
  }
}
