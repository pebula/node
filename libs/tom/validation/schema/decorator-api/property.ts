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

  @FluentMethodPlugin()
  min(value: number): this {
    return this.addValidator(validatorInfoRegistry.createInstance('min', value))
  }
  @FluentMethodPlugin()
  max(value: number): this {
    return this.addValidator(validatorInfoRegistry.createInstance('max', value))
  }

  @FluentMethodPlugin()
  minLength(value: number): this {
    return this.addValidator(validatorInfoRegistry.createInstance('minLength', value))
  }
  @FluentMethodPlugin()
  maxLength(value: number): this {
    return this.addValidator(validatorInfoRegistry.createInstance('maxLength', value))
  }

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

  if (!schema.optional) {
    schema.validators.push(validatorInfoRegistry.createInstance('required', true))
  }

  if (schema.typeDef) {
    schema.validators.push(validatorInfoRegistry.createInstance('type', schema.typeDef))
  }
});
