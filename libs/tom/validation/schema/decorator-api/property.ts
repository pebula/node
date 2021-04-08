import { ApiMixin, FluentMethodPlugin, FluentPropertyPlugin, LazyPluginExtension } from '@pebula/decorate/fluent';
import { TomPropertySchema, TomPropertySchemaConfig } from '../../../src/lib/schema';
import { TomPropertyFluentApi } from '../../../src/lib/schema/decorator-api/property';
import { validatorInfoRegistry, ValidatorInfo } from '../../known-validators';

import { ValidationPropertyFluentApi } from './property.types';

@LazyPluginExtension(TomPropertyFluentApi)
export class _ValidationPropertyFluentApi extends ApiMixin.MixinBase<TomPropertySchemaConfig>
                                          implements ValidationPropertyFluentApi {
  @FluentPropertyPlugin()
  get skipValidation(): this {
    this.$$context.schema.skipValidation = true;
    return this;
  }

  //#region Validation: number | bigint
  @FluentMethodPlugin()
  min(value: number | bigint): this {
    return this.addValidator(validatorInfoRegistry.createInstance('min', value))
  }
  @FluentMethodPlugin()
  max(value: number | bigint): this {
    return this.addValidator(validatorInfoRegistry.createInstance('max', value))
  }
  @FluentMethodPlugin()
  equal(value: number | bigint): this {
    return this.addValidator(validatorInfoRegistry.createInstance('equal', value))
  }
  @FluentMethodPlugin()
  notEqual(value: number | bigint): this {
    return this.addValidator(validatorInfoRegistry.createInstance('notEqual', value))
  }
  @FluentPropertyPlugin()
  get integer(): this {
    return this.addValidator(validatorInfoRegistry.createInstance('integer'))
  }
  @FluentPropertyPlugin()
  get positive(): this {
    return this.addValidator(validatorInfoRegistry.createInstance('positive'))
  }
  @FluentPropertyPlugin()
  get negative(): this {
    return this.addValidator(validatorInfoRegistry.createInstance('negative'))
  }
  //#endregion

  //#region Validation: string | array | set | map | objectMap
  @FluentMethodPlugin()
  length(value: number): this {
    return this.addValidator(validatorInfoRegistry.createInstance('length', value))
  }
  @FluentMethodPlugin()
  minLength(value: number): this {
    return this.addValidator(validatorInfoRegistry.createInstance('minLength', value))
  }
  @FluentMethodPlugin()
  maxLength(value: number): this {
    return this.addValidator(validatorInfoRegistry.createInstance('maxLength', value))
  }
  @FluentPropertyPlugin()
  get empty(): this {
    return this.addValidator(validatorInfoRegistry.createInstance('empty'))
  }
  //#endregion


  private addValidator(validator: ValidatorInfo): this {
    this.$$context.schema.validators?.push(validator) ?? (this.$$context.schema.validators = [validator]);
    return this;
  }
}

// TODO: Move to class static initialization blocks when in TS... {@link https://github.com/tc39/proposal-class-static-block}
TomPropertySchema.onNew((schema, config) => {
  if (config.skipValidation === true) {
    schema.skipValidation = true;
  }

  schema.validators = config.validators?.slice() ?? [];

});
