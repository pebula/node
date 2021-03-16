import { Type } from '@pebula/decorate';

export const FORWARD_REF = Symbol('ForwardRefContainer');

export function forwardRef<T = any>(resolve: ForwardRef<T>): ForwardRefContainer<T> {
  return { [FORWARD_REF]: true, resolve };
}

export function resolveForwardRef<T = any>(fRef: ForwardRef<T> | ForwardRefContainer<T>): Type<T> | undefined {
  const type = typeof fRef === 'function'
    ? fRef()
    : fRef.resolve()
  ;
  return typeof type === 'function' ? type : undefined;
}

export type ForwardRef<T = any> = () => Type<T>;
export type ForwardRefContainer<T = any> = { [FORWARD_REF]: true; resolve: ForwardRef<T>; };
