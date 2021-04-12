import { Abstract, Class as _Class, NativeDecorator, Type, DecoratedDomain, MixinFw } from '@pebula/decorate';
import { ClassSchema, MethodSchema, ParameterSchema, PropertySchema } from '../../schema';
import { DecorMixinBase, DecorPropertyApi, DecorClassApi, DecorMethodApi, DecorParameterApi, BaseFluentApi } from '../base-api';
import { DECOR_API_TYPE, PluginSchemaMap } from '../types';

export function Mixin<T1 extends BaseFluentApi | PluginSchemaMap[DECOR_API_TYPE], C1 extends Abstract<unknown>,
                      T2 = unknown,
                      T3 = unknown,
                      T4 = unknown,
                      T5 = unknown,
                      T6 = unknown>(m1: C1 & Abstract<T1>,
                                    m2?: Abstract<T2>,
                                    m3?: Abstract<T3>,
                                    m4?: Abstract<T4>,
                                    m5?: Abstract<T5>,
                                    m6?: Abstract<T6>,
                                    ...mn: Array<Abstract<any>>): Type<T1 & T2 & T3 & T4 & T5 & T6> & C1 & Mixin.MixedClassStatic;
/**
 * A mixin factory for fluent decorator api and decorator api schemas.
 * The first class must be class derived from one of the `BaseFluentApi` classes or schema classes.
 * The first class is not a mixin but it is used as a base class for the returned mixed in class.
 * All subsequent classes are treated as mixins.
 *
 * In most cases you do not need this factory, there are specific factories provided within the `Mixin` namespace which use the base built-in base schemas
 * as the first parameter, based on the API you want to mix into.
 */
export function Mixin<T, S>(...mixins: Array<S & Abstract<T>>): Type<T> & S {
  class __MixinClass extends (mixins.shift() as any) { }

  MixinFw.mixIntoClass(__MixinClass, mixins, mixin => {
    DecoratedDomain.extendDecoratorMetadata(mixin, __MixinClass);
  }, MixinFw.MixinScope.Instance) as any;

  return __MixinClass as any;
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
}

export namespace SchemaMixin {
  export const Class: Class = () => {
    return {
      With: (m1: Abstract<any>, ...mixins: Array<Abstract<any>>) => Mixin(ClassSchema, m1, ...mixins) as any
    };
  };

  export type Class = <T = any, TProperty extends PropertySchema = PropertySchema, TMethod extends MethodSchema = MethodSchema, TParameter extends ParameterSchema = ParameterSchema>()
    => {
          With: <M1,
                 M2 = unknown,
                 M3 = unknown,
                 M4 = unknown,
                 M5 = unknown,
                 M6 = unknown>(m1: Abstract<M1>,
                               m2?: Abstract<M2>,
                               m3?: Abstract<M3>,
                               m4?: Abstract<M4>,
                               m5?: Abstract<M5>,
                               m6?: Abstract<M6>) => _Class<ClassSchema<T, TProperty, TMethod, TParameter> & M1 & M2 & M3 & M4 & M5 & M6, typeof ClassSchema & MixinFw.MixedClassStatic>;
       };

  export const Property: Property = () => {
    return {
      With: (m1: Abstract<any>, ...mixins: Array<Abstract<any>>) => Mixin(PropertySchema, m1, ...mixins) as any
    };
  };
  /**
   * A helper for creating custom `DecorPropertyApi` by merging custom mixins into it and optionally custom implementation inside.
   * First you define the type of the property schema and optionally the type of the class schema used in the suite and then you
   * define the mixin to throw in to the final merged typed.
   *
   * All plugin decorators impose type constraints by requiring that they decorate only on `DecorPropertyApi` or derived and
   * that their context will reflect the basic `PropertySchema` and `ClassSchema`.
   * By defining the property schema and class schema you can reference the actual types registered in the suite in your internal implementation.
   */
  export type Property = <T = any>()
    => {
          With: <M1,
                 M2 = unknown,
                 M3 = unknown,
                 M4 = unknown,
                 M5 = unknown,
                 M6 = unknown>(m1: Abstract<M1>,
                               m2?: Abstract<M2>,
                               m3?: Abstract<M3>,
                               m4?: Abstract<M4>,
                               m5?: Abstract<M5>,
                               m6?: Abstract<M6>) => _Class<PropertySchema<T> & M1 & M2 & M3 & M4 & M5 & M6, typeof PropertySchema & MixinFw.MixedClassStatic>;
       };

  export const Method: Method = () => {
    return {
      With: (m1: Abstract<any>, ...mixins: Array<Abstract<any>>) => Mixin(MethodSchema, m1, ...mixins) as any
    };
  };
  /**
   * A helper for creating custom `DecorMethodApi` by merging custom mixins into it and optionally custom implementation inside.
   * First you define the type of the method schema and optionally the type of the class schema used in the suite and then you
   * define the mixin to throw in to the final merged typed.
   *
   * All plugin decorators impose type constraints by requiring that they decorate only on `DecorMethodApi` or derived and
   * that their context will reflect the basic `MethodSchema` and `ClassSchema`.
   * By defining the property schema and class schema you can reference the actual types registered in the suite in your internal implementation.
   */
  export type Method = <T = any, TParameter extends ParameterSchema = ParameterSchema>()
    => {
          With: <M1,
                 M2 = unknown,
                 M3 = unknown,
                 M4 = unknown,
                 M5 = unknown,
                 M6 = unknown>(m1: Abstract<M1>,
                               m2?: Abstract<M2>,
                               m3?: Abstract<M3>,
                               m4?: Abstract<M4>,
                               m5?: Abstract<M5>,
                               m6?: Abstract<M6>) => _Class<MethodSchema<T, TParameter> & M1 & M2 & M3 & M4 & M5 & M6, typeof MethodSchema & MixinFw.MixedClassStatic>;
       };

  export const Parameter: Parameter = () => {
    return {
      With: (m1: Abstract<any>, ...mixins: Array<Abstract<any>>) => Mixin(ParameterSchema, m1, ...mixins) as any
    };
  };
  /**
   * A helper for creating custom `DecorParameterApi` by merging custom mixins into it and optionally custom implementation inside.
   * First you define the type of the parameter schema and optionally the type of the class schema used in the suite and then you
   * define the mixin to throw in to the final merged typed.
   *
   * All plugin decorators impose type constraints by requiring that they decorate only on `DecorParameterApi` or derived and
   * that their context will reflect the basic `ParameterSchema` and `ClassSchema`.
   * By defining the property schema and class schema you can reference the actual types registered in the suite in your internal implementation.
   */
  export type Parameter = <T = any>()
    => {
          With: <M1,
                 M2 = unknown,
                 M3 = unknown,
                 M4 = unknown,
                 M5 = unknown,
                 M6 = unknown>(m1: Abstract<M1>,
                               m2?: Abstract<M2>,
                               m3?: Abstract<M3>,
                               m4?: Abstract<M4>,
                               m5?: Abstract<M5>,
                               m6?: Abstract<M6>) => _Class<ParameterSchema<T> & M1 & M2 & M3 & M4 & M5 & M6, typeof ParameterSchema & MixinFw.MixedClassStatic>;
       };

}

export namespace ApiMixin {
  export const Class: Class = () => {
    return {
      With: (m1: Abstract<DecorMixinBase<any>>, ...mixins: Array<Abstract<DecorMixinBase<any>>>) => Mixin(DecorClassApi, m1, ...mixins) as any
    };
  };

  export type Class = <S extends ClassSchema>()
    => {
          With: <M1 extends DecorMixinBase<unknown>,
                 M2 extends DecorMixinBase<unknown> = DecorMixinBase<unknown>,
                 M3 extends DecorMixinBase<unknown> = DecorMixinBase<unknown>,
                 M4 extends DecorMixinBase<unknown> = DecorMixinBase<unknown>,
                 M5 extends DecorMixinBase<unknown> = DecorMixinBase<unknown>,
                 M6 extends DecorMixinBase<unknown> = DecorMixinBase<unknown>>(m1: Abstract<M1>,
                                                                             m2?: Abstract<M2>,
                                                                             m3?: Abstract<M3>,
                                                                             m4?: Abstract<M4>,
                                                                             m5?: Abstract<M5>,
                                                                             m6?: Abstract<M6>) => _Class<DecorClassApi<S> & M1 & M2 & M3 & M4 & M5 & M6, typeof DecorClassApi & MixinFw.MixedClassStatic>;
       };

  export const Property: Property = () => {
    return {
      With: (m1: Abstract<DecorMixinBase<any>>, ...mixins: Array<Abstract<DecorMixinBase<any>>>) => Mixin(DecorPropertyApi, m1, ...mixins) as any
    };
  };
  /**
   * A helper for creating custom `DecorPropertyApi` by merging custom mixins into it and optionally custom implementation inside.
   * First you define the type of the property schema and optionally the type of the class schema used in the suite and then you
   * define the mixin to throw in to the final merged typed.
   *
   * All plugin decorators impose type constraints by requiring that they decorate only on `DecorPropertyApi` or derived and
   * that their context will reflect the basic `PropertySchema` and `ClassSchema`.
   * By defining the property schema and class schema you can reference the actual types registered in the suite in your internal implementation.
   */
  export type Property = <S extends PropertySchema, C extends ClassSchema = ClassSchema>()
    => {
          With: <M1 extends DecorMixinBase<unknown>,
                 M2 extends DecorMixinBase<unknown> = DecorMixinBase<unknown>,
                 M3 extends DecorMixinBase<unknown> = DecorMixinBase<unknown>,
                 M4 extends DecorMixinBase<unknown> = DecorMixinBase<unknown>,
                 M5 extends DecorMixinBase<unknown> = DecorMixinBase<unknown>,
                 M6 extends DecorMixinBase<unknown> = DecorMixinBase<unknown>>(m1: Abstract<M1>,
                                                                             m2?: Abstract<M2>,
                                                                             m3?: Abstract<M3>,
                                                                             m4?: Abstract<M4>,
                                                                             m5?: Abstract<M5>,
                                                                             m6?: Abstract<M6>) => _Class<DecorPropertyApi<S, C> & M1 & M2 & M3 & M4 & M5 & M6, typeof DecorPropertyApi & MixinFw.MixedClassStatic>;
       };

  export const Method: Method = () => {
    return {
      With: (m1: Abstract<DecorMixinBase<any>>, ...mixins: Array<Abstract<DecorMixinBase<any>>>) => Mixin(DecorMethodApi, m1, ...mixins) as any
    };
  };
  /**
   * A helper for creating custom `DecorMethodApi` by merging custom mixins into it and optionally custom implementation inside.
   * First you define the type of the method schema and optionally the type of the class schema used in the suite and then you
   * define the mixin to throw in to the final merged typed.
   *
   * All plugin decorators impose type constraints by requiring that they decorate only on `DecorMethodApi` or derived and
   * that their context will reflect the basic `MethodSchema` and `ClassSchema`.
   * By defining the property schema and class schema you can reference the actual types registered in the suite in your internal implementation.
   */
  export type Method = <S extends MethodSchema, C extends ClassSchema = ClassSchema>()
    => {
          With: <M1 extends DecorMixinBase<unknown>,
                 M2 extends DecorMixinBase<unknown> = DecorMixinBase<unknown>,
                 M3 extends DecorMixinBase<unknown> = DecorMixinBase<unknown>,
                 M4 extends DecorMixinBase<unknown> = DecorMixinBase<unknown>,
                 M5 extends DecorMixinBase<unknown> = DecorMixinBase<unknown>,
                 M6 extends DecorMixinBase<unknown> = DecorMixinBase<unknown>>(m1: Abstract<M1>,
                                                                             m2?: Abstract<M2>,
                                                                             m3?: Abstract<M3>,
                                                                             m4?: Abstract<M4>,
                                                                             m5?: Abstract<M5>,
                                                                             m6?: Abstract<M6>) => _Class<DecorMethodApi<S, C> & M1 & M2 & M3 & M4 & M5 & M6, typeof DecorMethodApi & MixinFw.MixedClassStatic>;
       };

  export const Parameter: Parameter = () => {
    return {
      With: (m1: Abstract<DecorMixinBase<any>>, ...mixins: Array<Abstract<DecorMixinBase<any>>>) => Mixin(DecorParameterApi, m1, ...mixins) as any
    };
  };
  /**
   * A helper for creating custom `DecorParameterApi` by merging custom mixins into it and optionally custom implementation inside.
   * First you define the type of the parameter schema and optionally the type of the class schema used in the suite and then you
   * define the mixin to throw in to the final merged typed.
   *
   * All plugin decorators impose type constraints by requiring that they decorate only on `DecorParameterApi` or derived and
   * that their context will reflect the basic `ParameterSchema` and `ClassSchema`.
   * By defining the property schema and class schema you can reference the actual types registered in the suite in your internal implementation.
   */
  export type Parameter = <S extends ParameterSchema, C extends ClassSchema = ClassSchema>()
    => {
          With: <M1 extends DecorMixinBase<unknown>,
                 M2 extends DecorMixinBase<unknown> = DecorMixinBase<unknown>,
                 M3 extends DecorMixinBase<unknown> = DecorMixinBase<unknown>,
                 M4 extends DecorMixinBase<unknown> = DecorMixinBase<unknown>,
                 M5 extends DecorMixinBase<unknown> = DecorMixinBase<unknown>,
                 M6 extends DecorMixinBase<unknown> = DecorMixinBase<unknown>>(m1: Abstract<M1>,
                                                                             m2?: Abstract<M2>,
                                                                             m3?: Abstract<M3>,
                                                                             m4?: Abstract<M4>,
                                                                             m5?: Abstract<M5>,
                                                                             m6?: Abstract<M6>) => _Class<DecorParameterApi<S, C> & M1 & M2 & M3 & M4 & M5 & M6, typeof DecorParameterApi & MixinFw.MixedClassStatic>;
       };

  export const MixinBase = DecorMixinBase;
  /**
   * Base class for all DecorApi mixin classes
   *
   * A class that you extend when you want to implement a mixin.
   * All plugin decorators does not impose type constraints when the decorate a MixinBase.
   * The context will represent a schema you provide through `TSchema` and the class schema provided in `TClassSchema`.
   * You can provide generic types that are partials and only cover the certain types required logically in your implementation.
   *
   * > Note that this is used as a class, i.e. `class A extends ApiMixin.MixinBase`, this is not a function the you provide small mixins and get back the merged class!
   */
  export type MixinBase<TSchema = unknown, TClassSchema extends ClassSchema = ClassSchema> = _Class<DecorMixinBase<TSchema, TClassSchema>, typeof DecorMixinBase>;

  /**
   * A type helper to be used when extending a fluent API through augmentation.
   *
   * For example, a library has a fluent Property decorator which is built from base mixins.
   *
   * ```typescript
   * // Library Code:
   * export class SomePropertyFluentApi extends ApiMixin.Property<SomePropertySchema, SomeClassSchema>().With(...Some base mixins here) { }
   * ```
   *
   * The library user would like to extend it with some mixins, for this we need to use the lazy plugin decorator
   *
   * ```typescript
   * @LazyPluginExtension(SomePropertyFluentApi)
   * export class UserPropertyFluentApi extends ApiMixin.MixinBase<SomePropertySchema> { // can put mixins or directly via class block:
   *
   * @FluentMethodPlugin()
   *   usersExt(): this {
   *     // do stuff
   *     return this;
   *   }
   * }
   * ```
   *
   * `LazyPluginExtension` will make sure all plugins are attached into `SomePropertyFluentApi` and will work in runtime, but we're still missing the design time type augmentation.
   * We need to extend the class `SomePropertyFluentApi` in the type system so it will contain the method `usersExt`.
   *
   * This is done through type augmentation, and it usually goes like this:
   *
   * ```typescript
   * declare module '@pebula/tom/src/lib/schema/decorator-api/property' {
   *   export interface SomePropertyFluentApi {
   *     // REPEAT ALL MEMBERS of UserPropertyFluentApi in here
   *   }
   * }
   * ```
   *
   * The above is verbose and we duplicate the interface twice. In the class implementation and then in type augmentation.
   *
   * We can use a shortcut:
   *
   *```typescript
   * declare module '@pebula/tom/src/lib/schema/decorator-api/property' {
   *   export interface SomePropertyFluentApi extends UserPropertyFluentApi { }
   * }
   * ```
   *
   * This will work in simple cases but in most cases it will not because both `SomePropertyFluentApi` and `UserPropertyFluentApi` share base members with different signatures...
   *
   * To workaround this we need to use the `Extend` type:
   *
   * ```typescript
   * declare module '@pebula/tom/src/lib/schema/decorator-api/property' {
   *   export interface SomePropertyFluentApi extends ApiMixin.Extend<PropertyDecorator, SomePropertyFluentApi, UserPropertyFluentApi> { }
   * }
   * ```
   *
   * Or, using `ExtendProperty` helper, which is specific to `PropertyDecorator`
   *
   * ```typescript
   * declare module '@pebula/tom/src/lib/schema/decorator-api/property' {
   *   export interface SomePropertyFluentApi extends ApiMixin.ExtendProperty<SomePropertyFluentApi, UserPropertyFluentApi> { }
   * }
   * ```
   */
  export type Extend<D extends NativeDecorator, I, T> = {
    [P in keyof T]: P extends keyof Omit<I, keyof T>
      ? never
      : T[P] extends (...args: infer U) => infer R
        ? (...args: U) => R extends T ? I & D : R
        : I & D
    ;
  }

  /**
   * Syntax sugar for ApiMixin.Extend<ClassDecorator, I, T>
   * @see ApiMixin.Extend
   */
  export type ExtendClass<I, T> = Extend<ClassDecorator, I, T>;
  /**
   * Syntax sugar for ApiMixin.Extend<PropertyDecorator, I, T>
   * @see ApiMixin.Extend
   */
  export type ExtendProperty<I, T> = Extend<PropertyDecorator, I, T>;
  /**
   * Syntax sugar for ApiMixin.Extend<MethodDecorator, I, T>
   * @see ApiMixin.Extend
   */
  export type ExtendMethod<I, T> = Extend<MethodDecorator, I, T>;
  /**
   * Syntax sugar for ApiMixin.Extend<ParameterDecorator, I, T>
   * @see ApiMixin.Extend
   */
  export type ExtendParameter<I, T> = Extend<ParameterDecorator, I, T>;
}
