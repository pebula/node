// tslint:disable: ban-types
import { Type, Abstract } from '../types';
import { isFunction } from './misc';

export interface IterateClassHierarchyOptions {
  /**
   * Emits the initial (input) class
   * @default true
   */
  emitSelf?: boolean;
  /**
   * The last type from which to stop the iteration.
   * When the iteration hits this type it will not emit it or any subtypes.
   * @default Object
   */
  stopAt?: any;
}

const DEFAULT_ITERATE_CLASS_HIERARCHY_OPTIONS: Required<IterateClassHierarchyOptions> = {
  emitSelf: true,
  stopAt: Object,
};

export function getBaseClass(cls: Abstract<any> | Function): Abstract<any> | null {
  const proto = Object.getPrototypeOf(cls.prototype);
  return !proto || isFunction(proto) ? proto : proto.constructor;
}

export function* iterateClassHierarchy<T = any>(type: Type<T> | Abstract<T>, options?: IterateClassHierarchyOptions) {
  options = { ...DEFAULT_ITERATE_CLASS_HIERARCHY_OPTIONS, ...(options || {})};
  if (!options.emitSelf) {
    type = getBaseClass(type);
  }
  const lastType: any = options.stopAt;

  while (type && type !== lastType ) {
    yield type;
    type = getBaseClass(type);
  }
}

export function extendsClass<TBase extends Abstract<any>>(cls: Abstract<any> | Function, base: TBase): cls is TBase {
  if (!cls) {
    return false;
  } else if (cls === base) {
    return true;
  } else {
    return cls.prototype ? extendsClass(getBaseClass(cls), base) : false;
  }
}
