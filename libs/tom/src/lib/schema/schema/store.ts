import { Type, iterateClassHierarchy } from '@pebula/decorate';
import { store } from '../decorator-api';
import { SCHEMA_SYMBOL, TomClassSchema } from './class-schema';

export function getSchema<T = any>(type: Type<T>): TomClassSchema<T> {
  return Object.getOwnPropertyDescriptor(type, SCHEMA_SYMBOL)?.value || createSchemaAndBind(type);
}

function createSchemaAndBind<T = any>(type: Type<T>, create = false): TomClassSchema<T> {
  const schemaOptions = store.get(type, create as true);
  if (schemaOptions) {
    return new TomClassSchema(schemaOptions);
  } else {
    // This is how we support extending of classes
    for (const subClass of iterateClassHierarchy(type, { emitSelf: false })) {
      if (getSchema(subClass as any)) {
        return createSchemaAndBind(type, true);
      }
    }
  }
}
