import { Type } from '@pebula/decorate';
import { Schema } from '@pebula/tom';
import { schemaRegistry } from '../../../../registry';
import { ClassSerializerContext } from '../../../serializer';
import { serializeSchema, transform as _transform } from '../../_runtime';

const MISS_TOKEN = {};

function resolveListContainer(value: any, targetMeta?: Schema.TomPropertySchema) {
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

function resolveMapContainer(value: any, targetMeta?: Schema.TomPropertySchema) {
  const type = targetMeta?.isContainer && targetMeta.reflectedType;
  if (type === Object || type === Map) { // TODO: maybe type is something that extends Map...
    return type;
  } else {
    return value instanceof Map ? Map : undefined;
  }
}

export function transform(context: ClassSerializerContext<any, any>,
                          value: any,
                          prop: Schema.TomPropertySchema<any>): any {
  const result = _transform(context, value, prop, MISS_TOKEN);
  if (result === MISS_TOKEN) {
    const propSerializerSchema = context.schema.properties.find( p => p.targetPropMeta === prop );

    return transformUnknown(context, value, prop, propSerializerSchema?.sourcePropMeta || propSerializerSchema?.sourceType);
  }
  return result;
}

export function transformUnknown(context: ClassSerializerContext<any, any>,
                                 value: any,
                                 targetMeta?: Schema.TomPropertySchema,
                                 valueTypeOrValueMeta?: Type<any> | Schema.TomPropertySchema,
                                 ignoreReflectedContainer?: boolean): any {

  const sourceMeta = valueTypeOrValueMeta instanceof Schema.TomPropertySchema ? valueTypeOrValueMeta : undefined;

  /* Main 2 blocks:
       1) handles collections (Array and Set)
       2) handles the rest (primitives, objects and maps). */

  // We try to located the target type using the reflected type or, since its dynamic, using the runtime type of the value
  // If we are instructed to ignore the reflected type, we do so.
  // We only ignore the reflected type cause if the value is a list and we don't have type info, we need to resolve to a list!
  const listContainerTargetType = resolveListContainer(value, ignoreReflectedContainer ? undefined : targetMeta);
  if (listContainerTargetType) {
    const newValue = context.isSerialize ? [] : new (listContainerTargetType as any)();
    const collection: IterableIterator<any> = value instanceof Map ? value.values() : value;
    for (const subValue of collection) {
      if (!context.recursionStack?.includes(subValue)) {
        if (newValue instanceof Set) {
          newValue.add(transformUnknown(context, subValue, targetMeta?.subType, sourceMeta?.type, true));
        } else {
          newValue.push(transformUnknown(context, subValue, targetMeta?.subType, sourceMeta?.type, true));
        }
      }
    }
    return newValue;

  } else {
    const mapContainerSourceType = resolveMapContainer(value, sourceMeta);
    let targetType = targetMeta?.type;

    // Now, objects. An object can be mapped to a type and if the user defined
    // proper metadata so that we have the types for the source and target, we can search for a schema, if found
    // then we transform by that schema, otherwise its a one to one transform.
    if (typeof value === 'object') {
      // if (context.isSerialize) {
        if (context.recursionStack) {
          if (context.recursionStack.includes(value)) {
            return undefined;
          }
        } else {
          context.recursionStack = [];
        }
      // }

      const mapContainerTargetType = context.isSerialize ? Object : resolveMapContainer(value, ignoreReflectedContainer ? undefined : targetMeta);
      const isMapConstructor = mapContainerTargetType === Map; // TODO: maybe type is something that extends Map...

      if (!targetType && value.constructor !== Object) {
        targetType = value.constructor;
      }

      const newValue = isMapConstructor
        ? new mapContainerTargetType()
        : new ((mapContainerTargetType || targetType || Object) as any)()
      ;

      // try to find a schema for the value/target pair (Expect for map, in-which the valueType is the type of the map items)
      const schema = !mapContainerSourceType && schemaRegistry.getOperation(context.schema.serializer, targetType, context.operation);

      if (schema) {
        return serializeSchema(schema, value, newValue, context, transform);
      } else {
        // protect from processing this value again
        // We don't do it if we have "schema" because "transformSchema" will do it for us
        // if (context.isSerialize) {
          context.recursionStack.push(value)
        // }

        const entries: Array<[string, any]> = mapContainerSourceType === Map && context.isSerialize ? value.entries() : Object.entries(value);

        for (let [key, subValue] of entries) {
          if (subValue instanceof Function) {
            subValue = new subValue();
          }

          // TODO: this will check every value, we only need to check objects...
          if (/* context.isSerialize && */context.recursionStack.includes(subValue)) {
            continue;
          } else {
            subValue = !!mapContainerSourceType
              ? transformUnknown(context, subValue, targetMeta?.subType)
              : transformUnknown(context, subValue)
            ;
          }
          // TODO: if `exist && context.isSerialize` we might not want to assign it, based on serializer config...
          isMapConstructor ? newValue.set(key, subValue) : newValue[key] = subValue;
        }

        context.recursionStack.pop();
      }

      return newValue;
    } else {
      return value;
    }
  }
}
