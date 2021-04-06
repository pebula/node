import { ValidatorInfo } from '../../../known-validators';
import { CompilerCodeBlockContext, CompilerPropertyContext } from './context';

export type PropPartialReducer = (codeContext: CompilerCodeBlockContext, propContext: CompilerPropertyContext, validatorMeta: ValidatorInfo) => CompilerCodeBlockContext | void;

export function chainBlocks(codeContext: CompilerCodeBlockContext, propContext: CompilerPropertyContext, validatorMeta: ValidatorInfo, ...reducers: PropPartialReducer[]) {
  for (const c of reducers) {
    if (codeContext.terminated) {
      break;
    }
    codeContext = c(codeContext, propContext, validatorMeta) || codeContext;
  }
  return codeContext;
}
