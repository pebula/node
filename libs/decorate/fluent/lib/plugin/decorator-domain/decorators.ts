import { DecoratedDomain } from '@pebula/decorate';
import { PluginTargetClassifier } from './target-classifier';
import { BaseFluentApi, DecorMixinBase } from '../base-api';

export const domain = new DecoratedDomain(PluginTargetClassifier);

interface MethodReturnSelf<TSelf, T extends TSelf = TSelf> {
  (...args: any[]): T
}

export type PluginType = 'fluentProperty' | 'fluentMethod' | 'method';

export type FluentPropertyPlugin = () =>
  <Z extends BaseFluentApi | DecorMixinBase<any>, ZRet extends Z = Z>(target: Z, key: string, descriptor: TypedPropertyDescriptor<ZRet>) => TypedPropertyDescriptor<ZRet>

export const FluentPropertyPlugin: FluentPropertyPlugin = <any>domain.createDecorator({
  name: 'FluentPropertyPlugin',
  allowedScopes: ['property'],
  classifierData: { type: 'fluentProperty' }
});

export type FluentMethodPlugin = () =>
  <Z extends BaseFluentApi | DecorMixinBase<any>, ZRet extends MethodReturnSelf<Z>>(target: Z, key: string, descriptor: TypedPropertyDescriptor<ZRet>) => TypedPropertyDescriptor<ZRet>

export const FluentMethodPlugin: FluentMethodPlugin = <any>domain.createDecorator({
  name: 'FluentMethodPlugin',
  allowedScopes: ['method'],
  classifierData: { type: 'fluentMethod' as PluginType }
});

export type MethodPlugin = () =>
  <Z extends BaseFluentApi | DecorMixinBase<any>, ZRet>(target: Z, key: string, descriptor: TypedPropertyDescriptor<ZRet>) => TypedPropertyDescriptor<ZRet>

export const MethodPlugin: MethodPlugin = <any>domain.createDecorator({
  name: 'MethodPlugin',
  allowedScopes: ['method'],
  classifierData: { type: 'method' }
});
