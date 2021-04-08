import { TypeSystem } from '@pebula/tom';

export const BIG_INT_REGEX = /^(-?\d+)n$/;
export const DATE_REGEX = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)/;

export const ARRAY_BUFFER_KEY = 'ɵbufferɵ';

const ESC_REGEX = /'/;
export function escapeEnumValue(record: TypeSystem.EnumRecord) {
  return record.dual === true ? record.value : `'${record.value.replace(ESC_REGEX, `\'`)}'`;
}

export function escapeEnumLabel(record: TypeSystem.EnumRecord) {
  return `'${record.label.replace(ESC_REGEX, `\'`)}'`;
}
