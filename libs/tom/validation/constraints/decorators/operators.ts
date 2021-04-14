import { ApiMixin, FluentMethodPlugin, FluentPropertyPlugin, LazyPluginExtension } from '@pebula/decorate/fluent';
import { TomPropertyFluentApi, TomPropertySchemaConfig } from '../../../src/lib/schema';
import { Constraint, RegisteredConstraints } from '../types';

@LazyPluginExtension(TomPropertyFluentApi)
export class OperatorsConstraintsFluentApi extends ApiMixin.MixinBase<TomPropertySchemaConfig> {

  @FluentPropertyPlugin()
  get not(): this {
    return this.addValidator({ id: 'not' })
  }

  private addValidator<P extends keyof RegisteredConstraints>(validator: Constraint<P>): this {
    this.$$context.schema.validators.push(validator);
    return this;
  }
}

declare module '@pebula/tom/src/lib/schema/decorator-api/property' {
  export interface TomPropertyFluentApi extends ApiMixin.ExtendProperty<TomPropertyFluentApi, OperatorsConstraintsFluentApi> { }
}

declare module '../types' {
  export interface RegisteredConstraints extends RegisteredConstraintsFromConstraintsApi<OperatorsConstraintsFluentApi> { }
}
