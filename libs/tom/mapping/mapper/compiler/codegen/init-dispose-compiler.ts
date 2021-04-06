import { Code as C } from '@pebula/tom';
import { invalidDataObjectError } from '../../runtime/errors';
import { ClassMappingContext } from '../../class-mapping-schema-context';
import { setToGlobal, MAPPER, ROOT, CompilerContext } from '../compilation';

const INVALID_DATA_OBJECT_ERROR_PARAM = setToGlobal(invalidDataObjectError);
const TYPE_MAP_CONTEXT_TYPE_PARAM = setToGlobal(ClassMappingContext);

export function generateMapperInitCode(currentBlock: C.Block<C.Block<any>>, context: CompilerContext) {
  currentBlock
    .addVariable(true, MAPPER.OUTPUT_PARAM, `${MAPPER.OPTIONS_PARAM}.target || new ${ROOT.TYPE_MAP_SCHEMAS_PARAM}.target()`);

  const block = currentBlock
    .addIfBlock()
      .setCondition(`!${MAPPER.LOCK_SYNC}`)
        .addCodeExpression(`${MAPPER.LOCK_SYNC} = new Map()`).parent
      .parent;

  block.addCodeExpression(`${MAPPER.LOCK_SYNC}.set(${MAPPER.INPUT_PARAM}, ${MAPPER.OUTPUT_PARAM})`);

  /**
   * Returns code that implements the logic required for handling `ClassMappingSchema.verifyData`.
   * If `ClassMappingSchema.verifyData` is not set return undefined.
   */
  if (typeof context.typeMapSchema.verifyData === 'function') {
    currentBlock
      .addVariable(true, 'verifyResult', `${ROOT.TYPE_MAP_SCHEMAS_PARAM}.verifyData(${MAPPER.OPTIONS_PARAM}.data, ${MAPPER.INPUT_PARAM})`).parent
      .addIfBlock()
        .setCondition(`verifyResult !== true`)
        .addCodeExpression(`throw ${INVALID_DATA_OBJECT_ERROR_PARAM}(${ROOT.TYPE_MAP_SCHEMAS_PARAM}.source, ${ROOT.TYPE_MAP_SCHEMAS_PARAM}.target, verifyResult)`).parent
      .parent
  }
}

export function generateMapperDisposeCode(currentBlock: C.Block<C.Block<any>>, context: CompilerContext) {
  const serializeContext = context.getState('serializeContextLocation');
  if (serializeContext) {
    const ifBlock = new C.IfBlock(serializeContext.parent)
      .setCondition(`!${MAPPER.CTX_PARAM}`)
        .addAssignment(
          MAPPER.CTX_PARAM,
          `new ${TYPE_MAP_CONTEXT_TYPE_PARAM}(${MAPPER.INPUT_PARAM}, ${MAPPER.OUTPUT_PARAM}, ${MAPPER.OPTIONS_PARAM})`
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
