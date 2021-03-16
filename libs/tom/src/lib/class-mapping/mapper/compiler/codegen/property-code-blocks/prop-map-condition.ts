import { MAPPER, CompilerPropertyContext, CompilerCodeBlockContext } from '../../compilation';

/**
 * Inserts JS Builder generated code that invokes the `PropertyMappingSchema.condition` predicate and blocks the
 * mapping if the condition failed.
 * Code is not added if the `PropertyMappingSchema.condition` is not defined on the mapping.
 */
export function filterIfHasCondition(ctx: CompilerCodeBlockContext, prop: CompilerPropertyContext) {
  if (!prop.context.getState('serializeContextLocation') && ('condition' in prop.propMapSchema || 'map' in prop.propMapSchema)) {
    prop.context.setState('serializeContextLocation', prop.context.currentBlock);
  }

  if (!('condition' in prop.propMapSchema)) {
    return ctx;
  }

  return ctx.clone(
    ctx.currentBlock
      .addIfBlock()
      .setCondition(`${prop.schemaParam('condition')}(${MAPPER.CTX_PARAM})`)
  );
}
