import { StringBuilder } from './utils';
import { Block } from './block';

/**
 * A block that acts as a placeholder for other block or code parts.
 * It will passthrough all statements set in the block without modifying the code.
 */
export class VirtualBlock<TParent extends Block<any>> extends Block<TParent> {

  // Since it's virtual we override to omit the indentation
  flush(sb: StringBuilder): void {
    for (const c of this.statements) {
      c.flush(sb);
    }
  }
}

declare module './block' {
  export interface Block<TParent extends Block<any>> {
    addVirtualBlock<TParent extends Block<any>>(): VirtualBlock<this>;
  }
}

Block.prototype.addVirtualBlock = function<TParent extends Block<any>>(this: TParent) {
  const fnBlock = new VirtualBlock(this);
  this.statements.push(fnBlock);
  return fnBlock;
}

