import { DecorMemberSchema } from './base-schemas';
import { ParameterSchema } from './parameters-schema';

export class MethodSchema<T = any, TParameter extends ParameterSchema = ParameterSchema> extends DecorMemberSchema<T> {
  private parameters: TParameter[] = [];

  constructor(key: string) {
    super(key);
  }

  addParamSchema(...methodParamSchema: TParameter[]): this {
    this.parameters.push(...methodParamSchema);
    return this;
  }

  getParams(): TParameter[] {
    return this.parameters;
  }
}

