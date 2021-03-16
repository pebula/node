import { DecoratorArgs } from '@pebula/decorate';
import { DecorClassApi, DecorPropertyApi, DecorMethodApi, DecorParameterApi, DecorApi, DecorMixinBase, BaseFluentApi } from './base-api';
import { DecorClassSchemaStore } from '../schema';
import { DecoratorMap, createApi, DecorApiContext } from './execute/create-api';
import { DECOR_API_TYPE } from './types';
import { PluginContext } from './plugin-context';

export interface DecorApiStatic<T extends BaseFluentApi> {
  new (...args: any[]): T;
  prototype: T;

  schemaFactory(decoratorArgs: DecoratorArgs): SchemaFromDecorApi<T>;
}

export interface DecorApiSuiteConfig<TClass extends DecorClassApi = DecorClassApi,
                                     TProperty extends DecorPropertyApi = DecorPropertyApi,
                                     TMethod extends DecorMethodApi = DecorMethodApi,
                                     TParameter extends DecorParameterApi = DecorParameterApi> {
  class: DecorApiStatic<TClass>;
  property: DecorApiStatic<TProperty>;
  method: DecorApiStatic<TMethod>;
  parameter: DecorApiStatic<TParameter>;
}

export type ResolveDecorApiSuiteConfig<T> = T extends DecorApiSuite<infer C, infer P, infer M, infer MP>
  ? DecorApiSuiteConfig<C, P, M, MP>
  : never;

export type ResolveSchemasFromSuiteConfig<T extends DecorApiSuiteConfig> = T extends Record<keyof T, DecorApiStatic<any>>
? { [P in keyof T]: ReturnType<T[P]['schemaFactory']> }
: never;

export type SchemaFromDecorApi<T extends DecorApi<DECOR_API_TYPE> | DecorMixinBase> = T extends DecorApi<any, infer U> ? U : never;

const DEFAULT_API_SUITE_CONFIG: DecorApiSuiteConfig = {
  class: DecorClassApi,
  property: DecorPropertyApi,
  method: DecorMethodApi,
  parameter: DecorParameterApi,
};

function NOOP (){ }

export class DecorApiSuite<TClass extends DecorClassApi,
                           TProperty extends DecorPropertyApi,
                           TMethod extends DecorMethodApi,
                           TParameter extends DecorParameterApi>  {

  get store() {
    return this._store;
  }

  get classApi(): TClass & DecoratorMap['class'] {
    return this.suite.class || (this.suite.class = createApi(this.createContext(this.suiteMap.class))) as any;
  }

  get propertyApi(): TProperty & DecoratorMap['property'] {
    return this.suite.property || (this.suite.property = createApi(this.createContext(this.suiteMap.property))) as any;
  }

  get methodApi(): TMethod & DecoratorMap['method'] {
    return this.suite.method || (this.suite.method = createApi(this.createContext(this.suiteMap.method))) as any;
  }

  get parameterApi(): TParameter & DecoratorMap['parameter'] {
    return this.suite.parameter || (this.suite.parameter = createApi(this.createContext(this.suiteMap.parameter))) as any;
  }


  private suite: { class: TClass; property: TProperty; method: TMethod; parameter: TParameter } = {} as any;
  private suiteMap: DecorApiSuiteConfig<TClass, TProperty, TMethod, TParameter> = {} as any;
  private _store: DecorClassSchemaStore<SchemaFromDecorApi<TClass>>;
  private onDecorateHandler: (context: PluginContext<DECOR_API_TYPE>) => void;

  private constructor() { }

  static create<C extends DecorClassApi,
                P extends DecorPropertyApi,
                M extends DecorMethodApi,
                MP extends DecorParameterApi>(config: DecorApiSuiteConfig<C, P, M, MP>): DecorApiSuite<C, P, M, MP>
  static create(): DecorApiSuite<DecorClassApi, DecorPropertyApi, DecorMethodApi, DecorParameterApi>
  static create(config?: DecorApiSuiteConfig): DecorApiSuite<DecorClassApi, DecorPropertyApi, DecorMethodApi, DecorParameterApi> {
    config = {...DEFAULT_API_SUITE_CONFIG, ...(config || {}) };
    return new DecorApiSuite()
      .forClass(config.class)
      .forProperty(config.property)
      .forMethod(config.method)
      .forParameter(config.parameter);
  }

  onDecorate(handler: (context: PluginContext<DECOR_API_TYPE>) => void): this {
    this.onDecorateHandler = handler;
    return this;
  }

  withStore<T extends TClass>(clsStore: DecorClassSchemaStore<SchemaFromDecorApi<T>>): this {
    this._store = clsStore;
    return this;
  }

  forClass<T extends TClass>(cls: DecorApiStatic<T>, clsStore?: DecorClassSchemaStore<SchemaFromDecorApi<T>>): DecorApiSuite<T, TProperty, TMethod, TParameter> {
    this.suiteMap.class = cls;
    this.suite.class = undefined;

    this._store = clsStore || new DecorClassSchemaStore<SchemaFromDecorApi<T>>((t, a) => (cls as unknown as typeof DecorClassApi).schemaFactory(t, a) as any);
    return this as any;
  }

  forProperty<T extends TProperty>(cls: DecorApiStatic<T>): DecorApiSuite<TClass, T, TMethod, TParameter> {
    this.suiteMap.property = cls;
    this.suite.property = undefined;
    return this as any;
  }

  forMethod<T extends TMethod>(cls: DecorApiStatic<T>): DecorApiSuite<TClass, TProperty, T, TParameter> {
    this.suiteMap.method = cls;
    this.suite.method = undefined;
    return this as any;
  }

  forParameter<T extends TParameter>(cls: DecorApiStatic<T>): DecorApiSuite<TClass, TProperty, TMethod, T> {
    this.suiteMap.parameter = cls;
    this.suite.parameter = undefined;
    return this as any;
  }

  private createContext<T extends BaseFluentApi>(cls: DecorApiStatic<T>): DecorApiContext<T> {
    return {
      cls,
      suiteMap: this.suiteMap,
      store: this._store,
      onDecorate: this.onDecorateHandler || NOOP,
    };
  }
}
