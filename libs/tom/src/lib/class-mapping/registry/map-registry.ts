import { Type } from '@pebula/decorate';
import { ClassMappingSchema } from '../mapping-schema';

class InternalMapRegistry<TSource> {

  private schemas = new Map<Type<any>, ClassMappingSchema<TSource, any>>();

  register<TTarget>(target: Type<TTarget>, schema: ClassMappingSchema<TSource, TTarget>): void {
    this.schemas.set(target, schema);
  }

  has<TTarget>(target: Type<TTarget>): boolean {
    return this.schemas.has(target);
  }

  get<TTarget>(target: Type<TTarget>): ClassMappingSchema<TSource, TTarget> | undefined {
    return this.schemas.get(target);
  }

  delete<TTarget>(target: Type<TTarget>): boolean {
    return this.schemas.delete(target);
  }
}

export class MapRegistry {
  static get(): MapRegistry { return mapRegistry || new MapRegistry(); }

  private schemas = new Map<Type<any>, InternalMapRegistry<any>>();

  private constructor() { }

  register<TSource, TTarget>(source: Type<TSource>, target: Type<TTarget>, schema: ClassMappingSchema<TSource, TTarget>): void {
    let internal: InternalMapRegistry<TSource> = this.schemas.get(source);
    if (!internal) {
      internal = new InternalMapRegistry<TSource>();
      this.schemas.set(source, internal);
    }
    internal.register(target, schema);
  }

  has<TSource, TTarget>(source: Type<TSource>, target: Type<TTarget>): boolean {
    const internal: InternalMapRegistry<TSource> = this.schemas.get(source);
    return !!internal && internal.has(target);
  }

  get<TSource, TTarget>(source: Type<TSource>, target: Type<TTarget>): ClassMappingSchema<TSource, TTarget> | undefined {
    const internal: InternalMapRegistry<TSource> = this.schemas.get(source);
    if (internal) {
      return internal.get(target);
    }
  }

  delete<TSource, TTarget>(source: Type<TSource>, target: Type<TTarget>): boolean {
    const internal: InternalMapRegistry<TSource> = this.schemas.get(source);
    return !!internal && internal.delete(target);
  }
}

export const mapRegistry = MapRegistry.get();
