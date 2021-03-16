import { StringBuilder } from './utils';
import { Block } from './block';
import { Base } from './base';

export class Statement<TParent extends Block<any>> extends Base<TParent> {
  protected statement: string;

  private semiColumn = ';';
  private newLine = true;

  constructor(parent: TParent, statement?: string) {
    super(parent);
    if (statement) {
      this.statement = statement;
    }
  }

  autoSemiColumn(value: boolean) {
    this.semiColumn = value ? ';' : '';
    return this;
  }

  inlineMode(value: boolean) {
    this.semiColumn = !value ? ';' : '';
    this.newLine = !value;
    return this;
  }

  commit(): void { }

  validate(): void {
    if (!this.statement) {
      throw new Error('Statement missing code');
    }
  }

  flush(sb: StringBuilder, freezeIndent = false): void {
    this.buildAndMaybeFreeze(sb, freezeIndent, () => {
      sb.append(this.statement + this.semiColumn);
      if (this.newLine) {
        sb.appendLine();
      }
    });
  }

  buildAndMaybeFreeze(sb: StringBuilder, freezeIndent: boolean, fn: () => void): this {
    if (freezeIndent) {
      sb.freezeIndent();
    }

    fn();

    if (freezeIndent) {
      sb.unFreezeIndent();
    }
    return this;
  }
}

declare module './block' {
  export interface Block<TParent extends Block<any>> {
    addCodeExpression(code: string): Statement<this>;
  }
}

Block.prototype.addCodeExpression = function<TParent extends Block<any>>(this: TParent, code: string) {
  const statement = new Statement(this, code);
  this.statements.push(statement);
  return statement;
}

