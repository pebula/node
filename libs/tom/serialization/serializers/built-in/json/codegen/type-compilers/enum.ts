
import { Code as C, TypeSystem } from '@pebula/tom';
import { CompilerCodeBlockContext, CompilerPropertyContext } from '../../../../serializer';
import { JsonSerializer } from '../../json';

export function enumSerialize(ctx: CompilerCodeBlockContext, prop: CompilerPropertyContext<JsonSerializer>) {
  const { enumAsLabels } = prop.context.options;
  const enumType = prop.propMapSchema.targetPropMeta.type as TypeSystem.EnumClassType;

  if (enumType.records.length > 0) {
    if (!enumAsLabels) {
      ctx.currentBlock
        .addAssignment(ctx.targetSetter, ctx.sourceAccessor).parent
    } else {
      const ifBlock = ctx.currentBlock.addIfBlock();
      let conditionalBlock: C.ConditionalBlock<C.Block<C.Block<any>>>;

      for (let i = 0, len = enumType.records.length; i < len; i ++) {
        const record = enumType.records[i];
        conditionalBlock = conditionalBlock ? ifBlock.elseIf() : ifBlock;
        conditionalBlock
          .setCondition(`${ctx.sourceAccessor} === ${escapeEnumValue(record)}`)
          .addAssignment(ctx.targetSetter, escapeEnumLabel(record));
      }
    }
  }
}

export function enumDeserialize(ctx: CompilerCodeBlockContext, prop: CompilerPropertyContext<JsonSerializer>) {
  const { enumAsLabels } = prop.context.options;
  const enumType = prop.propMapSchema.targetPropMeta.type as TypeSystem.EnumClassType;

  const ifBlock = ctx.currentBlock.addIfBlock();
  let conditionalBlock: C.ConditionalBlock<C.Block<C.Block<any>>>;

  if (!enumAsLabels) {
    for (let i = 0, len = enumType.records.length; i < len; i ++) {
      const record = enumType.records[i];
      conditionalBlock = conditionalBlock ? ifBlock.elseIf() : ifBlock;
      conditionalBlock
        .setCondition(`${ctx.sourceAccessor} === ${escapeEnumValue(record)}`)
        .addAssignment(ctx.targetSetter, ctx.sourceAccessor)
    }
  } else {
    for (let i = 0, len = enumType.records.length; i < len; i ++) {
      const record = enumType.records[i];
      conditionalBlock = conditionalBlock ? ifBlock.elseIf() : ifBlock;
      conditionalBlock
        .setCondition(`${ctx.sourceAccessor} === ${escapeEnumLabel(record)}`)
        .addAssignment(ctx.targetSetter, escapeEnumValue(record).toString())
    }
  }
}

const ESC_REGEX = /'/;
function escapeEnumValue(record: TypeSystem.EnumRecord) {
  return record.dual === true ? record.value : `'${record.value.replace(ESC_REGEX, `\'`)}'`;
}

function escapeEnumLabel(record: TypeSystem.EnumRecord) {
  return `'${record.label.replace(ESC_REGEX, `\'`)}'`;
}
