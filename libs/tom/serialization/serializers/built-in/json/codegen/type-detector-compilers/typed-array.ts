
import { Code as C } from '@pebula/tom';
import { CompilerCodeBlockContext, CompilerPropertyContext } from '../../../../serializer';
import { JsonSerializer } from '../../json';
import { ARRAY_BUFFER_KEY } from '../utils';

export function typedArraySerialize(ctx: CompilerCodeBlockContext<C.ConditionalBlock<any>>, prop: CompilerPropertyContext<JsonSerializer>) {
  const block = ctx.currentBlock.setCondition(`ArrayBuffer.isView(${ctx.sourceAccessor})`);
  return ctx.clone(block);
}

export function typedArrayDeserialize(ctx: CompilerCodeBlockContext<C.ConditionalBlock<any>>, prop: CompilerPropertyContext<JsonSerializer>) {
  const sBufferKey = JSON.stringify(ARRAY_BUFFER_KEY);
  const block = ctx.currentBlock.setCondition(`typeof ${ctx.sourceAccessor} === 'object' && ${sBufferKey} in ${ctx.sourceAccessor}`);
  return ctx.clone(block);
}
