import { Code as C, TypeSystem } from '@pebula/tom';
import { enumMappingRegistry } from '../../../../enum-mapping';
import { MapperTypeCompiler, MapperTypeCompilerHandler, mapperTypeCompilerRegistry } from '../../compilation';
import { unsupportedMappingSource } from '../../errors';

export const enumNativeHandler: (enumValueType: 'string' | 'number') => MapperTypeCompilerHandler = enumValueType => (ctx, prop) => {

  const enumType = prop.propMapSchema.targetPropMeta.type as TypeSystem.EnumClassType;

  const ifBlock = new C.IfBlock(ctx.currentBlock);
  let conditionalBlock: C.ConditionalBlock<C.Block<C.Block<any>>>;

  for (let i = 0, len = enumType.records.length; i < len; i ++) {
    const record = enumType.records[i];
    if (typeof record.value === enumValueType) {
      conditionalBlock = conditionalBlock ? ifBlock.elseIf() : ifBlock;
      conditionalBlock
        .setCondition(`${ctx.sourceAccessor} === ${escapeEnumValue(record)}`)
        .addAssignment(ctx.targetSetter, ctx.sourceAccessor)
    }
  }
  if (conditionalBlock) {
    ctx.currentBlock.add(ifBlock);
  }
};

export const enumCompiler = new MapperTypeCompiler('enum')
  .setHandler('enum', (ctx, prop) => {
    const targetEnum = prop.propMapSchema.targetPropMeta.enum;
    const sourceEnum = prop.propMapSchema.sourcePropMeta.enum;

    // For identical enums, directly assign
    if (sourceEnum === targetEnum) {
      ctx.currentBlock.addAssignment(ctx.targetSetter, ctx.sourceAccessor);
    } else {
      const schema = enumMappingRegistry.get(sourceEnum, targetEnum);
      if (schema) {
        const schemaParam = prop.context.setContextVar(schema);
        ctx.currentBlock.addAssignment(ctx.targetSetter, `${schemaParam}.get(${ctx.sourceAccessor})`);
      } else {
        const { typeMapSchema } = prop.context;
        throw unsupportedMappingSource('enum', 'enum', typeMapSchema.source, typeMapSchema.target, prop.propMapSchema.targetKey as string);
      }
    }
  })
  .setHandler('number', enumNativeHandler('number'))
  .setHandler('string', enumNativeHandler('string'));

const ESC_REGEX = /'/;
function escapeEnumValue(record: TypeSystem.EnumRecord) {
  return record.dual === true ? record.value : `'${record.value.replace(ESC_REGEX, `\'`)}'`;
}

mapperTypeCompilerRegistry.set(enumCompiler);
