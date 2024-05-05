import { CTOR_INVOKED } from './constants';
import { GtLocalInfo } from './local-info';

export const hasInstance = Function.prototype[Symbol.hasInstance];

export function findSchemaContainerOfChildDiscriminator(instanceLike: any, localInfo: GtLocalInfo): GtLocalInfo {
  if (localInfo.discriminator?.type === 'root') {
    const discriminatorKey = localInfo.container.getSchemaOptions('discriminatorKey');
    const discriminatorSchemaContainer = localInfo.discriminator.children.get(instanceLike[discriminatorKey]);
    if (!discriminatorSchemaContainer)
      throw new Error(`Invalid discriminator request for ${localInfo.container.getName()}, discriminator: ${String(instanceLike[discriminatorKey])}`);
    return discriminatorSchemaContainer.localInfo;
  }
  return localInfo;
}

export function checkIfCtorInvoked(instance: any) {
  return !!Reflect.get(instance, CTOR_INVOKED);
}

export function ensureInstanceOf(propValue: any, pLocalInfo: GtLocalInfo, parent: any) {
  pLocalInfo = findSchemaContainerOfChildDiscriminator(propValue, pLocalInfo);
  if (!checkIfCtorInvoked(propValue))
    propValue = new pLocalInfo.cls(propValue);
  return { pLocalInfo, propValue };
}
