import * as C from '../../../../../../js-code-builder';
import { TomTypeInstance } from '../../../../../../schema/type-system';
import { CompilerCodeBlockContext, CompilerPropertyContext } from '../../../../serializer';

export function literal(ctx: CompilerCodeBlockContext<C.ConditionalBlock<any>>, prop: CompilerPropertyContext) {
  const literal = prop.propMapSchema.targetPropMeta.typeDef as TomTypeInstance<'literal'>;

  const block = ctx.currentBlock.setCondition(`${ctx.sourceAccessor} === ${JSON.stringify(literal.typeParams)}`);
  return ctx.clone(block);
}
