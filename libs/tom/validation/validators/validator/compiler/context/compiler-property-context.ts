import { Type } from '@pebula/decorate';
import { Schema } from '@pebula/tom';
import { validatorRegistry } from '../../../../registry';
import { ClassValidationSchema } from '../../../../schema/class-validation-schema';
import { Validator } from '../../validator';
import { ROOT } from '../param-names';
import { CompilerContext } from './compiler-context';

export function isListContainer(type: Type<any>): boolean {
  // TODO: Support inheriting Map
  return type === Array || type === Set;
}

export function isKeyValueContainer(type: Type<any>) {
  return type && !isListContainer(type);
}

export class CompilerPropertyContext<State = any, S extends Validator = Validator, T = any> {

  private readonly _schemaParam: string;

  constructor(public readonly context: CompilerContext<State, S, T>,
              public readonly ref: number,
              public readonly propMeta: Schema.TomPropertySchema<T, keyof T>) {
    this._schemaParam = `${ROOT.PROP_VALIDATION_SCHEMAS_PARAM}[${ref}]`;
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
}
