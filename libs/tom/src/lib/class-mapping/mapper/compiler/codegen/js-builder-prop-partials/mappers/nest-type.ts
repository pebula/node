import * as C from '../../../../../../js-code-builder';
import { MAPPER, CompilerPropertyContext, CompilerCodeBlockContext } from '../../../compilation';
import { getForListIteration, getForMapIteration } from './utils';

export function nestedTypePropertyMapper(ctx: CompilerCodeBlockContext, prop: CompilerPropertyContext) {
  const schema = prop.tryFindClassMappingSchema();

  const childSchema = prop.context.setContextVar(schema);

  switch (prop.analyseContainerType('target')) {
    case 'none':
      const fnCall = new C.FunctionCall(ctx.currentBlock)
      .setFunctionName(`${childSchema}.transform`)
      .addParams(ctx.sourceAccessor, MAPPER.OPTIONS_PARAM, MAPPER.CTX_PARAM, MAPPER.LOCK_SYNC);

      ctx.currentBlock.addAssignment(ctx.targetSetter, fnCall);
      break;
    case 'list':
      getForListIteration(ctx, prop, varName => `${childSchema}.transform(${varName}, ${MAPPER.OPTIONS_PARAM}, ${MAPPER.CTX_PARAM}, ${MAPPER.LOCK_SYNC})` );
      break;
    case 'map':
      getForMapIteration(ctx, prop, varName => `${childSchema}.transform(${varName}, ${MAPPER.OPTIONS_PARAM}, ${MAPPER.CTX_PARAM}, ${MAPPER.LOCK_SYNC})` );
      break;
    default:
      // throw???
      break
  }

  return ctx;
}
