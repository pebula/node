import * as C from '../../../../../../js-code-builder';
import { CompilerCodeBlockContext, CompilerPropertyContext, getSerializerContext } from '../../../../serializer';

export function array(ctx: CompilerCodeBlockContext<C.ConditionalBlock<any>>, prop: CompilerPropertyContext) {
  const block = ctx.currentBlock.setCondition(new C.IsArrayExpression(ctx.currentBlock, ctx.sourceAccessor))
  return ctx.clone(block);
}

export function set(ctx: CompilerCodeBlockContext<C.ConditionalBlock<any>>, prop: CompilerPropertyContext) {
  if (prop.context.isSerialize) {
    const block = ctx.currentBlock.setCondition(`${ctx.sourceAccessor} instanceof Set`);
    return ctx.clone(block);
  } else {
    return array(ctx, prop);
  }
}

export function map(ctx: CompilerCodeBlockContext<C.ConditionalBlock<any>>, prop: CompilerPropertyContext) {
  if (prop.context.isSerialize) {
    const block = ctx.currentBlock.setCondition(`${ctx.sourceAccessor} instanceof Map`);
    return ctx.clone(block);
  } else {
    return objectMap(ctx, prop);
  }
}

export function objectMap(ctx: CompilerCodeBlockContext<C.ConditionalBlock<any>>, prop: CompilerPropertyContext) {
  const block = ctx.currentBlock.setCondition(`typeof ${ctx.sourceAccessor} === 'object' && !(${new C.IsArrayExpression(ctx.currentBlock, ctx.sourceAccessor).toString()})`);
  return ctx.clone(block);
}
