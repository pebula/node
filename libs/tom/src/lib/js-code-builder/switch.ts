import { StringBuilder } from './utils';
import { Block } from './block';
import { Base } from './base';
import { Statement } from './statement';
import { InlineExpression } from './inline-expressions';

export class SwitchCaseBlock <TParent extends SwitchBlock<any>> extends Block<TParent> {
  private expressions: Array<InlineExpression<this>> = [];

  constructor(parent: TParent, ...expressions: Array<string | InlineExpression<any>>) {
    super(parent);
    for (const exp of expressions) {
      this.addCaseExpression(exp);
    }
  }

  addCaseExpression(expression: string | InlineExpression<any>): this {
    const inlineExp = expression instanceof InlineExpression ? expression : new InlineExpression(this, expression);
    this.expressions.push(inlineExp);
    return this as any;
  }

  commit(): void {
    for (const exp of this.expressions) {
      exp.commit();
    }
    super.commit();
  }

  flush(sb: StringBuilder): void {
    sb.indentInc();

    for (const exp of this.expressions) {
      sb.append(`case `);
      exp.flush(sb, true);
      sb.appendLine(`:`);
    }

    sb.indentInc();
    super.flush(sb);
    sb.indentDec();

    sb.appendLine(`break;`);

    sb.indentDec();
  }

  validate(): void {
    if (this.expressions.length === 0) {
      throw new Error('SwitchCaseBlock missing object expression');
    }
    for (const exp of this.expressions) {
      exp.validate();
    }
    super.validate();
  }
}

export class SwitchBlock<TParent extends Block<any>,
                         TExp extends InlineExpression<SwitchBlock<TParent, InlineExpression<any>>> = InlineExpression<SwitchBlock<TParent, any>>> extends Block<TParent> {

  get switchExpression(): TExp {
    return this.expression;
  }

  private expression: TExp;

  private cases: SwitchCaseBlock<this>[] = [];

  constructor(parent: TParent, expression?: TExp) {
    super(parent);
    if (expression) {
      this.setSwitchExpression(expression);
    }
  }

  setSwitchExpression<T extends string | InlineExpression<any>>(expression: T): T extends InlineExpression<any> ? SwitchBlock<TParent, T> : SwitchBlock<TParent, InlineExpression<this>> {
    this.expression = expression instanceof InlineExpression
      ? expression
      : new InlineExpression(this.parent, expression as string) as any
    ;
    return this as any;
  }

  addCase(...expressions: Array<string | InlineExpression<any>>): SwitchCaseBlock<this> {
    const c = new SwitchCaseBlock(this, ...expressions);
    this.cases.push(c);
    return c;
  }

  commit(): void {
    this.expression.commit();
    for (const c of this.cases) {
      c.commit();
    }
    super.commit();
  }

  flush(sb: StringBuilder): void {
    sb.append(`switch (`);
    this.expression.inlineMode(true);

    sb.freezeIndent();
    this.expression.flush(sb);
    sb.unFreezeIndent();
    sb.appendLine(`) {`);

    for (const c of this.cases) {
      c.flush(sb);
    }

    sb.appendLine(`}`);
  }

  validate(): void {
    if (!this.expression) {
      throw new Error('SwitchBlock missing object expression');
    }
    this.expression.validate();
    for (const c of this.cases) {
      c.validate();
    }
    super.validate();
  }
}

declare module './block' {
  export interface Block<TParent extends Block<any>> {
    addSwitchBlock<T extends string | InlineExpression<SwitchBlock<TParent, any>>>(expression?: T): T extends InlineExpression<any> ? SwitchBlock<TParent, T> : SwitchBlock<TParent, InlineExpression<SwitchBlock<TParent, InlineExpression<any>>>>;
  }
}

Block.prototype.addSwitchBlock = function<TParent extends Block<any>, T extends string | InlineExpression<SwitchBlock<TParent, any>>>(this: TParent, expression?: T) {
  const switchBlock = new SwitchBlock<TParent, InlineExpression<SwitchBlock<TParent, any>>>(this);
  if (expression) {
    switchBlock.setSwitchExpression(expression);
  }
  this.statements.push(switchBlock);
  return switchBlock as any;
}
