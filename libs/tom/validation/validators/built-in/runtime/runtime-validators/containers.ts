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
        ctx.validateProperty(value[i], subProp);
      }
    }
  });

export const set = new TypeRuntimeValidator<Validator, Set<any>>('set')
  .setHandler('type', (value) => {
    return !(value instanceof Set);
  })
  .setHandler('length', (value, ctx, prop, validatorMeta) => {
    return value.size !== validatorMeta.args;
  })
  .setHandler('minLength', (value, ctx, prop, validatorMeta) => {
    return value.size < validatorMeta.args;
  })
  .setHandler('maxLength', (value, ctx, prop, validatorMeta) => {
    return value.size > validatorMeta.args;
  })
  .setHandler('empty', (value) => {
    return value.size !== 0;
  })
  .setPostValidationHandler((value, ctx, prop) => {
    if (value.size > 0) {
      const subProp = prop.subType;
      for (const item of value) {
        ctx.validateProperty(item, subProp);
      }
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
        ctx.validateProperty(item, subProp);
      }
    }
  });

export const objectMap = new TypeRuntimeValidator<Validator, any>('objectMap')
  .setHandler('type', (value) => {
    return typeof value !== 'object' || Array.isArray(value);
  })
  .setHandler('length', (value, ctx, prop, validatorMeta) => {
    return Object.keys(value).length !== validatorMeta.args;
  })
  .setHandler('minLength', (value, ctx, prop, validatorMeta) => {
    return Object.keys(value).length < validatorMeta.args;
  })
  .setHandler('maxLength', (value, ctx, prop, validatorMeta) => {
    return Object.keys(value).length > validatorMeta.args;
  })
  .setHandler('empty', (value) => {
    return Object.keys(value).length !== 0;
  })
  .setPostValidationHandler((value, ctx, prop) => {
    const entries = Object.entries(value || {});
    if (entries.length > 0) {
      const subProp = prop.subType;
      for (const [key, item] of entries) {
        ctx.validateProperty(item, subProp);
      }
    }
  });
