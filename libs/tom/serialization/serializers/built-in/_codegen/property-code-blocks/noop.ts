import { CompilerCodeBlockContext, CompilerPropertyContext } from '../../../serializer';

export function noop(codeContext: CompilerCodeBlockContext, propContext: CompilerPropertyContext) {
  return codeContext;
}
