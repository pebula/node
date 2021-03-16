import { expectTypeOf } from 'expect-type'
import { ClassDecoratorOf, MethodDecoratorOf, PropertyDecoratorOf } from './decorator';
import { Class } from './oop';

describe('Decorator TypeScript type assertions', () => {

  it('ClassDecoratorOf', () => {

    expectTypeOf<ClassDecoratorOf<any>>().toBeFunction();
    expectTypeOf<ClassDecoratorOf<any>>().parameter(0).toEqualTypeOf<Class<any, any>>();
    expectTypeOf<ClassDecoratorOf<{ a: string }>>().parameter(0).toEqualTypeOf<Class<{ a: string }, unknown>>();
    expectTypeOf<ClassDecoratorOf<{ a: string }, { b: number }>>().parameter(0).toEqualTypeOf<Class<{ a: string }, { b: number }>>();

    class TestClass {
      static z: number;
      y: string;
    }
    expectTypeOf<ClassDecoratorOf<TestClass>>().parameter(0).toEqualTypeOf<Class<TestClass, unknown>>();
    expectTypeOf<ClassDecoratorOf<TestClass, string>>().parameter(0).toEqualTypeOf<Class<TestClass, string>>();
    // @ts-expect-error
    expectTypeOf<ClassDecoratorOf<TestClass>>().parameter(0).toEqualTypeOf<Class<TestClass, typeof TestClass>>();
    expectTypeOf<ClassDecoratorOf<typeof TestClass>>().parameter(0).toEqualTypeOf<Class<TestClass, typeof TestClass>>();

    const D0: ClassDecoratorOf<typeof TestClass> = () => {};

    @D0
    class D0_Test_1 extends TestClass {
      static z: number;
      y: string;

      // @ts-expect-error
      @D0 testProp: boolean;

      // @ts-expect-error
      @D0 testMethod(): void { }

      // @ts-expect-error
      testMethodParam(@D0 param: string): void { }
    }

    const D1: ClassDecoratorOf<TestClass> = () => {};

    @D1 class D1_Test_1 { y: string; }
    @D1 class D1_Test_2 { y: string; f: number; static w: boolean; }
    // @ts-expect-error
    @D1 class D1_Test_3 { }
    // @ts-expect-error
    @D1 class D1_Test_4 { y?: string; }
    // @ts-expect-error
    @D1 class D1_Test_5 { y: number; }


    const D2: ClassDecoratorOf<TestClass, { f: number }> = () => {};

    @D2 class D2_Test_1 { y: string; static f: number; }
    @D2 class D2_Test_2 { y: string; o: number; static f: number; static w: boolean; }
    // @ts-expect-error
    @D2 class D2_Test_3 { y: string }
    // @ts-expect-error
    @D2 class D2_Test_4 { y: string; static f?: number; }
    // @ts-expect-error
    @D2 class D2_Test_5 { y: string; static f: boolean; }

    const D3: ClassDecoratorOf<typeof TestClass> = () => {};

    @D3 class D3_Test_1 { y: string; static z: number; }
    @D3 class D3_Test_2 { y: string; o: number; static z: number; static w: boolean; }
    // @ts-expect-error
    @D3 class D3_Test_3 { y: string }
    // @ts-expect-error
    @D3 class D3_Test_4 { y: string; static z?: number; }
    // @ts-expect-error
    @D3 class D3_Test_5 { y: string; static z: boolean; }

    const D4: ClassDecoratorOf<typeof TestClass> = () => {};
    @D4 class D4_Test_1 extends TestClass { }
    @D4 class D4_Test_2 extends TestClass { o: number; static f: number; }

    class GenericTestClass<T> {
      static z: number;
      y: T;
    }

    const D5: ClassDecoratorOf<GenericTestClass<Date>> = () => {};

    @D5 class D5_Test_1 extends GenericTestClass<Date> { }
    @D5 class D5_Test_2 extends GenericTestClass<any> { }
    @D5 class D5_Test_3 { y: Date; static z: number; }
    // @ts-expect-error
    @D5 class D5_Test_4 { y?: Date; static z: number; }
    // @ts-expect-error
    @D5 class D5_Test_5 extends GenericTestClass<unknown> { }

    // TODO: Known issue!
    const D6: ClassDecoratorOf<GenericTestClass<Date>, typeof GenericTestClass> = () => {};
    // @ts-expect-error
    @D6 class D6_Test_1 extends GenericTestClass<Date> { }
  });

  it('PropertyDecoratorOf', () => {

    expectTypeOf<PropertyDecoratorOf<any>>().toBeFunction();
    expectTypeOf<PropertyDecoratorOf<any>>().parameter(0).toEqualTypeOf<Record<any, any>>();
    expectTypeOf<PropertyDecoratorOf<any>>().parameter(1).toEqualTypeOf<string>();

    const D_ALL: PropertyDecoratorOf<string> = () => {};
    const D_INSTANCE: PropertyDecoratorOf<string, 'instance'> = () => {};
    const D_STATIC: PropertyDecoratorOf<string, 'static'> = () => {};

    class TestClass {

      @D_ALL pAll_1: string;
      @D_ALL static pAllStatic_1: string;
      // @ts-expect-error
      @D_ALL pAll_2: boolean;
      // @ts-expect-error
      @D_ALL static pAllStatic_2: boolean;
      // @ts-expect-error
      @D_ALL mAll_1(): string { }
      // @ts-expect-error
      @D_ALL static mAllStatic_1(): string { }
      // @ts-expect-error
      mAll_2(@D_ALL param: string): void { }
      // @ts-expect-error
      static mAllStatic_2(@D_ALL param: string): void { }

      @D_INSTANCE pInstance_1: string;
      // @ts-expect-error
      @D_INSTANCE pInstance_2: boolean;
      // @ts-expect-error
      @D_INSTANCE static pInstanceStatic_1: string;
      // @ts-expect-error
      @D_INSTANCE static pInstanceStatic_2: boolean;
      // @ts-expect-error
      @D_INSTANCE mInstance_1(): string { }
      // @ts-expect-error
      @D_INSTANCE static mInstanceStatic_1(): string { }
      // @ts-expect-error
      mInstance_2(@D_INSTANCE param: string): void { }
      // @ts-expect-error
      static mInstanceStatic_2(@D_INSTANCE param: string): void { }

      @D_STATIC static pStaticStatic_1: string;
      // @ts-expect-error
      @D_STATIC pStatic_1: string;
      // @ts-expect-error
      @D_STATIC pStatic_2: boolean;
      // @ts-expect-error
      @D_STATIC static pStaticStatic_2: boolean;
      // @ts-expect-error
      @D_STATIC mStatic_1(): string { }
      // @ts-expect-error
      @D_STATIC static mStaticStatic_1(): string { }
      // @ts-expect-error
      mStatic_2(@D_STATIC param: string): void { }
      // @ts-expect-error
      static mStaticStatic_2(@D_STATIC param: string): void { }
    }

  });

  it('MethodDecoratorOf', () => {
    const D_VOID: MethodDecoratorOf<[boolean, Date]> = () => {};
    const D_ANY_PARAMS: MethodDecoratorOf<[...any], boolean> = () => {};
    const D_NO_PARAMS: MethodDecoratorOf<undefined, Date> = () => {};
    const D_ALL: MethodDecoratorOf<[string, string], number> = () => {};
    const D_INSTANCE: MethodDecoratorOf<[string, string], number, 'instance'> = () => {};
    const D_STATIC: MethodDecoratorOf<[string, string], number, 'static'> = () => {};

    class TestClass {
      @D_VOID mVoid_1(a: boolean, b: Date) { }
      @D_VOID static mStaticVoid_1(a: boolean, b: Date) { }
      @D_VOID mVoid_2(a: boolean, b: Date) { return; }
      @D_VOID static mStaticVoid_2(a: boolean, b: Date) { return; }
      @D_VOID mVoid_3(a: boolean, b: Date): void { }
      @D_VOID static mStaticVoid_3(a: boolean, b: Date): void { }
      @D_VOID mVoid_4(a: boolean, b: Date): unknown { return {}; } // TODO: Prevent returning unknown?
      @D_VOID static mStaticVoid_4(a: boolean, b: Date): unknown { return {}; } // TODO: Prevent returning unknown?

      // @ts-expect-error | Decorated method return type must match constraint
      @D_VOID mVoid_5(a: boolean, b: Date): null { return null; }
      // @ts-expect-error | Decorated method return type must match constraint
      @D_VOID static mStaticVoid_5(a: boolean, b: Date): null { return null; }
      // @ts-expect-error | Decorated method return type must match constraint
      @D_VOID mVoid_6(a: boolean, b: Date): undefined { return; }
      // @ts-expect-error | Decorated method return type must match constraint
      @D_VOID static mStaticVoid_6(a: boolean, b: Date): undefined { return; }
      // @ts-expect-error | Decorated method return type must match constraint
      @D_VOID mVoid_7(a: boolean, b: Date) { return ''; }
      // @ts-expect-error | Decorated method return type must match constraint
      @D_VOID static mVoid_7(a: boolean, b: Date) { return ''; }

      @D_ANY_PARAMS mAnyParams_1(): boolean { return true; }
      @D_ANY_PARAMS AnyParams_1(): boolean { return true; }
      @D_ANY_PARAMS mAnyParams_2(a: string, a1: Date, a2: RegExp): boolean { return true; }
      @D_ANY_PARAMS static mAnyParams_2(a: string, a1: Date, a2: RegExp): boolean { return true; }

      @D_NO_PARAMS mNoParams_1(): Date { return new Date(); }
      @D_NO_PARAMS static mNoParams_1(): Date { return new Date(); }
      @D_NO_PARAMS mNoParams_2(a?: string): Date { return new Date(); }
      @D_NO_PARAMS static mmNoParams_2(a?: string): Date { return new Date(); }
      // @ts-expect-error | Decorated method parameters must match constraint
      @D_NO_PARAMS mNoParams_3(a: string): Date { return new Date(); }
      // @ts-expect-error | Decorated method parameters must match constraint
      @D_NO_PARAMS static mNoParams_3(a: string): Date { return new Date(); }

      /* All (static and instance) */
      @D_ALL mAll_1(a: string, b: string): number  { return 1; }
      @D_ALL static mAllStatic_1(a: string, b: string): number  { return 1; }
      @D_ALL mAll_2(a: string, b?: string): number  { return 1; }
      @D_ALL static mAllStatic_2(a?: string, b?: string): number { return 1; }
      @D_ALL mAll_3(a: string, b: string, c?: any): number  { return 1; }
      @D_ALL static mAllStatic_3(a: string, b: string, c?: any): number { return 1; }

      // @ts-expect-error | Decorated method parameters must match constraint
      @D_ALL mAll_4(): number { return 1; }
      // @ts-expect-error | Decorated method parameters must match constraint
      @D_ALL static mAllStatic_4(): number { return 1; }

      // @ts-expect-error | Decorated method parameters must match constraint
      @D_ALL mAll_5(a: Date, b: number): number { return 1; }
      // @ts-expect-error | Decorated method parameters must match constraint
      @D_ALL static mAllStatic_5(a: Date, b: number): number { return 1; }

      // @ts-expect-error | Decorated method parameters can not include REQUIRED additional parameters
      @D_ALL mAll_6(a: string, b: string, c: any): number { return 1; }
      // @ts-expect-error | Decorated method parameters can not include REQUIRED additional parameters
      @D_ALL static mAllStatic_6(a: string, b: string, c: any): number { return 1; }

      // @ts-expect-error | Decorated method must return the exact type
      @D_ALL mAll_7(a: string, b: string): number | Date { return 1; }
      // @ts-expect-error | Decorated method must return the exact type
      @D_ALL static mAllStatic_7(a: string, b: string): number | Date { return 1; }

      // @ts-expect-error | Can not decorate method parameters
      mAll_8(@D_ALL param: string): void { }
      // @ts-expect-error | Can not decorate method parameters
      static mAllStatic_8(@D_ALL param: string): void { }
      // @ts-expect-error | Can only decorate class method
      @D_ALL pAll_1: number;
      // @ts-expect-error
      @D_ALL static pAllStatic_1: number;
      // @ts-expect-error | Cant use it on property in the shape of a method.
      @D_ALL pAll_2: (a: string, b: string) => number;
      // @ts-expect-error | Cant use it on property in the shape of a method.
      @D_ALL static pAll_2: (a: string, b: string) => number;

      /* Instance */

      @D_INSTANCE mInstance_1(a: string, b: string): number  { return 1; }
      @D_INSTANCE mInstance_2(a: string, b?: string): number  { return 1; }
      @D_INSTANCE mInstance_3(a: string, b: string, c?: any): number  { return 1; }

      // @ts-expect-error | Decoration restricted to class instance methods
      @D_INSTANCE static mInstanceStatic_1(a: string, b: string): number  { return 1; }
      // @ts-expect-error | Decoration restricted to class instance methods
      @D_INSTANCE static mInstanceStatic_2(a?: string, b?: string): number { return 1; }
      // @ts-expect-error | Decoration restricted to class instance methods
      @D_INSTANCE static mInstanceStatic_3(a: string, b: string, c?: any): number { return 1; }

      // @ts-expect-error | Decorated method parameters must match constraint
      @D_INSTANCE mInstance_4(): number { return 1; }
      // @ts-expect-error | Decorated method parameters must match constraint
      @D_INSTANCE static mInstanceStatic_4(): number { return 1; }

      // @ts-expect-error | Decorated method parameters must match constraint
      @D_INSTANCE mInstance_5(a: Date, b: number): number { return 1; }
      // @ts-expect-error | Decorated method parameters must match constraint
      @D_INSTANCE static mInstanceStatic_5(a: Date, b: number): number { return 1; }

      // @ts-expect-error | Decorated method parameters can not include REQUIRED additional parameters
      @D_INSTANCE mInstance_6(a: string, b: string, c: any): number { return 1; }
      // @ts-expect-error | Decorated method parameters can not include REQUIRED additional parameters
      @D_INSTANCE static mInstanceStatic_6(a: string, b: string, c: any): number { return 1; }

      // @ts-expect-error | Decorated method must return the exact type
      @D_INSTANCE mInstance_7(a: string, b: string): number | Date { return 1; }
      // @ts-expect-error | Decorated method must return the exact type
      @D_INSTANCE static mInstanceStatic_7(a: string, b: string): number | Date { return 1; }

      // @ts-expect-error | Can not decorate method parameters
      mInstance_8(@D_INSTANCE param: string): void { }
      // @ts-expect-error | Can not decorate method parameters
      static mInstanceStatic_8(@D_INSTANCE param: string): void { }
      // @ts-expect-error | Can only decorate class method
      @D_INSTANCE pInstance_1: number;
      // @ts-expect-error
      @D_INSTANCE static pInstanceStatic_1: number;
      // @ts-expect-error | Cant use it on property in the shape of a method.
      @D_INSTANCE pInstance_2: (a: string, b: string) => number;
      // @ts-expect-error | Cant use it on property in the shape of a method.
      @D_INSTANCE static pInstance_2: (a: string, b: string) => number;

      /* Static */

      @D_STATIC static mStaticStatic_1(a: string, b: string): number  { return 1; }
      @D_STATIC static mStaticStatic_2(a?: string, b?: string): number { return 1; }
      @D_STATIC static mStaticStatic_3(a: string, b: string, c?: any): number { return 1; }

      // @ts-expect-error | Decoration restricted to static class methods
      @D_STATIC mStatic_1(a: string, b: string): number  { return 1; }
      // @ts-expect-error | Decoration restricted to static class methods
      @D_STATIC mStatic_2(a: string, b?: string): number  { return 1; }
      // @ts-expect-error | Decoration restricted to static class methods
      @D_STATIC mStatic_3(a: string, b: string, c?: any): number  { return 1; }

      // @ts-expect-error | Decorated method parameters must match constraint
      @D_STATIC mStatic_4(): number { return 1; }
      // @ts-expect-error | Decorated method parameters must match constraint
      @D_STATIC static mStaticStatic_4(): number { return 1; }

      // @ts-expect-error | Decorated method parameters must match constraint
      @D_STATIC mStatic_5(a: Date, b: number): number { return 1; }
      // @ts-expect-error | Decorated method parameters must match constraint
      @D_STATIC static mStaticStatic_5(a: Date, b: number): number { return 1; }

      // @ts-expect-error | Decorated method parameters can not include REQUIRED additional parameters
      @D_STATIC mStatic_6(a: string, b: string, c: any): number { return 1; }
      // @ts-expect-error | Decorated method parameters can not include REQUIRED additional parameters
      @D_STATIC static mStaticStatic_6(a: string, b: string, c: any): number { return 1; }

      // @ts-expect-error | Decorated method must return the exact type
      @D_STATIC mStatic_7(a: string, b: string): number | Date { return 1; }
      // @ts-expect-error | Decorated method must return the exact type
      @D_STATIC static mStaticStatic_7(a: string, b: string): number | Date { return 1; }

      // @ts-expect-error | Can not decorate method parameters
      mStatic_8(@D_STATIC param: string): void { }
      // @ts-expect-error | Can not decorate method parameters
      static mStaticStatic_8(@D_STATIC param: string): void { }
      // @ts-expect-error | Can only decorate class method
      @D_STATIC pStatic_1: number;
      // @ts-expect-error
      @D_STATIC static pStaticStatic_1: number;
      // @ts-expect-error | Cant use it on property in the shape of a method.
      @D_STATIC pStatic_2: (a: string, b: string) => number;
      // @ts-expect-error | Cant use it on property in the shape of a method.
      @D_STATIC static pStatic_2: (a: string, b: string) => number;
    }

  });
});
