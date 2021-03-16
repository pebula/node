import { Abstract, Type } from '@pebula/decorate';
import { iterateClassHierarchy } from '../../../../src/lib/utils';
import {
  BaseFluentApi,
  DecorClassApi,
  DecorPropertyApi,
  DecorMethodApi,
  DecorParameterApi,
  DecorMixinBase,
} from '../base-api';
import { DECOR_API_TYPE, MIXIN_DECOR_API_TYPE } from '../types';

const TYPE_TO_API_BASE_CLASS = new Map<DECOR_API_TYPE | MIXIN_DECOR_API_TYPE, Abstract<BaseFluentApi | DecorMixinBase<any>>>([
  ['class', DecorClassApi],
  ['property', DecorPropertyApi],
  ['method', DecorMethodApi],
  ['parameter', DecorParameterApi],
  ['mixin', DecorMixinBase],
]);

const API_BASE_CLASS_TO_TYPE = new Map<Abstract<BaseFluentApi | DecorMixinBase<any>>, DECOR_API_TYPE | MIXIN_DECOR_API_TYPE>(Array.from(TYPE_TO_API_BASE_CLASS.entries()).map(([t, c]) => [c, t]));

/**
 * Resolves the `DECOR_API_TYPE` related to the class provided.
 * The resolution is done via the base classes:  DecorClassApi, DecorPropertyApi, DecorMethodApi, DecorParameterApi
 */
export function fromApiClassToDecoratedType(fluentApiClass: Type<BaseFluentApi | DecorMixinBase<any>> | Abstract<BaseFluentApi | DecorMixinBase<any>>): DECOR_API_TYPE | MIXIN_DECOR_API_TYPE | undefined {
  for (const cls of iterateClassHierarchy(fluentApiClass)) {
    const type = API_BASE_CLASS_TO_TYPE.get(cls);
    if (type) {
      return type;
    }
  }
}
