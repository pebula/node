import { StringBuilder } from './utils';
import { Block } from './block';
import { Base } from './base';
import { Statement } from './statement';

export class ForIndexBlock<TParent extends Block<any>,
                           TExp extends Base<TParent> = Base<TParent>> extends Block<TParent> {

  public indexName: string;
  public readonly lengthVarName = this.context.generateVarName();

  get arrayExpression(): TExp {
    return this.expression;
  }

  private expression: TExp;

  constructor(parent: TParent, indexName?: string, arrayExpression?: Base<TParent>) {
    super(parent);
    this.indexName = indexName || this.context.generateVarName();
    if (arrayExpression) {
      this.setArrayExpression(arrayExpression);
    }
  }

  setIndexName(indexName: string) {
    this.indexName = indexName;
    return this;
  }

  setArrayExpression<T extends string | Base<TParent>>(arrayExpression: T): T extends Base<TParent> ? ForIndexBlock<TParent, T> : ForIndexBlock<TParent, Statement<TParent>> {
    this.expression = arrayExpression instanceof Base
      ? arrayExpression
      : new Statement(this.parent, arrayExpression as string) as any
    ;
    return this as any;
  }

  commit(): void {
    this.expression.commit();
    super.commit();
  }

  flush(sb: StringBuilder): void {
    if (this.expression instanceof Statement) {
      this.expression.inlineMode(true);
    }

    sb.appendLine(`for (let ${this.indexName} = 0, ${this.lengthVarName} = ${this.expression.toString()}.length; ${this.indexName} < ${this.lengthVarName}; ${this.indexName}++) {`)

    super.flush(sb);

    sb.appendLine(`}`);
  }

  valueAt(index: number) {
    return `${this.expression.toString()}[${this.indexName}]`;
  }

  validate(): void {
    if (!this.indexName) {
      throw new Error('ForIndexBlock missing index name');
    }
    if (!this.expression) {
      throw new Error('ForIndexBlock missing array expression');
    }
    this.expression.validate();
    super.validate();
  }
}

declare module './block' {
  export interface Block<TParent extends Block<any>> {
    addForIndexBlock<T extends string | Base<TParent>>(varName?: string, iterableExpression?: T): T extends Base<this> ? ForIndexBlock<this, T> : ForIndexBlock<this, Statement<this>>;
  }
}

Block.prototype.addForIndexBlock = function<TParent extends Block<any>, T extends string | Base<TParent>>(this: TParent, index?: string, arrayExpression?: T) {
  const forIndexBlock = new ForIndexBlock<TParent, Base<TParent>>(this, index)
  if (arrayExpression) {
    forIndexBlock.setArrayExpression(arrayExpression);
  }
  this.statements.push(forIndexBlock);
  return forIndexBlock as any;
}
