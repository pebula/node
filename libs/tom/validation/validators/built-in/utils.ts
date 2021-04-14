import { TypeSystem, Schema } from '@pebula/tom';
const ESC_REGEX = /'/;

export const ALPHA_REGEX = /^[A-Za-z]+$/;
export const ALPHA_NUMERIC_REGEX = /^[A-Za-z0-9]+$/;

export function escapeEnumValue(record: TypeSystem.EnumRecord) {
  return record.dual === true ? record.value : `'${record.value.replace(ESC_REGEX, `\'`)}'`;
}

export function escapeEnumLabel(record: TypeSystem.EnumRecord) {
  return `'${record.label.replace(ESC_REGEX, `\'`)}'`;
}

