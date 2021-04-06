import { Type } from '@pebula/decorate';
import { Validator } from '../validators';
import { ClassValidationSchema } from '../schema';

class InternalValidatorRegistry<S extends Validator> {

  private schemas = new Map<Type<any>, ClassValidationSchema<any, any>>();

  register<T>(target: Type<T>, schema: ClassValidationSchema<S, T>): void {
    this.schemas.set(target, schema);
  }

  has(target: Type<any>): boolean {
    return this.schemas.has(target);
  }

  get<T>(target: Type<T>): ClassValidationSchema<S, T> | undefined {
    return this.schemas.get(target);
  }

  delete(target: Type<any>): boolean {
    return this.schemas.delete(target);
  }
}

export class ValidatorRegistry {
  static get(): ValidatorRegistry { return validatorRegistry || new ValidatorRegistry(); }

  private schemas = new Map<Validator, InternalValidatorRegistry<any>>();

  private constructor() { }

  register<S extends Validator, T>(schema: ClassValidationSchema<S, T>): void {
    (this.schemas.get(schema.validator) || this.schemas.set(schema.validator, new InternalValidatorRegistry<S>()).get(schema.validator))
      .register(schema.target, schema);
  }

  has(validator: Validator, target?: Type<any>): boolean {
    const internal = this.schemas.get(validator);
    return target
      ? internal?.has(target) ?? false
      : !!internal;
  }

  get<S extends Validator, T>(validator: S, target: Type<T>): ClassValidationSchema<S, T> | undefined {
    return this.schemas.get(validator)?.get(target);
  }


  delete(validator: Validator, target?: Type<any>): boolean {
    return target
      ? this.schemas.get(validator)?.delete(target) ?? false
      : this.schemas.delete(validator)
  }

}

export const validatorRegistry = ValidatorRegistry.get();
