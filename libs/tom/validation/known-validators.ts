import { TypeSystem, Schema } from '@pebula/tom';
import { ClassValidatorContext } from './validators';

type KeysMatching<T, V> = {[K in keyof T]-?: T[K] extends V ? K : never}[keyof T];

export interface ValidatorInfoType<TArgs> {
  args: TArgs;
}

export interface ValidatorInfoTypeMap {
  type: ValidatorInfoType<never>,
  required: ValidatorInfoType<never>,

  min: ValidatorInfoType<number | bigint>,
  max: ValidatorInfoType<number | bigint>,
  equal: ValidatorInfoType<number | bigint>,
  notEqual: ValidatorInfoType<number | bigint>,
  integer: ValidatorInfoType<never>,
  positive: ValidatorInfoType<never>,
  negative: ValidatorInfoType<never>,

  length: ValidatorInfoType<number>,
  minLength: ValidatorInfoType<number>,
  maxLength: ValidatorInfoType<number>,
  empty: ValidatorInfoType<never>,
}

export type ValidatorNames = keyof ValidatorInfoTypeMap;
export type NoArgsValidatorNames = KeysMatching<ValidatorInfoTypeMap, ValidatorInfoType<never>>;
export type WithArgsValidatorNames = Exclude<ValidatorNames, NoArgsValidatorNames>;

export type ValidatorInfo<T extends ValidatorNames = ValidatorNames> = { id: T } & (T extends NoArgsValidatorNames ? {} : ValidatorInfoTypeMap[T]);


export interface ValidatorInfoFactory<P extends ValidatorNames> {
  createErrorMsg(info: { value: any, ctx: ClassValidatorContext<any>, prop: Schema.TomPropertySchema, validatorMeta: ValidatorInfo<P> }): string;
}

export class ValidatorInfoRegistry {
  private store = new Map<ValidatorNames, ValidatorInfoFactory<ValidatorNames>>();

  addValidator<P extends ValidatorNames>(id: P, factory: ValidatorInfoFactory<P>): this {
    this.store.set(id, factory);
    return this;
  }

  createInstance<P extends NoArgsValidatorNames>(id: P): { id: P } & ValidatorInfoTypeMap[P];
  createInstance<P extends WithArgsValidatorNames>(id: P, args: ValidatorInfoTypeMap[P]['args']): { id: P } & ValidatorInfoTypeMap[P];
  createInstance<P extends ValidatorNames>(id: P, args?: ValidatorInfoTypeMap[P]['args']): { id: P } & ValidatorInfoTypeMap[P] {
    return args === undefined ? { id } : { id, args } as any;
  }

  createErrorMsg<P extends ValidatorNames>(value: any, ctx: ClassValidatorContext<any>, prop: Schema.TomPropertySchema, validatorMeta: ValidatorInfo<P>): string {
    return this.store.get(validatorMeta.id).createErrorMsg({ value, ctx, prop, validatorMeta: validatorMeta as ValidatorInfo });
  }
}

export const validatorInfoRegistry = new ValidatorInfoRegistry()
  // Does not get added into the `TomPropertySchema.validators` array, but inferred from the optional/nullable properties
  .addValidator('required', {
    createErrorMsg({validatorMeta}) {
      return `Property is required`;
    }
  })

  /** Validation: Runtime type */
  .addValidator('type', {
    createErrorMsg({prop}) {
      return `Invalid runtime type, expected type ${TypeSystem.tomTypeInstanceToString(prop.typeDef)}`;
    }
  })

  /** Validation: number | bigint */
  .addValidator('min', {
    createErrorMsg({validatorMeta}) {
      return `Minimum value is ${validatorMeta.args}`;
    }
  })
  .addValidator('max', {
    createErrorMsg({validatorMeta}) {
      return `Maximum value is ${validatorMeta.args}`;
    }
  })
  .addValidator('equal', {
    createErrorMsg({validatorMeta}) {
      return `Must equal to ${validatorMeta.args}`;
    }
  })
  .addValidator('notEqual', {
    createErrorMsg({validatorMeta}) {
      return `Must not equal to ${validatorMeta.args}`;
    }
  })
  .addValidator('integer', {
    createErrorMsg({validatorMeta}) {
      return `Must be an integer`;
    }
  })
  .addValidator('positive', {
    createErrorMsg({validatorMeta}) {
      return `Must be positive`;
    }
  })
  .addValidator('negative', {
    createErrorMsg({validatorMeta}) {
      return `Must be negative`;
    }
  })

  /** Validation: string | array | set | map | objectMap */
  .addValidator('length', {
    createErrorMsg({validatorMeta}) {
      return `Length must be ${validatorMeta.args}`;
    }
  })
  .addValidator('minLength', {
    createErrorMsg({validatorMeta}) {
      return `Minimum length is ${validatorMeta.args}`;
    }
  })
  .addValidator('maxLength', {
    createErrorMsg({validatorMeta}) {
      return `Maximum length is ${validatorMeta.args}`;
    }
  })
  .addValidator('empty', {
    createErrorMsg({validatorMeta}) {
      return `Must be empty`;
    }
  })

