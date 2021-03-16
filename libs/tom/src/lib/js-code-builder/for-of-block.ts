import { StringBuilder } from './utils';
import { Block } from './block';
import { Base } from './base';
import { Statement } from './statement';

export class ForOfBlock<TParent extends Block<any>,
                        TExp extends Base<TParent> = Base<TParent>,
                        TVar extends string | string[] = string | string[]> extends Block<TParent> {

  public varName: TVar;

  get iterableExpression(): TExp {
    return this.expression;
  }

  private expression: TExp;

  constructor(parent: TParent, varName?: TVar, iterableExpression?: Base<TParent>) {
    super(parent);
    this.varName = varName || this.context.generateVarName() as TVar;
    if (iterableExpression) {
      this.setIterableExpression(iterableExpression);
    }
  }

  setSingleParam(varName?: string): ForOfBlock<TParent, TExp, string> {
    this.varName = (varName || this.context.generateVarName()) as TVar;
    return this as any;
  }

  setArraySpreadParam(paramCount: number): ForOfBlock<TParent, TExp, string[]> {
    const varNames = [];
    for (let i = 0; i < paramCount; i++) {
      varNames.push(this.context.generateVarName());
    }
    this.varName = varNames as TVar;
    return this as any;
  }

  setIterableExpression<T extends string | Base<TParent>>(iterableExpression: T): T extends Base<TParent> ? ForOfBlock<TParent, T, TVar> : ForOfBlock<TParent, Statement<TParent>, TVar> {
    this.expression = iterableExpression instanceof Base
      ? iterableExpression
      : new Statement(this.parent, iterableExpression as string) as any
    ;
    return this as any;
  }

  commit(): void {
    this.expression.commit();
    super.commit();
  }

  flush(sb: StringBuilder): void {
    const params = Array.isArray(this.varName)
      ? `[${this.varName.join(', ')}]`
      : this.varName
    ;

    sb.append(`for (const ${params} of `)
    if (this.expression instanceof Statement) {
      this.expression.inlineMode(true);
    }
    this.expression.flush(sb);
    sb.appendLine(`) {`)

    super.flush(sb);

    sb.appendLine(`}`);
  }

  validate(): void {
    if (!this.varName) {
      throw new Error('ForOfBlock missing variable name');
    }
    if (!this.expression) {
      throw new Error('ForOfBlock missing iterable expression');
    }
    this.expression.validate();
    super.validate();
  }
}

declare module './block' {
  export interface Block<TParent extends Block<any>> {
    addForOfBlock<T extends string | Base<TParent>>(varName?: string, iterableExpression?: T): T extends Base<this> ? ForOfBlock<this, T, string> : ForOfBlock<this, Statement<this>, string>;
    addForOfBlock<T extends string | Base<TParent>>(varName?: string[], iterableExpression?: T): T extends Base<this> ? ForOfBlock<this, T, string[]> : ForOfBlock<this, Statement<this>, string[]>;
  }
}

Block.prototype.addForOfBlock = function<TParent extends Block<any>, T extends string | Base<TParent>>(this: TParent, varName?: string | string[], iterableExpression?: T) {
  const forOfBlock = new ForOfBlock<TParent, Base<TParent>>(this, varName)
  if (iterableExpression) {
    forOfBlock.setIterableExpression(iterableExpression);
  }
  this.statements.push(forOfBlock);
  return forOfBlock as any;
}
