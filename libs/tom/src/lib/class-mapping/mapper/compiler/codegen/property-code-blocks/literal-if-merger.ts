import * as C from '../../../../../js-code-builder';
import { CompilerPropertyContext, CompilerCodeBlockContext } from '../../compilation';

/**
 * Detects nested if statements when the source is a literal type, removes the top if and replaces it with the nested one.
 * This should be used in union types to remove the duplicate type checks done by the type detector compilers.
 *
 * For example, if the source is a union of 500 | 50 and the target is a "number":
 *
 * ```typescript
 * class ModelTarget {
 *  @P.union(P.literal('test'), P.as('number')) value: 'test' | number;
 * }
 * class ModelSource {
 *  @P.union(P.literal(5), P.literal(500)) value: 500 | 5;
 * }
 * ```
 *
 * The code generator will first add a type detector `if` statement checking if the value is a number (`typeof v === 'number`)
 * And will chain forward the internal block of the `if` statement created.
 * The type compiler for the source literal will then add the assignment, but, inside an if statement checking for the literal (`v === 500`)
 * which ends up:
 * ```typescript
 * if (typeof v === 'number') {
 *   if (v === 500) {
 *     target.prop = v;
 *   }
 * }
 * ```
 *
 * We can omit the initial check here, so this block modifier will change it to:
 *
 * ```typescript
 * if (v === 500) {
 *   target.prop = v;
 * }
 * ```
 *
 * This block modifier should not be put in the chain, which runs before the type handling code.
 * It must run FIRST IN LINE after the type handling code is done.
 *
 * It will activate when:
 * - Source property type is a literal
 * - Current context block is an instance of `ConditionalBlock`
 * - Current context block has one child statement and it is and instance of `IfBlock`
 */
export function literalIfMerger(ctx: CompilerCodeBlockContext, prop: CompilerPropertyContext) {
  const sourcePropMeta = prop.propMapSchema.sourcePropMeta;
  if (sourcePropMeta.typeDef.type === 'literal') {
    const block = ctx.currentBlock;

    if (block instanceof C.ConditionalBlock && block.length === 1 && block.get(0) instanceof C.IfBlock) {
      const childIf = block.get(0) as C.IfBlock<any>;
      block
        .setCondition(childIf.getCondition)
        .clear();
      for (const exp of childIf.clear()) {
        block.add(exp);
      }
    }
  }
  return ctx;
}
