import { ClassDecoratorArgs, Type } from '@pebula/decorate';
import { ClassSchema, ApiMixin } from '@pebula/decorate/fluent';
import { DiscriminatorClassSchema, PARTIAL_CLASS_FLUENT_APIS } from './partials';
import { TomPropertySchemaConfig } from './property';

export class TomClassSchemaConfig<T = any> extends ClassSchema<T, TomPropertySchemaConfig> implements DiscriminatorClassSchema<TomPropertySchemaConfig> {
  discriminator?: TomPropertySchemaConfig;
}

export class TomClassApi extends ApiMixin.Class<TomClassSchemaConfig>().With(...PARTIAL_CLASS_FLUENT_APIS) {
  static schemaFactory(args: ClassDecoratorArgs | Type<any>, isAnonymous?: boolean): TomClassSchemaConfig {
    return new TomClassSchemaConfig(args instanceof ClassDecoratorArgs ? args.target : args, isAnonymous);
  }
}
