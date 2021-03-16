import { Type, stringify } from '@pebula/decorate';

export function invalidDecoratedPluginTarget(target: Type<any>, decoratorName: string) {
  const error = new Error(`Plugin decorator "${decoratorName}" can not decorate "${stringify(target)}". Plugin decorators can only decorate a target that extends one of the 4 base plugin api classes.`);
  error.name = 'InvalidDecoratedPluginTarget';
  return error;
}
