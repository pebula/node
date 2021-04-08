import { Code as C } from '@pebula/tom';

export interface CompilerCodeBlockContextData {
}

export class CompilerCodeBlockContext<B extends C.Block<C.Block<any>> = C.Block<C.Block<any>>> extends C.Compiler.CompilerCodeBlockContext<B, CompilerCodeBlockContextData> {

  constructor(currentBlock: B,
              public sourceAccessor: string,
              public targetSetter: string,
              parent?: CompilerCodeBlockContext) {
    super(currentBlock, parent);
  }

  clone<T extends C.Block<C.Block<any>> = B>(newBlock: T, sourceAccessor?: string, targetSetter?: string): CompilerCodeBlockContext<T> {
    return new CompilerCodeBlockContext<T>(
      newBlock,
      sourceAccessor || this.sourceAccessor,
      targetSetter || this.targetSetter,
      this,
    );
  }
}
