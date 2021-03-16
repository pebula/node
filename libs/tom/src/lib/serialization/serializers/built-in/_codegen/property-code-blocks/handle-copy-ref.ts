import { TypeCompiler, CompilerCodeBlockContext, CompilerPropertyContext } from '../../../serializer';

function _handleCopyRef(ctx: CompilerCodeBlockContext, prop: CompilerPropertyContext) {
  const { propMapSchema } = prop;

  if (propMapSchema.copyByRef && !propMapSchema.targetPropMeta.isContainer) {
    ctx.currentBlock.addAssignment(ctx.targetSetter, ctx.sourceAccessor);
    ctx.stopPropagation();
  }

  return ctx;
}

export const handleCopyRef = new TypeCompiler().register(_handleCopyRef, _handleCopyRef);
