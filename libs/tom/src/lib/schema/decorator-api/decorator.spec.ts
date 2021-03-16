import { Type } from '@pebula/decorate';
import { P } from './decorators';
import { getSchema, TomPropertySchema } from '../schema';

describe('@pebula/tom', () => {

  const matchTypes = (meta: TomPropertySchema, userType: Type<any>, reflectedType?: Type<any> | true) => {
    expect(meta.type).toBe(userType);
    if (reflectedType === true) {
      reflectedType = userType;
    }
    expect(meta.reflectedType).toBe(reflectedType);
  };

  it('should define reflection information and support inheritance using @P', () => {

    class TestClassA {
      notThere: string;
    }
    class TestClassB extends TestClassA { }

    class TestClass1 extends TestClassA {
      @P a: string;
      @P b: number;
      @P c: TestClassA;
    }

    class TestClass2 extends TestClass1 {
      @P c: TestClassB;
      @P d: string;
      @P e: Date;
      @P f: boolean;
    }

    expect(getSchema(TestClassA)).toBeUndefined();
    expect(getSchema(TestClassB)).toBeUndefined();
    expect(getSchema(TestClass1)).toBeDefined();
    expect(getSchema(TestClass2)).toBeDefined();

    const meta1 = getSchema(TestClass1).getPropertiesAsT()
    const meta2 = getSchema(TestClass2).getPropertiesAsT()

    expect(Object.keys(meta1)).toEqual(['a', 'b', 'c']);
    expect(Object.keys(meta2)).toEqual(['a', 'b', 'c', 'd', 'e', 'f']);

    matchTypes(meta1.a, String, true);
    matchTypes(meta1.b, Number, true);
    matchTypes(meta1.c, TestClassA, true);

    matchTypes(meta2.a, String, true);
    matchTypes(meta2.b, Number, true);
    matchTypes(meta2.c, TestClassB, true);
    matchTypes(meta2.d, String, true);
    matchTypes(meta2.e, Date, true);
    matchTypes(meta2.f, Boolean, true);
  });
});
