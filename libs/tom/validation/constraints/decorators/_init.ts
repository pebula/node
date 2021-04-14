import { LazyInit } from '@pebula/decorate';
import { ApiMixin, FluentPropertyPlugin, LazyPluginExtension } from '@pebula/decorate/fluent';
import { Schema } from '@pebula/tom';
import { TomPropertySchema, TomPropertySchemaConfig, TomPropertyFluentApi } from '../../../src/lib/schema';
import { setConstraintDef } from '../definitions';
import { Constraint } from '../types';

LazyInit(function() { return []; })(TomPropertySchemaConfig.prototype, 'validators');

export interface InitConstraintsSchemaConfig {
  validators?: Array<Constraint>;
  skipValidation?: boolean;
}

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

setConstraintDef('required', { createErrorMsg: () => `Property is required` });
setConstraintDef('type', {
  createErrorMsg: ({value, prop}) => {
    switch (prop.typeDef.type) {
      case 'tuple':
        return `Invalid runtime type, expected tuple with ${Schema.getTupleMinItems(prop)} elements ${prop.printType()} but source has ${value.length}`
      default:
        return `Invalid runtime type, expected type ${prop.printType()}`;
    }
  },
});

declare module '@pebula/tom/src/lib/schema/decorator-api/property' {
  export interface TomPropertySchemaConfig extends InitConstraintsSchemaConfig { }

  export interface TomPropertyFluentApi extends ApiMixin.ExtendProperty<TomPropertyFluentApi, InitConstraintsFluentApi> { }
}

declare module '@pebula/tom/src/lib/schema/schema/property-schema' {
  export interface TomPropertySchema<T = any> extends InitConstraintsSchemaConfig { }
}
