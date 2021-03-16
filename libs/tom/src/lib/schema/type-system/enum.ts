import { Type } from '@pebula/decorate';

interface EnumAlphaRecord {
  label: string;
  value: string;
  dual: false;
}

interface EnumNumericRecord {
  label: string;
  value: number;
  dual: true;
}

export type EnumRecord = EnumAlphaRecord | EnumNumericRecord;

export interface Enum {
  [key: string]: string | number;
}

export type EnumClassType<T extends Enum = Enum> = Type<any> & {
  readonly records: ReadonlyArray<EnumRecord>;
  readonly values: ReadonlyArray<string | number>;
  readonly labels: ReadonlyArray<string>;

  /**
   * If `String` it's a pure string based enum, with string values only, no numeric values.
   * If `Number` it's a pure number based enum, with numeric values only, no string values.
   * If `Object` it's a mixed enum with both numeric and string values.
   */
  readonly constraint: typeof String | typeof Number | typeof Object;
  readonly type: T;

  findByLabel(label: string): EnumRecord | undefined;
  findByValue(value: string | number): EnumRecord | undefined;
}

const ENUMS_MAP = new WeakMap<Enum, EnumClassType>();
const ENUM_CONTAINER = Symbol('ENUM_CONTAINER');

function analyzeEnum<T extends Enum>(enumType: T): Pick<EnumClassType, 'records' | 'constraint' | 'values' | 'labels'> {
  const records: EnumRecord[] = [];
  const values: Array<string | number> = [];
  const labels: string[] = [];

  let enumConstraint = 0;
  for (const [label, value] of Object.entries(enumType)) {
    if (typeof value !== 'number') {
       const maybeNumericValue = enumType[value];
       if (typeof maybeNumericValue === 'number') { // EnumNumericRecord
        const record = records.find( r => r.dual && r.value === maybeNumericValue) as EnumNumericRecord;
        if (!record) {
          records.push({ label: value, value: maybeNumericValue, dual: true });
          values.push(maybeNumericValue);
          labels.push(value);
          enumConstraint = enumConstraint | 1;
        } else if (record.label !== value) {
          throw new Error('Invalid Enum.');
        }
       } else { // EnumAlphaRecord
        enumConstraint = enumConstraint | 2;
        records.push({ label, value, dual: false });
        values.push(value);
        labels.push(label);
       }
    } else {
      const recordIndex = records.findIndex( r => r.dual && r.value === value);
      if (recordIndex === -1) {
        enumConstraint = enumConstraint | 1;
        records.push({ label, value, dual: true });
        values.push(value);
        labels.push(label);
      } else {
        const record = records[recordIndex] as EnumNumericRecord;
        if (record.label !== label) {
          throw new Error('Invalid Enum.');
        } else {
          records.splice(recordIndex, 1);
          values.splice(recordIndex, 1);
          labels.splice(recordIndex, 1);
          records.push(record);
          values.push(record.value);
          labels.push(record.label);
        }
      }
    }
  }


  return {
    records: Object.freeze(records),
    values: Object.freeze(values),
    labels: Object.freeze(labels),
    constraint: enumConstraint === 1 ? Number : enumConstraint === 2 ? String : Object,
  };
}

export function EnumClass<T extends Enum>(enumType: T): EnumClassType<T> {
  if (ENUMS_MAP.has(enumType)) {
    return ENUMS_MAP.get(enumType) as any;
  }

  const { records, constraint, values, labels } = analyzeEnum(enumType);
  class EnumWrapper {
    static readonly records = records;
    static readonly values = values;
    static readonly labels = labels;
    static readonly constraint = constraint;
    static readonly type: T = enumType;
    static readonly [ENUM_CONTAINER] = true;


    private constructor() { }

    static findByLabel(label: string): EnumRecord | undefined {
      return this.records[this.labels.indexOf(label)];
    }

    static findByValue(value: string | number): EnumRecord | undefined {
      return this.records[this.values.indexOf(value)];
    }
  }

  ENUMS_MAP.set(enumType, EnumWrapper as any);
  return Object.freeze(EnumWrapper) as any;
}

export namespace EnumClass {
  export function isEnum(enumClass: object): enumClass is EnumClassType<any> {
    return enumClass && ENUM_CONTAINER in enumClass;
  }
}
