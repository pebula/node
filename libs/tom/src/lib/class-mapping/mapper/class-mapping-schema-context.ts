import { TypeMapOptions } from '../../options';

export interface PropertyMappingContext<S, T, D = any> {
  readonly source: S;
  readonly target: T;
  readonly options: TypeMapOptions<S, T, D>;
  getTargetValue<TKey extends keyof T>(key: TKey): T[TKey];
  getSourceValue<SKey extends keyof S>(key: SKey): S[SKey]
}

export class ClassMappingContext<S, T, D = any> implements PropertyMappingContext<S, T ,D> {
  recursionStack?: Map<any, any>;

  constructor(public readonly source: S, public readonly target: T, public readonly options: TypeMapOptions<S, T, D>) {
    this.recursionStack = new Map<any, any>();
  }

  createChild<SC, TC>(source: SC, target: TC): ClassMappingContext<SC, TC, D> {
    const child = new ClassMappingContext<SC, TC, D>(source, target, this.options as any);
    child.recursionStack = this.recursionStack;
    return child;
  }

  getTargetValue<TKey extends keyof T>(key: TKey): T[TKey] {
    return this.target[key];
  }

  getSourceValue<SKey extends keyof S>(key: SKey): S[SKey] {
    return this.source[key];
  }
}
