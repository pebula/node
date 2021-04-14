import { Code as C } from '@pebula/tom';
import { missingValidator } from '../../../errors';
import { Constraint } from '../../../../constraints';
import { TypeValidatorCompiler } from '../../validator-components';
import { runTypeValidationBlock } from '../chain-blocks';
import { CompilerCodeBlockContext, CompilerPropertyContext } from '../context';
import { createAddErrorCode } from './add-validation-error';

/**
 * Generate code for a single validation on a property
 */
export function propertyValidatorValidationCompiler(ctx: CompilerCodeBlockContext,
                                                    prop: CompilerPropertyContext,
                                                    validatorCompiler: TypeValidatorCompiler,
                                                    constraint: Constraint): CompilerCodeBlockContext<C.IfBlock<C.Block<any>>> | undefined {
  const validatorCompilerHandler = validatorCompiler.findHandler(constraint.id);
  if (!validatorCompilerHandler) {
    const { classValidationSchema } = prop.context;
    throw missingValidator(classValidationSchema.validator, classValidationSchema.target, prop.propMeta.name as string, prop.propMeta.typeDef, constraint, 'jit');
  }
  const returnedValidationCtxBlock = runTypeValidationBlock(ctx.clone(ctx.currentBlock.addVirtualBlock()), prop, constraint, validatorCompilerHandler);
  if (returnedValidationCtxBlock) {
    createAddErrorCode(returnedValidationCtxBlock, prop, constraint);
  }
  return returnedValidationCtxBlock;
}

