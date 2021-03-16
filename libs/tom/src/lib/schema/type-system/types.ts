import { Type } from '@pebula/decorate';
import { Enum } from './enum';
import { ForwardRef, ForwardRefContainer } from './forward-ref';
import { TomTypeInstance } from './type-instance';

export type NativeRuntimeTypes =
  | typeof Boolean
  | typeof Number
  | typeof BigInt
  | typeof String
  | typeof Date;

export type ContainerRuntimeTypes =
  | typeof Array
  | typeof Set
  | typeof Map
  | typeof Object;

export type TypedBufferRuntimeTypes =
  | typeof Int8Array
  | typeof Int16Array
  | typeof Int32Array
  | typeof Uint8Array
  | typeof Uint16Array
  | typeof Uint32Array
  | typeof Uint8ClampedArray
  | typeof BigInt64Array
  | typeof BigUint64Array
  | typeof Float32Array
  | typeof Float64Array;

export type BufferRuntimeTypes =
  | typeof ArrayBuffer
  | TypedBufferRuntimeTypes;

export type EnumType = Enum | ( () => Enum );

export type NativeTypes = 'boolean' | 'number' | 'bigInt' | 'string' | 'date'
export type ContainerTypes = 'array' | 'set' | 'map' | 'objectMap';
export type TypedBufferTypes =
  | 'int8Array'
  | 'int16Array'
  | 'int32Array'
  | 'uint8Array'
  | 'uint16Array'
  | 'uint32Array'
  | 'uint8ClampedArray'
  | 'bigInt64Array'
  | 'bigUint64Array'
  | 'float32Array'
  | 'float64Array';

export type BufferTypes =
  | 'arrayBuffer'
  | TypedBufferTypes;

export type SingleTypes =
  | NativeTypes
  | 'any';

export type CompositeTypes =
  | 'class'
  | 'enum'
  | ContainerTypes
  | BufferTypes
  | 'literal'
  | 'union';

export type TypeDef = SingleTypes | CompositeTypes;

export interface TomTypesInstanceDataMap {
  class: CustomClassType;
  enum: EnumType;
  array: [valueType: TomTypeInstance];
  set: [valueType: TomTypeInstance];
  map: [valueType: TomTypeInstance, key?: TomTypeInstance];
  objectMap: [valueType: TomTypeInstance, key?: TomTypeInstance<'string' | 'number' | 'any'>];
  literal: string | number | true | false | undefined | null;
  union: Array<TomTypeInstance>;
}

export type CustomClassType<T = any> =
  | Type<T>
  | ForwardRef<T>
  | ForwardRefContainer<T>;

export const nativeRuntimeTypeMap = new Map<NativeRuntimeTypes, NativeTypes>([
  [Boolean, 'boolean'],
  [Number, 'number'],
  [BigInt, 'bigInt'],
  [String, 'string'],
  [Date, 'date'],
]);

export const nativeTypeMap = new Map<NativeTypes, NativeRuntimeTypes>(
  Array.from(nativeRuntimeTypeMap.entries()).map( e => e.reverse() as [NativeTypes, NativeRuntimeTypes])
);

export const containerRuntimeTypeDefMap = new Map<ContainerRuntimeTypes, ContainerTypes>([
  [Array, 'array'],
  [Set, 'set'],
  [Map, 'map'],
  [Object, 'objectMap'],
]);

export const containerTypeDefMap = new Map<ContainerTypes, ContainerRuntimeTypes>(
  Array.from(containerRuntimeTypeDefMap.entries()).map( e => e.reverse() as [ContainerTypes, ContainerRuntimeTypes])
);

export const typedBufferRuntimeTypeDefMap = new Map<TypedBufferRuntimeTypes, TypedBufferTypes>([
  [Int8Array, 'int8Array'],
  [Int16Array, 'int16Array'],
  [Int32Array, 'int32Array'],
  [Uint8Array, 'uint8Array'],
  [Uint16Array, 'uint16Array'],
  [Uint32Array, 'uint32Array'],
  [Uint8ClampedArray, 'uint8ClampedArray'],
  [BigInt64Array, 'bigInt64Array'],
  [BigUint64Array, 'bigUint64Array'],
  [Float32Array, 'float32Array'],
  [Float64Array, 'float64Array'],
]);

export const bufferRuntimeTypeDefMap = new Map<BufferRuntimeTypes, BufferTypes>(typedBufferRuntimeTypeDefMap);
bufferRuntimeTypeDefMap.set(ArrayBuffer, 'arrayBuffer');

export const typedBufferTypeDefMap = new Map<TypedBufferTypes, TypedBufferRuntimeTypes>(
  Array.from(typedBufferRuntimeTypeDefMap.entries()).map( e => e.reverse() as [TypedBufferTypes, TypedBufferRuntimeTypes])
);

export const bufferTypeDefMap = new Map<BufferTypes, BufferRuntimeTypes>(
  Array.from(bufferRuntimeTypeDefMap.entries()).map( e => e.reverse() as [BufferTypes, BufferRuntimeTypes])
);

export function isAllowedContainer(iterableCtor: any): iterableCtor is (typeof Array | typeof Set | typeof Map) {
  return containerRuntimeTypeDefMap.has(iterableCtor) && iterableCtor !== Object;
}

export interface TypeMap {
  boolean: boolean;
  number: number;
  bigInt: bigint;
  string: string,
  date: Date;
  array: Array<any>;
  set: Set<any>;
  map: Map<any, any>;
  objectMap: object;
  arrayBuffer: ArrayBuffer;
  int8Array: Int8Array;
  int16Array: Int16Array;
  int32Array: Int32Array;
  uint8Array: Uint8Array;
  uint16Array: Uint16Array;
  uint32Array: Uint32Array;
  uint8ClampedArray: Uint8ClampedArray;
  bigInt64Array: BigInt64Array;
  bigUint64Array: BigUint64Array;
  float32Array: Float32Array;
  float64Array: Float64Array;
  any: any;
  class: Record<string | number | symbol, any>;
  enum: Record<string, string | number>;
  literal: string | number | true | false | undefined | null;
  union: unknown;
}
