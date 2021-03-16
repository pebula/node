import { Type } from '../types';
import { IfThen, Equal, Params } from '../type-utils';



export class Reflector {
  private constructor() {}

  static hasMemberType<T, TKey extends keyof T>(target: T, key: TKey): boolean;
  static hasMemberType(target: object, key: string | symbol): boolean {
    return Reflect.hasMetadata('design:type', target, key);
  }

  static getMemberType<T, TKey extends keyof T>(target: T, key: TKey): Type<T[TKey]>;
  static getMemberType(target: object, key: string | symbol): unknown {
    return Reflect.getMetadata('design:type', target, key);
  }

  static hasMethodParamType<T, TKey extends keyof T, TIndex extends number>(target: T,
                                                                            key: TKey,
                                                                            index: TIndex): boolean {
    const params: any[] = Reflect.getMetadata('design:paramtypes', target, key as any);
    return params && index >= 0 && index < params.length;
  }

  /**
   * Return the methods parameter for a specific method (`key`) at a specific index.
   */
  static getMethodParamType<T, TKey extends keyof T, TIndex extends number>(target: T,
                                                                            key: TKey,
                                                                            index: TIndex): IfThen<Equal<undefined, Params<T[TKey]>[TIndex]>, never, Type<Params<T[TKey]>[TIndex]>> {
    return Reflect.getMetadata('design:paramtypes', target, key as any)[index];
  }

  /**
   * Return the methods parameters for a specific method (`key`).
   * The typed version supports up-to 5 parameters, if more then a generic type is returned
   */
  static getMethodParamTypes<T, TKey extends keyof T>(target: T, key: TKey): Params<T[TKey]> extends [infer P1] ? [Type<P1>]
      : Params<T[TKey]> extends [infer P1, infer P2] ? [Type<P1>, Type<P2>]
      : Params<T[TKey]> extends [infer P1, infer P2, infer P3] ? [Type<P1>, Type<P2>, Type<P3>]
      : Params<T[TKey]> extends [infer P1, infer P2, infer P3, infer P4] ? [Type<P1>, Type<P2>, Type<P3>, Type<P4>]
      : Params<T[TKey]> extends [infer P1, infer P2, infer P3, infer P4, infer P5] ? [Type<P1>, Type<P2>, Type<P3>, Type<P4>, Type<P5>]
      : Array<Type<any>>
  static getMethodParamTypes(target: object, key: string | symbol): unknown {
    return Reflect.getMetadata('design:paramtypes', target, key);
  }

  static hasCtorParamType<T extends Type<any>, TIndex extends number>(target: T, index: TIndex): boolean;
  static hasCtorParamType(target: Type<any>, index: number): boolean {
    const params: any[] = Reflect.getMetadata('design:paramtypes', target);
    return params && index >= 0 && index < params.length;
  }

  /**
   * Return the constructor parameter at a specific index for this class.
   */
  static getCtorParamType<T extends Type<any>, TIndex extends number>(target: T, index: TIndex): IfThen<Equal<undefined, ConstructorParameters<T>[TIndex]>, never, Type<ConstructorParameters<T>[TIndex]>>
  static getCtorParamType(target: Type<any>, index: number): unknown {
    return Reflect.getMetadata('design:paramtypes', target)[index];
  }

  /**
   * Return the constructor parameters for this class
   * The typed version supports up-to 5 parameters, if more then a generic type is returned
   */
  static getCtorParamTypes<T extends Type<any>>(target: T): ConstructorParameters<T> extends [infer P1] ? [Type<P1>]
                                                            : ConstructorParameters<T> extends [infer P1, infer P2] ? [Type<P1>, Type<P2>]
                                                            : ConstructorParameters<T> extends [infer P1, infer P2, infer P3] ? [Type<P1>, Type<P2>, Type<P3>]
                                                            : ConstructorParameters<T> extends [infer P1, infer P2, infer P3, infer P4] ? [Type<P1>, Type<P2>, Type<P3>, Type<P4>]
                                                            : ConstructorParameters<T> extends [infer P1, infer P2, infer P3, infer P4, infer P5] ? [Type<P1>, Type<P2>, Type<P3>, Type<P4>, Type<P5>]
                                                            : Array<Type<any>>;
  static getCtorParamTypes(target: Type<any>): unknown {
    return Reflect.getMetadata('design:paramtypes', target);
  }

  static hasMethodReturnType<T, TKey extends keyof T>(target: T, key: TKey): boolean;
  static hasMethodReturnType(target: object, key: string | symbol): boolean {
    return Reflect.hasMetadata('design:returntype', target, key);
  }

  static getMethodReturnType<T, TKey extends keyof T>(target: T, key: TKey): T[TKey] extends (...args: any) => any ? Type<ReturnType<T[TKey]>> : never;
  static getMethodReturnType(target: object, key: string | symbol): unknown {
    return Reflect.getMetadata('design:returntype', target, key);
  }

  /**
   * Extend design time metadata for a specific `key` (class member).
   * The design time metadata is taken from `source` and extended to `target`.
   */
  static extend<T, TKey extends keyof T>(source: T, target: any, key: TKey, override: boolean): void {
    const descriptor = Object.getOwnPropertyDescriptor(source, key);
    if (typeof descriptor?.value !== 'function') {
      override = override || !Reflector.getMemberType(target, key);
      const meta = override && Reflector.getMemberType(source, key);
      if (meta) {
        Reflect.defineMetadata('design:type', meta, target, key as string);
      }
    } else {
      const retMeta = (override || !Reflector.getMethodReturnType(target, key)) && Reflector.getMethodReturnType(source, key);
      if (retMeta) {
        Reflect.defineMetadata('design:returntype', retMeta, target, key as string);
      }
      const metParamsMeta = (override || !Reflector.getMethodParamTypes(target, key)) && Reflector.getMethodParamTypes(source, key);
      if (metParamsMeta) {
        Reflect.defineMetadata('design:paramtypes', metParamsMeta, target, key as string);
      }
    }
  }
}
