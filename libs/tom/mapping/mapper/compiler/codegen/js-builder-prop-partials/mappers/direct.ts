import { tryFindConverter } from '../../../../../converters';
import { CompilerPropertyContext, CompilerCodeBlockContext } from '../../../compilation';
import { getForListIteration, getForMapIteration } from './utils';

export function directPropertyMapper(ctx: CompilerCodeBlockContext, prop: CompilerPropertyContext) {
  let valueCodeGen = (varName: string) => varName ;

  const valueConverter = tryFindConverter(prop.propMapSchema.targetPropMeta, prop.propMapSchema.resolvedSourceType);
  if (valueConverter?.converter) {
    const valueConverterParam = prop.context.setContextVar(valueConverter.converter);

    if (valueConverter.type === 'value') {
      valueCodeGen = value => `${valueConverterParam}(${value})`;
    } else {
      valueCodeGen = value => `${valueConverterParam}(${value}, ${prop.schemaParam('resolvedSourceType')}.type, ${prop.schemaParam('targetPropMeta')}.enum)`;
    }
  }

  switch (prop.analyseContainerType('target')) {
    case 'none':
      ctx.currentBlock.addAssignment(ctx.targetSetter, valueCodeGen(ctx.sourceAccessor));
      break;
    case 'list':
      getForListIteration(ctx, prop, valueCodeGen);
      break;
    case 'map':
      getForMapIteration(ctx, prop, valueCodeGen);
      break;
    default:
      // throw???
      break
  }

  return ctx;
}
