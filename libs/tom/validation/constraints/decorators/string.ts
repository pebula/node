import { ApiMixin, FluentMethodPlugin, FluentPropertyPlugin, LazyPluginExtension } from '@pebula/decorate/fluent';
import { TomPropertyFluentApi, TomPropertySchemaConfig } from '../../../src/lib/schema';
import { ConstraintDef } from '../definitions';
import { Constraint, RegisteredConstraints } from '../types';

@LazyPluginExtension(TomPropertyFluentApi)
export class StringConstraintsFluentApi extends ApiMixin.MixinBase<TomPropertySchemaConfig> {

  //#region Validation: string
  @FluentMethodPlugin()
  @ConstraintDef<'pattern'>({ createErrorMsg: ({value, constraint}) => `Pattern mismatch, "${value}" does not fit the pattern ${constraint.args[0].toString()}` })
  pattern(pattern: RegExp | string, flags?: string): this {
    return this.addValidator({ id: 'pattern', args: [typeof pattern === 'string' ? new RegExp(pattern, flags) : pattern] })
  }

  @FluentMethodPlugin()
  @ConstraintDef<'contains'>({ createErrorMsg: ({value, constraint}) => `The value "${value}" does not contain "${constraint.args[0]}"` })
  contains(value:  string): this {
    return this.addValidator({ id: 'contains', args: [value] })
  }

  @FluentPropertyPlugin()
  @ConstraintDef<'alpha'>({ createErrorMsg: ({value}) => `The value "${value}" contains non alpha characters` })
  get alpha(): this {
    return this.addValidator({ id: 'alpha' })
  }

  @FluentPropertyPlugin()
  @ConstraintDef<'alphaNumeric'>({ createErrorMsg: ({value}) => `The value "${value}" contains non alpha-numeric characters` })
  get alphaNumeric(): this {
    return this.addValidator({ id: 'alphaNumeric' })
  }
  //#endregion

  private addValidator<P extends keyof RegisteredConstraints>(validator: Constraint<P>): this {
    this.$$context.schema.validators.push(validator);
    return this;
  }
}

declare module '@pebula/tom/src/lib/schema/decorator-api/property' {
  export interface TomPropertyFluentApi extends ApiMixin.ExtendProperty<TomPropertyFluentApi, StringConstraintsFluentApi> { }
}

declare module '../types' {
  export interface RegisteredConstraints extends RegisteredConstraintsFromConstraintsApi<StringConstraintsFluentApi> {
    pattern: ConstraintInput<[RegExp]>;
  }
}
