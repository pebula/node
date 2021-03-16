
import * as C from '../../../../../../js-code-builder';
import { EnumClassType, EnumRecord } from '../../../../../../schema/type-system';
import { CompilerCodeBlockContext, CompilerPropertyContext } from '../../../../serializer';
import { JsonSerializer } from '../../json';

export function enumsSerialize(ctx: CompilerCodeBlockContext<C.ConditionalBlock<any>>, prop: CompilerPropertyContext<JsonSerializer>) {
  const enumType = prop.propMapSchema.targetPropMeta.type as EnumClassType;

  const predicates = enumType.records.map( record => `${ctx.sourceAccessor} === ${escapeEnumValue(record)}`);

  const block = ctx.currentBlock.setCondition(`(typeof ${ctx.sourceAccessor} === 'string' || typeof ${ctx.sourceAccessor} === 'number') && (${predicates.join(' || ')})`);
  return ctx.clone(block);
}

export function enumsDeserialize(ctx: CompilerCodeBlockContext<C.ConditionalBlock<any>>, prop: CompilerPropertyContext<JsonSerializer>) {
  const { enumAsLabels } = prop.context.options;
  const enumType = prop.propMapSchema.targetPropMeta.type as EnumClassType;

  const predicates = enumAsLabels
    ? enumType.records.map( record => `typeof ${ctx.sourceAccessor} === 'string' && ${ctx.sourceAccessor} === ${escapeEnumLabel(record)}`)
    : enumType.records.map( record => `(typeof ${ctx.sourceAccessor} === 'string' || typeof ${ctx.sourceAccessor} === 'number') && ${ctx.sourceAccessor} === ${escapeEnumValue(record)}`)
  ;

  const block = ctx.currentBlock.setCondition(predicates.join(' || '));
  return ctx.clone(block);
}

const ESC_REGEX = /'/;
function escapeEnumValue(record: EnumRecord) {
  return record.dual === true ? record.value : `'${record.value.replace(ESC_REGEX, `\'`)}'`;
}

function escapeEnumLabel(record: EnumRecord) {
  return `'${record.label.replace(ESC_REGEX, `\'`)}'`;
}
