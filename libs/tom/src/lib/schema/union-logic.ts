/*
For 'union' type we need to use runtime logic to detect if the type provided to us is part of the union and what is that type.
This is true for both JIT and runtime.

To support this, we have type detectors which are used as a predicate to determine if a runtime value is a specific type.

An atomic identification is usually simple but the combination is complex.
For example, a string is easily identified (typeof x === 'string') and also an enum, which is the value must be a valid enum value.
however, a union of string & enum (When the enum is set to use labels) is tricky, if we identify the string first we will not detect the enum
cause in this case all enums are string and/or numbers... they are a subset.
So, the order matters.
Another example is classes, a union of multiple classes must be able to detect the class in a unique way (e.g. discriminators) but a union
of class & literal does not... since there is only one class.

This is why we need to manage the logic.
*/

import { TomPropertySchema } from './schema/property-schema';
import { TypeDef } from './type-system';

/*
Unhandled edge cases:

Union of enum & literal where the enum uses labels and the literal is also a valid label
*/

const order: Record<TypeDef, number> = {
  literal: 10,

  enum: 20,

  // We need bigInt before string/number cause if we have number it will overlap, so we go for bigInt to make sure we don't loose data
  bigInt: 30,

  // All primitives are safe, including arrays and sets
  boolean: 40,
  number: 40,
  string: 40,
  date: 40,
  array: 40,
  set: 40,
  arrayBuffer: 40,
  int8Array: 40,
  int16Array: 40,
  int32Array: 40,
  uint8Array: 40,
  uint16Array: 40,
  uint32Array: 40,
  uint8ClampedArray: 40,
  bigInt64Array: 40,
  bigUint64Array: 40,
  float32Array: 40,
  float64Array: 40,

  // `class` comes before `map` and `objectMap` because the latter can be objects, which are also class instances...
  class: 50,

  map: 60,
  objectMap: 60,

  any: 70,

  // This is just to please the compiler, we can't have union of union, these are flattened out into a single union.
  union: 999,
};

function sortPropertySchemaByTypeOrder(p1: TomPropertySchema, p2: TomPropertySchema) {
  return order[p1.typeDef.type] > order[p2.typeDef.type]
    ? 1
    : order[p2.typeDef.type] > order[p1.typeDef.type]
      ? -1
      : 0
  ;
}

function isClassLikePropertySchema(p: TomPropertySchema) {
  switch(p.typeDef.type) {
    case 'class':
    case 'map':
    case 'objectMap':
      return true;
  }
  return false;
}

/**
 * Give a property schema that represents union type, return a sorted list based on the types it contains
 * The returned sorted list reflects the order in which runtime objects should be evaluated in order to find the actual type.
 */
export function determineUnionListResolveOrder(unionType: TomPropertySchema<any>) {
  const sorted = unionType.unionSubTypes.slice().sort(sortPropertySchemaByTypeOrder);
  const classLikeProperties = sorted.filter(isClassLikePropertySchema);
  return { sorted, classLikeProperties };
}
