import * as C from '../../../../js-code-builder';
import { CompilerContext, ClassSerializerContext } from '../../serializer';
import { ROOT, MAPPER, setToGlobal } from '../../serializer/compiler';

const CLASS_SERIALIZER_CONTEXT_TYPE_PARAM = setToGlobal(ClassSerializerContext);

export function generateSerializerInitCode(currentBlock: C.Block<C.Block<any>>, context: CompilerContext) {
  const classHasCircular = context.classSerializerSchema.classSchema.hasCircularReference();
  const maybeCircular = context.getState('maybeCircularReference');

  /* `maybeCircular`:     Will be true when at least one property on the current scheme (schema we're setting the init code to)
                          has a circular reference (Set in the property code block: check-circular-ref)
     `classHasCircular`:  Will be true when the current schema is one that might have circular reference.

     When `maybeCircular` or `classHasCircular` is true, we want to have the lock sync stack available.
     If it's `maybeCircular`, we know that some property transform code block will use it next.
     If it`s `classHasCircular` we also push the current instance to lock sync stack.

     This works together with `check-circular-ref` since `check-circular-ref` will add do the checking in properties
     and when entering the property (if it's not circular) `classHasCircular` will make sure to add it and then remove it when disposing (code below)
  */

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

export function generateSerializerDisposeCode(currentBlock: C.Block<C.Block<any>>, context: CompilerContext) {
  const classHasCircular = context.classSerializerSchema.classSchema.hasCircularReference();
  if (classHasCircular) {
    currentBlock.addCodeExpression(`${MAPPER.LOCK_SYNC}.pop()`).parent;
  }

  const serializeContext = context.getState('serializeContextLocation');
  if (serializeContext) {
    const ifBlock = new C.IfBlock(serializeContext.parent)
      .setCondition(`!${MAPPER.CTX_PARAM}`)
      .addAssignment(
        MAPPER.CTX_PARAM,
        `new ${CLASS_SERIALIZER_CONTEXT_TYPE_PARAM}(${ROOT.CLASS_SERIALIZER_SCHEMAS_PARAM}, ${MAPPER.INPUT_PARAM}, ${MAPPER.OUTPUT_PARAM}, ${MAPPER.OPTIONS_PARAM})`
      ).parent
      .else()
        .addAssignment(
          MAPPER.CTX_PARAM,
          `${MAPPER.CTX_PARAM}.createChild(${MAPPER.INPUT_PARAM}, ${MAPPER.OUTPUT_PARAM})`
        ).parent
        .parent;


    serializeContext.parent.insertBefore(ifBlock, serializeContext);
  }
}
