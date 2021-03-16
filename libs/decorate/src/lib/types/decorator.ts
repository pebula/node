import { ALLOWED_SCOPE_OPTIONS_TO_DECORATOR_FLAG_MAP, DecoratorArgs } from '../store/decorator-args';
import { Class, Type } from './oop';

/**
 * Returns a class decorator type that is can only decorate a class with a specific shape.
 *
 * You can control the detail of the resolution you want to enforce on the shape of the decorated class using the generic argument.
 *
 * @template T Either the class or the typeof the class to enforce.
 * @template S [Optional, default: unknown] The static type (typeof class {}) to enforce.
 *
 * If T is set to the class type (instance type) then S can be ignored or it can be set to any type required to be implemented statically.
 * If T is set to the typeof the class then S is ignored and the decorator expects to decorate a class which implements both the instance and static types of T.
 *
 * Examples:
 *
 * ```typescript
 * class X {
 *   static z: number;
 *   y: string;
 * }
 *
 * type D1: ClassDecoratorOf<X>;
 * type D2: ClassDecoratorOf<X, { f: number }>;
 * type D3: ClassDecoratorOf<typeof X>;
 * type D4: ClassDecoratorOf<{ y: string }, { z: number }>;
 * ```
 * D1 can decorate class X or any other class that implements `{ y: string }`.
 *
 * D2 can decorate any class that implements `{ y: string }` but also has the static property `{ f: number }`.
 *
 * D3 can decorate any class that extends X or implements `{ y: string }` but also has the static property `{ z: number }`.
 *
 * D4 and D3 are identical (i.e.: you can also use interfaces)
 */
export type ClassDecoratorOf<T, S = unknown> = (target: Class<T extends Type<infer U> ? U : T, T extends Type<any> ? T : S>) => any;

/**
 * Returns a property decorator type that is can only decorate a class property with a specific type.
 *
 * @template T The required type of the decorated property
 * @template TLevel [Optional, default: 'all'] The allowed scope ('static' | 'instance') the property can be set in or 'all' for both.
 *
 * You can limit the scope this decorated can be used in by setting `TLevel`:
 *
 * - If `TLevel` is not set, it default to `all` which means it te decorate can be used on instance and static level properties.
 * - If `TLevel` is set to `instance` the decorator can only be used on instance class properties.
 * - If `TLevel` is set to `static` the decorator can only be used on static class properties.
 *
 * Examples:
 *
 * ```typescript
 * type P: PropertyDecoratorOf<string>;
 *
 * @P                       // TSError - Allowed only on properties
 * class MyClass {
 *   @P p: string;          // OK
 *   @P static p: string;   // OK
 *   @P p: number;          // TSError - Allowed only on properties of type string
 *   @P static p: number;   // TSError - Allowed only on properties of type string
 *
 *   @P m(): string;        // TSError - Allowed only on properties
 *   @P static m(): string; // TSError - Allowed only on properties
 * }
 * ```
 *
 * ```typescript
 * type P: PropertyDecoratorOf<string, 'instance'>;
 *
 * @P                       // TSError - Allowed only on properties
 * class MyClass {
 *   @P p: string;          // OK
 *   @P static p: string;   // TSError - Allowed only on class instance properties
 *   @P p: number;          // TSError - Allowed only on properties of type string
 *   @P static p: number;   // TSError - Allowed only on properties of type string
 *
 *   @P m(): string;        // TSError - Allowed only on properties
 *   @P static m(): string; // TSError - Allowed only on properties
 * }
 * ```
 *
 * ```typescript
 * type P: PropertyDecoratorOf<string, 'static'>;
 *
 * @P                       // TSError - Allowed only on properties
 * class MyClass {
 *   @P p: string;          // TSError - Allowed only on static class properties
 *   @P static p: string;   // TSError - OK
 *   @P p: number;          // TSError - Allowed only on properties of type string
 *   @P static p: number;   // TSError - Allowed only on properties of type string
 *
 *   @P m(): string;        // TSError - Allowed only on properties
 *   @P static m(): string; // TSError - Allowed only on properties
 * }
 * ```
 */
export type PropertyDecoratorOf<T, TLevel extends 'static' | 'instance' | 'all' = 'all'> = TLevel extends 'static'
  ? <Z extends Function & Partial<Record<K, T>>, K extends string>(target: Z, key: K) => void
  : TLevel extends 'instance'
    ? <Z extends Partial<Record<K, T>>, K extends string>(target: Z extends Function ? never : Z, key: K) => void
    : <Z extends Partial<Record<K, T>>, K extends string>(target: Z, key: K) => void;

/**
 * Returns a method decorator type that is can only decorate a class members with specific signature and a specific return type.
 *
 * @template TParams The parameters of the method, an tuple type with all parameter types in order
 * @template TReturn [Optional, default: void] The required return type of the decorated property
 * @template TLevel [Optional, default: 'all'] The allowed scope ('static' | 'instance') the property can be set in or 'all' for both.
 *
 * - For a method with no parameters set `TParams` to `undefined`
 * - For a method with unrestricted parameters set `TParams` to `[...any]` or `[string, boolean, ...any]`
 *
 * You can limit the scope this decorated can be used in by setting `TLevel`:
 *
 * - If `TLevel` is not set, it default to `all` which means it te decorate can be used on instance and static level properties.
 * - If `TLevel` is set to `instance` the decorator can only be used on instance class properties.
 * - If `TLevel` is set to `static` the decorator can only be used on static class properties.
 *
 * Examples:
 *
 * ```typescript
 * type M: MethodDecoratorOf<[string, string], number>;
 *
 * @M                       // TSError - Allowed only on properties
 * class MyClass {
 *   @M p: string;          // TSError - Allowed only on methods
 *   @M static p: string;   // TSError - Allowed only on methods
 *
 *   @M m(a: string, b: string): number  { return 1; }   // OK
 *   @M m(a: string, b: string): string  { return ''; }   // TSError - Return type must be number
 * }
 * ```
 */
export type MethodDecoratorOf<TParams extends [...any] = undefined,
                              TReturn = void,
                              TLevel extends 'static' | 'instance' | 'all' = 'all',
                              __$Sig extends Function = TParams extends undefined ? () => TReturn :  (...args: TParams) => TReturn> = TLevel extends 'static'
  ? <Z extends Function & Partial<Record<K, __$Sig>>, K extends string>(target: Z, key: K, descriptor: TypedPropertyDescriptor<__$Sig>) => TypedPropertyDescriptor<__$Sig> | void
  : TLevel extends 'instance'
    ? <Z extends Partial<Record<K, __$Sig>>, K extends string>(target: Z extends Function ? never : Z, key: K, descriptor: TypedPropertyDescriptor<__$Sig>) => TypedPropertyDescriptor<__$Sig> | void
    : <Z extends Partial<Record<K, __$Sig>>, K extends string>(target: Z, key: K, descriptor: TypedPropertyDescriptor<__$Sig>) => TypedPropertyDescriptor<__$Sig> | void
;

export type AnyDecorator = (target: object, key?: string | symbol, indexOrDescriptor?: any) => any;
export type NativeDecorator = ClassDecorator | PropertyDecorator | MethodDecorator | ParameterDecorator;
export type Decorator =
  | NativeDecorator
  | ClassDecoratorOf<any, any>
  | MethodDecoratorOf<any, any>
  | PropertyDecoratorOf<any>;

export type DecoratorInitializer<T = any, TDecor extends Decorator = AnyDecorator> = (metadataArgs?: T) => TDecor;
export type DecoratorInitializerMetadataArgs<T> = T extends DecoratorInitializer<infer U> ? U : never;

export interface DecoratorOptions<T = any> {

  /** Use to identify it in errors */
  name?: string;

  /**
   * A list of scopes that this decorator can decorate which is validated at runtime.
   * If a decorator is decorating scope that is not allowed it will throw an error.
   *
   * When not set (default) the runtime check is skipped, i.e. it means ALL scopes are allowed.
   *
   * > Note that this runtime check is usually not required if you properly create strictly typed decorates.
   *
   * @default undefined (All are allowed)
   */
  allowedScopes?: Array<keyof typeof ALLOWED_SCOPE_OPTIONS_TO_DECORATOR_FLAG_MAP>;

  /**
   * Allow the decorator to decorate multiple times on the same class.
   *
   * When set to false, the decorator can be used once on the class, regardless of where it is used.
   * For example, a parameter decorator that is defined not to allow multiple decorations will cause an exception
   * to be throw if it is used on one of the constructor parameters and also on a parameter of a method on the class.
   *
   * The default behavior is to allow the decorator to decorate multiple times on the same class.
   * @default undefined (true)
   */
  allowMulti?: boolean;

  classifierData?: any;

  /**
   * A optional handler that will get invoked when the decorator is fired.
   * It will include the decorator arguments and also, when the decorator is a DecoratorInitializer, the metadata provided
   * when invoking the initializer (if such metadata provided)
   */
  onExecute?: (decoratorArgs: DecoratorArgs, metadata?: T) => T | void;
}
