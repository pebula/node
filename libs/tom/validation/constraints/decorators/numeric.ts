import { ApiMixin, FluentMethodPlugin, FluentPropertyPlugin, LazyPluginExtension } from '@pebula/decorate/fluent';
import { TomPropertyFluentApi, TomPropertySchemaConfig } from '../../../src/lib/schema';
import { ConstraintDef } from '../definitions';
import { Constraint, RegisteredConstraints } from '../types';

@LazyPluginExtension(TomPropertyFluentApi)
export class NumericConstraintsFluentApi extends ApiMixin.MixinBase<TomPropertySchemaConfig> {

  //#region Validation: number | bigint
  @FluentMethodPlugin()
  @ConstraintDef<'min'>({ createErrorMsg: ({constraint}) => `Minimum value is ${constraint.args[0]}` })
  min(value: number | bigint): this {
    return this.addValidator({ id: 'min', args: [value] })
  }

  @FluentMethodPlugin()
  @ConstraintDef<'max'>({ createErrorMsg: ({constraint}) => `Maximum value is ${constraint.args[0]}` })
  max(value: number | bigint): this {
    return this.addValidator({ id: 'max', args: [value] })
  }

  @FluentMethodPlugin()
  @ConstraintDef<'equal'>({
    reflectsNegate: true,
    createErrorMsg: ({constraint}) => `Must ${constraint.negate ? 'not ' : ''}equal to ${constraint.args[0]}`
  })
  equal(value: number | bigint): this {
    return this.addValidator({ id: 'equal', args: [value] })
  }

  @FluentPropertyPlugin()
  @ConstraintDef<'integer'>({ createErrorMsg: () => `Must be an integer` })
  get integer(): this {
    return this.addValidator({ id: 'integer' })
  }

  @FluentPropertyPlugin()
  @ConstraintDef<'positive'>({ createErrorMsg: () => `Must be positive` })
  get positive(): this {
    return this.addValidator({ id: 'positive' })
  }

  @FluentPropertyPlugin()
  @ConstraintDef<'negative'>({ createErrorMsg: () => `Must be negative` })
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
