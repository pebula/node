import { Type, PropertyDecoratorArgs, ParameterDecoratorArgs, MethodDecoratorArgs } from '@pebula/decorate';
import {
  DecorApiSuite,
  FluentPropertyPlugin, FluentMethodPlugin, MethodPlugin,
  PropertySchema,
  DecorPropertyApi,
  ClassSchema,
  ParameterSchema,
  DecorParameterApi,
  MethodSchema,
  DecorMethodApi,
  executePlugins
} from './index';

export class MyPropertySchema extends PropertySchema {
  defaultValue?: any;
  optional?: boolean;
  type?: Type<any>;
  isDiscriminator?: boolean;
}

export class PropertyFluentApi extends DecorPropertyApi<MyPropertySchema> {

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
  buildSchema(target: object, name: string, index?: number) {
    const schema = (this.$$context.type as any) === 'parameter'
      ? new MyParameterSchema(name, index)
      : this.$$context.type === 'property' ? new MyPropertySchema(name) : new MyMethodSchema(name)
    ;
    executePlugins(this, schema, target);
    return schema;
  }

  protected createSchema(args: PropertyDecoratorArgs): MyPropertySchema {
    return new MyPropertySchema(args.key as string);
  }
}

// TODO: Check mixins
export class MyParameterSchema extends ParameterSchema { }
export class ParameterFluentApi extends DecorParameterApi<MyParameterSchema> {
  protected createSchema(args: ParameterDecoratorArgs): MyParameterSchema {
    return new MyParameterSchema(args.key as string, args.index);
  }
}

export class MyMethodSchema extends MethodSchema { }
export class MethodFluentApi extends DecorMethodApi<MyMethodSchema> {
  protected createSchema(args: MethodDecoratorArgs): MyMethodSchema {
    return new MyMethodSchema(args.key as string);
  }
}

const suite = DecorApiSuite.create()
  .forProperty(PropertyFluentApi)
  .forMethod(MethodFluentApi)
  .forParameter(ParameterFluentApi);

const F = suite.propertyApi;
const M = suite.methodApi;
const P = suite.parameterApi;

describe('', () => {
  it('', () => {
    class C {

      constructor(@P p: string, @P z: number) {
      }

      @F.discriminator
      key: string;

      @F.optional.type(Number).default(4)
      prop: string;

      @M
      method(@P x: number): boolean {
        return true;
      }
    }

    const classSchema = suite.store.get(C);

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

    // const method = classSchema.getMethod('method');
    // expect(method).toBeTruthy();
    // const params = method.getParams();
    // expect(params.length).toBe(1);
    // expect(params[0].reflectedType).toBe(Number);
  });

  it('', () => {
    class C {

      constructor(p: string, z: number) {}

      key: string;

      prop: string;

      method(x: number): boolean {
        return true;
      }
    }

    // const classSchema = ClassSchema.create(C)
    //   .addPropertySchema(F.discriminator.buildSchema(C.prototype, 'key'))
    //   .addPropertySchema(F.optional.type(Number).default(4).buildSchema(C.prototype, 'prop'))
    //   .addMethodSchema(M.buildSchema(C.prototype, 'method')
    //     .addParamSchema(P.buildSchema(C.prototype, 'method', 0))
    //   ).addConstructorParam(
    //     P.buildSchema(C, null, 0),
    //     P.buildSchema(C, null, 1)
    //   );
    // const [cParam0, cParam1] = classSchema.getConstructorParams();
    // expect(cParam0).toBeTruthy();
    // expect(cParam1).toBeTruthy();

    // const prop = classSchema.getProperty('prop');
    // expect(prop).toBeTruthy();
    // expect(prop.defaultValue).toBe(4);
    // expect(prop.type).toBe(Number);
    // expect(prop.optional).toBe(true);

    // const key = classSchema.getProperty('key');
    // expect(key).toBeTruthy();
    // expect(key.isDiscriminator).toBe(true);
    // expect(classSchema.discriminator).toBe(key);

    // const method = classSchema.getMethod('method');
    // expect(method).toBeTruthy();
    // const params = method.getParams();
    // expect(params.length).toBe(1);
  });
});
