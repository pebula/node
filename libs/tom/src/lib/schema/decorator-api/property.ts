import { PropertyDecoratorArgs, Type } from '@pebula/decorate';
import { FluentMethodPlugin, FluentPropertyPlugin, SchemaMixin, ApiMixin } from '@pebula/decorate/fluent';
import {
  BuildSchemaApi,
  TypeHintingApi, TypeHintingSchema,
  MembersApi, MemberSchema,
} from './partials';
import { TomClassSchemaConfig } from './class';

export class TomPropertySchemaConfig extends SchemaMixin.Property().With(TypeHintingSchema, MemberSchema) {
  isDiscriminator?: boolean;
  groups?: string[];
}

export class TomPropertyFluentApi extends ApiMixin.Property<TomPropertySchemaConfig, TomClassSchemaConfig>()
                                            .With(TypeHintingApi, BuildSchemaApi, MembersApi) {


  @FluentPropertyPlugin()
  get discriminator(): this {
    this.$$context.getClassSchema().discriminator = this.$$context.schema;
    this.$$context.schema.isDiscriminator = true;
    return this;
  }

  @FluentMethodPlugin()
  groups(...groups: string[]): this {
    this.$$context.schema.groups = groups;
    return this;
  }



  static schemaFactory(args: PropertyDecoratorArgs): TomPropertySchemaConfig {
    return new TomPropertySchemaConfig(args.key as string);
  }
}

