import { Code as C } from '@pebula/tom';
import { ValidatorInfo } from '../../../../known-validators';
import { REQUIRED_VALIDATOR_INFO, TYPE_VALIDATOR_INFO } from '../../../utils';
import { addValidationError } from '../../class-validator-context';
import { setToGlobal } from '../global';
import { MAPPER } from '../param-names';
import { CompilerPropertyContext } from '../context';

const ADD_VALIDATION_ERROR_PARAM = setToGlobal(addValidationError);

const FIXED_VALIDATORS = new Map<ValidatorInfo, string>([
  [REQUIRED_VALIDATOR_INFO, setToGlobal(REQUIRED_VALIDATOR_INFO)],
  [TYPE_VALIDATOR_INFO, setToGlobal(TYPE_VALIDATOR_INFO)],
]);

export function createAddErrorCode(block: C.Block<C.Block<any>>, prop: CompilerPropertyContext, validatorMeta: ValidatorInfo) {
  let validatorMetaCode: string;
  const index = prop.propMeta.validators.indexOf(validatorMeta);
  validatorMetaCode = index === -1
    ? FIXED_VALIDATORS.get(validatorMeta) || `{ id: ${JSON.stringify(validatorMeta.id)} }`
    : `${prop.schemaParam('validators')}[${index}]`
  ;

  const code = `${ADD_VALIDATION_ERROR_PARAM}(${MAPPER.CTX_PARAM}, ${prop.schemaParam()}, ${validatorMetaCode})`;
  block.addCodeExpression(code);
  if (prop.context.options.shortCircuit) {
    block.addCodeExpression(`return ${MAPPER.CTX_PARAM}.result`);
  }
}
