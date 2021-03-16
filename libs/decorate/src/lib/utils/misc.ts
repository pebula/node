import { Abstract, Proto } from '../types';

export function isFunction(obj: any): obj is Function {
  return typeof obj === 'function';
}

export function isClass<T = any>(cls: any): cls is Abstract<T> {
  return isFunction(cls) &&
    cls.hasOwnProperty('prototype') &&
    cls.prototype.constructor === cls;
}

export function isPrototype<T = any>(obj: T): obj is Proto<T> {
  return obj?.hasOwnProperty('constructor') && isFunction(obj.constructor);
}

export function ensureClass<T extends Abstract<any>>(cls: T): T;
export function ensureClass<T extends Proto<any>>(proto: T): Abstract<T>;
export function ensureClass<T extends Proto<any> | Abstract<any>>(obj: T): T extends Function ? T : Abstract<T> {
  if (isClass(obj)) {
    return obj as any;
  } else if (isPrototype(obj)) {
    return obj.constructor as any;
  }
  throw new Error('Invalid target object provided. Target is not a function nor a prototype.');
}

/**
 * Returns the string name of an object
 * See https://github.com/angular/angular/blob/2.0.0-rc.4/modules/%40angular/facade/src/lang.ts#L149
 */
export function stringify(token: any): string {
  if (typeof token === 'string') {
    return token;
  }

  if (token === undefined || token === null) {
    return '' + token;
  }

  if (token.name) {
    return token.name;
  }
  if (token.overriddenName) {
    return token.overriddenName;
  }

  const res = token.toString();
  const newLineIndex = res.indexOf('\n');
  return newLineIndex === -1 ? res : res.substring(0, newLineIndex);
}

/**
 * A decorator used for lazy initialization of readonly properties.
 * It will apply an accessor to the property which will be replaced with a readonly value upon first set operation.
 * The value to be set is defined by the provided getter.
 */
export function LazyInit(getter: () => any): PropertyDecorator {
  return (target: any, propertyKey: string | symbol, descriptor?: PropertyDescriptor) => {
    if (descriptor) {
      throw new Error('LazyInit can only decorate properties');
    }
    Object.defineProperty(target, propertyKey, { get() {
        const ret = getter.call(this);

        Object.defineProperty(this, propertyKey, { value: ret });
        return ret;
      }});
  };
}
