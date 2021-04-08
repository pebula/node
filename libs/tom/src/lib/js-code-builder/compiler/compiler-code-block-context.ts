import { Block } from '../block';

const TERMINATED_SYMBOL = Symbol('TERMINATED');

export class CompilerCodeBlockContext<B extends Block<Block<any>> = Block<Block<any>>, TData = {}> {

  get terminated(): boolean { return TERMINATED_SYMBOL in this; }

  private data: TData;

  constructor(public currentBlock: B,
              public readonly parent?: CompilerCodeBlockContext<Block<Block<any>>, TData>) {
    this.data = { } as any;
    if (parent?.terminated) {
      this.stopPropagation();
    }
  }

  getData<P extends keyof TData>(key: P): TData[P] | undefined {
    return this.data[key];
  }

  setData<P extends keyof TData>(key: P, value: TData[P] | null): void {
    this.data[key] = value;
  }

  stopPropagation(): void {
    this[TERMINATED_SYMBOL] = true;
  }

}
