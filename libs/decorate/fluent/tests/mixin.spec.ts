import { Type, ClassDecoratorArgs, PropertyDecoratorArgs, ParameterDecoratorArgs, MethodDecoratorArgs, BaseDecoratorArgs } from '@pebula/decorate';
import { PluginContext } from '../lib/plugin/plugin-context';
import {
  DecorApiSuite,
  executePlugins,
  FluentPropertyPlugin, FluentMethodPlugin, MethodPlugin,
  PropertySchema,
  ClassSchema,
  ParameterSchema,
  MethodSchema,
  DecorApi,
  DECOR_API_TYPE,
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

// const suite = DecorApiSuite.create()
//   .forClass(TestClassFluentApi)
//   .forProperty(TestPropertyFluentApi)
//   .forMethod(TestMethodFluentApi)
//   .forParameter(TestParameterFluentApi);


describe('', () => {
  it('', () => {

    const suite = DecorApiSuite.create({
      class: TestClassFluentApi,
      property: TestPropertyFluentApi,
      method: TestMethodFluentApi,
      parameter: TestParameterFluentApi,
    });

    const C = suite.classApi;
    const F = suite.propertyApi;
    const M = suite.methodApi;
    const P = suite.parameterApi;

    class TestClass {

      constructor(@P p: string, @P z: number) { }

      @F.discriminator
      key: string;

      @F.optional.type(Number).default(4)
      prop: string;


      @M.optional.type(Number).default(4)
      method(@P.optional.default(true) p: boolean, @P r: RegExp): this {
        return this;
      }
    }

    class Q {}
    const sch =  F.type(String).optional.discriminator.buildSchema(Q.prototype, 'key');

    const classSchema = suite.store.get(TestClass);

    const [cParam0, cParam1] = classSchema.getConstructorParams().reverse();
    expect(cParam0).toBeTruthy();
    expect(cParam0.reflectedType).toBe(String);
    expect(cParam1).toBeTruthy();
    expect(cParam1.reflectedType).toBe(Number);

    const prop = classSchema.getProperty('prop');
    expect(prop).toBeTruthy();
    expect(prop.defaultValue).toBe(4);
    expect(prop.type).toBe(Number);
    expect(prop.reflectedType).toBe(String);
    expect(prop.optional).toBe(true);

    const key = classSchema.getProperty('key');
    expect(key).toBeTruthy();
    expect(key.isDiscriminator).toBe(true);
    expect(classSchema.discriminator).toBe(key);

    const method = classSchema.getMethod('method');
    expect(method).toBeTruthy();
    expect(method.defaultValue).toBe(4);
    expect(method.type).toBe(Number);
    expect(method.optional).toBe(true);

    const [methodP0, methodP1] = method.getParams().reverse();
    expect(methodP0).toBeTruthy();
    expect(methodP0.reflectedType).toBe(Boolean);
    expect(methodP0.defaultValue).toBe(true);
    expect(methodP0.optional).toBe(true);
    expect(methodP1).toBeTruthy();
    expect(methodP1.reflectedType).toBe(RegExp);

  });

  it('should fire onDecorate events', () => {

    const onDecorate = (context: PluginContext<DECOR_API_TYPE>) => {
      switch (context.type) {
        case 'parameter':
          const schema = context.schema as TestParameterSchema;
          if (schema.key === 'constructor') {
            switch (schema.index) {
              case 0:
                expect(schema).toBeTruthy();
                expect(schema.reflectedType).toBe(String);
                break;
              case 1:
                expect(schema).toBeTruthy();
                expect(schema.reflectedType).toBe(Number);
                break;
            }
          } else {
            expect(schema.key).toBe('method');
            switch (schema.index) {
              case 0:
                expect(schema).toBeTruthy();
                expect(schema.reflectedType).toBe(Boolean);
                expect(schema.defaultValue).toBe(true);
                expect(schema.optional).toBe(true);
                break;
              case 1:
                expect(schema).toBeTruthy();
                expect(schema.reflectedType).toBe(RegExp);
                break;
            }
          }
          break;
        case 'property':
            const prop = context.schema as TestPropertySchema;
            if (prop.key === 'prop') {
              expect(prop).toBeTruthy();
              expect(prop.defaultValue).toBe(4);
              expect(prop.type).toBe(Number);
              expect(prop.reflectedType).toBe(String);
              expect(prop.optional).toBe(true);
            }
            break;
        case 'method':
            const method = context.schema as TestMethodSchema;
            expect(method).toBeTruthy();
            expect(method.defaultValue).toBe(4);
            expect(method.type).toBe(Number);
            expect(method.optional).toBe(true);
            break;
      }

    };

    const suite = DecorApiSuite.create({
      class: TestClassFluentApi,
      property: TestPropertyFluentApi,
      method: TestMethodFluentApi,
      parameter: TestParameterFluentApi,
    })
    .onDecorate(onDecorate)

    const C = suite.classApi;
    const F = suite.propertyApi;
    const M = suite.methodApi;
    const P = suite.parameterApi;

    class TestClass {

      constructor(@P p: string, @P z: number) { }

      @F.discriminator
      key: string;

      @F.optional.type(Number).default(4)
      prop: string;


      @M.optional.type(Number).default(4)
      method(@P.optional.default(true) p: boolean, @P r: RegExp): this {
        return this;
      }
    }

  });

});
