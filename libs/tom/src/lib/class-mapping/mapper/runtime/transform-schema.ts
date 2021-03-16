import * as dotProp from 'dot-prop';
import { ClassMappingSchema } from '../../mapping-schema';
import { invalidDataObjectError } from './errors';
import { transform, transformUnknown } from './transform';
import { ClassMappingContext } from '../class-mapping-schema-context';

function isInOneOrMoreGroups(propGroups: string[], groups: string[]): boolean {
  if (!groups || !propGroups) {
    return true;
  } else if (propGroups.length > 0) {
    for (const myGroup of propGroups) {
      if (groups.indexOf(myGroup) !== -1) {
        return true;
      }
    }
  }
  return false;
}

export function transformSchema<S, T>(schema: ClassMappingSchema<S, T>,
                                      sourceObject: S,
                                      target: T,
                                      context: ClassMappingContext<S, T>): T {
  if (context.recursionStack?.has(sourceObject)) {
    return context.recursionStack.get(sourceObject);
  } else {
    context.recursionStack?.set(sourceObject, target);
  }

  if (typeof schema.verifyData === 'function') {
    const verifyResult = schema.verifyData(context.options.data, sourceObject);
    if (verifyResult !== true) {
      throw invalidDataObjectError(schema.source, schema.target, verifyResult);
    }
  }

  const groups = Array.isArray(context.options.groups) && context.options.groups.length > 0 ? context.options.groups : undefined;
  for (const propMapSchema of schema.properties) {
    if (propMapSchema.ignore
        || propMapSchema.condition?.(context) === false
        || (groups && !isInOneOrMoreGroups(propMapSchema.targetPropMeta.groups, groups))) {
      continue;
    }

    let value: Parameters<typeof transform>[1];

    if (propMapSchema.hasSourcePath) {
      value = dotProp.get(sourceObject, propMapSchema.resolveSourcePath);
      // This is the equivalent for `filterIfKeyExists` in JIT which does `if ('key' in object)`
      if (value === undefined && !dotProp.has(sourceObject, propMapSchema.resolveSourcePath)) {
        continue;
      }
      // TODO: not Map and not Set
      if (typeof value === 'object' && !Array.isArray(value) && context.recursionStack?.has(value)) {
        target[propMapSchema.targetKey] = context.recursionStack.get(value);
        continue;
      }
    } else if ('value' in propMapSchema) {
      // TODO: check primitive, if not run transformSchema with the mappedValueType
      value = propMapSchema.value;
    } else {
      value = propMapSchema.map(context);
    }

    target[propMapSchema.targetKey] = propMapSchema.copyByRef
      ? value
      : propMapSchema.sourcePropMeta
        ? transform(context, value, propMapSchema.targetPropMeta, propMapSchema.sourcePropMeta)
        : transformUnknown(context, value, propMapSchema.targetPropMeta, propMapSchema.resolvedSourceType)
    ;
  }
  return target;
}
