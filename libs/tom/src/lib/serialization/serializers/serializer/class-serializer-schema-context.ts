import { SerializerOp } from '../../types';
import { ClassSerializerSchema } from '../../serializer-schema';
import { Serializer } from './serializer';
import { SerializerOptions } from './types';

export interface PropertySerializerContext<T, D = any> {
  readonly target: T;
  readonly options: SerializerOptions<T, D>;
  getTargetValue<TKey extends keyof T>(key: TKey): T[TKey];
  getSourceValue<TKey extends keyof T>(key: TKey): T[TKey];
}

export class ClassSerializerContext<T, D = any> implements PropertySerializerContext<T ,D> {

  readonly isSerialize: boolean;
  get operation(): SerializerOp { return this.schema.operation; }

  recursionStack?: any[];

  constructor(public readonly schema: ClassSerializerSchema<Serializer, T>,
              public readonly source: any,
              public readonly target: T,
              public readonly options: SerializerOptions<T, D>) {
    this.isSerialize = schema.operation === 'serialize';
  }

  createChild<TC>(source: any, target: TC): ClassSerializerContext<TC, D> {
    const child = new ClassSerializerContext<TC, D>(this.schema as any, source, target, this.options as any);
    child.recursionStack = this.recursionStack;
    return child;
  }

  getTargetValue<TKey extends keyof T>(key: TKey): T[TKey] {
    return this.target[key];
  }

  getSourceValue<TKey extends keyof T>(key: TKey): T[TKey] {
    return this.source[key];
  }
}
