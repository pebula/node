import { Type, LazyInit } from '@pebula/decorate';
import { Schema, Utils } from '@pebula/tom';
import { PropertySerializerContext } from '../../serializers';

export interface RawPropertySerializerSchema<T, TKey extends keyof T = keyof T> {
  sourcePath?: Array<string | number>;

  ignore?: boolean;
  condition?: (context: PropertySerializerContext<T>) => boolean;

  sourceType?: Type<any>;

  value?: T[TKey];
  map?: (context: PropertySerializerContext<T>) => T[TKey];

  /** When true, will assign by reference and will not transform the value */
  copyByRef?: boolean;
}

/**
 * The mapping schema between the property from type S and a property from type T.
 * @template T the type of the target
 * @template TKey the literal type of the property at the target
 */
export class PropertySerializerSchema<T, TKey extends keyof T = keyof T> implements RawPropertySerializerSchema<T, TKey> {

  get hasSourcePath(): boolean {
    return this.sourcePath?.length > 0 ?? false;
  }

  get resolveSourcePath(): string {
    return this.sourcePath?.join('.') || '';
  }

  sourcePath: string[];

  sourceType?: Type<any>;

  ignore?: boolean;
  condition?: (context: PropertySerializerContext<T>) => boolean;

  value?: T[TKey];
  map?: (context: PropertySerializerContext<T>) => T[TKey];

  /** When true, will assign by reference and will not transform the value */
  copyByRef?: boolean;

  @LazyInit(function(this: PropertySerializerSchema<any>) {
    return Schema.getSchema(this.target).getProperty(this.prop);
  })
  targetPropMeta: Schema.TomPropertySchema<T, TKey>;

  @LazyInit(function(this: PropertySerializerSchema<any>) {
    return this.sourceType
      ? Schema.getSchema(this.sourceType)
      : this.targetPropMeta
    ;
  })
  sourcePropMeta: Schema.TomPropertySchema;

  @LazyInit(function(this: PropertySerializerSchema<any>) {
    const type = this.sourceType || this.targetPropMeta.type;
    if (!type && Utils.isPrimitive(this.value)) {
      return this.value.constructor;
    }
    return type;
  })
  resolvedSourceType: Type<any>;

  @LazyInit(function(this: PropertySerializerSchema<any>): PropertySerializerSchema<any>['valueAccessorType'] {
    if (this.hasSourcePath) {
      return 'path';
    } else if ('value' in this) {
      return 'fixedValue';
    } else if (this.map) {
      return 'map';
    }
  })
  valueAccessorType: 'path' | 'fixedValue' | 'map' | undefined;

  @LazyInit(function(this: PropertySerializerSchema<any>): PropertySerializerSchema<any> {
    if (!this.targetPropMeta.subType) {
      throw new Error('SubType is valid only for containers');
    }
    return this.createSubType(this.targetPropMeta.subType);
  })
  subType?: PropertySerializerSchema<T, TKey>;

  constructor(raw: RawPropertySerializerSchema<T, TKey>, public readonly prop: TKey, public readonly target: Type<T>) {
    Object.assign(this, raw);
  }

  private createSubType(subTypeProp: Schema.TomPropertySchema<T, TKey>) {
    const subType = new PropertySerializerSchema({}, this.prop, this.target);
    subType.copyByRef = this.copyByRef;
    Object.defineProperty(subType, 'targetPropMeta', { value: subTypeProp });
    return subType;
  }
}
