import { Type } from '@pebula/decorate';
import { Schema } from '@pebula/tom';
import { converterRegistry, RuntimeConverter } from './converter-registry';

type Enum = Schema.Enum;

export type EnumConverter<S extends Enum, T extends Enum> = (value: string | number, sourceEnum: S, targetEnum: T) => any;

export function createConverter<S extends Enum, T extends Enum>(sourceEnum: S, targetEnum: T, converter: EnumConverter<S, T>, reverse?: boolean): void;
export function createConverter<S = any, T = any>(source: Type<S> | Function, target: Type<T> | Function, converter: RuntimeConverter<S, T>): void;
export function createConverter(source: any, target: any, converter: any, reverse?: boolean): void {
  converterRegistry.register(target, source, converter);
  if (reverse) {
    converterRegistry.register(source, target, converter);
  }
}

export function clearConverter<S extends Enum, T extends Enum>(targetEnum: T, sourceEnum?: S, reverse?: boolean): void;
export function clearConverter<S = any, T = any>(target: Type<T> | Function, source?: Type<S> | Function): void;
export function clearConverter(target: any, source?: any, reverse?: boolean): void {
  converterRegistry.delete(target, source);
}
