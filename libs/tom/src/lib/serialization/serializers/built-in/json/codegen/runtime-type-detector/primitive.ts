import { BIG_INT_REGEX, DATE_REGEX } from '../utils';

export const boolean = (v: any) => typeof v === 'boolean';
export const number = (v: any) => typeof v === 'number';
export const bigIntSerialize = (v: any) => typeof v === 'bigint';
export const bigIntDeserialize = (v: any) => typeof v === 'number' || (typeof v === 'string' && BIG_INT_REGEX.test(v));

export const string = (v: any) => typeof v === 'string';
export const date = (v: any) => v instanceof Date || (typeof v === 'string' && DATE_REGEX.exec(v) !== null);
export const object = (v: any) => typeof v === 'object' && !Array.isArray(v);
