import { FluentMethodPlugin, FluentPropertyPlugin, ApiMixin } from '@pebula/decorate/fluent';

export class SerializationSchema {
  exclude?: boolean;
  transform?: (v: any) => any;
}

export abstract class SerializationApi extends ApiMixin.MixinBase<SerializationSchema> {
  @FluentPropertyPlugin()
  get exclude(): this {
    this.$$context.schema.exclude = true;
    return this;
  }

  @FluentMethodPlugin()
  transform(transformer: (v: any) => any): this {
    this.$$context.schema.transform = transformer;
    return this;
  }
}
