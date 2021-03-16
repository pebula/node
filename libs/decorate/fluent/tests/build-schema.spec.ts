import { Type, ClassDecoratorArgs, PropertyDecoratorArgs, ParameterDecoratorArgs, MethodDecoratorArgs, BaseDecoratorArgs } from '@pebula/decorate';
import { PluginContext } from '../lib/plugin/plugin-context';
import {
  DecorApiSuite,
  executePlugins,
  FluentPropertyPlugin, FluentMethodPlugin, MethodPlugin,
  PropertySchema,
  DecorPropertyApi,
  ClassSchema,
  ParameterSchema,
  DecorParameterApi,
  MethodSchema,
  DecorMethodApi,
  DecorApi,
  MEMBER_DECOR_API_TYPE,
  DECOR_API_TYPE,
  BaseClassInternalSchema,
  PluginSchemaMap,
  DecorMixinBase,
  Mixin, ApiMixin,
  DecorClassApi,
} from '@pebula/decorate/fluent';

class MemberSchema {
  defaultValue?: any;
  optional?: boolean;
  type?: Type<any>;
}

abstract class MemberSchemaFluentApiDecorator extends ApiMixin.MixinBase<MemberSchema> {
  @FluentPropertyPlugin()
  get optional(): this {
    this.$$context.schema.optional = true;
    return this;
  }

  @FluentMethodPlugin()
  type(type: Type<any>): this {
    this.$$context.schema.type = type;
    return this;
  }

  @FluentMethodPlugin()
  default(value: any): this {
    this.$$context.schema.defaultValue = value;
    return this;
  }
}

abstract class BuildSchemaApiDecorator extends ApiMixin.MixinBase<unknown> {
  @MethodPlugin()
  buildSchema(target: object, name: string, index?: number) {
    const schema = DecorApi.getSchemaType(this).schemaFactory(BaseDecoratorArgs.create(target, name, index));
    executePlugins(this, schema, target);
    return schema;
  }
}

export class TestClassSchema<T = any> extends ClassSchema<TestClassFluentApi, TestPropertySchema, TestMethodSchema, TestParameterSchema> {
  discriminator?: PropertySchema;
}

export class TestClassFluentApi extends DecorClassApi<TestClassSchema> {
  static schemaFactory(args: ClassDecoratorArgs | Type<any>, isAnonymous?: boolean): TestClassSchema {
    return new TestClassSchema(args instanceof ClassDecoratorArgs ? args.target : args, isAnonymous);
  }
}

export class TestPropertySchema extends Mixin(PropertySchema, MemberSchema) {
  isDiscriminator?: boolean;
}

export class TestPropertyFluentApi extends ApiMixin.Property<TestPropertySchema, TestClassSchema>()
                                              .With(MemberSchemaFluentApiDecorator, BuildSchemaApiDecorator) {
  @FluentPropertyPlugin()
  get discriminator(): this {
    this.$$context.getClassSchema().discriminator = this.$$context.schema as PropertySchema;
    this.$$context.schema.isDiscriminator = true;
    return this;
  }

  static schemaFactory(args: PropertyDecoratorArgs): TestPropertySchema {
    return new TestPropertySchema(args.key as string);
  }
}

export class TestMethodSchema extends Mixin(MethodSchema, MemberSchema) {}
export class TestMethodFluentApi extends ApiMixin.Method<TestMethodSchema>()
                                          .With(MemberSchemaFluentApiDecorator, BuildSchemaApiDecorator) {
  static schemaFactory(args: MethodDecoratorArgs): TestMethodSchema {
    return new TestMethodSchema(args.key as string);
  }
}

export class TestParameterSchema extends Mixin(ParameterSchema, MemberSchema) { }
export class TestParameterFluentApi extends ApiMixin.Parameter<TestParameterSchema>()
                                              .With(MemberSchemaFluentApiDecorator, BuildSchemaApiDecorator) {

  static schemaFactory(args: ParameterDecoratorArgs): TestParameterSchema {
    return new TestParameterSchema(args.key as string, args.index);
  }
}

describe('', () => {
  it('', () => {

    const suite = DecorApiSuite.create({
      class: TestClassFluentApi,
      property: TestPropertyFluentApi,
      method: TestMethodFluentApi,
      parameter: TestParameterFluentApi,
    });
    const store = suite.store;
    const C = suite.classApi;
    const F = suite.propertyApi;
    const M = suite.methodApi;
    const P = suite.parameterApi;

    class TestClass {

      constructor(p: string, z: number) {}

      key: string;

      prop: string;

      method(x: number): boolean {
        return true;
      }
    }

    const classSchema = store.create(TestClass)
      .addPropertySchema(F.discriminator.buildSchema(TestClass.prototype, 'key'))
      .addPropertySchema(F.optional.type(Number).default(4).buildSchema(TestClass.prototype, 'prop'))
      .addMethodSchema(M.buildSchema(TestClass.prototype, 'method')
        .addParamSchema(P.buildSchema(TestClass.prototype, 'method', 0))
      ).addConstructorParam(
        P.buildSchema(TestClass, null, 0),
        P.buildSchema(TestClass, null, 1)
      );
    const [cParam0, cParam1] = classSchema.getConstructorParams();
    expect(cParam0).toBeTruthy();
    expect(cParam1).toBeTruthy();

    const prop = classSchema.getProperty('prop');
    expect(prop).toBeTruthy();
    expect(prop.defaultValue).toBe(4);
    expect(prop.type).toBe(Number);
    expect(prop.optional).toBe(true);

    const key = classSchema.getProperty('key');
    expect(key).toBeTruthy();
    expect(key.isDiscriminator).toBe(true);
    expect(classSchema.discriminator).toBe(key);

    const method = classSchema.getMethod('method');
    expect(method).toBeTruthy();
    const params = method.getParams();
    expect(params.length).toBe(1);
  });

});
