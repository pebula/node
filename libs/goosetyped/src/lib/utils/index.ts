// tslint:disable: ban-types
import { DiscriminatorOptions } from 'mongoose';
import { Ctor } from './types';
export * from './types';
export * from './misc';
export * from './set-if-exists';
export * from './decorators';
export * from './proto';

export function safeConstructor(target: object | Ctor<any> | Function): Ctor<any> {
  if (typeof target === 'function') {
    return target as any;
  } else if (typeof target.constructor === 'function') {
    return target.constructor as any;
  }
  throw new Error('Invalid target object provided. Target is not a function nor a prototype.');
}

export function resolveModelName(target: Ctor<any> | Function | DiscriminatorOptions['value']): string {
  return typeof target === 'function' ? target.name : target?.toString();
}
