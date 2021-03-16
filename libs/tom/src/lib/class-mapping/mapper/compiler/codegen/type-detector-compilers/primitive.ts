import * as C from '../../../../../js-code-builder';
import { CompilerCodeBlockContext, CompilerPropertyContext, mapperTypeDetectorCompilerRegistry } from '../../compilation';

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

export function date(ctx: CompilerCodeBlockContext<C.ConditionalBlock<any>>, prop: CompilerPropertyContext) {
  const block = ctx.currentBlock.setCondition(`${ctx.sourceAccessor} instanceof Date`);
  return ctx.clone(block);
}

export function bigInt(ctx: CompilerCodeBlockContext<C.ConditionalBlock<any>>, prop: CompilerPropertyContext) {
  const block = ctx.currentBlock.setCondition(`typeof ${ctx.sourceAccessor} === 'bigint'`);
  return ctx.clone(block);
}

export function object(ctx: CompilerCodeBlockContext<C.ConditionalBlock<any>>, prop: CompilerPropertyContext) {
  const block = ctx.currentBlock.setCondition(`typeof ${ctx.sourceAccessor} === 'object' && !(${new C.IsArrayExpression(ctx.currentBlock, ctx.sourceAccessor).toString()})`);
  return ctx.clone(block);
}

mapperTypeDetectorCompilerRegistry
  .set('boolean', boolean)
  .set('number', number)
  .set('string', string)
  .set('date', date)
  .set('bigInt', bigInt);
