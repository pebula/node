import { CompilerCodeBlockContext, CompilerPropertyContext } from '../../local-context';

export function noop(codeContext: CompilerCodeBlockContext, propContext: CompilerPropertyContext) {
  return codeContext;
}
