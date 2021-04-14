import { MapperTypeConverter, mapperTypeConverterRegistry } from '../../mapping';
import { transform } from '../../transform';

export const array = new MapperTypeConverter<'array', Array<any>>('array')
  .setHandler<Array<any>>('array', (v, ctx, tProp, sProp) => {
    if (Array.isArray(v)) {
      const arr = v.slice();
      for (let i = 0, len = arr.length; i < len; i++) {
        arr[i] = transform(ctx, arr[i], tProp.subType, sProp.subType);
        if (arr[i] === undefined) {
          arr.splice(i, 1);
          i -= 1;
          len -=1;
        }
      }
      return arr;
    } else {
      return [];
    }
  })
  .setHandler<Set<any>>('set', (v, ctx, tProp, sProp) => {
    if (v instanceof Set) {
      const arr = Array.from(v);
      for (let i = 0, len = arr.length; i < len; i++) {
        arr[i] = transform(ctx, arr[i], tProp.subType, sProp.subType);
        if (arr[i] === undefined) {
          arr.splice(i, 1);
          i -= 1;
          len -=1;
        }
      }
      return arr;
    } else {
      return [];
    }
  })
  .setHandler<Map<any, any>>('map', (v, ctx, tProp, sProp) => {
    if (v instanceof Map) {
      const arr = Array.from(v.values());
      for (let i = 0, len = arr.length; i < len; i++) {
        arr[i] = transform(ctx, arr[i], tProp.subType, sProp.subType);
        if (arr[i] === undefined) {
          arr.splice(i, 1);
          i -= 1;
          len -=1;
        }
      }
      return arr;
    } else {
      return [];
    }
  })
  .setHandler<Record<string | number | symbol, any>>('objectMap', (v, ctx, tProp, sProp) => {
    if (typeof v === 'object' && !Array.isArray(v)) {
      const arr = Object.values(v);
      for (let i = 0, len = arr.length; i < len; i++) {
        arr[i] = transform(ctx, arr[i], tProp.subType, sProp.subType);
        if (arr[i] === undefined) {
          arr.splice(i, 1);
          i -= 1;
          len -=1;
        }
      }
      return arr;
    } else {
      return [];
    }
  });

export const tuple = new MapperTypeConverter<'tuple', Array<any>>('tuple')
  .setHandler<Array<any>>('tuple', (v, ctx, tProp, sProp) => {
    if (Array.isArray(v)) {
      const tSubTypes = tProp.subTypes;
      const sSubTypes = sProp.subTypes;
      const arr = v.slice();

      for (let i = 0, len = Math.min(tSubTypes.length, sSubTypes.length, v.length); i < len; i++) {
        arr[i] = transform(ctx, v[i], tSubTypes[i], sSubTypes[i]);
      }
      return arr;
    } else {
      return [];
    }
  })
  .setHandler<Array<any>>('array', (v, ctx, tProp, sProp) => {
    if (Array.isArray(v)) {
      const tSubTypes = tProp.subTypes;
      const sSubType = sProp.subType;
      const arr = v.slice();

      for (let i = 0, len = Math.min(tSubTypes.length, v.length); i < len; i++) {
        arr[i] = transform(ctx, v[i], tSubTypes[i], sSubType);
      }
      return arr;
    } else {
      return [];
    }
  })
  .setHandler<Set<any>>('set', (v, ctx, tProp, sProp) => {
    if (v instanceof Set) {
      const tSubTypes = tProp.subTypes;
      const sSubType = sProp.subType;
      const arr = Array.from(v);

      for (let i = 0, len = Math.min(tSubTypes.length, arr.length); i < len; i++) {
        arr[i] = transform(ctx, arr[i], tSubTypes[i], sSubType);
      }
      return arr;
    } else {
      return [];
    }
  })
  .setHandler<Map<any, any>>('map', (v, ctx, tProp, sProp) => {
    if (v instanceof Map) {
      const tSubTypes = tProp.subTypes;
      const sSubType = sProp.subType;
      const arr = Array.from(v.values());

      for (let i = 0, len = Math.min(tSubTypes.length, arr.length); i < len; i++) {
        arr[i] = transform(ctx, arr[i], tSubTypes[i], sSubType);
      }
      return arr;
    } else {
      return [];
    }
  })
  .setHandler<Record<string | number | symbol, any>>('objectMap', (v, ctx, tProp, sProp) => {
    if (typeof v === 'object' && !Array.isArray(v)) {
      const tSubTypes = tProp.subTypes;
      const sSubType = sProp.subType;
      const arr = Object.values(v);

      for (let i = 0, len = Math.min(tSubTypes.length, arr.length); i < len; i++) {
        arr[i] = transform(ctx, arr[i], tSubTypes[i], sSubType);
      }

      return arr;
    } else {
      return [];
    }
  });

export const set = new MapperTypeConverter<'set', Set<any>>('set')
  .setHandler<Array<any>>('array', (v, ctx, tProp, sProp) => {
    const col = new Set();
    if (Array.isArray(v)) {
      for (const item of v) {
        const val = transform(ctx, item, tProp.subType, sProp.subType);
        if (val !== undefined) {
          col.add(val);
        }
      }
    }
    return col;
  })
  .setHandler<Array<any>>('tuple', (v, ctx, tProp, sProp) => {
    const col = new Set();
    if (Array.isArray(v)) {
      const tSubType = tProp.subType;
      const sSubTypes = sProp.subTypes;
      for (let i = 0, len = Math.min(sSubTypes.length, v.length); i < len; i++) {
        col.add(transform(ctx, v[i], tSubType, sSubTypes[i]));
      }
    }
    return col;
  })
  .setHandler<Set<any>>('set', (v, ctx, tProp, sProp) => {
    const col = new Set();
    if (v instanceof Set) {
      for (const item of v) {
        const val = transform(ctx, item, tProp.subType, sProp.subType);
        if (val !== undefined) {
          col.add(val);
        }
      }
    }
    return col;
  })
  .setHandler<Map<any, any>>('map', (v, ctx, tProp, sProp) => {
    const col = new Set();
    if (v instanceof Map) {
      for (const item of v.values()) {
        const val = transform(ctx, item, tProp.subType, sProp.subType);
        if (val !== undefined) {
          col.add(val);
        }
      }
    }
    return col;
  })
  .setHandler<Record<string | number | symbol, any>>('objectMap', (v, ctx, tProp, sProp) => {
    const col = new Set();
    if (typeof v === 'object' && !Array.isArray(v)) {
      for (const item of Object.values(v)) {
        const val = transform(ctx, item, tProp.subType, sProp.subType);
        if (val !== undefined) {
          col.add(val);
        }
      }
    }
    return col;
  });

export const map = new MapperTypeConverter<'map', Map<any, any>>('map')
  .setHandler<Array<any>>('array', (v, ctx, tProp, sProp) => {
    const dict = new Map();
    if (Array.isArray(v)) {
      let dictIndex = 0;
      for (let i = 0, len = v.length; i < len; i++) {
        const val = transform(ctx, v[i], tProp.subType, sProp.subType);
        if (val !== undefined) {
          dict.set(dictIndex++, val);
        }
      }
    }
    return dict;
  })
  .setHandler<Array<any>>('tuple', (v, ctx, tProp, sProp) => {
    const dict = new Map();
    if (Array.isArray(v)) {
      const tSubType = tProp.subType;
      const sSubTypes = sProp.subTypes;
      for (let i = 0, len = Math.min(sSubTypes.length, v.length); i < len; i++) {
        dict.set(i, transform(ctx, v[i], tSubType, sSubTypes[i]));
      }
    }
    return dict;
  })
  .setHandler<Set<any>>('set', (v, ctx, tProp, sProp) => {
    const dict = new Map();
    if (v instanceof Set) {
      let i = 0;
      for (const item of v) {
        const val = transform(ctx, item, tProp.subType, sProp.subType);
        if (val !== undefined) {
          dict.set(i++, val);
        }
      }
    }
    return dict;
  })
  .setHandler<Map<any, any>>('map', (v, ctx, tProp, sProp) => {
    const dict = new Map();
    if (v instanceof Map) {
      for (const [key, item] of v) {
        const val = transform(ctx, item, tProp.subType, sProp.subType);
        if (val !== undefined) {
          dict.set(key, val);
        }
      }
    }
    return dict;
  })
  .setHandler<Record<string | number | symbol, any>>('objectMap', (v, ctx, tProp, sProp) => {
    const dict = new Map();
    if (typeof v === 'object' && !Array.isArray(v)) {
      for (const [key, item] of Object.entries(v)) {
        const val = transform(ctx, item, tProp.subType, sProp.subType);
        if (val !== undefined) {
          dict.set(key, val);
        }
      }
    }
    return dict;
  });

export const objectMap = new MapperTypeConverter<'objectMap', Record<string | number | symbol, any>>('objectMap')
  .setHandler<Array<any>>('array', (v, ctx, tProp, sProp) => {
    const dict = {};
    if (Array.isArray(v)) {
      let dictIndex = 0;
      for (let i = 0, len = v.length; i < len; i++) {
        const val = transform(ctx, v[i], tProp.subType, sProp.subType);
        if (val !== undefined) {
          dict[dictIndex++] = val;
        }
      }
    }
    return dict;
  })
  .setHandler<Array<any>>('tuple', (v, ctx, tProp, sProp) => {
    const dict = {};
    if (Array.isArray(v)) {
      const tSubType = tProp.subType;
      const sSubTypes = sProp.subTypes;
      for (let i = 0, len = Math.min(sSubTypes.length, v.length); i < len; i++) {
        dict[i] = transform(ctx, v[i], tSubType, sSubTypes[i]);
      }
    }
    return dict;
  })
  .setHandler<Set<any>>('set', (v, ctx, tProp, sProp) => {
    const dict = {};
    if (v instanceof Set) {
      let i = 0;
      for (const item of v) {
        const val = transform(ctx, item, tProp.subType, sProp.subType);
        if (val !== undefined) {
          dict[i++] = val;
        }
      }
    }
    return dict;
  })
  .setHandler<Map<any, any>>('map', (v, ctx, tProp, sProp) => {
    const dict = {};
    if (v instanceof Map) {
      for (const [key, item] of v) {
        const val = transform(ctx, item, tProp.subType, sProp.subType);
        if (val !== undefined) {
          dict[key] = val;
        }
      }
    }
    return dict;
  })
  .setHandler<Record<string | number | symbol, any>>('objectMap', (v, ctx, tProp, sProp) => {
    const dict = {};
    if (typeof v === 'object' && !Array.isArray(v)) {
      for (const [key, item] of Object.entries(v)) {
        const val = transform(ctx, item, tProp.subType, sProp.subType);
        if (val !== undefined) {
          dict[key] = val;
        }
      }
    }
    return dict;
  });

mapperTypeConverterRegistry
  .set(array)
  .set(tuple)
  .set(set)
  .set(map)
  .set(objectMap);

