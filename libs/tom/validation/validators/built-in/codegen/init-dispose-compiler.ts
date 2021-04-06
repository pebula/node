import { Code as C } from '@pebula/tom';
import { ClassValidatorContext } from '../../validator';
import { ROOT, MAPPER, setToGlobal } from '../../validator/compiler';
import { CompilerContext } from '../local-context';

const CLASS_VALIDATOR_CONTEXT_TYPE_PARAM = setToGlobal(ClassValidatorContext);

export function generateValidatorInitCode(currentBlock: C.Block<C.Block<any>>, context: CompilerContext) {
  currentBlock.addIfBlock()
    .setCondition(`!${MAPPER.CTX_PARAM}`)
    .addAssignment(
      MAPPER.CTX_PARAM,
      `new ${CLASS_VALIDATOR_CONTEXT_TYPE_PARAM}(${MAPPER.INPUT_PARAM}, ${ROOT.CLASS_VALIDATION_SCHEMAS_PARAM}, ${MAPPER.OPTIONS_PARAM})`
    ).parent
    .else()
      .addAssignment(
        MAPPER.CTX_PARAM,
        `${MAPPER.CTX_PARAM}.createChild(${MAPPER.INPUT_PARAM})`
      );

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
