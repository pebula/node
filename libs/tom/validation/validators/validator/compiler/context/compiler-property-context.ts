import { LazyInit, Type } from '@pebula/decorate';
import { Schema } from '@pebula/tom';
import { validatorRegistry } from '../../../../registry';
import { ClassValidationSchema } from '../../../../schema/class-validation-schema';
import { missingTypeValidator } from '../../../errors';
import { Validator } from '../../validator';
import { TypeValidatorCompiler } from '../../validator-components';
import { ROOT } from '../param-names';
import { CompilerContext } from './compiler-context';

export function isListContainer(type: Type<any>): boolean {
  // TODO: Support inheriting Map
  return type === Array || type === Set;
}

export function isKeyValueContainer(type: Type<any>) {
  return type && !isListContainer(type);
}

export class CompilerPropertyContext<State = any, S extends Validator = Validator, T = any, TRoot = T> {

  @LazyInit(function(this: CompilerPropertyContext<State, S, T>): CompilerPropertyContext<State, S, T> {
    return this.createSubPropContext(this.propMeta.subType);
  })
  subType?: CompilerPropertyContext<State, S, T>;

  private readonly _schemaParam: string;

  /**
   * @param schemaParamReference The variable name used to refer to the `TomPropertySchema` (propMeta). If not set, a reference will automatically generate
   */
  constructor(public readonly context: CompilerContext<State, S, TRoot>,
              public readonly propMeta: Schema.TomPropertySchema<T, keyof T>,
              schemaParamReference?: string) {
    this._schemaParam = schemaParamReference || this.context.setContextVar(propMeta);
  }

  analyseContainerType() {
    const propMeta = this.propMeta;
    if (propMeta) {
      if (!propMeta.isContainer) {
        return 'none'
      } else if (isListContainer(propMeta.reflectedType)) {
        return 'list';
      } else if (isKeyValueContainer(propMeta.reflectedType)) {
        return 'map';
      }
    }
    return;
  }

  /**
   * Returns the type map schema for the 2 types mapped by this property.
   * If not exists, returns undefined.
   */
  tryFindClassValidationSchema(): ClassValidationSchema<S, T> | undefined {
    return validatorRegistry.get(this.context.validator, this.propMeta.type);
  }

  schemaParam(key: keyof Schema.TomPropertySchema<T>, ...path: string[]): string;
  schemaParam(): string;
  schemaParam(...path: string[]): string {
    return path.length === 0
      ? this._schemaParam
      : `${this._schemaParam}.${path.join('.')}`
    ;
  }

  findValidatorCompiler(throwIfNotFound?: boolean): TypeValidatorCompiler {
    const typeValidatorCompiler = this.context.validatorContext.findValidatorCompiler(this.propMeta.typeDef.type);
    if (throwIfNotFound && !typeValidatorCompiler) {
      const { validator, target } = this.context.classValidationSchema;
      const { name, typeDef } = this.propMeta;
      throw missingTypeValidator(validator, target, name as string, typeDef, 'jit');
    }
    return typeValidatorCompiler;
  }

  createSubPropContext<TSub = any>(subProp: Schema.TomPropertySchema<TSub>): CompilerPropertyContext<State, S, TSub, TRoot> {
    return new CompilerPropertyContext(this.context, subProp);
  }

}
