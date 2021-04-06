import { Code as C } from '@pebula/tom';
import { CompilerCodeBlockContext, CompilerPropertyContext } from '../../../../serializer';
import { setToGlobal } from '../../../../serializer/compiler';
import { BIG_INT_REGEX, DATE_REGEX } from '../utils';

const dataRegex = {
  regex: '',
  get name(): string {
    return this.regex || (this.regex = setToGlobal(DATE_REGEX));
  }
}

const bigIntRegex = {
  regex: '',
  get name(): string {
    return this.regex || (this.regex = setToGlobal(BIG_INT_REGEX));
  }
}

export function boolean(ctx: CompilerCodeBlockContext<C.ConditionalBlock<any>>, prop: CompilerPropertyContext) {
  const block = ctx.currentBlock.setCondition(`typeof ${ctx.sourceAccessor} === 'boolean'`);
  return ctx.clone(block);
}

export function number(ctx: CompilerCodeBlockContext<C.ConditionalBlock<any>>, prop: CompilerPropertyContext) {
  const block = ctx.currentBlock.setCondition(`typeof ${ctx.sourceAccessor} === 'number'`);
  return ctx.clone(block);
}

export function string(ctx: CompilerCodeBlockContext<C.ConditionalBlock<any>>, prop: CompilerPropertyContext) {
  const block = ctx.currentBlock.setCondition(`typeof ${ctx.sourceAccessor} === 'string'`);
  return ctx.clone(block);
}

export function dateSerialize(ctx: CompilerCodeBlockContext<C.ConditionalBlock<any>>, prop: CompilerPropertyContext) {
  const block = ctx.currentBlock.setCondition(`${ctx.sourceAccessor} instanceof Date`);
  return ctx.clone(block);
}

export function dateDeserialize(ctx: CompilerCodeBlockContext<C.ConditionalBlock<any>>, prop: CompilerPropertyContext) {
  const block = ctx.currentBlock.setCondition(`typeof ${ctx.sourceAccessor} === 'string' && ${dataRegex.name}.exec(${ctx.sourceAccessor}) !== null`);
  return ctx.clone(block);
}

export function bigIntSerialize(ctx: CompilerCodeBlockContext<C.ConditionalBlock<any>>, prop: CompilerPropertyContext) {
  const block = ctx.currentBlock.setCondition(`typeof ${ctx.sourceAccessor} === 'bigint'`);
  return ctx.clone(block);
}

export function bigIntDeserialize(ctx: CompilerCodeBlockContext<C.ConditionalBlock<any>>, prop: CompilerPropertyContext) {
  const block = ctx.currentBlock.setCondition(`typeof ${ctx.sourceAccessor} === 'number' || (typeof ${ctx.sourceAccessor} === 'string' && ${bigIntRegex.name}.test(${ctx.sourceAccessor}))`);
  return ctx.clone(block);
}

export function object(ctx: CompilerCodeBlockContext<C.ConditionalBlock<any>>, prop: CompilerPropertyContext) {
  const block = ctx.currentBlock.setCondition(`typeof ${ctx.sourceAccessor} === 'object' && !(${new C.IsArrayExpression(ctx.currentBlock, ctx.sourceAccessor).toString()})`);
  return ctx.clone(block);
}
