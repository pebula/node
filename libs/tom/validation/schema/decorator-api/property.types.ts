import { ValidatorInfo } from '../../known-validators';

export interface ValidationPropertySchema {
  validators?: Array<ValidatorInfo>;
  skipValidation?: boolean;
}

export interface ValidationPropertyFluentApi {
  skipValidation: this;

  min(value: number): this;
  max(value: number): this;

  minLength(value: number): this;
  maxLength(value: number): this;
}

declare module '@pebula/tom/src/lib/schema/decorator-api/property' {
  export interface TomPropertySchemaConfig extends ValidationPropertySchema { }
  export interface TomPropertyFluentApi extends ValidationPropertyFluentApi { }
}

declare module '@pebula/tom/src/lib/schema/schema/property-schema' {
  export interface TomPropertySchema<T = any> extends ValidationPropertySchema { }
}
