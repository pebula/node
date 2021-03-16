import * as dotProp from 'dot-prop';
import { SerializerOp } from '../../../types';
import { TomPropertySchema } from '../../../../schema';
import { ClassSerializerSchema } from '../../../serializer-schema';
import { ClassSerializerContext, Serializer } from '../../serializer';

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

export type TransformFn = (context: ClassSerializerContext<any, any>, value: any, prop: TomPropertySchema<any>) => any;

export function serializeSchema<S extends Serializer,
                                T,
                                TOp extends SerializerOp>(schema: ClassSerializerSchema<S, T, TOp>,
                                                          source: any,
                                                          target: any,
                                                          context: ClassSerializerContext<T>,
                                                          transformFn: TransformFn): any {

  // if (context.isSerialize) {
    if (context.recursionStack) {
      if (context.recursionStack.includes(source)) {
        return undefined;
      }
    } else {
      context.recursionStack = [];
    }
    context.recursionStack.push(source);
  // }

  const groups = Array.isArray(context.options.groups) && context.options.groups.length > 0 ? context.options.groups : undefined;
  for (const propMapSchema of schema.properties) {
    if (propMapSchema.ignore || propMapSchema.targetPropMeta?.exclude
        || propMapSchema.condition?.(context) === false
        || (groups && !isInOneOrMoreGroups(propMapSchema.targetPropMeta.groups, groups))) {
      continue;
    }

    let value: any;

    if (propMapSchema.hasSourcePath) {
      const accessorName = context.isSerialize && propMapSchema.valueAccessorType === 'path'
        ? propMapSchema.prop as string
        : propMapSchema.resolveSourcePath
      ;
      value = dotProp.get(source, accessorName);
      // This is the equivalent for `filterIfKeyExists` in JIT which does `if ('key' in object)`
      if (value === undefined && !dotProp.has(source, accessorName)) {
        continue;
      }
      if (typeof value === 'object' && context.recursionStack.includes(value)) {
        continue;
      }
    } else if ('value' in propMapSchema) {
      // TODO: check primitive, if not run transformSchema with the mappedValueType
      value = propMapSchema.value;
    } else {
      value = propMapSchema.map(context);
    }

    const setterProp = context.isSerialize && propMapSchema.valueAccessorType === 'path'
      ? propMapSchema.resolveSourcePath
      : propMapSchema.prop as string
    ;

    target[setterProp] = propMapSchema.copyByRef
      ? value
      : transformFn(context, value, propMapSchema.targetPropMeta)
    ;
  }

  // if (context.isSerialize) {
    context.recursionStack.pop();
  // }

  return target;
}
