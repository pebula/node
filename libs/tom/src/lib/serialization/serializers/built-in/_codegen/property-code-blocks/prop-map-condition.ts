import { TypeCompiler, CompilerCodeBlockContext, CompilerPropertyContext } from '../../../serializer';
import { MAPPER } from '../../../serializer/compiler';

function _filterIfHasCondition(codeContext: CompilerCodeBlockContext, propContext: CompilerPropertyContext) {
  if (!propContext.context.getState('serializeContextLocation') && ('condition' in propContext.propMapSchema || 'map' in propContext.propMapSchema)) {
    propContext.context.setState('serializeContextLocation', propContext.context.currentBlock);
  }

  if (!('condition' in propContext.propMapSchema)) {
    return codeContext;
  }

  return codeContext.clone(codeContext.currentBlock.addIfBlock()
    .setCondition(`${propContext.schemaParam('condition')}(${MAPPER.CTX_PARAM})`)
  );
}

/**
 * Inserts JS Builder generated code that invokes the `PropertyMappingSchema.condition` predicate and blocks the
 * mapping if the condition failed.
 * Code is not added if the `PropertyMappingSchema.condition` is not defined on the mapping.
 */
export const filterIfHasCondition = new TypeCompiler().register(_filterIfHasCondition, _filterIfHasCondition);
