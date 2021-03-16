import { BaseClassInternalSchema } from './base-schemas';

export class ParameterSchema<T = any> extends BaseClassInternalSchema {
  constructor(methodName: string, public readonly index: number) {
    super(methodName || 'constructor');
  }
}
