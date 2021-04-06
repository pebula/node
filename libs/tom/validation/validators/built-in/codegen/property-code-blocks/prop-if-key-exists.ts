import { CompilerCodeBlockContext, CompilerPropertyContext } from '../../local-context';
import { MAPPER } from '../../../validator/compiler';

/**
 * Inserts JS Builder generated code that invokes the `PropertyMappingSchema.condition` predicate and blocks the
 * mapping if the condition failed.
 * Code is not added if the `PropertyMappingSchema.condition` is not defined on the mapping.
 */
export function filterIfKeyExists(codeContext: CompilerCodeBlockContext, propContext: CompilerPropertyContext) {
  const propName = propContext.propMeta.name;
  return codeContext.clone(
    codeContext.currentBlock.addIfKeyInObj(propName as string, `${MAPPER.INPUT_PARAM}`)
  );
}
