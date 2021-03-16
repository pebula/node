import { Type } from '@pebula/decorate';
import { ForwardRef, ForwardRefContainer, FORWARD_REF } from './forward-ref';
import { TomTypeInstance, createTomTypeInstance } from './type-instance';
import { NativeRuntimeTypes, nativeRuntimeTypeMap, SingleTypes, NativeTypes, CustomClassType, nativeTypeMap, BufferTypes, BufferRuntimeTypes, bufferTypeDefMap, bufferRuntimeTypeDefMap } from './types';

const ALL_NATIVE_TYPES = new Set([
  ...nativeRuntimeTypeMap.keys(),
  Object,
  Array,
  Set,
  Map,
  RegExp,
  ArrayBuffer,
  Int8Array,
  Int16Array,
  Int32Array,
  Uint8Array,
  Uint16Array,
  Uint32Array,
  Uint8ClampedArray,
  BigInt64Array,
  BigUint64Array,
  Float32Array,
  Float64Array,
]);

export function isNativeType(type: any): type is Function { return ALL_NATIVE_TYPES.has(type); }

export function isSupportedNativeType(type: any): type is NativeRuntimeTypes { return nativeRuntimeTypeMap.has(type); }

export function getPrimitiveType(type: NativeRuntimeTypes): NativeTypes | undefined {
  return nativeRuntimeTypeMap.get(type);
}

export function isCustomClass<T = any>(type: any): type is Type<T> {
  return typeof type === 'function' && !ALL_NATIVE_TYPES.has(type) && type.toString().startsWith('class ');
}

export function isForwardRefContainer<T = any>(type: any): type is ForwardRefContainer<T> {
  return FORWARD_REF in type;
}

export function isForwardRef<T = any>(type: any): type is ForwardRef<T> | ForwardRefContainer<T> {
  return isForwardRefContainer(type) || (typeof type === 'function' && !isNativeType(type) && !isCustomClass(type));
}

export function resolveType(typeDef: typeof Object | SingleTypes | BufferTypes | BufferRuntimeTypes | NativeRuntimeTypes | CustomClassType): TomTypeInstance | undefined {
  if (!typeDef) {
    return;
  } else if (typeDef === Object || typeDef === 'any') {
    return createTomTypeInstance('any');
  } else if (typeof typeDef === 'string') {
    if (nativeTypeMap.has(typeDef as NativeTypes) || bufferTypeDefMap.has(typeDef as BufferTypes)) {
      return createTomTypeInstance(typeDef);
    }
  } else if (typeof typeDef === 'function') {
    const resolved = nativeRuntimeTypeMap.get(typeDef as NativeRuntimeTypes) || bufferRuntimeTypeDefMap.get(typeDef as BufferRuntimeTypes);
    if (resolved) {
      return createTomTypeInstance(resolved);
    } else if (isCustomClass(typeDef) || isForwardRef(typeDef)) {
      return createTomTypeInstance('class', typeDef);
    }
  }
}
