import { Code as C } from '@pebula/tom';
import { Constraint } from '../../../../constraints';
import { REQUIRED_VALIDATOR_INFO, TYPE_VALIDATOR_INFO } from '../../../utils';
import { setToGlobal } from '../global';
import { MAPPER } from '../param-names';
import { CompilerCodeBlockContext, CompilerPropertyContext } from '../context';

const FIXED_VALIDATORS = new Map<Constraint, string>([
  [REQUIRED_VALIDATOR_INFO, setToGlobal(REQUIRED_VALIDATOR_INFO)],
  [TYPE_VALIDATOR_INFO, setToGlobal(TYPE_VALIDATOR_INFO)],
]);

/**
 * @param block the code block to append the code error generation to, if not set `CompilerCodeBlockContext.currentBlock` is used
 */
export function createAddErrorCode(ctx: CompilerCodeBlockContext,
                                   prop: CompilerPropertyContext,
                                   validatorMeta: Constraint,
                                   block?: C.Block<C.Block<any>>) {
  let validatorMetaCode: string;
  const index = prop.propMeta.validators.indexOf(validatorMeta);
  validatorMetaCode = index === -1
    ? FIXED_VALIDATORS.get(validatorMeta) || `{ id: ${JSON.stringify(validatorMeta.id)} }`
    : `${prop.schemaParam('validators')}[${index}]`
  ;

  const code = `${MAPPER.CTX_PARAM}.addValidationError(${ctx.sourceAccessor}, ${prop.schemaParam()}, ${validatorMetaCode})`;
  if (!block) {
    block = ctx.currentBlock;
  }
  block.addCodeExpression(code);
  if (prop.context.options.shortCircuit) {
    block.addCodeExpression(`return ${MAPPER.CTX_PARAM}.result`);
  }
}
