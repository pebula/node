import { CompilerCodeBlockContext, CompilerPropertyContext } from './context';

export type PropPartialReducer = (codeContext: CompilerCodeBlockContext, propContext: CompilerPropertyContext) => CompilerCodeBlockContext | void;

export function chainBlocks(codeContext: CompilerCodeBlockContext, propContext: CompilerPropertyContext, ...reducers: PropPartialReducer[]) {
  for (const c of reducers) {
    if (codeContext.terminated) {
      break;
    }
    codeContext = c(codeContext, propContext) || codeContext;
  }
  return codeContext;
}
