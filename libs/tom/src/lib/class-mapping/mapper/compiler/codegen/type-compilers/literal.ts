import { TypeSystem } from '../../../../../schema';
import { MapperTypeCompiler, MapperTypeCompilerHandler, mapperTypeCompilerRegistry } from '../../compilation';
import { directAssign } from './utils';

export const literalHandler: MapperTypeCompilerHandler = (ctx, prop) => {
  const literal = prop.propMapSchema.targetPropMeta.typeDef as TypeSystem.TomTypeInstance<'literal'>;
  ctx.currentBlock
    .addIfBlock()
      .setCondition(`${ctx.sourceAccessor} === ${JSON.stringify(literal.typeParams)}`)
        .addAssignment(ctx.targetSetter, ctx.sourceAccessor);
};

export const literal = new MapperTypeCompiler('literal')
  .setHandler('literal', directAssign)
  .setHandler('boolean', literalHandler)
  .setHandler('number', literalHandler)
  .setHandler('string', literalHandler);

mapperTypeCompilerRegistry.set(literal);
