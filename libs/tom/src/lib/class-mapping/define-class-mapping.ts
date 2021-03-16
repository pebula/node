import { Type } from '@pebula/decorate';
import { mapRegistry } from './registry';
import { ClassMappingSchemaFactory, ClassMappingSchemaFactoryOptions } from './mapping-schema';
import { UnSealableSchemaFactory, SealableSchemaFactory, NominalKeys } from './mapping-schema/class-mapping-schema/class-mapping-schema-factory';

export function defineClassMappingFactory<S, TData = any>(sourceType: Type<S>): <T>(targetType: Type<T>) => Exclude<keyof T, NominalKeys> extends never
                                                                                                              ? SealableSchemaFactory<S, T, TData>
                                                                                                              : UnSealableSchemaFactory<S, T, TData> {
  return <T>(targetType: Type<T>) => defineClassMapping<S, T, TData>(sourceType, targetType);
}

/**
 * Define class mapping for the class so it can be cloned.
 * The returned factory is auto-mapped so the only thing left is to `seal()` it.
 * If you wish to modify some of the property mapping, use `resetMembers('x', 'y', 'z',...)` to remove the auto-defined mappings.
 * @param type
 * @param options
 */
export function defineClassMapping<T, TData = any>(type: Type<T>, options?: ClassMappingSchemaFactoryOptions<T, T>): SealableSchemaFactory<T, T, TData>;
/**
 * Define class mapping between a source class and the target class.
 * Returns a typed factory that require you to define all properties of the target and only then allows sealing the mapping.
 *
 * You must define all properties of the target class (but not the source).
 * To ignore a property, you must explicitly define the mappings to be ignored.
 *
 * Each property you define will return a factory type without it until no properties are left and you can call `seal()`.
 */
export function defineClassMapping<S, T, TData = any>(sourceType: Type<S>,
                                                      targetType: Type<T>,
                                                      options?: ClassMappingSchemaFactoryOptions<S, T>): Exclude<keyof T, NominalKeys> extends never
                                                                                                            ? SealableSchemaFactory<S, T, TData>
                                                                                                            : UnSealableSchemaFactory<S, T, TData>;
export function defineClassMapping(sourceType: Type<any>,
                                   targetType?: Type<any> | ClassMappingSchemaFactoryOptions<any, any>,
                                   options?: ClassMappingSchemaFactoryOptions<any, any>) {
  if (typeof targetType === 'function') {
    return new ClassMappingSchemaFactory<any, any>(sourceType, targetType, options) as any;
  } else {
    return ClassMappingSchemaFactory.autoDefineSelf(sourceType, targetType || options) as any;
  }
}

export function clearMap<S, T>(sourceType: Type<S>, targetType: Type<T>): boolean {
  return mapRegistry.delete(sourceType, targetType);
}
