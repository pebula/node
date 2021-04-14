import { ApiMixin, FluentMethodPlugin, FluentPropertyPlugin, LazyPluginExtension } from '@pebula/decorate/fluent';
import { TomPropertyFluentApi, TomPropertySchemaConfig } from '../../../src/lib/schema';
import { ConstraintDef } from '../definitions';
import { Constraint, RegisteredConstraints } from '../types';

@LazyPluginExtension(TomPropertyFluentApi)
export class LengthBasedConstraintsFluentApi extends ApiMixin.MixinBase<TomPropertySchemaConfig> {

  //#region Validation: string | array | set | map | objectMap
  @FluentMethodPlugin()
  @ConstraintDef<'length'>({ createErrorMsg: ({constraint}) => `Length must be ${constraint.args[0]}` })
  length(value: number): this {
    return this.addValidator({ id: 'length', args: [value] })
  }

  @FluentMethodPlugin()
  @ConstraintDef<'minLength'>({ createErrorMsg: ({constraint}) => `Minimum length is ${constraint.args[0]}` })
  minLength(value: number): this {
    return this.addValidator({ id: 'minLength', args: [value] })
  }

  @FluentMethodPlugin()
  @ConstraintDef<'maxLength'>({ createErrorMsg: ({constraint}) => `Maximum length is ${constraint.args[0]}` })
  maxLength(value: number): this {
    return this.addValidator({ id: 'maxLength', args: [value] })
  }

  @FluentPropertyPlugin()
  @ConstraintDef<'empty'>({ createErrorMsg: () => `Must be empty` })
  get empty(): this {
    return this.addValidator({ id: 'empty' })
  }
  //#endregion

  private addValidator<P extends keyof RegisteredConstraints>(validator: Constraint<P>): this {
    this.$$context.schema.validators.push(validator);
    return this;
  }
}

declare module '@pebula/tom/src/lib/schema/decorator-api/property' {
  export interface TomPropertyFluentApi extends ApiMixin.ExtendProperty<TomPropertyFluentApi, LengthBasedConstraintsFluentApi> { }
}

declare module '../types' {
  export interface RegisteredConstraints extends RegisteredConstraintsFromConstraintsApi<LengthBasedConstraintsFluentApi> { }
}
