import { DecoratedDomain } from '@pebula/decorate';
import { Mixin } from './mixin';
import { DecorClassApi } from '../base-api/class';

describe('mixin', () => {

  it('should reflect mixin state', () => {
    expect(Mixin.isMixinTarget(TestClass)).toBe(true);
    expect(Mixin.classHasMixin(TestClass, _Version)).toBe(true);
    expect(Mixin.classHasMixin(TestClass, _Timestamp)).toBe(true);
    expect(Mixin.classHasMixin(TestClass, _Save)).toBe(true);
    expect(TestClass[Mixin.hasMixin](_Version)).toBe(true);
    expect(TestClass[Mixin.hasMixin](_Timestamp)).toBe(true);
    expect(TestClass[Mixin.hasMixin](_Save)).toBe(true);

    class InternalTestClass extends Mixin(DecorClassApi, _Save) { }
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

});

const D = new DecoratedDomain().createImmediateDecorator();

class _Version {
  @D version: string;
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

class TestClass extends Mixin(DecorClassApi, _Version, _Timestamp, _Save) { }

