

import { CompilerCodeBlockContext, CompilerPropertyContext } from '../../local-context';

export function filterIfSkipValidation(codeContext: CompilerCodeBlockContext, propContext: CompilerPropertyContext) {
  if (propContext.propMeta.skipValidation) {
    codeContext.stopPropagation();
  };
}
