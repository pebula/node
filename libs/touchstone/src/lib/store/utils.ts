import { Class } from '@pebula/decorate';

function getMethodReturnType<T = any>(target: object | Function, key: string | symbol): Class<T, any> {
  return Reflect.getMetadata('design:returntype', target, key);
}


export function isAsyncMethod(proto: object, methodKey: string | symbol): boolean {
  const returnType = getMethodReturnType(proto, methodKey);

  // TODO: allow option for the user to detect promises in multiple ways...
  // - Via toString() having 'AsyncFunction'
  if (returnType === Promise) {
    return true;
  } else {
    return false;
  }
}
