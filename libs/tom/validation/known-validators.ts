import { TypeSystem, Schema } from '@pebula/tom';
import { ClassValidatorContext } from './validators';

export interface ValidatorInfoType<TArgs> {
  args: TArgs;
}

export interface ValidatorInfoTypeMap {
  type: ValidatorInfoType<TypeSystem.TomTypeInstance>,
  required: ValidatorInfoType<boolean>,
  min: ValidatorInfoType<number>,
  max: ValidatorInfoType<number>,
  minLength: ValidatorInfoType<number>,
  maxLength: ValidatorInfoType<number>,
}

export type ValidatorNames = keyof ValidatorInfoTypeMap;
export type ValidatorInfo<T extends ValidatorNames = ValidatorNames> = { id: T } & ValidatorInfoTypeMap[T];

export interface ValidatorInfoFactory<P extends ValidatorNames> {
  createErrorMsg(info: { value: any, ctx: ClassValidatorContext<any>, prop: Schema.TomPropertySchema, validatorMeta: ValidatorInfo<P> }): string;
}

export class ValidatorInfoRegistry {
  private store = new Map<ValidatorNames, ValidatorInfoFactory<ValidatorNames>>();

  addValidator<P extends ValidatorNames>(id: P, factory: ValidatorInfoFactory<P>): this {
    this.store.set(id, factory);
    return this;
  }

  createInstance<P extends ValidatorNames>(id: P, args: ValidatorInfoTypeMap[P]['args']): { id: P } & ValidatorInfoTypeMap[P] {
    return { id, args } as any;
  }

  createErrorMsg<P extends ValidatorNames>(value: any, ctx: ClassValidatorContext<any>, prop: Schema.TomPropertySchema, validatorMeta: ValidatorInfo<P>): string {
    return this.store.get(validatorMeta.id).createErrorMsg({ value, ctx, prop, validatorMeta: validatorMeta as ValidatorInfo });
  }
}

export const validatorInfoRegistry = new ValidatorInfoRegistry()
  .addValidator('type', {
    createErrorMsg({validatorMeta}) {
      return `Invalid runtime type, expected type ${validatorMeta.args.type}`;
    }
  })
  .addValidator('required', {
    createErrorMsg({validatorMeta}) {
      return `Property is required`;
    }
  })
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
  .addValidator('minLength', {
    createErrorMsg({validatorMeta}) {
      return `Minimum length is ${validatorMeta.args}`;
    }
  })
  .addValidator('maxLength', {
    createErrorMsg({validatorMeta}) {
      return `Maximum length is ${validatorMeta.args}`;
    }
  });
