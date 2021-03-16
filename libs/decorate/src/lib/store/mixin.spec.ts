import { expectTypeOf } from 'expect-type'
import { Type } from '@pebula/decorate';
import { Reflector } from '../utils';
import { DecoratedDomain } from './decorated-domain';
import { Mixin } from './mixin';

describe('mixin', () => {

  it('should reflect mixin state', () => {
    expect(Mixin.isMixinTarget(TestClass)).toBe(true);
    expect(Mixin.classHasMixin(TestClass, _Version)).toBe(true);
    expect(Mixin.classHasMixin(TestClass, _Timestamp)).toBe(true);
    expect(Mixin.classHasMixin(TestClass, _Save)).toBe(true);
    expect(TestClass[Mixin.hasMixin](_Version)).toBe(true);
    expect(TestClass[Mixin.hasMixin](_Timestamp)).toBe(true);
    expect(TestClass[Mixin.hasMixin](_Save)).toBe(true);

    class InternalTestClass extends Mixin(_Save) { }
    expect(Mixin.isMixinTarget(InternalTestClass)).toBe(true);
    expect(Mixin.classHasMixin(InternalTestClass, _Version)).toBe(false);
    expect(Mixin.classHasMixin(InternalTestClass, _Timestamp)).toBe(false);
    expect(Mixin.classHasMixin(InternalTestClass, _Save)).toBe(true);
    expect(InternalTestClass[Mixin.hasMixin](_Version)).toBe(false);
    expect(InternalTestClass[Mixin.hasMixin](_Timestamp)).toBe(false);
    expect(InternalTestClass[Mixin.hasMixin](_Save)).toBe(true);

    class InternalTestClass2 extends _Save { }
    expect(Mixin.isMixinTarget(InternalTestClass2)).toBe(false);
    expect(Mixin.classHasMixin(InternalTestClass2, _Version)).toBe(false);
    expect(Mixin.classHasMixin(InternalTestClass2, _Timestamp)).toBe(false);
    expect(Mixin.classHasMixin(InternalTestClass2, _Save)).toBe(false);
    expect(InternalTestClass2[Mixin.hasMixin]).toBeUndefined();
  });

  it('should reflect mixin state with inheritance', () => {
    class InternalTestClass extends TestClass { }
    expect(Mixin.isMixinTarget(InternalTestClass)).toBe(true);
    expect(Mixin.classHasMixin(InternalTestClass, _Version)).toBe(true);
    expect(Mixin.classHasMixin(InternalTestClass, _Timestamp)).toBe(true);
    expect(Mixin.classHasMixin(InternalTestClass, _Save)).toBe(true);
    expect(InternalTestClass[Mixin.hasMixin](_Version)).toBe(true);
    expect(InternalTestClass[Mixin.hasMixin](_Timestamp)).toBe(true);
    expect(InternalTestClass[Mixin.hasMixin](_Save)).toBe(true);
  });

  it('should throw on duplicate mixin constructors', () => {
    expect(() => {
      class TestMixin {
        @Mixin.Constructor
        private mixinCtor1(...args: any[]) {}

        @Mixin.Constructor
        private mixinCtor2(...args: any[]) {}
      }
    }).toThrow();
  });

  it('should execute mixin constructors', () => {
    class TestMixin {
      ctor1: any;
      ctorRan: boolean;

      @Mixin.Constructor
      private mixinCtor(...args: any[]) {
        this.ctor1 = args[0];
        this.ctorRan = true;
      }
    }

    class TestMixin2 {
      ctor2: any;
      ctor2Ran: boolean;

      @Mixin.Constructor
      private mixinCtor2(...args: any[]) {
        this.ctor2 = args[0];
        this.ctor2Ran = true;
      }
    }

    class Test extends Mixin(TestMixin, TestMixin2) {
      constructor(value: 'test') {
        super(value);
      }
    }

    const test = new Test('test');
    expect(test.ctorRan).toBe(true);
    expect(test.ctor2Ran).toBe(true);
    expect(test.ctor1).toBe('test');
    expect(test.ctor2).toBe('test');

  });

  it('should not execute mixin constructors of parent class', () => {
    class BaseMixin {
      baseCtorRan: boolean;

      @Mixin.Constructor
      private baseMixinCtor(...args: any[]) {
        this.baseCtorRan = true;
      }
    }

    class TestMixin extends BaseMixin {
      ctorRan: boolean;

      @Mixin.Constructor
      private mixinCtor(...args: any[]) {
        this.ctorRan = true;
      }
    }

    class Test extends Mixin(TestMixin) { }

    const test = new Test();
    // We don't execute the ctor automatically, like class inheritance this should be done using super.XXX()
    // This means it must have at least a protected modifier to allow access, same as class inheritance
    expect(test.baseCtorRan).toBeFalsy();
    expect(test.ctorRan).toBe(true);

  });

  it('should execute mixin constructors of mixin mixed in classes', () => {
    class BaseMixin {
      baseCtorRan: boolean;

      @Mixin.Constructor
      private baseMixinCtor(...args: any[]) {
        this.baseCtorRan = true;
      }
    }

    class TestMixin extends Mixin(BaseMixin) {
      ctorRan: boolean;

      @Mixin.Constructor
      private mixinCtor(...args: any[]) {
        this.ctorRan = true;
      }
    }

    class Test extends Mixin(TestMixin) { }

    const test = new Test();
    expect(test.baseCtorRan).toBe(true);
    expect(test.ctorRan).toBe(true);

  });

  it('should execute mixin constructors of mixin mixed in classes', () => {
    class BaseMixin {
      checkIn: any[];

      @Mixin.Constructor
      private baseMixinCtor(...args: any[]) {
        this.doCheckIn(BaseMixin);
      }

      protected doCheckIn(name: any) {
        if (!this.checkIn) {
          this.checkIn = [];
        }
        this.checkIn.push(name);
      }
    }

    class TestMixin extends BaseMixin {

      @Mixin.Constructor
      private mixinCtor(...args: any[]) {
        this.doCheckIn(TestMixin);
      }
    }

    class TestMixin2 extends Mixin(BaseMixin) {

      @Mixin.Constructor
      private mixinCtor2(...args: any[]) {
        this.doCheckIn(TestMixin2);
      }
    }

    class TestMixin3 extends TestMixin2 {

      @Mixin.Constructor
      private mixinCtor3(...args: any[]) {
        this.doCheckIn(TestMixin3);
      }
    }

    class Test extends Mixin(TestMixin, TestMixin2, TestMixin3) {
      constructor() {
        super();
        this.doCheckIn(Test);
      }
    }

    const test = new Test();
    expect(test.checkIn).toStrictEqual([TestMixin, TestMixin2, BaseMixin, TestMixin3, Test]);

  });

  it('should be able to access mixin members from the final constructed instance.', () => {
    const test = new TestClass();

    const date = new Date();
    test.timestamp = date;
    expect(test.timestamp).toBe(date);
    expect(test.test(9999)).toBe(9999);
  });

  it('should execute mixin constructors of mixin mixed in classes', () => {

    class BaseBaseBaseMixin {
      getMeBackRoot(value: string) {
        return 'ROOT:' + value;
      }
    }

    class BaseBaseMixin extends Mixin(BaseBaseBaseMixin) {
      getMeBack(value: any) {
        return value;
      }
    }


    class BaseMixin extends BaseBaseMixin {
      checkIn: any[];

      doCheckIn(name: any) {
        if (!this.checkIn) {
          this.checkIn = [];
        }
        this.checkIn.push(name);
      }
    }


    class TestMixin extends Mixin(BaseMixin) {  }
    class Test extends Mixin(TestMixin) {}
    let test = new Test();
    test.doCheckIn(15);
    expect(test.checkIn).toStrictEqual([15]);
    expect(test.getMeBack(999)).toStrictEqual(999);
    expect(test.getMeBackRoot('999')).toStrictEqual('ROOT:999');

    class TestMixin2 extends BaseMixin { }
    class Test2 extends Mixin(TestMixin2) {}
    test = new Test2();
    test.doCheckIn(15);
    expect(test.checkIn).toStrictEqual([15]);
    expect(test.getMeBack(999)).toStrictEqual(999);
    expect(test.getMeBackRoot('999')).toStrictEqual('ROOT:999');
  });

  it('should mixin runtime accessors and methods', () => {
    expect(Object.getOwnPropertyDescriptor(Object.getPrototypeOf(TestClass.prototype), 'timestamp')).toStrictEqual(Object.getOwnPropertyDescriptor(_Timestamp.prototype, 'timestamp'));
    expect(TestClass.prototype.save).toBe(_Save.prototype.save);
    expect(TestClass.save).toBe(_Save.save);
  });

  it('should mixin design time types', () => {
    const version = Reflector.getMemberType(TestClass.prototype, 'version');
    expect(version).toBe(String);

    const timestamp = Reflector.getMemberType(TestClass.prototype, 'timestamp');
    expect(timestamp).toBe(Date);

    const temp = Reflector.getMemberType(TestClass, 'temp');
    expect(temp).toBe(RegExp);

    const staticSave = Reflector.getMethodReturnType(TestClass, 'save');
    expect(staticSave).toBe(Promise);

    const save = Reflector.getMethodReturnType(TestClass.prototype, 'save');
    expect(save).toBe(Promise);
  });

  it('should mixin design time types with deep inheritance and overrides', () => {
    class TestClass2 extends TestClass {
      @D async save(@D validate: boolean, @D tag?: string) { return super.save(validate); }
    }

    const version = Reflector.getMemberType(TestClass2.prototype, 'version');
    expect(version).toBe(String);

    const timestamp = Reflector.getMemberType(TestClass2.prototype, 'timestamp');
    expect(timestamp).toBe(Date);

    const temp = Reflector.getMemberType(TestClass2, 'temp');
    expect(temp).toBe(RegExp);

    const staticSave = Reflector.getMethodReturnType(TestClass2, 'save');
    expect(staticSave).toBe(Promise);

    const save = Reflector.getMethodReturnType(TestClass2.prototype, 'save');
    expect(save).toBe(Promise);

    const saveP0 = Reflector.getMethodParamType(TestClass2.prototype, 'save', 0);
    const saveP1 = Reflector.getMethodParamType(TestClass2.prototype, 'save', 1);
    expect(saveP0).toBe(Boolean);
    expect(saveP1).toBe(String);
  });

  it('should reflect mixin types', () => {
    type TypeOf<T> = T extends Type<infer U> ? U : never;

    class M1 { p1: string; static sp1: boolean; m1(p: string): boolean { return true; }; static sm1(p: Date): RegExp { return /x/; }; }
    class M2 { p2: string; static sp2: boolean; m2(p: string): boolean { return true; }; static sm2(p: Date): RegExp { return /x/; }; }
    class M3 { p3: string; static sp3: boolean; m3(p: string): boolean { return true; }; static sm3(p: Date): RegExp { return /x/; }; }
    class M4 { p4: string; static sp4: boolean; m4(p: string): boolean { return true; }; static sm4(p: Date): RegExp { return /x/; }; }
    class M5 { p5: string; static sp5: boolean; m5(p: string): boolean { return true; }; static sm5(p: Date): RegExp { return /x/; }; }
    class M6 { p6: string; static sp6: boolean; m6(p: string): boolean { return true; }; static sm6(p: Date): RegExp { return /x/; }; }
    class M7 { p7: string; static sp7: boolean; m7(p: string): boolean { return true; }; static sm7(p: Date): RegExp { return /x/; }; }

    // 1 Mixins
    const C1 = Mixin(M1);
    type C1 = typeof C1;

    type C1S = typeof M1;
    type C1I = M1;
    expectTypeOf<C1>().toEqualTypeOf<Type<C1I> & C1S & Mixin.MixedClassStatic>();
    expectTypeOf<TypeOf<C1>>().toEqualTypeOf<C1I>();

    // 2 Mixins
    const C2 = Mixin(M1, M2);
    type C2 = typeof C2;

    type C2S = C1S & typeof M2;
    type C2I = C1I & M2;
    expectTypeOf<C2>().toEqualTypeOf<Type<C2I> & C2S & Mixin.MixedClassStatic>();
    expectTypeOf<TypeOf<C2>>().toEqualTypeOf<C2I>();
    // Negate
    expectTypeOf<C2>().not.toEqualTypeOf<Type<C1I> & C1S & Mixin.MixedClassStatic>();
    expectTypeOf<TypeOf<C2>>().not.toEqualTypeOf<C1I>();
    expectTypeOf<C2>().toMatchTypeOf<Type<C1I> & C1S & Mixin.MixedClassStatic>();
    expectTypeOf<TypeOf<C2>>().toMatchTypeOf<C1I>();

    // 3 Mixins
    const C3 = Mixin(M1, M2, M3);
    type C3 = typeof C3;

    type C3S = C2S & typeof M3;
    type C3I = C2I & M3;
    expectTypeOf<C3>().toEqualTypeOf<Type<C3I> & C3S & Mixin.MixedClassStatic>();
    expectTypeOf<TypeOf<C3>>().toEqualTypeOf<C3I>();
    // Negate
    expectTypeOf<C3>().not.toEqualTypeOf<Type<C2I> & C2S & Mixin.MixedClassStatic>();
    expectTypeOf<TypeOf<C3>>().not.toEqualTypeOf<C2I>();
    expectTypeOf<C3>().toMatchTypeOf<Type<C2I> & C2S & Mixin.MixedClassStatic>();
    expectTypeOf<TypeOf<C3>>().toMatchTypeOf<C2I>();

    // 4 Mixins
    const C4 = Mixin(M1, M2, M3, M4);
    type C4 = typeof C4;

    type C4S = C3S & typeof M4;
    type C4I = C3I & M4;
    expectTypeOf<C4>().toEqualTypeOf<Type<C4I> & C4S & Mixin.MixedClassStatic>();
    expectTypeOf<TypeOf<C4>>().toEqualTypeOf<C4I>();
    // Negate
    expectTypeOf<C4>().not.toEqualTypeOf<Type<C3I> & C3S & Mixin.MixedClassStatic>();
    expectTypeOf<TypeOf<C4>>().not.toEqualTypeOf<C3I>();
    expectTypeOf<C4>().toMatchTypeOf<Type<C3I> & C3S & Mixin.MixedClassStatic>();
    expectTypeOf<TypeOf<C4>>().toMatchTypeOf<C3I>();

    // 5 Mixins
    const C5 = Mixin(M1, M2, M3, M4, M5);
    type C5 = typeof C5;

    type C5S = C4S & typeof M5;
    type C5I = C4I & M5;
    expectTypeOf<C5>().toEqualTypeOf<Type<C5I> & C5S & Mixin.MixedClassStatic>();
    expectTypeOf<TypeOf<C5>>().toEqualTypeOf<C5I>();
    // Negate
    expectTypeOf<C5>().not.toEqualTypeOf<Type<C4I> & C4S & Mixin.MixedClassStatic>();
    expectTypeOf<TypeOf<C5>>().not.toEqualTypeOf<C4I>();
    expectTypeOf<C5>().toMatchTypeOf<Type<C4I> & C4S & Mixin.MixedClassStatic>();
    expectTypeOf<TypeOf<C5>>().toMatchTypeOf<C4I>();

    // 6 Mixins - Signature type limit
    const C6 = Mixin(M1, M2, M3, M4, M5, M6);
    type C6 = typeof C6;

    type C6S = C5S & typeof M6;
    type C6I = C5I & M6;
    expectTypeOf<C6>().toEqualTypeOf<Type<C6I> & C6S & Mixin.MixedClassStatic>();
    expectTypeOf<TypeOf<C6>>().toEqualTypeOf<C6I>();
    // Negate
    expectTypeOf<C6>().not.toEqualTypeOf<Type<C5I> & C5S & Mixin.MixedClassStatic>();
    expectTypeOf<TypeOf<C6>>().not.toEqualTypeOf<C5I>();
    expectTypeOf<C6>().toMatchTypeOf<Type<C5I> & C5S & Mixin.MixedClassStatic>();
    expectTypeOf<TypeOf<C6>>().toMatchTypeOf<C5I>();

    // 7 Mixins - Passed signature type limit, 7th type is lost!
    const C7 = Mixin(M1, M2, M3, M4, M5, M6, M7);
    type C7 = typeof C7;

    type C7S = C6S & typeof M7;
    type C7I = C6I & M7;
    expectTypeOf<C7>().not.toEqualTypeOf<Type<C7I> & C7S & Mixin.MixedClassStatic>();
    expectTypeOf<TypeOf<C7>>().not.toEqualTypeOf<C7I>();

    expectTypeOf<C7>().toEqualTypeOf<Type<C6I> & C6S & Mixin.MixedClassStatic>();
    expectTypeOf<TypeOf<C7>>().toEqualTypeOf<C6I>();

  });
});

const D = new DecoratedDomain().createImmediateDecorator();

class _Version {
  @D version: string;

  test(value: any) {
    return value;
  }
}

class _Timestamp {
  @D get timestamp(): Date { return this._timestamp; }
  set timestamp(value: Date) { this._timestamp = value; }

  private _timestamp: Date;

}

class _Save {
  @D static temp: RegExp;

  @D static async save(@D dictionary: Map<string, object>, @D validate: boolean) { return Promise.resolve(true); }
  @D async save(@D validate: boolean) { return Promise.resolve(true); }
}

class TestClass extends Mixin(_Version, _Timestamp, _Save) { }

