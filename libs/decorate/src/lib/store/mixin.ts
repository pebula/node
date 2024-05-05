import { Abstract, Proto, Type } from '../types';
import { MixinFw } from '../utils/mixin-fw';
import { DecoratedDomain } from './decorated-domain';

export function Mixin<T1, C1 extends Abstract<unknown>,
                      T2 = unknown, C2 extends Abstract<unknown> = Abstract<unknown>,
                      T3 = unknown, C3 extends Abstract<unknown> = Abstract<unknown>,
                      T4 = unknown, C4 extends Abstract<unknown> = Abstract<unknown>,
                      T5 = unknown, C5 extends Abstract<unknown> = Abstract<unknown>,
                      T6 = unknown, C6 extends Abstract<unknown> = Abstract<unknown>>(m1: C1 & Abstract<T1>,
                                                                                      m2?: C2 & Abstract<T2>,
                                                                                      m3?: C3 & Abstract<T3>,
                                                                                      m4?: C4 & Abstract<T4>,
                                                                                      m5?: C5 & Abstract<T5>,
                                                                                      m6?: C6 & Abstract<T6>,
                                                                                      ...mn: Array<Abstract<any>>): Type<T1 & T2 & T3 & T4 & T5 & T6> & Omit<C1 & C2 & C3 & C4 & C5 & C6, 'constructor'> & Mixin.MixedClassStatic;
/**
 * Class mixin factory used for design-time and run-time.
 *
 * When using mixin, multiple classes can be used to compose a single class that is returned with the
 * composed functionally but also with the composed design time type.
 *
 * Since JS does not support multi-inheritance we need to copy all the class members, both levels, static and instance.
 * This means that:
 *
 * - There is NO prototype chain!
 * - Mixin constructors DOES NOT run.
 *
 * Loosing the prototype chain means we loose all of the reflected metadata (i.e. decorators) that exists on each
 * mixin type including the proto-chain in each mixin type.
 * To workaround this, we will also run special logic that manually aggregate the reflected metadata
 * from all of the mixins and push it as reflected metadata of new class returned.
 * This includes typescript design time metadata created when decorators are used and metadata produced by this library.
 * If things overlap, the last mixin wins!
 *
 * The return class comes fresh and clean with NO prototype chain (other then Object) and with the aggregated functionality of all mixins.
 *
 * You can then use this class directly or extend it.
 *
 * ```typescript
 * class MyClass extends Mixin(Jump, Walk, Eat) {
 * }
 * ```
 *
 * Since MyClass extends the mixed in class directly it will not include it as part of the prototype chain hence all reflected metadata will propagate to MyClass.
 *
 * > Note that full metadata reflection of mixins is possible only when they are decorated with decorated create by `DecoratorDomain`.
 * If not, reflected metadata from properties (flat, no descriptors) is lost since we don't know the property names to query for.
 *
 */
export function Mixin<T, S>(...mixins: Array<S & Abstract<T>>): Type<T> & S {
  class __MixinClass {
    constructor(...args: any[]) {
      executeConstructors(__MixinClass, this, args);
    }
  }

  const constructors: Set<(...args: any[]) => void> = new Set();

  MixinFw.mixIntoClass(__MixinClass, mixins, mixin => {
    handleConstructors(mixin, constructors);
    DecoratedDomain.extendDecoratorMetadata(mixin, __MixinClass);
  }) as any;

  if (constructors.size > 0) {
    __MixinClass[mixedInClassesConstructors] = constructors;
  }

  return __MixinClass as any;
}

const mixinCtorRef = Symbol('∆Decorate:mixinCtorRef');
const mixedInClassesConstructors = Symbol('∆Decorate:mixedInClassesConstructors');

/**
 * Add the mixin constructor, if exists, to the UNIQUE list of mixin constructors.
 * If the mixin is also a mixin target, recursively run the process on it's mixin ancestors.
 */
function handleConstructors(mixin: Abstract<any> | Type<any>, Constructors: Set<(...args: any[]) => void>) {
  if (mixinCtorRef in mixin) {
    Constructors.add(mixin[mixinCtorRef] as any);
  }
  if (MixinFw.isMixinTarget(mixin)) {
    for (const subMixin of MixinFw.getClassMixins(mixin)) {
      handleConstructors(subMixin, Constructors);
    }
  }
}

/**
 * Execute all mixin constructors, if exists.
 * This method is for internal use, if your are providing your own Mixin base target (when using `mixIntoClass` directly)
 * Use this method to execute all mixin constructors in your base class constructor.
 */
function executeConstructors(cls: Type<any>, instance: any, args?: any[]) {
  if (mixedInClassesConstructors in cls) {
    for (const ctor of cls[mixedInClassesConstructors] as Function[]) {
      ctor.apply(instance, args);
    }
  }
}

export namespace Mixin {


  export const hasMixin = MixinFw.hasMixin;
  export type hasMixin = typeof MixinFw.hasMixin;

  export const classHasMixin = MixinFw.classHasMixin;
  export type classHasMixin = typeof MixinFw.classHasMixin;

  export const isMixinTarget = MixinFw.isMixinTarget;
  export type isMixinTarget = typeof MixinFw.isMixinTarget;

  export const MixinScope = MixinFw.MixinScope;
  export type MixinScope = typeof MixinFw.MixinScope;

  export type MixedClassStatic = MixinFw.MixedClassStatic;

  /**
   * A Decorator that marks a class instance method as a mixin constructor.
   * The method will get invoked, with the context of the final target, when the final target is constructed and in the order the mixins are defined.
   * The method will get the same parameters provided by the constructor.
   */
  export const Constructor: <Z extends object>(target: Z extends Function ? never : Z, key: string | symbol, descriptor: PropertyDescriptor) => PropertyDescriptor | void =
    (target: object, key: any, descriptor: PropertyDescriptor) => {
      Object.defineProperty(target.constructor, mixinCtorRef, {
        value: descriptor.value,
        configurable: false,
        enumerable: false,
        writable: false,
      });
  }
}

