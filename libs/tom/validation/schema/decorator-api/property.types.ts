import { ValidatorInfo } from '../../known-validators';

export interface ValidationPropertySchema {
  validators?: Array<ValidatorInfo>;
  skipValidation?: boolean;
}

export interface ValidationPropertyFluentApi {
  skipValidation: this;

  min(value: number | bigint): this;                // number | bigint
  max(value: number | bigint): this;                // number | bigint
  equal(value: number | bigint): this;              // number | bigint
  notEqual(value: number | bigint): this;           // number | bigint
  readonly integer: this;                           // number | bigint
  readonly positive: this;                          // number | bigint
  readonly negative: this;                          // number | bigint

  length(value: number): this;                      // string | array | set | map | objectMap
  minLength(value: number): this;                   // string | array | set | map | objectMap
  maxLength(value: number): this;                   // string | array | set | map | objectMap
  readonly empty: this;                             // string | array | set | map | objectMap

}

declare module '@pebula/tom/src/lib/schema/decorator-api/property' {
  export interface TomPropertySchemaConfig extends ValidationPropertySchema { }
  export interface TomPropertyFluentApi extends ValidationPropertyFluentApi { }
}

declare module '@pebula/tom/src/lib/schema/schema/property-schema' {
  export interface TomPropertySchema<T = any> extends ValidationPropertySchema { }
}
