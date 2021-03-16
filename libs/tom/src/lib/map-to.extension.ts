import { Type } from '@pebula/decorate';
import { TypeMapOptions } from './options';
import { mapTypes } from './class-mapping';

class MapToContainer {
  constructor(public readonly source: any, public readonly options: any) { }
}

export interface MapTo {
  /**
   * A method decorator that will pass the returned value from the method through the `mapTypes`
   */
  // tslint:disable-next-line: callable-types
  (sourceType: Type<any>, targetType: Type<any>): MethodDecorator;

  /**
   * Returns wrapped response that allows dynamic control of the options passed to the `mapTypes` that
   * `@MapTo` will run.
   */
  withOption<TSource = any, TTarget = any>(source: TSource, options: TypeMapOptions<TSource, TTarget>): TTarget;
}

export const MapTo: MapTo = ( (sourceType: Type<any>, targetType: Type<any>): MethodDecorator => {
  return (target: any, key: string, descriptor: TypedPropertyDescriptor<any>) => {
    const originalMethod = descriptor.value;
    if (typeof originalMethod !== 'function') {
      throw new Error('Invalid configuration of the "MapTo" decorator, @MapTo must decorator prototype based methods.');
    }
    return {
      // tslint:disable-next-line: object-literal-shorthand
      value: async function(...args: any[]) {
        const result = await originalMethod.apply(this, args);
        if (result instanceof MapToContainer) {
          return mapTypes(result.source, sourceType, targetType, result.options);
        } else {
          return mapTypes(result, sourceType, targetType);
        }
      },
    } as any;
  };
}) as any;

MapTo.withOption = <TSource = any, TTarget = any>(source: TSource, options: TypeMapOptions<TSource, TTarget>): TTarget => {
  return new MapToContainer(source, options) as any;
};
