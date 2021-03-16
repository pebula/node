import { Type } from '@pebula/decorate';
import type { Enum } from '../schema/type-system/enum';

const DEFAULT_FALLBACK: any = Symbol('DEFAULT_FALLBACK');

export type RuntimeConverter<S = any, T = any> = (value: S, sourceType?: S extends Enum ? S : Type<S> | Function, targetType?: T extends Enum ? T : Type<T> | Function) => T;

export class ConverterRegistry {
  static get(): ConverterRegistry { return converterRegistry || new ConverterRegistry(); }

  private readonly schemas: Map<Function | Enum, Map<Function | Enum, RuntimeConverter>>;

  private constructor(baseConverter?: ConverterRegistry) {
    this.schemas = new Map<Function | Enum, Map<Function | Enum, RuntimeConverter>>(baseConverter?.schemas ?? []);
  }

  clone() {
    return new ConverterRegistry(this);
  }

  register<S = any, T = any>(target: T extends Enum ? T : Type<T> | Function,
                             source: S extends Enum ? S : Type<S> | Function,
                             converter: RuntimeConverter<S, T>): void {
    const map = this.schemas.get(target) || new Map<Function, (source: any) => any>();
    if (map.set(source, converter).size === 1) {
      this.schemas.set(target, map);
    }
  }

  has(target: Type<any> | Function | Enum, source: Type<any> | Function | Enum): boolean {
    return this.schemas.get(target)?.has(source) ?? false;
  }

  get<T = any, S = any>(target: T extends Enum ? T : Type<T> | Function,
                        source: S extends Enum ? S : Type<S> | Function): RuntimeConverter<S, T> | undefined {
    return this.schemas.get(target)?.get(source);
  }

  delete(target: Type<any> | Function | Enum, source?: Type<any> | Function | Enum): boolean {
    if (!source) {
      return this.schemas.delete(target);
    } else {
      return this.schemas.get(target)?.delete(source) ?? false;
    }
  }

  convertStrict<T = any, S = any>(value: S,
                                  source: S extends Enum ? S : Type<S> | Function,
                                  target: T extends Enum ? T : Type<T> | Function) {
    return this.schemas.get(target).get(source)(value, source, target);
  }

  convertSilent<T = any, S = any>(value: S,
                                  source: S extends Enum ? S : Type<S> | Function,
                                  target: T extends Enum ? T : Type<T> | Function) {
    return this.schemas.get(target)?.get(source)?.(value, source, target);
  }

  convertSafe<T = any, S = any>(value: S,
                                source: S extends Enum ? S : Type<S> | Function,
                                target: T extends Enum ? T : Type<T> | Function,
                                fallback: S = DEFAULT_FALLBACK) {
    const converter = this.schemas.get(target)?.get(source);
    if (converter) {
      return converter(value, source, target);
    } else if (fallback === DEFAULT_FALLBACK) {
      throw new Error('TODO ERROR');
    } else {
      return fallback;
    }
  }
}

export const converterRegistry = ConverterRegistry.get();
