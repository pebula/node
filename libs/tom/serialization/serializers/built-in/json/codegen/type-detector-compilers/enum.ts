import { Code as C, TypeSystem } from '@pebula/tom';
import { CompilerCodeBlockContext, CompilerPropertyContext } from '../../../../serializer';
import { JsonSerializer } from '../../json';
import { escapeEnumLabel, escapeEnumValue } from '../utils';

export function enumsSerialize(ctx: CompilerCodeBlockContext<C.ConditionalBlock<any>>, prop: CompilerPropertyContext<JsonSerializer>) {
  const enumType = prop.propMapSchema.targetPropMeta.type as TypeSystem.EnumClassType;

  const predicates = enumType.records.map( record => `${ctx.sourceAccessor} === ${escapeEnumValue(record)}`);

  const block = ctx.currentBlock.setCondition(`(typeof ${ctx.sourceAccessor} === 'string' || typeof ${ctx.sourceAccessor} === 'number') && (${predicates.join(' || ')})`);
  return ctx.clone(block);
}

export function enumsDeserialize(ctx: CompilerCodeBlockContext<C.ConditionalBlock<any>>, prop: CompilerPropertyContext<JsonSerializer>) {
  const { enumAsLabels } = prop.context.options;
  const enumType = prop.propMapSchema.targetPropMeta.type as TypeSystem.EnumClassType;

  const predicates = enumAsLabels
    ? enumType.records.map( record => `${ctx.sourceAccessor} === ${escapeEnumLabel(record)}`)
    : enumType.records.map( record => `${ctx.sourceAccessor} === ${escapeEnumValue(record)}`)
  ;

  const block = ctx.currentBlock.setCondition(`(typeof ${ctx.sourceAccessor} === 'string' || typeof ${ctx.sourceAccessor} === 'number') && (${predicates.join(' || ')})`);
  return ctx.clone(block);
}
