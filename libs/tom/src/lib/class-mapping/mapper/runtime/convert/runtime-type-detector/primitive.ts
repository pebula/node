import { mapperRuntimeTypeDetectorRegistry } from '../../mapping';

export const boolean = (v: any) => typeof v === 'boolean';
export const number = (v: any) => typeof v === 'number';
export const string = (v: any) => typeof v === 'string';
export const date = (v: any) => v instanceof Date;
export const bigInt = (v: any) => typeof v === 'bigint';
export const object = (v: any) => typeof v === 'object' && !Array.isArray(v);

mapperRuntimeTypeDetectorRegistry
  .set('boolean', boolean)
  .set('number', number)
  .set('string', string)
  .set('date', date)
  .set('bigInt', bigInt);
