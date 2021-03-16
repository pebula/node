import { TypeSystem } from '../../../../../schema';
import { MapperTypeConverter, mapperTypeConverterRegistry } from '../../mapping';
import { directAssign, BIG_INT_REGEX } from './utils';

const NUMBER_FROM_BOOLEAN = new Map<number, boolean>([
  [0, false],
  [1, true],
]);

const STRING_FROM_BOOLEAN = new Map<string, boolean>([
  ['', false],
  ['0', false],
  ['false', false],
  ['1', true],
  ['true', true],
]);

const BOOLEAN_FROM_NUMBER = new Map<boolean, number[]>([
  [false, [0]],
  [true, [1]],
]);

const BOOLEAN_FROM_STRING = new Map<boolean, string[]>([
  [false, ['false', '', '0']],
  [true, ['true', '1']],
]);

export const boolean = new MapperTypeConverter<'boolean', boolean>('boolean')
  .setHandler('boolean', directAssign)
  .setHandler<number>('number', v => {
    if (NUMBER_FROM_BOOLEAN.has(v)) {
      return NUMBER_FROM_BOOLEAN.get(v);
    }
  })
  .setHandler<string>('string', v => {
    if (STRING_FROM_BOOLEAN.has(v)) {
      return STRING_FROM_BOOLEAN.get(v);
    }
  })
  .setHandler('literal', (v, ctx, tProp, sProp) => {
    const literal = sProp?.typeDef as TypeSystem.TomTypeInstance<'literal'>;
    if (v === literal.typeParams) {
      switch (typeof v) {
        case 'boolean':
          return v;
        case 'string':
          if (STRING_FROM_BOOLEAN.has(v)) {
            return STRING_FROM_BOOLEAN.get(v);
          }
          break;
        case 'number':
          if (NUMBER_FROM_BOOLEAN.has(v)) {
            return NUMBER_FROM_BOOLEAN.get(v);
          }
          break;
      }
    }
  });

export const number = new MapperTypeConverter<'number', number>('number')
  .setHandler('number', directAssign)
  .setHandler<boolean>('boolean', v => {
    if (BOOLEAN_FROM_NUMBER.has(v)) {
      return BOOLEAN_FROM_NUMBER.get(v)[0];
    }
  })
  .setHandler<string>('string', v => { return +v; })
  .setHandler<bigint>('bigInt', Number)
  .setHandler<Date>('date', v => v.valueOf() )
  .setHandler('literal', (v, ctx, tProp, sProp) => {
    const literal = sProp?.typeDef as TypeSystem.TomTypeInstance<'literal'>;
    if (typeof literal.typeParams === 'number' && v === literal.typeParams) {
      return v;
    }

    if (v === literal.typeParams) {
      switch (typeof v) {
        case 'number':
          return v;
        case 'string':
          const num = +v;
          if (!Number.isNaN(num)) {
            return num;
          }
          break;
        case 'boolean':
          return BOOLEAN_FROM_NUMBER.get(v)[0];
      }
    }
  });

export const string = new MapperTypeConverter<'string', string>('string')
  .setHandler('string', directAssign)
  .setHandler<boolean>('boolean', v => {
    if (BOOLEAN_FROM_STRING.has(v)) {
      return BOOLEAN_FROM_STRING.get(v)[0];
    }
  })
  .setHandler<number>('number', v => { return `${v}`; })
  .setHandler<Date>('date', v => v.toJSON())
  .setHandler<bigint>('bigInt', v => `${v}n`)
  .setHandler('literal', (v, ctx, tProp, sProp) => {
    const literal = sProp?.typeDef as TypeSystem.TomTypeInstance<'literal'>;

    if (v === literal.typeParams) {
      switch (typeof v) {
        case 'string':
          return v;
        case 'boolean':
          return BOOLEAN_FROM_STRING.get(v)[0];
        case 'number':
          return v.toString();
      }
    }
  });

export const date = new MapperTypeConverter<'date', Date>('date')
  .setHandler('date', directAssign)
  .setHandler<number>('number', v => { return new Date(v); })
  .setHandler<string>('string', v => { return new Date(v); });

export const bigInt = new MapperTypeConverter<'bigInt', bigint>('bigInt')
  .setHandler('bigInt', directAssign)
  .setHandler<number>('number', BigInt)
  .setHandler<string>('string', v => {
    const m = v.match(BIG_INT_REGEX);
    if (!!m) {
      return BigInt(m[1]);
    }
  });

mapperTypeConverterRegistry
  .set(boolean)
  .set(number)
  .set(string)
  .set(date)
  .set(bigInt);

