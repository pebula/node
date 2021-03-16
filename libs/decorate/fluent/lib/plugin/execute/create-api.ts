import { Type, BaseDecoratorArgs } from '@pebula/decorate';

import { PropertySchema, MethodSchema, ParameterSchema, DecorClassSchemaStore, ClassSchema } from '../../schema';
import { BaseFluentApi, DecorApi } from '../base-api';
import { DECOR_API_TYPE, FluentApiTypeMap } from '../types';
import { domain } from '../decorator-domain';
import { PluginClassifierRecord, PluginTargetClassifier } from '../decorator-domain/target-classifier';
import { fromApiClassToDecoratedType } from '../decorator-domain/utils';
import { executePluginsLocal, MANUAL_PLUGIN_EXECUTION_DATA } from './execute-plugins';
import { PluginContext } from '../plugin-context';
import { DecorApiStatic, DecorApiSuiteConfig } from '../decorate-api-suite';

export interface DecoratorMap {
  class: (target: Type<any>) => void;
  property: PropertyDecorator;
  method: MethodDecorator;
  parameter: ParameterDecorator;
}

export interface DecorApiContext<T extends BaseFluentApi, C extends ClassSchema = ClassSchema>  {
  cls: DecorApiStatic<T>;
  suiteMap: DecorApiSuiteConfig;
  store: DecorClassSchemaStore<C>;
  onDecorate: (context: PluginContext<DECOR_API_TYPE>) => void;
}

function currentPluginTransientAccessor() {
  let val: PluginClassifierRecord;
  return (value?: PluginClassifierRecord): PluginClassifierRecord | undefined => {
      if (!value) {
        const ret = val
        val = undefined;
        return ret;
      } else {
        val = value;
      }
    }
}

function executeMethod(apiType: DECOR_API_TYPE,
                       context: DecorApiContext<BaseFluentApi>,
                       method: [PluginClassifierRecord, any[]],
                       recordings: Array<[PluginClassifierRecord, any[]?]>) {
  const pluginInstance = new context.cls();
  MANUAL_PLUGIN_EXECUTION_DATA.set(pluginInstance, [context, recordings]);
  const result = method[0].decoratorArgs.descriptor.value.apply(pluginInstance, method[1]);
  MANUAL_PLUGIN_EXECUTION_DATA.delete(pluginInstance);
  return result;
}

function recordPlayer(apiType: DECOR_API_TYPE,
                      context: DecorApiContext<BaseFluentApi>,
                      recordings: Array<[PluginClassifierRecord, any[]?]>) {
  return (target: object, key?: string | symbol, indexOrDescription?: TypedPropertyDescriptor<any> | number) => {

    if (apiType !== 'class') {
      const pluginInstance: FluentApiTypeMap[typeof apiType] = new context.cls() as any;
      const decoratorArgs = BaseDecoratorArgs.create(target, key, indexOrDescription);
      const pluginContext = new PluginContext(apiType, context, decoratorArgs);
      DecorApi.bindContext(pluginInstance, pluginContext as any);
      if (decoratorArgs.hasDesignType) {
        pluginContext.schema.reflectedType = decoratorArgs.designType as any;
      }

      executePluginsLocal(pluginInstance, recordings);
      const classSchema = context.store.get(decoratorArgs.classType, true);

      const { schema } = pluginContext;
      if (schema instanceof PropertySchema) {
        classSchema.addPropertySchema(schema);
      } else if (schema instanceof MethodSchema) {
        const existingMethod = classSchema.getMethod(schema.key);
        if (existingMethod) {
          // This means that we have params, which run before the method, so we copy.
          classSchema.removeMethodSchema(schema.key);
          for (const p of existingMethod.getParams()) {
            schema.addParamSchema(p);
          }
        }
        classSchema.addMethodSchema(schema);
      } else if (schema instanceof ParameterSchema) {
        if (schema.key === 'constructor') {
          classSchema.addConstructorParam(schema);
        } else {
          let method = classSchema.getMethod(schema.key);
          if (!method) {
            method = context.suiteMap.method.schemaFactory(BaseDecoratorArgs.create(target, schema.key));
            classSchema.addMethodSchema(method);
          }
          method.addParamSchema(schema);
        }
      }
      context.onDecorate(pluginContext);
    } else {
      const pluginInstance: FluentApiTypeMap[typeof apiType] = new context.cls() as any;
      const decoratorArgs = BaseDecoratorArgs.create(target as any);
      const classSchema = context.store.get(target as Type<any>, true);
      // Here we want to first create the ClassSchema from the store so it will be registered there and not just created on the fly.
      const pluginContext = new PluginContext(apiType, context, decoratorArgs, classSchema);
      DecorApi.bindContext(pluginInstance, pluginContext);
      executePluginsLocal(pluginInstance, recordings);
      context.onDecorate(pluginContext);
    }
  }
}

export function createApi<T extends BaseFluentApi>(context: DecorApiContext<T>): T extends DecorApi<infer U> ? T & DecoratorMap[U] : never {
  const apiType = fromApiClassToDecoratedType(context.cls as any);
  if (apiType === 'mixin') {
    throw new Error('erere');
  }

  const pluginContainer = domain.getTarget(context.cls, true);

  if (!pluginContainer) {
    return recordPlayer(apiType, context, []) as any;
  }

  const proxy = new Proxy(() => {}, {
    apply: (target: unknown, thisArg: any, args:  [any, any?, any?]) => {
      return recordPlayer(apiType, context, [])(...args);
    },
    get: (target: unknown, key: string, receiver: PluginTargetClassifier) => {
      if (key === 'constructor') {
        return context.cls;
      }
      return _create(apiType, context, pluginContainer)[key];
    }
  });
  return proxy as any;
}

function _create<T extends BaseFluentApi>(apiType: DECOR_API_TYPE,
                                          context: DecorApiContext<T>,
                                          pluginContainer: PluginTargetClassifier,): T extends DecorApi<infer U> ? T & DecoratorMap[U] : never {
  const plugins = pluginContainer.getPlugins(apiType);
  const recordings: Array<[PluginClassifierRecord, any[]?]> = [];
  const currentPlugin = currentPluginTransientAccessor();

  const proxy = new Proxy(() => {}, {
    apply: (target: unknown, thisArg: any, args: [any, any?, any?]) => {
      const plugin = currentPlugin();
      if (!plugin) {
        return recordPlayer(apiType, context, recordings)(...args);
      } else if (plugin.type === 'method') {
        return executeMethod(apiType, context, [plugin, args], recordings)
      } else {
        recordings.push([plugin, args]);
        return proxy;
      }
    },
    get: (target: unknown, key: string, receiver: PluginTargetClassifier) => {
      if (key === 'constructor') {
        return context.cls;
      }

      // If user forgot to invoke method...
      const prevPlugin = currentPlugin();
      if (prevPlugin) {
        return context.cls.prototype[prevPlugin.decoratorArgs.key][key];
      }

      const plugin = plugins.get(key);
      switch (plugin?.type) {
        case 'fluentProperty':
          recordings.push([plugin]);
          return proxy;
        case 'fluentMethod':
        case 'method':
          currentPlugin(plugin);
          return proxy;
        default:
          return undefined;
      }
    }
  });
  return proxy as any;
}
