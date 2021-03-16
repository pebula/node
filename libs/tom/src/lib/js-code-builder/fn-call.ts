import { StringBuilder } from './utils';
import { Block } from './block';
import { Statement } from './statement';

export class FunctionCall<TParent extends Block<any>> extends Statement<TParent> {

  private fnName: string;
  private fnParams: string[];

  constructor(parent: TParent) {
    super(parent);
  }

  setFunctionName(name: string) {
    this.fnName = name;
    return this;
  }

  addParams(...paramNames: string[]) {
    if (!this.fnParams) {
      this.fnParams = [...paramNames];
    } else {
      this.fnParams.push(...paramNames);
    }
    return this;
  }

  setParams(...paramNames: string[]) {
    this.fnParams = paramNames;
    return this;
  }

  commit(): void {
    const fnParams = this.fnParams || [];
    this.statement = `${this.fnName}(${fnParams.join(', ')})`;
    super.commit();
  }

  validate(): void {
    if (!this.fnName) {
      throw new Error('FunctionCall missing function name');
    }
    super.validate();
  }
}

declare module './block' {
  export interface Block<TParent extends Block<any>> {
    addFnCallExpression(fnName: string, ...fnParamNames: string[]): FunctionCall<this>;
  }
}

Block.prototype.addFnCallExpression = function<TParent extends Block<any>>(this: TParent, fnName: string, ...fnParamNames: string[]) {
  const fnCall = new FunctionCall(this);
  fnCall.setFunctionName(fnName);
  fnCall.setParams(...fnParamNames);
  this.statements.push(fnCall);
  return fnCall;
}

