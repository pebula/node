import { Block } from '../block';
import { InlineExpression } from '../inline-expressions';

export class IsArrayExpression<TParent extends Block<any>> extends InlineExpression<TParent> {
  private _arrayAccessor: string;
  private _negate = false;

  constructor(parent: TParent, arrayAccessor?: string) {
    super(parent);
    if (arrayAccessor) {
      this.arrayAccessor(arrayAccessor);
    }
  }

  arrayAccessor(arrayAccessor: string) {
    this._arrayAccessor = arrayAccessor;
    return this;
  }

  commit(): void {
    this.statement = `${this._negate ? '!' : ''}Array.isArray(${this._arrayAccessor})`;
  }

  validate(): void {
    if (!this._arrayAccessor) {
      throw new Error('IsArrayExpression must have an array accessor set!');
    }
    super.validate();
  }
}
