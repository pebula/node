import { Code as C, Schema } from '@pebula/tom';
import { ClassValidationSchema } from '../../../schema';
import { invalidOrMissingValidator } from '../../errors';
import { getValidatorContext } from '../validator-context';
import type { Validator } from '../validator';
import { MAPPER } from './param-names';
import { chainBlocks } from './chain-blocks';
import { CompilerCodeBlockContext, CompilerContext } from './context';
import { getValueFromSourceCode } from './utils';

export function compileClassValidator<S extends Validator,
                                      T,
                                      TData = any>(classValidationSchema: ClassValidationSchema<S, T, TData>): ClassValidationSchema<S, T>['validate'] {
  const context = CompilerContext.create(classValidationSchema);
  const validatorContext = getValidatorContext(classValidationSchema.validator);
  const { initVirtualBlock, disposeVirtualBlock } = generateValidatorFunction(context);

  const mainBlock = context.currentBlock;

  for (const propContext of context.generator) {
    const { propMeta } = propContext;
    for (const validatorMeta of propMeta.validators) {
      const propertyCodeBlocks = validatorContext.propertyBlockCompilers.map( c => c?.findHandler()).filter( c => !!c);

      const validatorCompiler = validatorContext.findValidatorCompiler(propMeta.typeDef.type)?.findHandler(validatorMeta.id);

      if (validatorCompiler) {
        propertyCodeBlocks.push(validatorCompiler);
      } else {
        throw invalidOrMissingValidator(classValidationSchema.validator, classValidationSchema.target, propMeta.name as string, validatorMeta, 'jit');
      }
      context.currentBlock = mainBlock.addVirtualBlock();
      const codeContext = new CompilerCodeBlockContext(context.currentBlock, getValueFromSourceCode(propContext));
      chainBlocks(codeContext, propContext, validatorMeta, ...propertyCodeBlocks);
    }
  }

  context.currentBlock = mainBlock;

  validatorContext.fnInitCompiler?.(initVirtualBlock, context);
  validatorContext.fnDisposeCompiler?.(disposeVirtualBlock, context);

  const compiled = new Function(...context.fnContext.keys(), context.program.generateCode());
  return compiled.bind(undefined, ...context.fnContext.values())();
}

export function generateValidatorFunction(context: CompilerContext) {
  let initVirtualBlock: C.VirtualBlock<C.FunctionBlock<C.Program<any>>>;
  let disposeVirtualBlock: C.VirtualBlock<C.FunctionBlock<C.Program<any>>>;

  context.program
    .addReturnDeclaration(new C.FunctionBlock(context.program))
    .returnExpression.addParams(MAPPER.INPUT_PARAM, MAPPER.OPTIONS_PARAM, MAPPER.CTX_PARAM, MAPPER.LOCK_SYNC) // FunctionBlock
      // Body of function block
      .addVirtualBlock().use( c => initVirtualBlock = c).parent
      .addVirtualBlock().use( c => context.currentBlock = c ).parent
      .addVirtualBlock().use( c => disposeVirtualBlock = c).parent
      .addReturnDeclaration(`${MAPPER.CTX_PARAM}.result`);

  return { initVirtualBlock, disposeVirtualBlock };
}
