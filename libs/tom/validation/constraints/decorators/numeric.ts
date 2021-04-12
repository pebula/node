import { ApiMixin, FluentMethodPlugin, FluentPropertyPlugin, LazyPluginExtension } from '@pebula/decorate/fluent';
import { TomPropertyFluentApi, TomPropertySchemaConfig } from '../../../src/lib/schema';
import { Constraint, RegisteredConstraints, ConstraintErrorMsg } from '../types';

@LazyPluginExtension(TomPropertyFluentApi)
export class NumericConstraintsFluentApi extends ApiMixin.MixinBase<TomPropertySchemaConfig> {

  //#region Validation: number | bigint
  @FluentMethodPlugin()
  @ConstraintErrorMsg<'min'>(({validatorMeta}) => `Minimum value is ${validatorMeta.args[0]}`)
  min(value: number | bigint): this {
    return this.addValidator({ id: 'min', args: [value] })
  }

  @FluentMethodPlugin()
  @ConstraintErrorMsg<'max'>(({validatorMeta}) => `Maximum value is ${validatorMeta.args[0]}`)
  max(value: number | bigint): this {
    return this.addValidator({ id: 'max', args: [value] })
  }

  @FluentMethodPlugin()
  @ConstraintErrorMsg<'equal'>(({validatorMeta}) => `Must equal to ${validatorMeta.args[0]}`)
  equal(value: number | bigint): this {
    return this.addValidator({ id: 'equal', args: [value] })
  }

  @FluentMethodPlugin()
  @ConstraintErrorMsg<'notEqual'>(({validatorMeta}) => `Must not equal to ${validatorMeta.args[0]}`)
  notEqual(value: number | bigint): this {
    return this.addValidator({ id: 'notEqual', args: [value] })
  }

  @FluentPropertyPlugin()
  @ConstraintErrorMsg<'integer'>(() => `Must be an integer`)
  get integer(): this {
    return this.addValidator({ id: 'integer' })
  }

  @FluentPropertyPlugin()
  @ConstraintErrorMsg<'positive'>(() => `Must be positive`)
  get positive(): this {
    return this.addValidator({ id: 'positive' })
  }

  @FluentPropertyPlugin()
  @ConstraintErrorMsg<'negative'>(() => `Must be negative`)
  get negative(): this {
    return this.addValidator({ id: 'negative' })
  }
  //#endregion

  private addValidator<P extends keyof RegisteredConstraints>(validator: Constraint<P>): this {
    this.$$context.schema.validators.push(validator);
    return this;
  }
}

declare module '@pebula/tom/src/lib/schema/decorator-api/property' {
  export interface TomPropertyFluentApi extends ApiMixin.ExtendProperty<TomPropertyFluentApi, NumericConstraintsFluentApi> { }
}

declare module '../types' {
  export interface RegisteredConstraints extends RegisteredConstraintsFromConstraintsApi<NumericConstraintsFluentApi> { }
}
