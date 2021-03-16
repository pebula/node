import { TomTypeInstance } from '../../../../../../schema/type-system';
import { CompilerCodeBlockContext, CompilerPropertyContext } from '../../../../serializer';

export function literalDeserialize(ctx: CompilerCodeBlockContext, prop: CompilerPropertyContext) {
  const literal = prop.propMapSchema.targetPropMeta.typeDef as TomTypeInstance<'literal'>;
  ctx.currentBlock.addAssignment(ctx.targetSetter, `${JSON.stringify(literal.typeParams)}`);
}
