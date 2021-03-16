import { expectTypeOf } from 'expect-type'
import { Type } from '../types';
import { Reflector } from './reflector';

describe('utils/decorators', () => {
  it('should only allow to get metadata for mapped members', () => {
    expectTypeOf(Reflector.getMemberType(TestClass, 'staticProp')).toEqualTypeOf<Type<Date>>();
    expectTypeOf(Reflector.getMemberType(TestClass.prototype, 'prop')).toEqualTypeOf<Type<Set<string>>>();
    expectTypeOf(Reflector.getMethodReturnType(TestClass, 'staticMethod')).toEqualTypeOf<Type<TestClass>>();
    expectTypeOf(Reflector.getMethodReturnType(TestClass.prototype, 'method')).toEqualTypeOf<Type<TestClass>>();
    expectTypeOf(Reflector.getMethodParamTypes(TestClass, 'staticMethod')).toEqualTypeOf<[Type<string>, Type<RegExp>, Type<BigInt>]>();
    expectTypeOf(Reflector.getMethodParamTypes(TestClass.prototype, 'method')).toEqualTypeOf<[Type<boolean>, Type<Map<any, any>>, Type<Array<string>>]>();
    expectTypeOf(Reflector.getMethodParamType(TestClass, 'staticMethod', 1)).toEqualTypeOf<Type<RegExp>>();
    expectTypeOf(Reflector.getMethodParamType(TestClass.prototype, 'method', 0)).toEqualTypeOf<Type<boolean>>();
    // TODO: Fix
    // @ts-expect-error
    expectTypeOf(Reflector.getMethodParamTypes(TestClass.prototype, 'methodOptional')).toEqualTypeOf<[Type<boolean>, Type<Map<any, any>>, Type<Array<string>>]>();
    expectTypeOf(Reflector.getMethodParamType(TestClass.prototype, 'methodOptional', 0)).toEqualTypeOf<Type<boolean>>();
    expectTypeOf(Reflector.getMethodParamType(TestClass.prototype, 'methodOptional', 5)).toBeNever();
    expectTypeOf(Reflector.getCtorParamTypes(TestClass)).toEqualTypeOf<[Type<string>, Type<number>, Type<Date>]>();
    expectTypeOf(Reflector.getCtorParamType(TestClass, 2)).toEqualTypeOf<Type<Date>>();
    expectTypeOf(Reflector.getCtorParamType(TestClass, 7)).toBeNever();

    // @ts-expect-error
    expect(Reflector.getMemberType(TestClass.prototype, 'xxx')).toBeUndefined();
    // @ts-expect-error
    expect(Reflector.getMemberType(TestClass, 'xxx')).toBeUndefined();
    // @ts-expect-error
    expect(Reflector.getMethodReturnType(TestClass.prototype, 'xxx')).toBeUndefined();
    // @ts-expect-error
    expect(Reflector.getMethodReturnType(TestClass, 'xxx')).toBeUndefined();

  });

  it('should return the property types', () => {
    const staticProp = Reflector.getMemberType(TestClass, 'staticProp');
    expect(staticProp).toBe(Date);

    const prop = Reflector.getMemberType(TestClass.prototype, 'prop');
    expect(prop).toBe(Set);

    const staticMethod = Reflector.getMethodReturnType(TestClass, 'staticMethod');
    expect(staticMethod).toBe(TestClass);

    const method = Reflector.getMethodReturnType(TestClass.prototype, 'method');
    expect(method).toBe(TestClass);

    const ctorParams = Reflector.getCtorParamTypes(TestClass);
    expect(ctorParams).toStrictEqual([String, Number, Date]);

    const staticMethodParams = Reflector.getMethodParamTypes(TestClass, 'staticMethod');
    expect(staticMethodParams).toStrictEqual([String, RegExp, Object]);

    const methodParams = Reflector.getMethodParamTypes(TestClass.prototype, 'method');
    expect(methodParams).toStrictEqual([Boolean, Map, Array]);

    const staticMethodParam1 = Reflector.getMethodParamType(TestClass, 'staticMethod', 1);
    expect(staticMethodParam1).toStrictEqual(RegExp);

    const methodParam0 = Reflector.getMethodParamType(TestClass.prototype, 'method', 0);
    expect(methodParam0).toStrictEqual(Boolean);

    const ctorParam2 = Reflector.getCtorParamType(TestClass, 2);
    expect(ctorParam2).toStrictEqual(Date);
  });
});

const D = (...args: any[]) => {};

class TestClass {
  @D static staticProp: Date;
  @D prop: Set<string>;

  constructor(@D a: string, @D b: number, @D c: Date) {}

  @D static staticMethod(@D a: string, @D b: RegExp, @D c: BigInt): TestClass { return null; }
  @D method(@D a: boolean, @D b: Map<any, any>, @D c: Array<string>): TestClass { return null; }

  @D methodOptional(@D a: boolean, @D b: Map<any, any>, @D c?: Array<string>): TestClass { return null; }

}
