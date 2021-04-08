import { StringBuilder } from './utils';
import { Block } from './block';
import { Statement } from './statement';

export class InlineExpression<TParent extends Block<any>> extends Statement<TParent> {

  /**
   * When true, wraps the expression with an exclamation mark and parentheses.
   *
   * For example, if the inline expression is `1 + 1`, with negate enable it will render as `!(1+1)`
   */
  negate: boolean;


  toggleNegate(force?: boolean): this {
    this.negate = typeof force === 'boolean' ? force : !this.negate;
    return this;
  }

  flush(sb: StringBuilder, freezeIndent = false): void {
    this.inlineMode(true);
    if (this.negate) {
      sb.append('!(');
    }
    super.flush(sb, freezeIndent);
    if (this.negate) {
      sb.append(')');
    }
  }

}

declare module './block' {
  export interface Block<TParent extends Block<any>> {
    addInlineExpression(code: string): InlineExpression<this>;
  }
}

Block.prototype.addInlineExpression = function<TParent extends Block<any>>(this: TParent, code: string) {
  const inlineExpression = new InlineExpression(this, code);
  this.statements.push(inlineExpression);
  return inlineExpression;
}

