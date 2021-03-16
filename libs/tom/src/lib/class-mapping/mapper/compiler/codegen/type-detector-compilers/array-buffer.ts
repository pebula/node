import * as C from '../../../../../js-code-builder';
import { TypeSystem } from '../../../../../schema';
import { CompilerCodeBlockContext, CompilerPropertyContext, mapperTypeDetectorCompilerRegistry } from '../../compilation';

export function arrayBuffer(ctx: CompilerCodeBlockContext<C.ConditionalBlock<any>>, prop: CompilerPropertyContext) {
  const block = ctx.currentBlock.setCondition(`${ctx.sourceAccessor} instanceof ArrayBuffer`);
  return ctx.clone(block);
}

mapperTypeDetectorCompilerRegistry
  .set('arrayBuffer', arrayBuffer);
