import { StringBuilder } from './utils';
import { Base } from './base';
import { Block } from './block';
import { Statement } from './statement';

export class AssignExpression<TParent extends Block<any>> extends Statement<TParent> {

  varName: string
  private rNode: string | Base<TParent>;

  constructor(parent: TParent, varName?: string) {
    super(parent);
    if (varName) {
      this.varName = varName;
    }
  }

  setVarName(varName: string) {
    this.varName = varName;
    return this;
  }

  assignValue(code: string | Base<TParent>) {
    this.rNode = code;
    return this;
  }

  commit(): void {
    this.statement = `${this.varName} = `;
    if (this.rNode instanceof Base) {
      this.rNode.commit();
    }
    super.commit();
  }

  validate(): void {
    if (!this.varName) {
      throw new Error('AssignExpression missing variable name declaration');
    }
    if (!this.rNode) {
      throw new Error('AssignExpression missing RNode assignment declaration');
    } else if (this.rNode instanceof Base) {
      this.rNode.validate();
    }
  }

  flush(sb: StringBuilder, freezeIndent = false): void {
    this.buildAndMaybeFreeze(sb, freezeIndent, () => {
      sb.append(this.statement);
      if (typeof this.rNode === 'string') {
        sb.appendLine(this.rNode);
      } else {
        this.rNode.flush(sb);
      }
    });
  }
}

declare module './block' {
  export interface Block<TParent extends Block<any>> {
    /**
     * @param isStatic Weather to use `cost` (true) or `let` (false). Default: true
     */
    addAssignment(varName: string, valueExpression: string | Base<TParent>): AssignExpression<this>;
  }
}

Block.prototype.addAssignment = function<TParent extends Block<any>>(this: TParent, varName: string, valueExpression?: string | Base<TParent>) {
  const assignExpression = new AssignExpression(this, varName);
  if (valueExpression) {
    assignExpression.assignValue(valueExpression);
  }
  this.statements.push(assignExpression);
  return assignExpression;
}


