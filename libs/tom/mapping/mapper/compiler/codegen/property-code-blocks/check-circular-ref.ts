/**
 * Circular reference detection logic for class mapping is different from the logic in class serialization.
 * For class mapping, like serialization, we care for the circular part which protects us from infinite mapping
 * but we also care about reference which means we don't want duplicate instances to appear on different branches, although not causing circular reference.
 *
 * The serializer logic is not compatible for mapping.
 * With mapping, any instance of a mapped type that appears more then once in the source, at any point on the source tree must have the same reference at the target.
 * To simplify, for every mapped type we will need to store it alongside it's output mapped type so at every point in the mapping we meet it again we will return the
 * output matched to it.
 */
import { Code as C } from '@pebula/tom';
import { MAPPER, CompilerPropertyContext, CompilerCodeBlockContext } from '../../compilation';

export function checkCircularRef(ctx: CompilerCodeBlockContext, prop: CompilerPropertyContext) {
  const propMeta = prop.propMapSchema.sourcePropMeta;

  const maybeCircular = propMeta && !propMeta.isContainer && propMeta.possibleCustomTypes().length > 0;
  if (maybeCircular) {
    let block: C.IfBlock<C.Block<C.Block<any>>, C.InlineExpression<C.Block<C.Block<any>>>>
    ctx.currentBlock
      .addIfBlock()
        .setCondition(`!${MAPPER.LOCK_SYNC}.has(${ctx.sourceAccessor})`)
          .addVirtualBlock().use( virtualBlock => block = virtualBlock as any ).parent
      .else()
        .addAssignment(ctx.targetSetter, `${MAPPER.LOCK_SYNC}.get(${ctx.sourceAccessor})`);
      // This block is where transformation code is added, which will run only if there's no circular reference.

      return ctx.clone(block);
  } else {
    return ctx;
  }
}
