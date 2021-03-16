import { MAPPER, CompilerPropertyContext, CompilerCodeBlockContext } from '../../compilation';

export function filterIfKeyExists(ctx: CompilerCodeBlockContext, propContext: CompilerPropertyContext) {
  const prop = propContext.propMapSchema;
  if (!(prop.hasSourcePath && prop.sourcePath.length === 1)) {
    // TODO: Support "if Key" on deep paths
    return ctx;
  }

  return ctx.clone(
    ctx.currentBlock.addIfKeyInObj(prop.resolveSourcePath, `${MAPPER.INPUT_PARAM}`)
  );
}
