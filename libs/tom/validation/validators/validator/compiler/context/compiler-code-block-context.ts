import { Code as C } from '@pebula/tom';

export interface CompilerCodeBlockContextData {
  parent: CompilerCodeBlockContext | null;
}

export class CompilerCodeBlockContext<B extends C.Block<C.Block<any>> = C.Block<C.Block<any>>> {

  terminated: boolean;
  private data: CompilerCodeBlockContextData;

  constructor(public currentBlock: B,
              public sourceAccessor: string,
              parent?: CompilerCodeBlockContext) {
    this.data = { parent: parent ?? null };
  }

  getData<P extends keyof CompilerCodeBlockContextData>(key: P): CompilerCodeBlockContextData[P] | undefined {
    return this.data[key];
  }

  setData<P extends keyof CompilerCodeBlockContextData>(key: P, value: CompilerCodeBlockContextData[P] | null): void {
    this.data[key] = value;
  }

  stopPropagation(): void {
    this.terminated = true;
  }

  clone<T extends C.Block<C.Block<any>> = B>(newBlock: T, sourceAccessor?: string) {
    return new CompilerCodeBlockContext<T>(newBlock, sourceAccessor || this.sourceAccessor, this);
  }
}
