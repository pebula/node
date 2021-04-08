import { TypeSystem } from '@pebula/tom';
import { TypeValidatorCompiler } from '../../../validator';
import { escapeEnumValue } from '../../utils';

export const literal = new TypeValidatorCompiler('literal')
  .setHandler('type', (ctx, prop, validatorMeta) => {
    const literal = prop.propMeta.typeDef as TypeSystem.TomTypeInstance<'literal'>;

    const block = ctx.currentBlock
      .addIfBlock()
      .setCondition(`${ctx.sourceAccessor} !== ${JSON.stringify(literal.typeParams)}`);
    return ctx.clone(block);
  });
