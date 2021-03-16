import { StringBuilder } from './utils';
import { Block } from './block';

export class FunctionBlock<TParent extends Block<any>> extends Block<TParent> {

  private fnName: string;
  private fnParams: string[];

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

  flush(sb: StringBuilder): void {
    const fnParams = this.fnParams || [];
    const fnName = this.fnName || '';

    sb.appendLine(`function ${fnName}(${fnParams.join(', ')}) {`)
    super.flush(sb);
    sb.appendLine(`}`);
  }
}

declare module './block' {
  export interface Block<TParent extends Block<any>> {
    addFnBlock(fnName: string, ...fnParamNames: string[]): FunctionBlock<this>;
  }
}

Block.prototype.addFnBlock = function<TParent extends Block<any>>(this: TParent, fnName: string, ...fnParamNames: string[]) {
  const fnBlock = new FunctionBlock(this);
  fnBlock.setFunctionName(fnName);
  fnBlock.setParams(...fnParamNames);
  this.statements.push(fnBlock);
  return fnBlock;
}

