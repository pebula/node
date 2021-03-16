import { StringBuilder } from './utils';
import { Block } from './block';
import { Statement } from './statement';

export class InlineExpression<TParent extends Block<any>> extends Statement<TParent> {

  flush(sb: StringBuilder, freezeIndent = false): void {
    this.inlineMode(true);
    super.flush(sb, freezeIndent);
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

