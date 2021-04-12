import { TypeSystem } from '@pebula/tom';
import { ConstraintNames } from './constraints';
export class ValidationResult<T = any> {
  get valid(): boolean { return this.errors.length === 0 }
  readonly errors: ValidationError[] = [];

  constructor(public readonly source: T) { }
}

export class ValidationError {
  constructor(
    public readonly path: Array<string | number | symbol | any>,
    public readonly type: TypeSystem.TypeDef,
    public readonly validator: ConstraintNames,
    public readonly message: string,
  ) {}
}
