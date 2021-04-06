import { CompilerCodeBlockContext, CompilerPropertyContext } from '../../compilation';

export function noop(codeContext: CompilerCodeBlockContext, propContext: CompilerPropertyContext) {
  return codeContext;
}
