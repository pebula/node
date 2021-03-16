import { Type, PropertyDecoratorArgs, ParameterDecoratorArgs, MethodDecoratorArgs } from '@pebula/decorate';
import {
  DecorApiSuite, executePlugins,
  FluentPropertyPlugin, FluentMethodPlugin, MethodPlugin,
  PropertySchema,
  DecorPropertyApi,
  ClassSchema,
  ParameterSchema,
  DecorParameterApi,
  MethodSchema,
  DecorMethodApi,
  DecorClassSchemaStore,
  DecorClassApi
} from '@pebula/decorate/fluent';
import { invalidDecoratedPluginTarget } from '../lib/plugin/decorator-domain/errors';

export class TestPropertySchema extends PropertySchema {
  defaultValue?: any;
  optional?: boolean;
  type?: Type<any>;
  isDiscriminator?: boolean;
}

export class TestPropertyFluentApi extends DecorPropertyApi<TestPropertySchema> {

  @FluentPropertyPlugin()
  get optional(): this {
    this.$$context.schema.optional = true;
    return this;
  }

  @FluentPropertyPlugin()
  get discriminator(): this {
    this.$$context.schema.isDiscriminator = true;
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

  @MethodPlugin()
  buildSchema(target: object, name: string, index?: number): TestPropertySchema {
    const schema = new TestPropertySchema(name);
    executePlugins(this, schema, target);
    return schema;
  }

  protected createSchema(args: PropertyDecoratorArgs): TestPropertySchema {
    return new TestPropertySchema(args.key as string);
  }
}

const store = new DecorClassSchemaStore(DecorClassApi.schemaFactory);
const F = DecorApiSuite.create().forClass(DecorClassApi, store).forProperty(TestPropertyFluentApi).propertyApi;

describe('', () => {
  it('should throw if decorated plugin class is not a base class of one of the 4 class types', () => {
    expect(() => {
      class TestPropertyFluentApi {
        @(FluentPropertyPlugin() as any)
        get optional(): this {
          return this;
        }
      }
    }).toThrow(invalidDecoratedPluginTarget(TestPropertyFluentApi, 'FluentPropertyPlugin'));
  });

  it('', () => {

    class C {

      @F.discriminator
      key: string;

      @F.optional.type(Number).default(4)
      prop: string;
    }

    const classSchema = store.get(C);

    // const [cParam1, cParam0] = classSchema.getConstructorParams();
    // expect(cParam0).toBeTruthy();
    // expect(cParam0.reflectedType).toBe(String);
    // expect(cParam1).toBeTruthy();
    // expect(cParam1.reflectedType).toBe(Number);

    // const prop = classSchema.getProperty('prop');
    // expect(prop).toBeTruthy();
    // expect(prop.defaultValue).toBe(4);
    // expect(prop.type).toBe(Number);
    // expect(prop.reflectedType).toBe(String);
    // expect(prop.optional).toBe(true);

    // const key = classSchema.getProperty('key');
    // expect(key).toBeTruthy();
    // expect(key.isDiscriminator).toBe(true);
    // expect(classSchema.discriminator).toBe(key);

  });
});
