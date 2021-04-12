import { TypeRuntimeValidator, Validator } from '../../../validator';
import { string } from './primitive';

export const array = new TypeRuntimeValidator<Validator, Array<any>>('array')
  .setHandler('type', (value, ctx, prop, validatorMeta) => {
    return !Array.isArray(value);
  })
  .copyFrom(string, 'length', 'minLength', 'maxLength', 'empty')
  .setPostValidationHandler((value, ctx, prop) => {
    if (value.length > 0) {
      const subProp = prop.subType;
      for (let i = 0, len = value.length; i < len; i++) {
        ctx.currentIndexOrKey = i;
        ctx.validateProperty(value[i], subProp);
      }
      ctx.currentIndexOrKey = undefined;
    }
  });

export const set = new TypeRuntimeValidator<Validator, Set<any>>('set')
  .setHandler('type', (value) => {
    return !(value instanceof Set);
  })
  .setHandler('length', (value, ctx, prop, validatorMeta) => {
    return value.size !== validatorMeta.args[0];
  })
  .setHandler('minLength', (value, ctx, prop, validatorMeta) => {
    return value.size < validatorMeta.args[0];
  })
  .setHandler('maxLength', (value, ctx, prop, validatorMeta) => {
    return value.size > validatorMeta.args[0];
  })
  .setHandler('empty', (value) => {
    return value.size !== 0;
  })
  .setPostValidationHandler((value, ctx, prop) => {
    if (value.size > 0) {
      const subProp = prop.subType;
      ctx.currentIndexOrKey = 0;
      for (const item of value) {
        ctx.validateProperty(item, subProp);
        ctx.currentIndexOrKey += 1;
      }
      ctx.currentIndexOrKey = undefined;
    }
  });

export const map = set.clone<Map<any, any>>('map')
  .setHandler('type', (value, ctx, prop, validatorMeta) => {
    return !(value instanceof Map);
  })
  .setPostValidationHandler((value, ctx, prop) => {
    if (value.size > 0) {
      const subProp = prop.subType;
      for (const [key, item] of value) {
        ctx.currentIndexOrKey = key;
        ctx.validateProperty(item, subProp);
      }
      ctx.currentIndexOrKey = undefined;
    }
  });

export const objectMap = new TypeRuntimeValidator<Validator, any>('objectMap')
  .setHandler('type', (value) => {
    return typeof value !== 'object' || Array.isArray(value);
  })
  .setHandler('length', (value, ctx, prop, validatorMeta) => {
    return Object.keys(value).length !== validatorMeta.args[0];
  })
  .setHandler('minLength', (value, ctx, prop, validatorMeta) => {
    return Object.keys(value).length < validatorMeta.args[0];
  })
  .setHandler('maxLength', (value, ctx, prop, validatorMeta) => {
    return Object.keys(value).length > validatorMeta.args[0];
  })
  .setHandler('empty', (value) => {
    return Object.keys(value).length !== 0;
  })
  .setPostValidationHandler((value, ctx, prop) => {
    const entries = Object.entries(value || {});
    if (entries.length > 0) {
      const subProp = prop.subType;
      for (const [key, item] of entries) {
        ctx.currentIndexOrKey = key;
        ctx.validateProperty(item, subProp);
      }
      ctx.currentIndexOrKey = undefined;
    }
  });
