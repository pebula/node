import { PropertyDecoratorArgs } from '@pebula/decorate';
import { SchemaMixin, ApiMixin } from '@pebula/decorate/fluent';
import { TomClassSchemaConfig } from './class';
import { PARTIAL_PROP_SCHEMAS, PARTIAL_PROP_FLUENT_APIS } from './partials';

export class TomPropertySchemaConfig extends SchemaMixin.Property().With(...PARTIAL_PROP_SCHEMAS) { }

export class TomPropertyFluentApi extends ApiMixin.Property<TomPropertySchemaConfig, TomClassSchemaConfig>().With(...PARTIAL_PROP_FLUENT_APIS) {
  static schemaFactory(args: PropertyDecoratorArgs): TomPropertySchemaConfig {
    return new TomPropertySchemaConfig(args.key as string);
  }
}

