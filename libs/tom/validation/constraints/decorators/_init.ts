import { LazyInit } from '@pebula/decorate';
import { ApiMixin, FluentPropertyPlugin, LazyPluginExtension } from '@pebula/decorate/fluent';
import { TypeSystem } from '@pebula/tom';
import { TomPropertySchema, TomPropertySchemaConfig, TomPropertyFluentApi } from '../../../src/lib/schema';
import { Constraint, setConstraintErrorMsgFactory } from '../types';

LazyInit(function() { return []; })(TomPropertySchemaConfig.prototype, 'validators');

@LazyPluginExtension(TomPropertyFluentApi)
export class InitConstraintsFluentApi extends ApiMixin.MixinBase<TomPropertySchemaConfig> {
  @FluentPropertyPlugin()
  get skipValidation(): this {
    this.$$context.schema.skipValidation = true;
    return this;
  }
}

// TODO: Move to class static initialization blocks when in TS... {@link https://github.com/tc39/proposal-class-static-block}
TomPropertySchema.onNew((schema, config) => {
  if (config.skipValidation === true) {
    schema.skipValidation = true;
  }

  schema.validators = config.validators.slice();
});

setConstraintErrorMsgFactory('required', () => `Property is required`);
setConstraintErrorMsgFactory('type', ({prop}) => `Invalid runtime type, expected type ${TypeSystem.tomTypeInstanceToString(prop.typeDef)}`);

declare module '@pebula/tom/src/lib/schema/decorator-api/property' {
  export interface TomPropertySchemaConfig {
    validators?: Array<Constraint>;
    skipValidation?: boolean;
  }

  export interface TomPropertyFluentApi extends ApiMixin.ExtendProperty<TomPropertyFluentApi, InitConstraintsFluentApi> { }
}

declare module '@pebula/tom/src/lib/schema/schema/property-schema' {
  export interface TomPropertySchema<T = any> {
    validators?: Array<Constraint>;
    skipValidation?: boolean;
  }
}
