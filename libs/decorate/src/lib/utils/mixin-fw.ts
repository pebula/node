import toFastProperties from 'to-fast-properties';
import { Abstract, Proto, Type, } from '../types';
import { iterateClassHierarchy, getBaseClass } from './proto';

const mixedInClasses = Symbol('∆Decorate:mixedInClasses');
const MixinScopeInstance = 1;
const MixinScopeStatic = 2;

function _classHasMixin(this: Type<any>, mixin: Abstract<any> | Type<any>): boolean {
  return this?.[mixedInClasses]?.has(mixin) ?? false;
}

export abstract class MixinFw {

  /**
   * A symbol added to all classes which has other classes mixed into them via `Mixin.mixIntoClass`.
   * The symbol return a function that you can use to query if a certain mixin was mixin into the class.
   */
  static readonly hasMixin = Symbol.for('∆Decorate:hasMixin∆');

  /**
   * Returns true if the class (`cls`) has other classes mixed into it.
   */
  static isMixinTarget(cls: Type<any> | Abstract<any>): boolean {
    return mixedInClasses in cls;
  }

  /**
   * Returns true if the class (`class`) has the class mixin (`mixin`) mixed into it.
   */
  static classHasMixin(cls: Type<any> | Abstract<any>, mixin: Abstract<any> | Type<any>): boolean {
    return cls[mixedInClasses]?.has(mixin) ?? false;
  }

  static getClassMixins(cls: Type<any> | Abstract<any>): IterableIterator<Type<any> | Abstract<any>> {
    return cls[mixedInClasses]?.values();
  }

  /**
   * Merge the members of all classes provided in `mixins` into a single class (`cls`).
   * Both class and instance level members are merged.
   *
   * Note that this is a low-level implementation that provides a generic mixin functionality, not specific to this library, which can be extended.
   * If a decoration exists on a mixin class or one of it's members the decorations and metadata are NOT copied!
   * Since this is MIXIN and not inheritance it will not be available through reflection, including design type information (reflect-metadata).
   * Reflected metadata is kept throughout the prototype chain but mixins are not part of the chain so it's important to copy that data as well.
   *
   * @param cls  The class to mixin to
   * @param mixins The class to mixin from
   * @param onMixedIn A Hook to implement your own logic when a mixin was mixed in
   * @param scope The scope to copy, default to all
   * @param forceCopyParentMembers  When true will force hard copy of the prototype of all base classes of a mixin
   * You can disable this if your compilation target is ES5 or lower, otherwise leave this enabled or you will face issues
   * with multi-tier mixin implementations (mixins that inherit or are mixin targets themselves.) Default: true
   */
  static mixIntoClass<T extends Abstract<any> | Type<any>>(cls: T,
                                                           mixins: Iterable<Abstract<any> | Type<any>>,
                                                           onMixedIn?: (mixin: Abstract<any> | Type<any>) => unknown,
                                                           scope: MixinFw.MixinScope = MixinFw.MixinScope.All,
                                                           forceCopyParentMembers: boolean = true): void {
    const proto = cls.prototype;

    const mixedInList: Set<Abstract<any> | Type<any>> = cls[mixedInClasses] === getBaseClass(cls)?.[mixedInClasses]
      ? new Set(cls[mixedInClasses] || [])
      : cls[mixedInClasses] || new Set();
    ;


    cls[mixedInClasses] || new Set();
    getBaseClass
    for (const mixin of mixins) {
      mixedInList.add(mixin);
      if (MixinScopeStatic === (scope & MixinScopeStatic)) {
        this.mixIntoObject(mixin, cls);
      }
      if (MixinScopeInstance === (scope & MixinScopeInstance)) {
        this.mixIntoObject(mixin.prototype, proto);

        // When running in ES6+, where classes are native, Mixins that extends from another class will
        // not propagate the base class members and accessors to the instance and they will be lost.
        // In ES6+ there is no hard-copy of members from bases classes to the extending class.
        // The members/accessors are accessed through the prototype chain.
        // Since we loose the chain and these members are also not present on the extending mixin, we most copy them.
        // In runtime, mixins can access their base class member via `super` but not via `this`.
        // The final instance created will not have access to `super`, it is `this` so from the outside all public members/accessors are not accessible.
        if (forceCopyParentMembers) {
          for (const subMixin of iterateClassHierarchy(mixin, { emitSelf: false })) {
            this.mixIntoObject(subMixin.prototype, proto);
          }
        }
        toFastProperties(proto);
      }
      onMixedIn?.(mixin);
    }

    cls[mixedInClasses] = mixedInList;
    cls[this.hasMixin] = _classHasMixin;
    toFastProperties(cls);
  }

  /**
   * Mix an object into an other object.
   * This is the low level implementation for mixing 2 objects, where an object can be the Class itself or it's prototype.
   * High level class mixin implementations will call this function twice, one time for the class and one time for it's prototype.
   *
   * This implementation does not reflect types and the final mixed-in type should be reflected artificially.
   * @param source The object which we use to copy members from and mix them into the `target`
   * @param target To object which copy members to, members taken from the `source`
   */
  static mixIntoObject(source: Type<any> | Proto<any>, target: Type<any> | Proto<any>): void {
    for (const name of Object.getOwnPropertyNames(source).concat(Object.getOwnPropertySymbols(source) as any)) {
      // mixin can't override base behavior, only add
      if (!target.hasOwnProperty(name)) {
        // if its a property descriptor we need to rewire the context
        const propDesc = Object.getOwnPropertyDescriptor(source, name);
        if (propDesc) {
          if (propDesc.value) {
            target[name] = source[name];
          } else {
            Object.defineProperty(target, name, propDesc);
          }
        } else {
          target[name] = source[name];
        }
      }
    }
  }
}

export namespace MixinFw {
  export interface MixedClassStatic {
    [MixinFw.hasMixin](mixin: Abstract<any> | Type<any>): boolean;
  }

  export enum MixinScope {
    Instance = MixinScopeInstance,
    Static = MixinScopeStatic,
    All = MixinScopeInstance | MixinScopeStatic,
  }
}
