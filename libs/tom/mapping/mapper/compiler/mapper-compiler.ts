import { Code as C } from '@pebula/tom';
import { ClassMappingSchema } from '../../mapping-schema';
import { generateMapperInitCode, generateMapperDisposeCode, generatePropertyMap } from './codegen';
import { getValueFromSourceCode, targetPropSetRef } from './codegen/js-builder-prop-partials/mappers/utils';
import { CompilerContext, CompilerCodeBlockContext, MAPPER } from './compilation';

export function tomMapperCompiler<S, T, TData = any>(typeMapSchema: ClassMappingSchema<S, T, TData>): ClassMappingSchema<S, T>['transform'] {
  const context = CompilerContext.create(typeMapSchema);
  const { initVirtualBlock, disposeVirtualBlock } = generateSerializerFunction(context);

  const mainBlock = context.currentBlock;

  for (const prop of context.generator) {
    context.currentBlock = mainBlock.addVirtualBlock();
    const codeContext = new CompilerCodeBlockContext(context.currentBlock,
                                                     getValueFromSourceCode(prop),
                                                     targetPropSetRef(prop));

    generatePropertyMap(codeContext, prop);
  }

  context.currentBlock = mainBlock;

  generateMapperInitCode(initVirtualBlock, context);
  generateMapperDisposeCode(disposeVirtualBlock, context);

  const compiled = new Function(...context.fnContext.keys(), context.program.generateCode());
  return compiled.bind(undefined, ...context.fnContext.values())();
}

export function generateSerializerFunction(context: CompilerContext) {
  let initVirtualBlock: C.VirtualBlock<C.FunctionBlock<C.Program<any>>>;
  let disposeVirtualBlock: C.VirtualBlock<C.FunctionBlock<C.Program<any>>>;

  context.program
    .addReturnDeclaration(new C.FunctionBlock(context.program))
    .returnExpression.addParams(MAPPER.INPUT_PARAM, MAPPER.OPTIONS_PARAM, MAPPER.CTX_PARAM, MAPPER.LOCK_SYNC) // FunctionBlock
      // Body of function block
      .addVirtualBlock().use( c => initVirtualBlock = c).parent
      .addVirtualBlock().use( c => context.currentBlock = c ).parent
      .addVirtualBlock().use( c => disposeVirtualBlock = c).parent
      .addReturnDeclaration(MAPPER.OUTPUT_PARAM);

  return { initVirtualBlock, disposeVirtualBlock };
}
