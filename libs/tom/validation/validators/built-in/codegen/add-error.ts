import { MAPPER, setToGlobal } from '../../validator/compiler';
import { CompilerCodeBlockContext, CompilerPropertyContext } from '../local-context';
import { ValidatorInfo } from '../../../known-validators';
import { addValidationError } from '../add-error';

const ADD_VALIDATION_ERROR_PARAM = setToGlobal(addValidationError);

export function createAddErrorCode(ctx: CompilerCodeBlockContext, prop: CompilerPropertyContext, validatorMeta: ValidatorInfo) {
  const index = prop.propMeta.validators.indexOf(validatorMeta);
  return `${ADD_VALIDATION_ERROR_PARAM}(${MAPPER.CTX_PARAM}, ${prop.schemaParam()}, ${prop.schemaParam('validators')}[${index}])`;
}
