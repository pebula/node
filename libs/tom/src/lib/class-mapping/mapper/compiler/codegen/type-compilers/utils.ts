import * as C from '../../../../../js-code-builder';
import { transform } from '../../../runtime/transform';
import { lazySetGlobal, MAPPER, MapperTypeCompilerHandler, CompilerCodeBlockContext, CompilerPropertyContext } from '../../compilation';

export const BIG_INT_REGEX = /^(-?\d+)n$/;
export const directAssign: MapperTypeCompilerHandler = ctx => { ctx.currentBlock.addAssignment(ctx.targetSetter, ctx.sourceAccessor) };

const DYNAMIC_TRANSFORM_METHOD_PARAM = lazySetGlobal(() => transform);

export function dynamicPropertyMapper(ctx: CompilerCodeBlockContext, prop: CompilerPropertyContext) {
  const fnCall = new C.FunctionCall(ctx.currentBlock)
    .setFunctionName(DYNAMIC_TRANSFORM_METHOD_PARAM.globalParamName)
    .addParams(
      MAPPER.CTX_PARAM,
      ctx.sourceAccessor,
      prop.schemaParam('targetPropMeta'),
      prop.schemaParam('sourcePropMeta'),
    );

  ctx.currentBlock.addAssignment(ctx.targetSetter, fnCall);


  if (!prop.context.getState('serializeContextLocation')) {
    prop.context.setState('serializeContextLocation', ctx.currentBlock);
  }

  return ctx;
}
