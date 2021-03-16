import { BaseDecoratorArgs, DecoratorArgs, PropertyDecoratorArgs } from '@pebula/decorate';
import { ClassSchema } from '../schema';
import { BaseFluentApi, DecorApi } from './base-api';
import { DecorApiSuiteConfig, DecorApiStatic } from './decorate-api-suite';
import { DecorApiContext } from './execute/create-api';
import { DECOR_API_TYPE, PluginSchemaMap } from './types';

export type PluginContextOf<I extends DecorApi<DECOR_API_TYPE>> = I extends DecorApi<infer T, infer S, infer SC> ? PluginContext<T, S, SC> : never;

export interface IPluginContext<T extends DECOR_API_TYPE, S, SC extends ClassSchema> {
  readonly type: T;
  readonly target: object | Function;
  readonly schema: S;
  getClassSchema(): SC;
}

export class PluginContext<T extends DECOR_API_TYPE,
                           S extends PluginSchemaMap[T] =  PluginSchemaMap[T],
                           SC extends ClassSchema = ClassSchema> implements IPluginContext<T, S, SC> {

  readonly schema: S;
  get target(): object { return this.decoratorArgs.target; }
  get descriptor(): PropertyDescriptor | undefined { return (this.decoratorArgs as PropertyDecoratorArgs).descriptor; }

  constructor(public readonly type: T,
              private context: DecorApiContext<BaseFluentApi>,
              private readonly decoratorArgs: DecoratorArgs,
              schema?: S) {
    this.schema = schema || context.suiteMap[type].schemaFactory(decoratorArgs) as any;
  }

  getClassSchema(): SC {
    return this.context.store.get(this.decoratorArgs.classType, true) as SC;
  }
}
