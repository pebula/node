/**
 * Represents the type of the static `prototype` property in a class.
 */
export type Proto<T> = T & { constructor: Type<T> };

/**
 * Represents the type of an abstract class (non-instantiable) as well as class-like objects.
 * This does not represent the static type of the class, only the instance type.
 */
export interface Abstract<T> extends Function {
  prototype: T;
}

/**
 * Represents the type of an instantiable class.
 * This does not represent the static type of the class, only the instance type.
 *
 * Note that this type is restricted to classes only, other class like object will not be valid.
 * To use a broader class type, use `Type` which also inherits from Function
 */
export interface ClassType<T> {
  // tslint:disable-next-line: callable-types
  new (...args: any[]): T;
  prototype: T;
}

/**
 * Represents the type of an instantiable class.
 * This does not represent the static type of the class, only the instance type.
 */
export interface Type<T> extends Function {
  // tslint:disable-next-line: callable-types
  new (...args: any[]): T;
  prototype: T;
}

/**
 * Represents an entire instantiable class include the instance and type and static type.
 * In other words it allows accurate representation of classes.
 */
export type Class<TInstance, TStatic> = ClassType<TInstance> & TStatic;

export type AbstractClass<TInstance, TStatic> = Abstract<TInstance> & Omit<TStatic, 'constructor'>;
