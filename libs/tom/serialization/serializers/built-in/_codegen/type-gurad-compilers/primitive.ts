import { Code as C } from '@pebula/tom';
import { CompilerCodeBlockContext, CompilerPropertyContext } from '../../../serializer';

export function catchAll(ctx: CompilerCodeBlockContext<C.ConditionalBlock<any>>, prop: CompilerPropertyContext) {
  const block = ctx.currentBlock.setCondition('true');
  return ctx.clone(block);
}

