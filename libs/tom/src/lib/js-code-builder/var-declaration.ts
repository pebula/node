import { Base } from './base';
import { Block } from './block';
import { Statement } from './statement';
import { StringBuilder } from './utils';

export class VariableDeclaration<TParent extends Block<any>, TExp extends Base<TParent> = Base<TParent>> extends Statement<TParent> {

  readonly name: string
  private rNode: TExp;

  constructor(parent: TParent, private isStatic: boolean, name?: string) {
    super(parent);
    this.name = name || this.context.generateVarName();
  }

  assignValue<T extends string | Base<TParent>>(rNodeValue: T): T extends Base<TParent> ? VariableDeclaration<TParent, T> : VariableDeclaration<TParent, Statement<TParent>> {
    this.rNode = rNodeValue instanceof Base
      ? rNodeValue
      : new Statement(this.parent, rNodeValue as string) as any
    ;
    return this as any;
  }

  commit(): void {
    this.statement = `${this.isStatic ? 'const' : 'let'} ${this.name}`;
    this.rNode?.commit();
  }

  validate(): void {
    if (this.isStatic && !this.rNode) {
      throw new Error('"const" VariableDeclaration missing RNode assignment declaration');
    }
    this.rNode?.validate();
  }

  flush(sb: StringBuilder): void {
    sb.append(this.statement);
    if (this.rNode) {
      sb.freezeIndent();
      sb.append(` = `);
      this.rNode.flush(sb);
      sb.unFreezeIndent();
    } else {
      sb.appendLine();
    }
  }
}

declare module './block' {
  export interface Block<TParent extends Block<any>> {
    /**
     * @param isStatic Weather to use `cost` (true) or `let` (false). Default: true
     */
    addVariable<T extends string | Base<TParent>>(isStatic?: boolean, varName?: string, valueExpression?: T): T extends Base<this> ? VariableDeclaration<this, T> :  VariableDeclaration<this, Statement<this>>;
  }
}

Block.prototype.addVariable = function<TParent extends Block<any>, T extends string | Base<TParent>>(this: TParent, isStatic = true, varName?: string, valueExpression?: T) {
  const varDeclaration = new VariableDeclaration<TParent, Base<TParent>>(this, isStatic, varName);
  if (valueExpression) {
    varDeclaration.assignValue(valueExpression);
  }
  this.statements.push(varDeclaration);
  return varDeclaration as any;
}
