import { Code as C, TypeSystem } from '@pebula/tom';
import { CompilerCodeBlockContext, CompilerPropertyContext, mapperTypeDetectorCompilerRegistry } from '../../compilation';

export function enumTypeDetectorCompiler(ctx: CompilerCodeBlockContext<C.ConditionalBlock<any>>, prop: CompilerPropertyContext) {
  const enumType = prop.propMapSchema.targetPropMeta.type as TypeSystem.EnumClassType;

  const predicates = enumType.records.map( record => `${ctx.sourceAccessor} === ${escapeEnumValue(record)}`);

  const block = ctx.currentBlock.setCondition(`(typeof ${ctx.sourceAccessor} === 'string' || typeof ${ctx.sourceAccessor} === 'number') && (${predicates.join(' || ')})`);
  return ctx.clone(block);
}

const ESC_REGEX = /'/;
function escapeEnumValue(record: TypeSystem.EnumRecord) {
  return record.dual === true ? record.value : `'${record.value.replace(ESC_REGEX, `\'`)}'`;
}

mapperTypeDetectorCompilerRegistry
  .set('enum', enumTypeDetectorCompiler);
