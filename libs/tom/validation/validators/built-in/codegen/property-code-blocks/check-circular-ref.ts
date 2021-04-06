/**
 * Circular reference detection logic for class serialization.
 *
 * For class serialization we don't care about duplication, we care about circular reference which will cause an infinite loop.
 * Duplicates are OK as long as they live on different branches in the tree and they don't point to an object above them in the branch.
 *
 * In serialization we assume the following:
 * 1) We only check for circular reference when serializing and not when deserializing.
 *    We assume JSON is the input hence no referenced objects (Might change if we introduce identity for objects)
 * 2) When we do check for circular reference we only do it from the current point in the node downwards ignoring any top level nodes.
 *
 * This is why we use an array to detect the duplication and we can remove the entry once we're done serializing the node.
 * Moreover, we don't need to reflect the duplication in a JSON output, we just ignore it the 2nd time. (Might change if we introduce identity for objects)
 *
 */
import { Schema } from '@pebula/tom';
import { CompilerCodeBlockContext, CompilerPropertyContext } from '../../local-context';
import { MAPPER } from '../../../validator/compiler';

export function checkCircularRef(ctx: CompilerCodeBlockContext, prop: CompilerPropertyContext) {
  const propMeta = prop.propMeta;
  const maybeCircular = !propMeta.isContainer && propMeta.possibleCustomTypes().some( t => Schema.getSchema(t)?.hasCircularReference() );
  if (maybeCircular) {
    prop.context.setState('maybeCircularReference', true);
    const block = ctx.currentBlock
      .addIfBlock()
      .setCondition(`!${MAPPER.LOCK_SYNC}.includes(${ctx.sourceAccessor})`)
      // This block is where transformation code is added, which will run only if there's no circular reference.

      return ctx.clone(block);
  } else {
    return ctx;
  }
}
