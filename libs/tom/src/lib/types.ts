import { Type } from '@pebula/decorate';

export type JSONPrimitive = string | number | boolean | null;
export type JSONValue = JSONPrimitive | JSONObject | JSONArray;
export interface JSONObject { [member: string]: JSONValue; }
export interface JSONArray extends Array<JSONValue> {}

export type InferTypeOf<T> = T extends Array<infer U> ? U
  : T extends Set<infer U> ? U
  : T extends Map<any, infer U> ? U
  : T
;

export class JSONTokenType { }

export const Types = {
  String: String as unknown as Type<string>,
  Number: Number as unknown as Type<number>,
  Boolean: Boolean as unknown as Type<boolean>,
  Date: Date,
};

const NominalSymbol: unique symbol = Symbol('NominalSymbol');

export function Nominal<TUid extends string, T, Z extends Type<T>>(base: Z): Z & Type<{ readonly [NominalSymbol]: TUid; }>;
export function Nominal<TUid extends string>(): Type<{ readonly [NominalSymbol]: TUid; }>;
export function Nominal<TUid extends string, T, Z extends Type<T>>(base?: Z) {
  if (base) {
    return base as unknown as Z & Type<{ readonly [NominalSymbol]: TUid; }>;
  } else {
    return Object as unknown as Type<{ readonly [NominalSymbol]: TUid; }>;
  }
}
