import { Type } from '@pebula/decorate';

/**
 * A base schema class extended by all 4 schema types
 * This schema is used by decorator logic in `_BaseDecorateApi`
 */
export class DecorSchema { }

/**
 * A base schema class extended by schema types that represent an internal component in a class.
 * These are all schema types except the `ClassSchema` (3 Schemas: `PropertySchema`, `MethodSchema` and `ParameterSchema`)
 * This schema is used by decorator logic in `_BaseClassInternalDecorateApi`
 */
export class BaseClassInternalSchema extends DecorSchema {
  reflectedType?: Type<any>;

  constructor(public readonly key: string) {
    super();
  }
}

/**
 * A base schema class extended by schema types that represent metadata for class member's (2 Schemas: `PropertySchema` and `MethodSchema`)
 * This schema is used by decorator logic in `_BaseMemberDecorateApi`
 */
export class DecorMemberSchema<T = any> extends BaseClassInternalSchema { }
