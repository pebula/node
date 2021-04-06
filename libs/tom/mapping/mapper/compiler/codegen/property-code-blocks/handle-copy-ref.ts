import { CompilerPropertyContext, CompilerCodeBlockContext } from '../../compilation';

export function handleCopyRef(ctx: CompilerCodeBlockContext, prop: CompilerPropertyContext) {
  const { propMapSchema } = prop;

  if (propMapSchema.copyByRef && !propMapSchema.targetPropMeta.isContainer) {
    ctx.currentBlock.addAssignment(ctx.targetSetter, ctx.sourceAccessor);
    ctx.stopPropagation();
  }

  return ctx;
}
