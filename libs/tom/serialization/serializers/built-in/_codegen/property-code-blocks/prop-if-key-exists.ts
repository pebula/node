import { CompilerCodeBlockContext, CompilerPropertyContext } from '../../../serializer';
import { MAPPER } from '../../../serializer/compiler';

/**
 * Inserts JS Builder generated code that invokes the `PropertyMappingSchema.condition` predicate and blocks the
 * mapping if the condition failed.
 * Code is not added if the `PropertyMappingSchema.condition` is not defined on the mapping.
 */
export function filterIfKeyExists(codeContext: CompilerCodeBlockContext, propContext: CompilerPropertyContext) {
  const prop = propContext.propMapSchema;
  if (!(prop.hasSourcePath && prop.sourcePath.length === 1)) {
    // TODO: Support "if Key" on deep paths
    return codeContext;
  }

  // On Serialize we invert the property and the path, cause `ctx.mapToProperty` in deserialization means take from and in serialize its set to.
  // We also swap these in `targetPropSetRef` & `getValueFromSourceCode`
  // TODO: Support on deep paths.
  const propName = propContext.context.isSerialize ? prop.prop as string : prop.resolveSourcePath;
  return codeContext.clone(
    codeContext.currentBlock.addIfKeyInObj(propName, `${MAPPER.INPUT_PARAM}`)
  );
}
