import { Code as C } from '@pebula/tom';
import { ClassValidationSchema } from '../../../../schema';
import type { Validator } from '../../validator';
import { MAPPER } from './../param-names';
import { CompilerCodeBlockContext, CompilerContext } from '../context';
import { getValueFromSourceCode } from '../utils';
import { propertyValidatorCompiler } from './property-validator';

/**
 * Return a JIT function for an entire class schema
 * This function can be used to validate any instance of the class T.
 */
export function schemaValidatorCompiler<S extends Validator,
                                        T,
                                        TData = any>(classValidationSchema: ClassValidationSchema<S, T, TData>): ClassValidationSchema<S, T>['validate'] {
  const context = CompilerContext.create(classValidationSchema);
  const { initVirtualBlock, disposeVirtualBlock } = generateValidatorFunction(context);

  const mainBlock = context.currentBlock;
  const propertyCodeBlocks = context.validatorContext.propertyBlockCompilers.map( c => c.handler ).filter( c => !!c);

  for (const propContext of context.generator) {
    context.currentBlock = mainBlock.addVirtualBlock();
    propertyValidatorCompiler(
      new CompilerCodeBlockContext(context.currentBlock, getValueFromSourceCode(propContext)),
      propContext,
      propertyCodeBlocks,
    );
  }

  context.currentBlock = mainBlock;

  context.validatorContext.fnInitCompiler?.(initVirtualBlock, context);
  context.validatorContext.fnDisposeCompiler?.(disposeVirtualBlock, context);

  const compiled = new Function(...context.fnContext.keys(), context.program.generateCode());
  return compiled.bind(undefined, ...context.fnContext.values())();
}

function generateValidatorFunction(context: CompilerContext) {
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
