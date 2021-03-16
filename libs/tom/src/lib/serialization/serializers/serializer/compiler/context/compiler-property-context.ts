import { Type } from '@pebula/decorate';
import { ClassSerializerSchema, PropertySerializerSchema } from '../../../../serializer-schema';
import { schemaRegistry } from '../../../../registry';
import { Serializer } from '../../serializer';
import { ROOT } from '../param-names';
import { CompilerContext } from './compiler-context';

export function isListContainer(type: Type<any>): boolean {
  // TODO: Support inheriting Map
  return type === Array || type === Set;
}

export function isKeyValueContainer(type: Type<any>) {
  return type && !isListContainer(type);
}

export class CompilerPropertyContext<State = any, S extends Serializer = Serializer, T = any> {

  private readonly _schemaParam: string;

  constructor(public readonly context: CompilerContext<State, S, T>,
              public readonly ref: number,
              public readonly propMapSchema: PropertySerializerSchema<T, keyof T>) {
    this._schemaParam = `${ROOT.PROP_SERIALIZER_SCHEMAS_PARAM}[${ref}]`;
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
  tryFindClassMappingSchema(): ClassSerializerSchema<S, T> | undefined {
    return schemaRegistry.getOperation(this.context.serializer,
                                       this.propMapSchema.targetPropMeta.type,
                                       this.context.classSerializerSchema.operation);
  }

  schemaParam(key: keyof PropertySerializerSchema<T>, ...path: string[]): string;
  schemaParam(): string;
  schemaParam(...path: string[]): string {
    return path.length === 0
      ? this._schemaParam
      : `${this._schemaParam}.${path.join('.')}`
    ;
  }
}
