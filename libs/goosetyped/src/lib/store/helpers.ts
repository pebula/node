import { Schema, Model } from 'mongoose';
import { gtSchemaStore } from './schema-store';
import { Ctor } from '../utils';
import { Resource } from '../model';

/**
 * Returns the mongoose schema for the provided Model / Resource
 */
export function getSchemaOf<T>(modelClass: Ctor<T>): Schema | undefined {
  const container = gtSchemaStore.get(modelClass);
  if (container) {
    return container.schema;
  }
}

/**
 * Returns the discriminator keys for the provided Model / Resource.
 */
export function getDiscriminatorKeysOf(modelClass: Ctor<any>): string[] {
  const container = gtSchemaStore.get(modelClass);
  let discriminator = container && container.localInfo.discriminator;

  while (discriminator?.type === 'child')
    discriminator = discriminator.root?.discriminator;

  return discriminator?.type === 'root'
    ? Array.from(discriminator.children.keys())
    : [];
}

/**
 * Returns the discriminator key for the provided Model / Resource.
 * Only valid for discriminator implementation, thr base class will not yield a value.
 */
export function getDiscriminatorKeyFor(modelClass: Ctor<any>): string | undefined {
  const container = gtSchemaStore.get(modelClass);
  const discriminator = container && container.localInfo.discriminator;
  if (discriminator && discriminator.type === 'child') {
    return container.getName();
  }
}

export function isDiscriminator(modelClass: Ctor<any>): 'root' | 'child' | undefined {
  const container = gtSchemaStore.get(modelClass);
  return container?.localInfo.discriminator?.type || undefined;
}

/**
 * Return all Models / Resources registered in GooseTyped
 */
export function findModels(): Array<Model<any> | Resource> {
  return gtSchemaStore.findModels({});
}

/**
 * Returns the list of enums registered for a `path` in a Model / Resource.
 */
export function getEnum<T>(cls: Ctor<T>, path: keyof T): string[] {
  const schema = getSchemaOf(cls);
  if (schema) {
    const colSchema = schema.path(path as string);
    if (colSchema) {
      const enumValues = colSchema['options'].enum; // tslint:disable-line: no-string-literal
      if (Array.isArray(enumValues)) {
        return enumValues;
      }
    }
  }
  return [];
}

export function setSkipVersioning(target: object, key: string) {
  const skipVersioning = gtSchemaStore.getCreate(target).getSchemaOptions('skipVersioning') || {};
  skipVersioning[key] = true;
  gtSchemaStore.getCreate(target).setSchemaOptions('skipVersioning', skipVersioning);
}
