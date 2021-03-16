import { Type } from '@pebula/decorate';
import { getSchema, TomPropertySchema } from '../schema';
import { ClassSchemaBuilder } from './class-schema-builder';
import { P } from './decorators';

describe('@pebula/tom', () => {

  const matchTypes = (meta: TomPropertySchema, userType: Type<any>, reflectedType?: Type<any> | true) => {
    expect(meta.type).toBe(userType);
    if (reflectedType === true) {
      reflectedType = userType;
    }
    expect(meta.reflectedType).toBe(reflectedType);
  };

  it('should define reflection information and support inheritance using createTypeSchema', () => {

    class TestClassA {
      notThere: string;
    }
    class TestClassB extends TestClassA { }

    class TestClass1 {
      a: string;
      b: number;
      c: TestClassA;
    }

    class TestClass2 extends TestClass1 {
      c: TestClassB;
      d: string;
      e: Date;
      f: boolean;
    }

    class TestClass3 {
      a: string;
      b: number;
      c: TestClassB;
      d: string;
      e: Date;
      f: boolean;
    }

    ClassSchemaBuilder.create(TestClass1)
      .define('a', P.as(String).buildSchema())
      .define('b', P.as(Number).buildSchema())
      .define('c', P.as(() => TestClassA).buildSchema())
      .verify();

    ClassSchemaBuilder.create(TestClass2) // a & b will be extended automatically, because TestClass2 is actually extending TestClass1
      .ignore('a', 'b')
      .define('c', P.as(TestClassB).buildSchema())
      .define('d', P.as(String).buildSchema())
      .define('e', P.as(Date).buildSchema())
      .define('f', P.as(Boolean).buildSchema())
      .verify();

    ClassSchemaBuilder.create(TestClass3)
      .extends(TestClass1)
      .remove('c')
      .define('c', P.as(() => TestClassB).buildSchema())
      .define('d', P.as(String).buildSchema())
      .define('e', P.as(Date).buildSchema())
      .define('f', P.as(Boolean).buildSchema())
      .verify();

    expect(getSchema(TestClassA)).toBeUndefined();
    expect(getSchema(TestClassB)).toBeUndefined();
    expect(getSchema(TestClass1)).toBeDefined();
    expect(getSchema(TestClass2)).toBeDefined();
    expect(getSchema(TestClass3)).toBeDefined();

    const meta1 = getSchema(TestClass1).getPropertiesAsT()
    const meta2 = getSchema(TestClass2).getPropertiesAsT()
    const meta3 = getSchema(TestClass3).getPropertiesAsT()

    expect(Object.keys(meta1)).toEqual(['a', 'b', 'c']);
    expect(Object.keys(meta2)).toEqual(['a', 'b', 'c', 'd', 'e', 'f']);
    expect(Object.keys(meta3)).toEqual(['a', 'b', 'c', 'd', 'e', 'f']);

    matchTypes(meta1.a, String);
    matchTypes(meta1.b, Number);
    matchTypes(meta1.c, TestClassA);

    matchTypes(meta2.a, String);
    matchTypes(meta2.b, Number);
    matchTypes(meta2.c, TestClassB);
    matchTypes(meta2.d, String);
    matchTypes(meta2.e, Date);
    matchTypes(meta2.f, Boolean);

    matchTypes(meta3.a, String);
    matchTypes(meta3.b, Number);
    matchTypes(meta3.c, TestClassB);
    matchTypes(meta3.d, String);
    matchTypes(meta3.e, Date);
    matchTypes(meta3.f, Boolean);
  });

});
