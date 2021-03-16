import {
  ClassSchema,
  PropertySchema,
  MethodSchema,
  ParameterSchema,
} from '../schema';
import {
  DecorClassApi,
  DecorPropertyApi,
  DecorMethodApi,
  DecorParameterApi,
} from './base-api';

export interface PluginSchemaMap {
  class: ClassSchema<any>;
  property: PropertySchema<any>;
  method: MethodSchema<any>;
  parameter: ParameterSchema<any>;
}

export interface FluentApiTypeMap {
  class: DecorClassApi,
  property: DecorPropertyApi,
  method: DecorMethodApi,
  parameter: DecorParameterApi,
}

export type DECOR_API_TYPE = 'class' | 'property' | 'method' | 'parameter';
export type MEMBER_DECOR_API_TYPE = Exclude<DECOR_API_TYPE, 'class'>;
export type CLASS_DECOR_API_TYPE = Extract<DECOR_API_TYPE, 'class'>;
export type MIXIN_DECOR_API_TYPE = 'mixin';
