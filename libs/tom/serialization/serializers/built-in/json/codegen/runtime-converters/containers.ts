import { Schema } from '@pebula/tom';
import { ClassSerializerContext } from '../../../../serializer';
import { transform } from '../../runtime';

export function array(v: any, context: ClassSerializerContext<any>, prop: Schema.TomPropertySchema) {
  if (Array.isArray(v)) {
    const newValue = [];
    for (const item of v) {
      if (!context.recursionStack?.includes(item)) {
        const val = transform(context, item, prop.subType);
        if (val !== undefined) {
          newValue.push(val);
        }
      }
    }
    return newValue;
  } else {
    return [];
  }
}

export function tuple(v: any, context: ClassSerializerContext<any>, prop: Schema.TomPropertySchema) {
  if (Array.isArray(v)) {
    const newValue = [];
    const { subTypes } = prop;
    for (let i = 0, len = Math.min(subTypes.length, v.length); i < len; i++) {
      const item = v[i];
      if (!context.recursionStack?.includes(item)) {
        const val = transform(context, item, subTypes[i]);
        newValue.push(val);
      } else {
        newValue.push(undefined);
      }
    }
    return newValue;
  } else {
    return [];
  }
}
export function set(v: any, context: ClassSerializerContext<any>, prop: Schema.TomPropertySchema) {
  if (context.isSerialize) {
    const newValue = [];
    for (const item of v) {
      if (!context.recursionStack?.includes(item)) {
        const val = transform(context, item, prop.subType);
        if (val !== undefined) {
          newValue.push(val);
        }
      }
    }
    return newValue;
  } else {
    const newValue = new Set();
    for (const item of v) {
      if (!context.recursionStack?.includes(item)) {
        const val = transform(context, item, prop.subType);
        if (val !== undefined) {
          newValue.add(val);
        }
      }
    }
    return newValue;
  }
}

export function map(v: Map<any, any>, context: ClassSerializerContext<any>, prop: Schema.TomPropertySchema) {
  if (context.isSerialize) {
    const newValue = {};
    for (const [key, item] of v) {
      if (!context.recursionStack?.includes(item)) {
        const val = transform(context, item, prop.subType);
        if (val !== undefined) {
          newValue[key] = val;
        }
      }
    }
    return newValue;
  } else {
    const newValue = new Map();
    for (const [key, item] of Object.entries(v)) {
      if (!context.recursionStack?.includes(item)) {
        const val = transform(context, item, prop.subType);
        if (val !== undefined) {
          newValue.set(key, val);
        }
      }
    }
    return newValue;
  }
}

export function objectMap(v: any, context: ClassSerializerContext<any>, prop: Schema.TomPropertySchema) {
  const newValue = {};
  for (const [key, item] of Object.entries(v)) {
    if (!context.recursionStack?.includes(item)) {
      const val = transform(context, item, prop.subType);
      if (val !== undefined) {
        newValue[key] = val;
      }
    }
  }
  return newValue;
}
