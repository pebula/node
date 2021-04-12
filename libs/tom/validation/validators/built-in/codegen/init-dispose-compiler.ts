import { Code as C } from '@pebula/tom';
import { MAPPER } from '../../validator/compiler';
import { CompilerContext } from '../local-context';

export function generateValidatorInitCode(currentBlock: C.Block<C.Block<any>>, context: CompilerContext) {
  const classHasCircular = context.classValidationSchema.classSchema.hasCircularReference();
  const maybeCircular = context.getState('maybeCircularReference');

  if (maybeCircular || classHasCircular) {
    const block = currentBlock
      .addIfBlock()
        .setCondition(`!${MAPPER.LOCK_SYNC}`)
          .addCodeExpression(`${MAPPER.LOCK_SYNC} = []`).parent
        .parent;

    if (classHasCircular) {
      block.addCodeExpression(`${MAPPER.LOCK_SYNC}.push(${MAPPER.INPUT_PARAM})`)
    }
  }
}

export function generateValidatorDisposeCode(currentBlock: C.Block<C.Block<any>>, context: CompilerContext) {
  // we don't remove items in lock sync because we might run into them again in another branch
  // so we just leave it there
}
