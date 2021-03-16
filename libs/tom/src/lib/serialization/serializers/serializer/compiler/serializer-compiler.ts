import * as C from '../../../../js-code-builder';
import { ClassSerializerSchema } from '../../../serializer-schema';
import { SerializerOp } from '../../../types';
import { getSerializerContext } from '..//serializer-context';
import type { Serializer } from '../serializer';
import { MAPPER, ROOT } from './param-names';
import { chainBlocks } from './chain-blocks';
import { CompilerCodeBlockContext, CompilerContext } from './context';
import { getValueFromSourceCode, targetPropSetRef } from './utils';

export function compileClassSerializer<S extends Serializer,
                                       T,
                                       TOp extends SerializerOp,
                                       TData = any>(classSerializerSchema: ClassSerializerSchema<S, T, TOp, TData>): ClassSerializerSchema<S, T, TOp>['transform'] {
  const context = CompilerContext.create(classSerializerSchema);
  const serializerContext = getSerializerContext(classSerializerSchema.serializer);
  const { initVirtualBlock, disposeVirtualBlock } = generateSerializerFunction(context);

  const mainBlock = context.currentBlock;

  for (const propContext of context.generator) {
    const typeDef = propContext.propMapSchema.targetPropMeta.typeDef;
    const typeCompilerHandler = serializerContext.findTypeCompilerHandler(typeDef.type, context.isSerialize);

    const propertyCodeBlocks = serializerContext.propertyBlockCompilers.map( c => context.isSerialize ? c.serializer : c.deserializer).filter( c => !!c);
    context.currentBlock = mainBlock.addVirtualBlock();
    const codeContext = new CompilerCodeBlockContext(context.currentBlock,
                                                     getValueFromSourceCode(propContext),
                                                     targetPropSetRef(propContext));
    chainBlocks(codeContext, propContext, ...propertyCodeBlocks, typeCompilerHandler);
  }

  context.currentBlock = mainBlock;

  serializerContext.fnInitCompiler?.(initVirtualBlock, context);
  const outputValue = context.isSerialize ? '{}' : `new ${ROOT.CLASS_SERIALIZER_SCHEMAS_PARAM}.target()`;
  initVirtualBlock.addVariable(true, MAPPER.OUTPUT_PARAM, outputValue);

  serializerContext.fnDisposeCompiler?.(disposeVirtualBlock, context);

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
