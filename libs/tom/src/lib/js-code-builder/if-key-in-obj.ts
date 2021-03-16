import { StringBuilder } from './utils';
import { Block } from './block';
import { Base } from './base';
import { Statement } from './statement';

export class IfKeyInObjBlock<TParent extends Block<any>,
                             TExp extends Base<TParent> = Base<TParent>> extends Block<TParent> {

  public key: string;

  get objExpression(): TExp {
    return this.expression;
  }

  private expression: TExp;

  constructor(parent: TParent, key: string, expression?: Base<TParent>) {
    super(parent);
    this.key = key;
    if (expression) {
      this.setObjExpression(expression);
    }
  }

  setObjExpression<T extends string | Base<TParent>>(expression: T): T extends Base<TParent> ? IfKeyInObjBlock<TParent, T> : IfKeyInObjBlock<TParent, Statement<TParent>> {
    this.expression = expression instanceof Base
      ? expression
      : new Statement(this.parent, expression as string) as any
    ;
    return this as any;
  }

  commit(): void {
    this.expression.commit();
    super.commit();
  }

  flush(sb: StringBuilder): void {
    sb.append(`if ('${this.key}' in `)
    if (this.expression instanceof Statement) {
      this.expression.inlineMode(true);
    }
    this.expression.flush(sb);
    sb.appendLine(`) {`)

    super.flush(sb);

    sb.appendLine(`}`);
  }

  validate(): void {
    if (!this.key) {
      throw new Error('IfKeyInObjBlock missing key name');
    }
    if (!this.expression) {
      throw new Error('IfKeyInObjBlock missing object expression');
    }
    this.expression.validate();
    super.validate();
  }
}

declare module './block' {
  export interface Block<TParent extends Block<any>> {
    addIfKeyInObj<T extends string | Base<TParent>>(key?: string, obhExpression?: T): T extends Base<this> ? IfKeyInObjBlock<this, T> : IfKeyInObjBlock<this, Statement<this>>;
  }
}

Block.prototype.addIfKeyInObj = function<TParent extends Block<any>, T extends string | Base<TParent>>(this: TParent, key?: string, objExpression?: T) {
  const ifKeyInObj = new IfKeyInObjBlock<TParent, Base<TParent>>(this, key)
  if (objExpression) {
    ifKeyInObj.setObjExpression(objExpression);
  }
  this.statements.push(ifKeyInObj);
  return ifKeyInObj as any;
}
