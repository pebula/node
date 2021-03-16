import { Base } from './base';
import { Block } from './block';
import { Statement } from './statement';

export class TernaryExpression<TParent extends Block<any>> extends Statement<TParent> {

  protected condition: string;
  protected whenTrue: string;
  protected whenFalse: string;

  constructor(parent: TParent) {
    super(parent);
  }

  setCondition(code: string) {
    this.condition = code;
    return this;
  }

  true(code: string) {
    this.whenTrue = code;
    return this;
  }

  false(code: string) {
    this.whenFalse = code;
    return this;
  }

  commit(): void {
    this.statement = `${this.condition} ? ${this.whenTrue} : ${this.whenFalse}`;
  }

  validate(): void {
    if (!this.condition || !this.whenTrue || !this.whenFalse) {
      throw new Error('Condition, true assignment and false assignment are mandatory!');
    }
    super.validate();
  }
}

declare module './block' {
  export interface Block<TParent extends Block<any>> {
    /**
     * @param isStatic Weather to use `cost` (true) or `let` (false). Default: true
     */
    addTernary<T extends string | Base<TParent>>(condition?: string, whenTrue?: string, whenFalse?: string): T extends Base<this> ? TernaryExpression<this> :  TernaryExpression<this>;
  }
}

Block.prototype.addTernary = function<TParent extends Block<any>>(this: TParent, condition?: string, whenTrue?: string, whenFalse?: string) {
  const ternaryExpression = new TernaryExpression<TParent>(this);
  if (condition) {
    ternaryExpression.setCondition(condition);
  }
  if (whenTrue) {
    ternaryExpression.true(whenTrue);
  }
  if (whenFalse) {
    ternaryExpression.false(whenFalse);
  }
  this.statements.push(ternaryExpression);
  return ternaryExpression as any;
}
