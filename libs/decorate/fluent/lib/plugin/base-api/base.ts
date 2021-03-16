import { ClassSchema } from '../../schema';
import { DecorApiStatic } from '../decorate-api-suite';
import { PluginSchemaMap, DECOR_API_TYPE } from '../types';
import { PluginContext, PluginContextOf } from '../plugin-context';

import type { DecorClassApi } from './class';
import type { DecorMethodApi } from './method';
import type { DecorParameterApi } from './parameter';
import type { DecorPropertyApi } from './property';
import type { DecorMixinBase } from './mixin';

export type BaseFluentApi = DecorClassApi | DecorPropertyApi | DecorMethodApi | DecorParameterApi;

export abstract class DecorApi<T extends DECOR_API_TYPE,
                               TSchema extends PluginSchemaMap[T] = PluginSchemaMap[T],
                               TClassSchema extends ClassSchema = ClassSchema> {
  protected $$context: PluginContext<T, TSchema, TClassSchema>;

  static bindContext<T extends DecorApi<DECOR_API_TYPE>>(instance: T, context: PluginContextOf<T>): void {
    instance.$$context = context;
  }

  static getSchemaType<T extends BaseFluentApi | DecorMixinBase>(instance: T) {
    return instance.constructor as DecorApiStatic<T extends BaseFluentApi ? T : any>;
  }
}
