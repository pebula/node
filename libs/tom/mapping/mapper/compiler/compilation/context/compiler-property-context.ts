import { LazyInit, Type } from '@pebula/decorate';
import { PropertyMappingSchema } from '../../../../mapping-schema';
import { mapRegistry } from '../../../../registry';
import { ROOT } from '../param-names';
import { CompilerContext } from './compiler-context';
import { CompilerContextState } from './compiler-context-state';

export function isListContainer(type: Type<any>): boolean {
  // TODO: Support inheriting Map
  return type === Array || type === Set;
}

export function isKeyValueContainer(type: Type<any>) {
  return type && !isListContainer(type);
}

export class CompilerPropertyContext<State = CompilerContextState, S = any, T = any> {

  @LazyInit(function(this: CompilerPropertyContext<State, S, T>): CompilerPropertyContext<State, S, T> {
    return this.createSubType();
  })
  subType?: CompilerPropertyContext<State, S, T>;

  private readonly _schemaParam: string;

  constructor(public readonly context: CompilerContext<State, S, T>,
              public readonly ref: number,
              public readonly propMapSchema: PropertyMappingSchema<S, T, keyof T, keyof S>,
              propMapSchemaParamName?: string) {
    this._schemaParam = propMapSchemaParamName || `${ROOT.PROP_MAP_SCHEMAS_PARAM}[${ref}]`;
  }

  analyseContainerType(type: 'target' | 'source') {
    const propMeta = type === 'target' ? this.propMapSchema.targetPropMeta : this.propMapSchema.sourcePropMeta;
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
  tryFindClassMappingSchema() {
    const { resolvedSourceType, targetPropMeta } = this.propMapSchema;
    if (resolvedSourceType && targetPropMeta?.type) {
      return mapRegistry.get(resolvedSourceType, targetPropMeta?.type);
    }
  }

  schemaParam(key: keyof PropertyMappingSchema<S, T>, ...path: string[]): string;
  schemaParam(): string;
  schemaParam(...path: string[]): string {
    return path.length === 0
      ? this._schemaParam
      : `${this._schemaParam}.${path.join('.')}`
    ;
  }

  private createSubType(): CompilerPropertyContext<State, S, T> {
    return new CompilerPropertyContext(this.context, this.ref, this.propMapSchema.subType, `${this._schemaParam}.subType`);
  }
}
