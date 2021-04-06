import { Type } from '@pebula/decorate';
import { TypeMapOptions, DEFAULT_TYPE_MAP_OPTIONS } from './options';
import { mapRegistry } from './registry';
import { schemaNotFoundError, typeUnrecognizedForMapperError } from './errors';
import { ClassMappingSchema } from './mapping-schema';

export type BoundClassSMapper<S, T, TData = any> = Pick<ClassMappingSchema<S, T, TData>, 'transform'>;

/**
 * @param sourceObject The source object, does not have to be an instance of `sourceType`
 * @param sourceType The source type class used to define the mapping
 * @param targetType The target type class used to define the mapping
 * @param options
 */
export function mapTypes<S, T>(sourceObject: any,
                               sourceType: Type<S>,
                               targetType: Type<T>,
                               options?: TypeMapOptions<S, T>): T;
/**
 * @param sourceInstance The source object, MUST be an instance of a known source type that has a mapping defined with `targetType`
 * @param targetType The target type class used to define the mapping
 * @param options
 */
export function mapTypes<S, T>(sourceInstance: S,
                               targetType: Type<T>,
                               options?: TypeMapOptions<S, T>): T;
export function mapTypes<S, T>(sourceObjectOrInstance: S | any,
                               sourceTypeOrTargetType: Type<S> | Type<T>,
                               targetTypeOrOptions: Type<T> | TypeMapOptions<S, T>,
                               options?: TypeMapOptions<S, T>): T {
  const sourceObject = sourceObjectOrInstance as S;
  let sourceType: Type<S>;
  let targetType: Type<T>;

  if (typeof targetTypeOrOptions === 'function') { // using explicit sourceType
    sourceType = sourceTypeOrTargetType as Type<S>;
    targetType = targetTypeOrOptions as Type<T>;
  } else {
    sourceType = sourceObject.constructor as any;
    targetType = sourceTypeOrTargetType as Type<T>;
    options = targetTypeOrOptions as TypeMapOptions<S, T>;
  }

  options = { ...DEFAULT_TYPE_MAP_OPTIONS, ...(options || {}) };

  const schema = mapRegistry.get<S, T>(sourceType, targetType);

  if (!schema) {
    throw schemaNotFoundError(sourceType, targetType);
  }

  if (options.strictTypes && !schema.targetRecognized) {
    throw typeUnrecognizedForMapperError(targetType);
  }

  return schema.transform(sourceObject, options);
}

export function getMapper<T, TData = any>(type: Type<T>): BoundClassSMapper<T, T, TData> | undefined
export function getMapper<S, T, TData = any>(sourceType: Type<S>, targetType: Type<T>): BoundClassSMapper<S, T, TData> | undefined;
export function getMapper(sourceType: Type<any>, targetType?: Type<any>) {
  return mapRegistry.get(sourceType, targetType || sourceType);
}
