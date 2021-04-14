import { LazyInit, Type } from '@pebula/decorate';
import { Schema } from '@pebula/tom';
import { ValidationResult } from '../validation-result';
import { Validator, ClassValidatorContext, getValidatorContext } from '../validators';
import { schemaValidatorCompiler } from '../validators/validator/compiler';

export type SchemaValidationFn<T = any> = (this: ClassValidationSchema<Validator, T>,
                                           target: T,
                                           ctx: ClassValidatorContext<T>,
                                           lockSync?: any[]) => true | ValidationResult<T>;

export type PropertyValidationFn<T = any> = (value: T[keyof T],
                                             ctx: ClassValidatorContext<T>,
                                             prop: Schema.TomPropertySchema<T>) => void;

export class ClassValidationSchema<S extends Validator, T, TData = any> {

  readonly target: Type<T>;

  @LazyInit(function(this: ClassValidationSchema<S, T>) {
    return this.options.jitCompiler === 'disabled'
      ? getValidatorContext(this.validator).runtimeRootValidators.schema
      : schemaValidatorCompiler(this)
    ;
  })
  validate: SchemaValidationFn<T>;

  constructor(public readonly validator: S,
              public readonly classSchema: Schema.TomClassSchema<T>,
              public readonly options: S extends Validator<infer U> ? U : never) {
    this.target = classSchema.type;
  }
}
