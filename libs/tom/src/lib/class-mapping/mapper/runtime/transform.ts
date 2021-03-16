import { Type } from '@pebula/decorate';
import { TomPropertySchema } from '../../../schema';
import { tryFindConverter } from '../../../converters';
import { mapRegistry } from '../../registry';
import { ClassMappingContext } from '../class-mapping-schema-context';
import { mapperTypeConverterRegistry  } from './mapping';
import { transformSchema } from './transform-schema';
import { unsupportedMappingSource } from './errors';

/**
 * A transformer that invokes the runtime converter for the type.
 * It will also handle/protect for null & undefined values.
 *
 * You can provide a `missToken` which is returned if no runtime converter was found.
 */
export function transform(context: ClassMappingContext<any, any>,
                          value: any,
                          tProp: TomPropertySchema<any>,
                          sProp: TomPropertySchema<any>): any {
  // exist quickly if null/undefined...
  if (value === undefined) {
    let defaultValue = tProp.hasDefaultValue ? tProp.defaultValue() : tProp.nullable ? null : undefined;
    if (defaultValue === undefined && !tProp.optional && tProp.typeDef.type === 'literal') {
      defaultValue = tProp.typeDef.typeParams;
    }
    return defaultValue;
  }
  if (value === null) {
    let defaultValue = tProp.hasDefaultValue ? tProp.defaultValue() : tProp.nullable ? null : undefined;
    if (defaultValue === undefined && !tProp.nullable && tProp.typeDef.type === 'literal') {
      defaultValue = tProp.typeDef.typeParams;
    }
    return defaultValue;
  }

  if (tProp && sProp) {
    const rtConverter = mapperTypeConverterRegistry.get(tProp.typeDef.type);
    if (rtConverter) {
      const handler = rtConverter.findHandler(sProp);
      if (handler) {
        return handler(value, context, tProp, sProp);
      } else {
        const sourceWildcardHandler = mapperTypeConverterRegistry.get(sProp.typeDef.type)?.sourceWildcardHandler;
        if (sourceWildcardHandler) {
          return sourceWildcardHandler(value, context, tProp, sProp);
        }
      }
      throw unsupportedMappingSource(rtConverter.type, sProp.typeDef.type, context.source.constructor, context.target.constructor as any, tProp.name as string);
    }
  }
  return transformUnknown(context, value, tProp, sProp);
}

function resolveListContainer(value: any, targetMeta?: TomPropertySchema) {
  const type = targetMeta?.isContainer && targetMeta.reflectedType;
  if (type === Array || type === Set) { // TODO: maybe type is something that extends Array or Set...
    return type;
  } else {
    return value instanceof Array
      ? Array
      : value instanceof Set
        ? Set
        : undefined
    ;
  }
}

function resolveMapContainer(value: any, targetMeta?: TomPropertySchema) {
  const type = targetMeta?.isContainer && targetMeta.reflectedType;
  if (type === Object || type === Map) { // TODO: maybe type is something that extends Map...
    return type;
  } else {
    return value instanceof Map ? Map : undefined;
  }
}

export function transformUnknown(context: ClassMappingContext<any, any>,
                                 value: any,
                                 targetMeta?: TomPropertySchema,
                                 valueTypeOrValueMeta?: Type<any> | TomPropertySchema,
                                 ignoreReflectedContainer?: boolean): any {
  // exist quickly if null/undefined...
  if (value === null || value === undefined) { return value; }

  const sourceMeta = valueTypeOrValueMeta instanceof TomPropertySchema ? valueTypeOrValueMeta : undefined;
  const sourceType = sourceMeta?.type || valueTypeOrValueMeta as Type<any> || value.constructor;
  const toPlainObject = false;

  /* Main 2 blocks:
       1) handles collections (Array and Set)
       2) handles the rest (primitives, objects and maps). */

  // We try to located the target type using the reflected type or, since its dynamic, using the runtime type of the value
  // If we are instructed to ignore the reflected type, we do so.
  // We only ignore the reflected type cause if the value is a list and we don't have type info, we need to resolve to a list!
  const listContainerTargetType = resolveListContainer(value, ignoreReflectedContainer ? undefined : targetMeta);
  if (listContainerTargetType) {
    const newValue = toPlainObject ? [] : new listContainerTargetType();
    const collection: IterableIterator<any> = value instanceof Map ? value.values() : value;
    for (const subValue of collection) {
      if (newValue instanceof Set) {
        newValue.add(transformUnknown(context, subValue, targetMeta, sourceMeta?.type, true));
      } else {
        newValue.push(transformUnknown(context, subValue, targetMeta, sourceMeta?.type, true));
      }
    }
    return newValue;

  } else {
    const mapContainerSourceType = resolveMapContainer(value, sourceMeta);
    let targetType = targetMeta?.type;

    // First check for primitives
    if (!mapContainerSourceType) {
      const converter = tryFindConverter(targetMeta, sourceType);
      if (converter?.converter) {
        switch (converter.type) {
          case 'enum':
            return converter.converter(value, sourceType.type, targetMeta.enum);
          case 'value':
            return converter.converter(value);
        }
      }
    }

    // Now, objects. An object can be mapped to a type and if the user defined
    // proper metadata so that we have the types for the source and target, we can search for a schema, if found
    // then we transform by that schema, otherwise its a one to one transform.
    if (typeof value === 'object') {
      if (targetType === Date || value instanceof Date) {
        return new Date(value.valueOf());
      }

      if (context.recursionStack?.has(value)) {
        return context.recursionStack.get(value);
      }

      const mapContainerTargetType = !toPlainObject && resolveMapContainer(value, ignoreReflectedContainer ? undefined : targetMeta);
      const isMapConstructor = mapContainerTargetType === Map; // TODO: maybe type is something that extends Map...

      if (!targetType && value.constructor !== Object) {
        targetType = value.constructor;
      }

      const newValue = isMapConstructor
        ? new mapContainerTargetType()
        : new ((mapContainerTargetType || targetType || Object) as any)()
      ;

      // try to find a schema for the value/target pair (Expect for map, in-which the valueType is the type of the map items)
      const schema = !mapContainerSourceType && mapRegistry.get(sourceType, targetType);

      if (schema) {
        return transformSchema(schema, value, newValue, context.createChild(value, newValue));
      } else {
        // protect from processing this value again
        // We don't do it if we have "schema" because "transformSchema" will do it for us
        context.recursionStack?.set(value, newValue);

        const entries: Array<[string, any]> = mapContainerSourceType === Map ? value.entries() : Object.entries(value);

        for (let [key, subValue] of entries) {
          if (subValue instanceof Function) {
            subValue = new subValue();
          }

          // TODO: this will check every value, we only need to check objects...
          const exists = context.recursionStack?.has(subValue);

          if (!exists) {
            subValue = !!mapContainerSourceType
              ? transformUnknown(context, subValue, targetMeta, sourceType, true)
              : transformUnknown(context, subValue, undefined, undefined, true)
            ;
          } else if (!toPlainObject) {
            subValue = context.recursionStack.get(subValue);
          }

          if (!exists || !toPlainObject) {
            isMapConstructor ? newValue.set(key, subValue) : newValue[key] = subValue;
          }
        }
        return newValue;
      }
    } else {
      return value;
    }
  }
}
