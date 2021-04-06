import { FluentPropertyPlugin, ApiMixin, ClassSchema, PropertySchema } from '@pebula/decorate/fluent';

export class DiscriminatorClassSchema<TProp extends PropertySchema = PropertySchema> {
  discriminator?: TProp;
}

export class DiscriminatorPropertySchema {
  isDiscriminator?: boolean;
}

export abstract class DiscriminatorApi extends ApiMixin.MixinBase<DiscriminatorPropertySchema, ClassSchema<any, any> & DiscriminatorClassSchema> {
  @FluentPropertyPlugin()
  get discriminator(): this {
    this.$$context.getClassSchema().discriminator = this.$$context.schema as any;
    this.$$context.schema.isDiscriminator = true;
    return this;
  }
}
