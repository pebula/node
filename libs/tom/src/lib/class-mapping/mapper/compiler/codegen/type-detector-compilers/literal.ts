import * as C from '../../../../../js-code-builder';
import { TypeSystem } from '../../../../../schema';
import { CompilerCodeBlockContext, CompilerPropertyContext, mapperTypeDetectorCompilerRegistry } from '../../compilation';

export function literal(ctx: CompilerCodeBlockContext<C.ConditionalBlock<any>>, prop: CompilerPropertyContext) {
  const literal = prop.propMapSchema.targetPropMeta.typeDef as TypeSystem.TomTypeInstance<'literal'>;
  const block = ctx.currentBlock.setCondition(`${ctx.sourceAccessor} === ${JSON.stringify(literal.typeParams)}`);
  return ctx.clone(block);
}

mapperTypeDetectorCompilerRegistry
  .set('literal', literal);
