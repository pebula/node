import { TypeSystem } from '@pebula/tom';

export type EnumSchema<S extends TypeSystem.Enum, T extends TypeSystem.Enum> = Map<S[keyof S], T[keyof T]>;

class InternalEnumMappingRegistry<S extends TypeSystem.Enum> {

  private schemas = new Map<TypeSystem.Enum, EnumSchema<S, TypeSystem.Enum>>();

  register<T extends TypeSystem.Enum>(target: T, schema: EnumSchema<S, T>): void {
    this.schemas.set(target, schema);
  }

  has<T extends TypeSystem.Enum>(target: T): boolean {
    return this.schemas.has(target);
  }

  get<T extends TypeSystem.Enum>(target: T): EnumSchema<S, T> | undefined {
    return this.schemas.get(target) as any;
  }

  delete<T extends TypeSystem.Enum>(target: T): boolean {
    return this.schemas.delete(target);
  }
}

export class EnumMappingRegistry {
  static get(): EnumMappingRegistry { return enumMappingRegistry || new EnumMappingRegistry(); }

  private schemas = new Map<TypeSystem.Enum, InternalEnumMappingRegistry<TypeSystem.Enum>>();

  private constructor() { }

  register<S extends TypeSystem.Enum, T extends TypeSystem.Enum>(source: S, target: T, schema: Map<S[keyof S], T[keyof T]>): void {
    let internal = this.schemas.get(source) as unknown as InternalEnumMappingRegistry<S>;
    if (!internal) {
      internal = new InternalEnumMappingRegistry<S>();
      this.schemas.set(source, internal as unknown as InternalEnumMappingRegistry<TypeSystem.Enum>);
    }
    internal.register(target, schema);
  }

  has<S extends TypeSystem.Enum, T extends TypeSystem.Enum>(source: S, target: T): boolean {
    const internal = this.schemas.get(source) as unknown as InternalEnumMappingRegistry<S>;
    return internal?.has(target) ?? false;
  }

  get<S extends TypeSystem.Enum, T extends TypeSystem.Enum>(source: S, target: T): EnumSchema<S, T> | undefined {
    const internal = this.schemas.get(source) as unknown as InternalEnumMappingRegistry<S>;
    return internal?.get(target);
  }

  delete<S extends TypeSystem.Enum, T extends TypeSystem.Enum>(source: S, target?: T): boolean {
    return target
      ? (this.schemas.get(source) as unknown as InternalEnumMappingRegistry<S>)?.delete(target) ?? false
      : this.schemas.delete(source)
    ;
  }
}

export const enumMappingRegistry = EnumMappingRegistry.get();
