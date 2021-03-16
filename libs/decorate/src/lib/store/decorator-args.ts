import { Reflector } from '../utils';
import { Class, Type, Abstract } from '../types/oop';

export enum DecoratorArgsType {
  unknown = 0,
  class = 1,
  parameter = 2,
  ctorParameter = 4,
  property = 8,
  method = 16,

  static = 32,
}

export const ALLOWED_SCOPE_OPTIONS_TO_DECORATOR_FLAG_MAP = {
  class: DecoratorArgsType.class | DecoratorArgsType.static,
  constructor: DecoratorArgsType.ctorParameter | DecoratorArgsType.static,
  parameter: DecoratorArgsType.parameter,
  parameterStatic: DecoratorArgsType.parameter | DecoratorArgsType.static,
  property: DecoratorArgsType.property,
  propertyStatic: DecoratorArgsType.property | DecoratorArgsType.static,
  method: DecoratorArgsType.method,
  methodStatic: DecoratorArgsType.method | DecoratorArgsType.static,
}

export namespace DecoratorArgsType {
  const PARAMETER_LIKE = DecoratorArgsType.parameter | DecoratorArgsType.ctorParameter | DecoratorArgsType.static;

  export function isStatic(args: BaseDecoratorArgs<any>): boolean {
    return DecoratorArgsType.static === (args.flag & DecoratorArgsType.static);
  }

  export function isClass(args: DecoratorArgs): args is ClassDecoratorArgs {
    return DecoratorArgsType.class === (args.flag & DecoratorArgsType.class);
  }

  export function isCtorParam(args: DecoratorArgs): args is CtorParameterDecoratorArgs {
    return DecoratorArgsType.ctorParameter === (args.flag & DecoratorArgsType.ctorParameter);
  }

  export function isParam(args: DecoratorArgs): args is ParameterDecoratorArgs {
    return DecoratorArgsType.parameter === (args.flag & DecoratorArgsType.parameter);
  }

  export function isProperty(args: DecoratorArgs): args is PropertyDecoratorArgs {
    return DecoratorArgsType.property === (args.flag & DecoratorArgsType.property);
  }

  export function isMethod(args: DecoratorArgs): args is MethodDecoratorArgs {
    return DecoratorArgsType.method === (args.flag & DecoratorArgsType.method);
  }

  export function isParameterLike(args: DecoratorArgs): args is CtorParameterDecoratorArgs | ParameterDecoratorArgs {
    return args.flag === (args.flag & PARAMETER_LIKE);
  }
}

const DECORATOR_ARGS_TYPE = Symbol('DecoratorArgsType');

export abstract class BaseDecoratorArgs<T> {
  get isStatic(): boolean { return DecoratorArgsType.isStatic(this); }
  readonly classType: Class<any, any>;
  readonly flag: DecoratorArgsType;
  abstract get hasDesignType(): boolean;
  abstract get designType(): Function | undefined;

  protected static [DECORATOR_ARGS_TYPE] = DecoratorArgsType.unknown;

  constructor(public readonly target: T) {
    this.flag = typeof target === 'function'
      ? (this.classType = target as any) && this.constructor[DECORATOR_ARGS_TYPE] | DecoratorArgsType.static
      : (this.classType = target.constructor as any) && this.constructor[DECORATOR_ARGS_TYPE]
  };


  abstract memberEqual(args: BaseDecoratorArgs<any>): boolean;

  static create(target: Function): ClassDecoratorArgs;
  static create(target: object | Function, key: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>): ParameterDecoratorArgs | PropertyDecoratorArgs | MethodDecoratorArgs;
  static create(target: object | Function, key?: string | symbol, indexOrDescriptor?: TypedPropertyDescriptor<any> | number): DecoratorArgs {
    if (!key && typeof indexOrDescriptor !== 'number') {
      return new ClassDecoratorArgs<any>(target);
    }

    // most of the calls will be for property decorators but we cant use `!indexOrDescriptor` to detect that because it might be 0
    if (typeof indexOrDescriptor === 'number') {
      return !!key ? new ParameterDecoratorArgs<any>(target, key, indexOrDescriptor) : new CtorParameterDecoratorArgs<any>(target, indexOrDescriptor);
    } else if (typeof indexOrDescriptor?.value === 'function') {
      return new MethodDecoratorArgs<any>(target, key, indexOrDescriptor);
    } else {
      return new PropertyDecoratorArgs<any>(target, key, indexOrDescriptor);
    }
  }
}

export class ClassDecoratorArgs<T extends Abstract<any> | Type<any> = Type<any>> extends BaseDecoratorArgs<T> {
  protected static [DECORATOR_ARGS_TYPE] = DecoratorArgsType.class;
  get hasDesignType(): boolean { return !!this.target; }
  get designType(): Function | undefined { return this.target; }

  /** Returns true if both arguments point to the same member. In `ClassDecoratorArgs` this is always true as long as the input is also `ClassDecoratorArgs` */
  memberEqual(args: BaseDecoratorArgs<any>): boolean {
    return this.flag === args.flag;
  }
}

export class CtorParameterDecoratorArgs<T extends Type<any> = Type<any>, TIndex extends number = number> extends BaseDecoratorArgs<T> {
  protected static [DECORATOR_ARGS_TYPE] = DecoratorArgsType.ctorParameter;
  get hasDesignType(): boolean { return Reflector.hasCtorParamType(this.target, this.index); }
  get designType(): Function | undefined { return Reflector.getCtorParamType(this.target, this.index); }
  constructor(target: T, public readonly index: TIndex) { super(target); };

  /**
   * Returns true if both arguments point to the same member.
   * In `CtorParameterDecoratorArgs` it is always true if the input is `CtorParameterDecoratorArgs` and it has the same index.
   */
  memberEqual(args: BaseDecoratorArgs<any>): boolean {
    return this.flag === args.flag && this.index === (args as CtorParameterDecoratorArgs).index;
  }
}

export class ParameterDecoratorArgs<T = any, TKey extends keyof T = keyof T, TIndex extends number = number> extends BaseDecoratorArgs<T> {
  protected static [DECORATOR_ARGS_TYPE] = DecoratorArgsType.parameter;
  get hasDesignType(): boolean { return Reflector.hasMethodParamType(this.target, this.key, this.index); }
  get designType(): Function | undefined { return Reflector.getMethodParamType(this.target, this.key, this.index); }
  constructor(target: T, public readonly key: TKey, public readonly index: TIndex) { super(target); };

  /** Returns true if both arguments point to the same member (i.e `class { x(a: string): number }` and `class { x(b: string): string }` but not `class { static x(a: string): string }` and `class { x(a: string): string }`) */
  memberEqual(args: BaseDecoratorArgs<any>): boolean {
    return this.flag === args.flag && this.key === (args as ParameterDecoratorArgs).key && this.index === (args as ParameterDecoratorArgs).index;
  }
}

export class PropertyDecoratorArgs<T = any, TKey extends keyof T = keyof T> extends BaseDecoratorArgs<T> {
  protected static [DECORATOR_ARGS_TYPE] = DecoratorArgsType.property;
  get hasDesignType(): boolean { return Reflector.hasMemberType(this.target, this.key); }
  get designType(): Function | undefined { return Reflector.getMemberType(this.target, this.key); }
  constructor(target: T, public readonly key: TKey, public readonly descriptor?: PropertyDescriptor) { super(target); };

  /** Returns true if both arguments point to the same member (i.e `class { static x: number }` and `class { static x: string }` but not `class { static x: string }` and `class { x: string }`) */
  memberEqual(args: BaseDecoratorArgs<any>): boolean {
    return this.flag === args.flag && this.key === (args as PropertyDecoratorArgs).key;
  }
}

export class MethodDecoratorArgs<T = any, TKey extends keyof T = keyof T> extends BaseDecoratorArgs<T> {
  protected static [DECORATOR_ARGS_TYPE] = DecoratorArgsType.method;
  get hasDesignType(): boolean { return Reflector.hasMethodReturnType(this.target, this.key); }
  get designType(): Function | undefined { return Reflector.getMethodReturnType(this.target, this.key); }
  constructor(target: T, public readonly key: TKey, public readonly descriptor: PropertyDescriptor) { super(target); };

  /** Returns true if both arguments point to the same member (i.e `class { static x(): number }` and `class { static x(): string }` but not `class { static x(): string }` and `class { x(): string }`) */
  memberEqual(args: BaseDecoratorArgs<any>): boolean {
    return this.flag === args.flag && this.key === (args as MethodDecoratorArgs).key;
  }
}

export type DecoratorArgs =
  | ClassDecoratorArgs
  | PropertyDecoratorArgs
  | MethodDecoratorArgs
  | CtorParameterDecoratorArgs | ParameterDecoratorArgs;
