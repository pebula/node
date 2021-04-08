import { TypeSystem } from '@pebula/tom';

const ESC_REGEX = /'/;

export function escapeEnumValue(record: TypeSystem.EnumRecord) {
  return record.dual === true ? record.value : `'${record.value.replace(ESC_REGEX, `\'`)}'`;
}

export function escapeEnumLabel(record: TypeSystem.EnumRecord) {
  return `'${record.label.replace(ESC_REGEX, `\'`)}'`;
}


