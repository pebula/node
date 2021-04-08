import { Code as C } from '@pebula/tom';
import { TYPE_VALIDATOR_INFO } from '../../../utils';
import { chainBlocks, ValidationCompilerHandler } from '../chain-blocks';
import { CompilerCodeBlockContext, CompilerPropertyContext } from '../context';
import { propertyValidatorValidationCompiler } from './validator-validation';

export function propertyValidatorCompiler(ctx: CompilerCodeBlockContext,
                                          prop: CompilerPropertyContext,
                                          propertyCodeBlocks: ValidationCompilerHandler[]) {
  const { propMeta } = prop;
  const validatorCompiler = prop.findValidatorCompiler(true); // throws if not found...

  const codeContext = chainBlocks(
    ctx,
    prop,
    ...propertyCodeBlocks
  );

  // write code if not terminated by global property validation compilers...
  if (!codeContext.terminated) {
    const typeCtx = propertyValidatorValidationCompiler(codeContext, prop, validatorCompiler, TYPE_VALIDATOR_INFO);

    // If we got back IfBlock, we're in the block of validation error, let's move to the "else" so the validations will only run if the type is correct
    const validationsBlock = typeCtx?.currentBlock.else() ?? codeContext.currentBlock;
    for (const validatorMeta of propMeta.validators) {
      propertyValidatorValidationCompiler(codeContext.clone(validationsBlock), prop, validatorCompiler, validatorMeta);
    }
    validatorCompiler.postValidationHandler?.(codeContext.clone(validationsBlock), prop);
  }
}
