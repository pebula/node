import { BaseDecoratorArgs } from '@pebula/decorate';
import { BaseFluentApi, DecorApi, DecorMixinBase } from '../base-api';
import { PluginClassifierRecord } from '../decorator-domain/target-classifier';
import { DECOR_API_TYPE, PluginSchemaMap } from '../types';
import { fromApiClassToDecoratedType } from '../decorator-domain/utils';
import { PluginContext } from '../plugin-context';
import { DecorApiContext } from './create-api';

export const MANUAL_PLUGIN_EXECUTION_DATA = new WeakMap<BaseFluentApi | DecorMixinBase, [DecorApiContext<BaseFluentApi>, Array<[PluginClassifierRecord, any[]?]>]>();

export function executePlugins(instance: BaseFluentApi | DecorMixinBase, schema: PluginSchemaMap[DECOR_API_TYPE], target: object | Function): boolean {
  if (MANUAL_PLUGIN_EXECUTION_DATA.has(instance)) {
    const [context, recordings] = MANUAL_PLUGIN_EXECUTION_DATA.get(instance);
    MANUAL_PLUGIN_EXECUTION_DATA.delete(instance);

    const type = fromApiClassToDecoratedType(instance.constructor);
    if (instance instanceof DecorApi && type !== 'mixin') {
      const key = schema['key'] === 'constructor' ? undefined : schema['key'];
      const args = BaseDecoratorArgs.create(target, key, schema['index']);
      DecorApi.bindContext(instance, new PluginContext(type, context, args, schema) as any);
      executePluginsLocal(instance, recordings);
      return true;
    }
  }
  return false;
}

export function executePluginsLocal(instance: BaseFluentApi, plugins: Array<[PluginClassifierRecord, any[]?]>): void {
  while (plugins.length) {
    const [plugin, args] = plugins.shift(); // We take from the start to match the code flow definition (@P.optional.min(5).max(7))
    switch (plugin.type) {
      case 'fluentProperty':
        plugin.decoratorArgs.descriptor.get.call(instance);
        break;
      case 'fluentMethod':
        plugin.decoratorArgs.descriptor.value.apply(instance, args);
        break;
    }
  }
}
