import { TypeSystem } from '@pebula/tom';
import { enumMappingRegistry } from './enum-mapping-registry';
import { EnumMappingSchemaFactory, SealableSchemaFactory, UnSealableSchemaFactory } from './enum-mapping-schema-factory';

export function defineEnumMapping<S extends TypeSystem.Enum, T extends TypeSystem.Enum>(sourceEnum: S, targetEnum: T): keyof T extends never
                                                                                                                         ? SealableSchemaFactory<S, T>
                                                                                                                         : UnSealableSchemaFactory<S, T> {
  return new EnumMappingSchemaFactory<S, T>(sourceEnum, targetEnum) as any;
}

export function clearEnumMapping<S extends TypeSystem.Enum, T extends TypeSystem.Enum>(sourceEnum: S, targetEnum?: T): boolean {
  return enumMappingRegistry.delete(sourceEnum, targetEnum);
}
