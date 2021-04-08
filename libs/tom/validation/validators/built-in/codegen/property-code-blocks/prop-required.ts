import { Code as C } from '@pebula/tom';
import { CompilerCodeBlockContext, CompilerPropertyContext } from '../../local-context';
import { MAPPER, createAddErrorCode } from '../../../validator/compiler';
import { REQUIRED_VALIDATOR_INFO } from '../../../utils';

/**
 * Inserts JS Builder generated code that is in-charge of checking the required constraint which uses the
 * schema configurations: optional, nullable & default.
 * It also checks if the property key exists on the target
 */
export function propRequiredCheck(ctx: CompilerCodeBlockContext, prop: CompilerPropertyContext) {
  const { propMeta } = prop;

  const block = ctx.currentBlock
    .addIfBlock()
      .setCondition(`${ctx.sourceAccessor} === undefined || ${ctx.sourceAccessor} === null`)
      .use( ifBlock => {
        const skipTernary = new C.TernaryExpression(ifBlock)
          .setCondition(`${ctx.sourceAccessor} === undefined`)
          .true(JSON.stringify(propMeta.hasDefaultValue ? false : propMeta.optional === true))
          .false(JSON.stringify(propMeta.hasDefaultValue ? propMeta.nullable === true : propMeta.optional === true || propMeta.nullable === true))

        const skip = ifBlock.addVariable(true).assignValue(skipTernary).name;

        if (propMeta.hasDefaultValue) {
          ifBlock.addIfBlock()
            .setCondition(`!${skip}`)
            .addAssignment(`${MAPPER.INPUT_PARAM}.${propMeta.name as string}`, `${prop.schemaParam('defaultValue')}()`);
        } else {
          ifBlock.addIfBlock()
            .setCondition(`!${skip}`)
            .use( c => createAddErrorCode(c, prop, REQUIRED_VALIDATOR_INFO) );
        }
      })
    .else() // chain the else block forward, so actual value assigning is set inside it

  return ctx.clone(block);
}
