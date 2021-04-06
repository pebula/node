import { FluentMethodPlugin, ApiMixin } from '@pebula/decorate/fluent';

export class SerializationSchema {
  transform?: (v: any) => any;
}

export abstract class SerializationApi extends ApiMixin.MixinBase<SerializationSchema> {
  @FluentMethodPlugin()
  transform(transformer: (v: any) => any): this {
    this.$$context.schema.transform = transformer;
    return this;
  }
}
