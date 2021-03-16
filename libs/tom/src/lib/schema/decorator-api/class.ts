import { ClassDecoratorArgs, Type } from '@pebula/decorate';
import { ClassSchema, ApiMixin } from '@pebula/decorate/fluent';
import { BuildSchemaApi } from './partials';
import { TomPropertySchemaConfig } from './property';

export class TomClassSchemaConfig<T = any> extends ClassSchema<T, TomPropertySchemaConfig> {
  discriminator: TomPropertySchemaConfig;
}

export class TomClassApi extends ApiMixin.Class<TomClassSchemaConfig>()
                                  .With(BuildSchemaApi) {
  static schemaFactory(args: ClassDecoratorArgs | Type<any>, isAnonymous?: boolean): TomClassSchemaConfig {
    return new TomClassSchemaConfig(args instanceof ClassDecoratorArgs ? args.target : args, isAnonymous);
  }
}
