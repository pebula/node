import { BaseDecoratorArgs } from '@pebula/decorate';
import { DecorApi, executePlugins, MethodPlugin, ApiMixin, SchemaFromDecorApi, BaseFluentApi, Mixin } from '@pebula/decorate/fluent';

export class BuildSchemaApi extends ApiMixin.MixinBase<{}> {
  buildSchema(): SchemaFromDecorApi<this extends BaseFluentApi ? this : any>
  buildSchema(target: object, name: string, index?: number): SchemaFromDecorApi<this extends BaseFluentApi ? this : any>
  @MethodPlugin()
  buildSchema(target?: object, name?: string, index?: number) {
    const schema = DecorApi.getSchemaType(this).schemaFactory(BaseDecoratorArgs.create(target || Object.prototype, name || 'key', index));
    executePlugins(this, schema, target || Object.prototype);
    return schema;
  }
}

export function isBuildSchemaApi(obj: any): obj is BuildSchemaApi {
  return Mixin.classHasMixin(obj.constructor, BuildSchemaApi);
}
