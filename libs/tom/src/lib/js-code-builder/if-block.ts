import { StringBuilder } from './utils';
import { Block } from './block';
import { InlineExpression } from './inline-expressions';

export class ConditionalBlock<TParent extends Block<any>,
                              TExp extends InlineExpression<TParent> = InlineExpression<TParent>> extends Block<TParent> {

  get getCondition(): TExp {
    return this.condition;
  }

  protected condition: TExp;

  setCondition<T extends string | InlineExpression<TParent>>(condition: T): T extends InlineExpression<TParent>
                                                                              ? ConditionalBlock<TParent, T>
                                                                              : ConditionalBlock<TParent, InlineExpression<TParent>> {

   const myParent = this instanceof IfBlock ? this : this.parent;
   this.condition = condition instanceof InlineExpression
      ? InlineExpression.updateParent(condition as any, myParent)
      : new InlineExpression(myParent, condition as string) as any
    ;
    return this as any;
  }

  commit() {
    this.condition.commit();
    super.commit();
  }

  validate(): void {
    if (!this.condition) {
      throw new Error('IfBlock missing condition declaration');
    }
    this.condition.validate();
    super.validate();
  }
}

export class IfBlock<TParent extends Block<any>,
                     TExp extends InlineExpression<TParent> = InlineExpression<TParent>> extends ConditionalBlock<TParent, TExp> {

  get hasElse() { return !!this._else; }

  private _elseIf: ConditionalBlock<this>[] = [];
  private _else: Block<this>;

  setCondition<T extends string | InlineExpression<TParent>>(condition: T): T extends InlineExpression<TParent>
                                                                              ? IfBlock<TParent, T>
                                                                              : IfBlock<TParent, InlineExpression<TParent>> {
    return super.setCondition(condition) as any;
  }

  elseIf() {
    const elseIf = new ConditionalBlock(this);
    this._elseIf.push(elseIf);
    return elseIf;
  }

  else(): Block<this> {
    if (!this._else) {
      this._else = new Block(this);
    }
    return this._else;
  }

  commit(): void {
    for (const elseIf of this._elseIf) {
      elseIf.commit();
    }
    if (this._else) {
      this._else.commit();
    }
    super.commit()
  }

  validate(): void {
    super.validate();
    for (const elseIf of this._elseIf) {
      elseIf.validate();
    }
    this._else?.validate();
  }

  flush(sb: StringBuilder): void {
    sb.appendLine(`if (${this.condition.toString()}) {`)
    super.flush(sb);
    sb.append(`}`);
    for (const elseIf of this._elseIf) {
      sb.freezeIndent()
        .appendLine(` else if (${elseIf.getCondition.toString()}) {`)
        .unFreezeIndent();

      elseIf.flush(sb);

      sb.append(`}`);
    }
    if (this._else) {
      sb.freezeIndent()
        .appendLine(` else {`)
        .unFreezeIndent();

      this._else.flush(sb);

      sb.append(`}`);
    }
    sb.appendLine();
  }
}

declare module './block' {
  export interface Block<TParent extends Block<any>> {
    addIfBlock(): IfBlock<this>
  }
}

Block.prototype.addIfBlock = function<TParent extends Block<any>>(this: TParent) {
  const ifBlock = new IfBlock(this);
  this.statements.push(ifBlock);
  return ifBlock;
}
