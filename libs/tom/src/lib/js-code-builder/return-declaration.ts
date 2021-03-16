import { StringBuilder } from './utils';
import { Base } from './base';
import { Block } from './block';
import { Statement } from './statement';

export class ReturnDeclaration<TParent extends Block<any>, TExp extends Base<TParent> = Base<TParent>> extends Statement<TParent> {

  get returnExpression(): TExp {
    return this.expression;
  }

  private expression: TExp;

  constructor(parent: TParent, returnExpression?: Base<TParent>) {
    super(parent);
    if (returnExpression) {
      this.setReturnExpression(returnExpression);
    }
  }

  setReturnExpression<T extends string | Base<TParent>>(returnExpression: T): T extends Base<TParent> ? ReturnDeclaration<TParent, T> : ReturnDeclaration<TParent, Statement<TParent>> {
    this.expression = returnExpression instanceof Base
      ? returnExpression
      : new Statement(this.parent, returnExpression as string) as any
    ;
    return this as any;
  }

  commit(): void {
    this.statement = 'return ';
    this.expression.commit();
  }

  validate(): void {
    if (!this.expression) {
      throw new Error('ReturnDeclaration is missing the return expression');
    }
    this.expression.validate();
  }

  flush(sb: StringBuilder): void {
    sb.append(this.statement);
    sb.freezeIndent();
    this.expression.flush(sb);
    sb.unFreezeIndent();
  }
}

declare module './block' {
  export interface Block<TParent extends Block<any>> {
    addReturnDeclaration<T extends string | Base<TParent>>(returnExpression?: T): T extends Base<this> ? ReturnDeclaration<this, T> : ReturnDeclaration<this, Statement<this>>;
  }
}

Block.prototype.addReturnDeclaration = function<TParent extends Block<any>, T extends string | Base<TParent>>(this: TParent, returnExpression?: T) {
  const returnDeclaration = new ReturnDeclaration<TParent, Base<TParent>>(this)
  if (returnExpression) {
    returnDeclaration.setReturnExpression(returnExpression);
  }
  this.statements.push(returnDeclaration);
  return returnDeclaration as any;
}


