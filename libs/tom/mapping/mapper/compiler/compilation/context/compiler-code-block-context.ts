import { Code as C } from '@pebula/tom';

export interface CompilerCodeBlockContextData {
  parent: CompilerCodeBlockContext | null;
}

export class CompilerCodeBlockContext<B extends C.Block<C.Block<any>> = C.Block<C.Block<any>>> {

  terminated: boolean;

  private data: CompilerCodeBlockContextData;

  constructor(public readonly currentBlock: B,
              public sourceAccessor: string,
              public targetSetter: string,
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

  clone<T extends C.Block<C.Block<any>> = B>(newBlock: T, sourceAccessor?: string, targetSetter?: string) {
    return new CompilerCodeBlockContext<T>(
      newBlock,
      sourceAccessor || this.sourceAccessor,
      targetSetter || this.targetSetter,
      this,
    );
  }
}
