import { LazyInit, Type } from '@pebula/decorate';
import { Utils, Schema, TypeSystem } from '@pebula/tom';
import { PropertyMappingContext } from '../../mapper/class-mapping-schema-context';

export interface RawPropertyMappingSchema<S, T, TKey extends keyof T = keyof T, SKey extends keyof S = keyof S> {
  sourcePath?: [SKey, ...Array<string | number>];

  ignore?: boolean;
  condition?: (context: PropertyMappingContext<S, T>) => boolean;

  value?: T[TKey];
  map?: (context: PropertyMappingContext<S, T>) => T[TKey];

  sourceKeyType?: Type<S[SKey]>;

  /** When true, will assign by reference and will not transform the value */
  copyByRef?: boolean;
}

/**
 * The mapping schema between the property from type S and a property from type T.
 * @template S the type of the source
 * @template T the type of the target
 * @template TKey the literal type of the property at the target
 * @template SKey the literal type of the property at the source
 */
export class PropertyMappingSchema<S, T, TKey extends keyof T = keyof T, SKey extends keyof S = keyof S> implements RawPropertyMappingSchema<S, T, TKey, SKey> {
  get hasSourcePath(): boolean {
    return this.sourcePath?.length > 0 ?? false;
  }

  get resolveSourcePath(): string {
    return this.sourcePath?.join('.') || '';
  }

  sourcePath: [SKey, ...Array<string | number>];

  ignore?: boolean;
  condition?: (context: PropertyMappingContext<S, T>) => boolean;

  value?: T[TKey];
  map?: (context: PropertyMappingContext<S, T>) => T[TKey];

  sourceKeyType?: Type<S[SKey]>;

  /** When true, will assign by reference and will not transform the value */
  copyByRef?: boolean;

  @LazyInit(function(this: PropertyMappingSchema<any, any>) {
    if (this.sourceType && this.hasSourcePath && this.sourcePath.length === 1) {
      const propSchema = Schema.getSchema(this.sourceType)?.getProperty(this.sourcePath[0]);
      if (propSchema) {
        return propSchema;
      }
    }

    if (this.sourceKeyType) {
      const type = TypeSystem.resolveType(this.sourceKeyType);
      if (type) {
        const schemaConfig = new Schema.TomPropertySchemaConfig(this.targetKey as string);

        if (this.targetPropMeta?.isContainer && !TypeSystem.isTomTypeContainer(type)) {
          schemaConfig.type = TypeSystem.createTomTypeInstance(this.targetPropMeta.typeDef.type as TypeSystem.ContainerTypes, [type]);
        } else {
          schemaConfig.type = type;
        }

        return new Schema.TomPropertySchema(schemaConfig);
      }
    }
  })
  sourcePropMeta: Schema.TomPropertySchema<S, SKey>;

  @LazyInit(function(this: PropertyMappingSchema<any, any>) {
    return Schema.getSchema(this.target).getProperty(this.targetKey);
  })
  targetPropMeta: Schema.TomPropertySchema<T, TKey>;

  @LazyInit(function(this: PropertyMappingSchema<any, any>) {
    return this._resolveSourceTyped();
  })
  resolvedSourceType: Type<any>;

  @LazyInit(function(this: PropertyMappingSchema<any, any>): PropertyMappingSchema<any, any>['valueAccessorType'] {
    if (this.hasSourcePath) {
      return 'path';
    } else if ('value' in this) {
      return 'fixedValue';
    } else if (this.map) {
      return 'map';
    }
  })
  valueAccessorType: 'path' | 'fixedValue' | 'map' | undefined;

  @LazyInit(function(this: PropertyMappingSchema<any, any>): PropertyMappingSchema<any, any> {
    if (!this.targetPropMeta.subType) {
      throw new Error('SubType is valid only for containers');
    }
    return this.createSubType(this.targetPropMeta.subType);
  })
  subType?: PropertyMappingSchema<S, T, TKey, SKey>;

  constructor(raw: RawPropertyMappingSchema<S, T, TKey, SKey>,
              public readonly targetKey: TKey,
              private readonly sourceType: Type<S>,
              private target: Type<T>) {
    Object.assign(this, raw);
  }

  createChild(targetPropMeta: Schema.TomPropertySchema, sourcePropMeta?: Schema.TomPropertySchema) {
    const subType = new PropertyMappingSchema({}, this.targetKey, this.sourceType, this.target);
    subType.copyByRef = this.copyByRef;
    Object.defineProperty(subType, 'targetPropMeta', { value: targetPropMeta });
    if (sourcePropMeta) {
      Object.defineProperty(subType, 'sourcePropMeta', { value: sourcePropMeta });
      subType.sourceKeyType = sourcePropMeta.type;
    }
    return subType;
  }

  private _resolveSourceTyped() {
    if (this.sourceKeyType) {
      return this.sourceKeyType;
    } else if (this.targetPropMeta?.isContainer) {
      return this.targetPropMeta.reflectedType;
    }
    switch (this.valueAccessorType) {
      case 'path':
        if (this.sourcePath.length === 1 && this.sourcePath[0] === this.targetKey as string) {
          return this.targetPropMeta?.type;
        }
      case 'fixedValue':
        if (Utils.isPrimitive(this.value) && this.value?.constructor) {
          return this.value.constructor as any;
        } else {
          return this.targetPropMeta?.type;
        }
      case 'map':
        return this.targetPropMeta?.type;
    }
  }

  private createSubType(subTypeProp: Schema.TomPropertySchema<T, TKey>) {
    const subType = new PropertyMappingSchema({}, this.targetKey, this.sourceType, this.target);
    subType.copyByRef = this.copyByRef;
    Object.defineProperty(subType, 'targetPropMeta', { value: subTypeProp });
    if (this.sourcePropMeta) {
      Object.defineProperty(subType, 'sourcePropMeta', { value: this.sourcePropMeta.subType });
      subType.sourceKeyType = this.sourcePropMeta.subType.type;
    }
    return subType;
  }
}
