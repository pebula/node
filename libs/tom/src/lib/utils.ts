import 'reflect-metadata';
import { Type } from '@pebula/decorate';

const CONTAINER_TYPES: Array<Type<any>> = [ Array, Map, Set ];
export function isContainerType(type: Type<any>): boolean { return CONTAINER_TYPES.indexOf(type) > -1; }

const PRIMITIVE_TYPES: Array<Type<any>> = [ Number, Boolean, String ];
export function isPrimitiveType(type: Type<any>): boolean { return PRIMITIVE_TYPES.indexOf(type) > -1; }

const NATIVE_TYPES = [
  Boolean,
  Date,
  Number,
  String,
  Object,
  RegExp,
  BigInt,
];
export function isNativeType(type: any): boolean { return NATIVE_TYPES.indexOf(type) > -1; }

export function isJsObject(obj: any): boolean {
  return obj !== null && (typeof obj === 'function' || typeof obj === 'object');
}
export function isPrimitive(obj: any): boolean {
  return !isJsObject(obj);
}

export function stringify(token: any): string {
  if (typeof token === 'string') {
    return token;
  }

  if (token === undefined || token === null) {
    return '' + token;
  }

  if (token.name) {
    return token.name;
  }
  if (token.overriddenName) {
    return token.overriddenName;
  }

  const res = token.toString();
  const newLineIndex = res.indexOf('\n');
  return newLineIndex === -1 ? res : res.substring(0, newLineIndex);
}

export function getBaseClass(cls: Type<any> | Function): Type<any> | null { // tslint:disable-line: ban-types
  const proto = Object.getPrototypeOf(cls.prototype);
  return !proto || typeof proto === 'function' ? proto : proto.constructor;
}
