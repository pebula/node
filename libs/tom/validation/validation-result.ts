import { TypeSystem } from '@pebula/tom';
import { ValidatorNames } from './known-validators';
export class ValidationResult<T = any> {
  get valid(): boolean { return this.errors.length === 0 }
  readonly errors: ValidationError[] = [];

  constructor(public readonly source: T) { }
}

export class ValidationError {
  constructor(
    public readonly path: string,
    public readonly type: TypeSystem.TypeDef,
    public readonly validator: ValidatorNames,
    public readonly message: string,
  ) {}
}
