import { containerTypeDefMap, ContainerTypes, nativeTypeMap, TomTypesInstanceDataMap, TypeDef } from './types';

const TOM_TYPE_INSTANCE = Symbol('TomTypeInstance');

export interface TomTypeInstance<T extends TypeDef = TypeDef> {
  type: T;
  typeParams?: T extends keyof TomTypesInstanceDataMap ? TomTypesInstanceDataMap[T] : never;
  [TOM_TYPE_INSTANCE]: boolean;
}

export function createTomTypeInstance<T extends TypeDef = TypeDef>(type: T, typeParams?: T extends keyof TomTypesInstanceDataMap ? TomTypesInstanceDataMap[T] : never): TomTypeInstance<T> {
  return { type, typeParams, [TOM_TYPE_INSTANCE]: true };
}

export function isTomTypeInstance<T extends TypeDef>(obj: any, type: T): obj is TomTypeInstance<T>
export function isTomTypeInstance<T extends TypeDef = TypeDef>(obj: any): obj is TomTypeInstance<T>;
export function isTomTypeInstance(obj: any, type?: TypeDef): obj is TomTypeInstance {
  switch (typeof obj) {
    case 'string':
    case 'function':
      return false;
    default:
      return type
        ? TOM_TYPE_INSTANCE in obj && obj.type === type
        : TOM_TYPE_INSTANCE in obj
      ;
  }
}

export function isTomTypeContainer(tomType: TomTypeInstance): tomType is TomTypeInstance<ContainerTypes> {
  return containerTypeDefMap.has(tomType.type as any);
}

export function isTomTypeEquals(t1: TomTypeInstance, t2: TomTypeInstance): boolean {
  if (t1.type === t2.type) {
    switch (t1.type) {
      case 'literal':
      case 'enum':
      case 'class':
        return t1.typeParams === t2.typeParams;
      case 'array':
      case 'set':
          return isTomTypeEquals(t1.typeParams[0], t2.typeParams[0]);
      case 'tuple':
        const typeParams1 = (t1 as TomTypeInstance<'tuple'>).typeParams;
        const typeParams2 = (t2 as TomTypeInstance<'tuple'>).typeParams;
        return typeParams1.length === typeParams2.length && typeParams1.every( (t, idx) => isTomTypeEquals(t, typeParams2[idx]) );
      case 'map':
      case 'objectMap':
          return isTomTypeEquals(t1.typeParams[0], t2.typeParams[0]) && isTomTypeEquals(t1.typeParams[1], t2.typeParams[1]);
    }
    if (nativeTypeMap.has(t1.type as any)) {
      return true;
    }
  } else {
    if (t1.type === 'literal') {
      return typeof t1.typeParams === t2.type;
    }
    if (t2.type === 'literal') {
      return typeof t2.typeParams === t1.type;
    }
  }
  return false;
}

export function tomTypeInstanceToString(type: TomTypeInstance): string {
  switch (type.type) {
    case 'union':
      return `union<${(type as TomTypeInstance<'union'>).typeParams.map(tomTypeInstanceToString).join(' | ')}>`;
    case 'array':
    case 'set':
      return `${type.type}<${(type as TomTypeInstance<'array' | 'set'>).typeParams.map(tomTypeInstanceToString).join(', ')}>`;
    case 'tuple':
      return `[${(type as TomTypeInstance<'tuple'>).typeParams.map(tomTypeInstanceToString).join(', ')}]`;
    case 'map':
    case 'objectMap':
      return `${type.type}<${(type as TomTypeInstance<'map' | 'objectMap'>).typeParams.map(tomTypeInstanceToString).reverse().join(', ')}>`;
    // TODO: add support to include typeParams
    default:
      return type.type;
  }
}
