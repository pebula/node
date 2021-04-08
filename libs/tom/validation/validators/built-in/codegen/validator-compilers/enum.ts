import { TypeSystem } from '@pebula/tom';
import { TypeValidatorCompiler } from '../../../validator';
import { escapeEnumValue } from '../../utils';

export const enumValidatorCompiler = new TypeValidatorCompiler('enum')
  .setHandler('type', (ctx, prop, validatorMeta) => {
    const enumType = prop.propMeta.type as TypeSystem.EnumClassType;

    if (enumType.records.length <= 5) {
      const predicates = enumType.records.map( record => `${ctx.sourceAccessor} !== ${escapeEnumValue(record)}`);
      const block = ctx.currentBlock
        .addIfBlock()
        .setCondition(`${predicates.join(' && ')}`);
      return ctx.clone(block);
    } else {
      const block = ctx.currentBlock
        .addIfBlock()
        .setCondition(`${prop.schemaParam('type')}.values.indexOf(${ctx.sourceAccessor}) === -1`);
      return ctx.clone(block);
    }

  });
