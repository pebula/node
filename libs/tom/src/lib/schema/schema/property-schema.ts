import { LazyInit, Type } from '@pebula/decorate';
import { TomPropertySchemaConfig } from '../decorator-api';
import * as TS from '../type-system';

const ON_NEW_TOM_PROPERTY_SCHEMA_HANDLER: Array<(tomPropertySchema: TomPropertySchema, ...args: ConstructorParameters<typeof TomPropertySchema>) => void> = [];

export class TomPropertySchema<T = any, TKey extends keyof T = keyof T> {
  name: TKey;
  type: Type<any>;
  enum?: TS.Enum;
  reflectedType: Type<any>;

  typeDef: TS.TomTypeInstance;

  readonly isPrimitive: boolean;
  /** When true, this type is Array/Set/Map/ObjectMap of T */
  readonly isContainer: boolean;
  readonly isUnion: boolean;
  readonly isTuple: boolean;

  get hasDefaultValue() { return 'defaultValue' in this; }
  defaultValue?: () => any;

  optional?: boolean
  nullable?: boolean;
  exclude: boolean;

  /**
   * A list of groups this property is allowed in.
   */
  readonly groups: string[];

  /**
   * The sub-type of a container.
   * Applicable only on container types, array, set, map and objectMap
   */
  @LazyInit(function(this: TomPropertySchema<any>): TomPropertySchema<any> { return this.typeDef.typeParams && this.createSubType(0) /* this.subTypes[0] */ })
  subType?: TomPropertySchema<T, TKey>;

  /**
   * The sub-types of a union or tuple type
   * Applicable only on union and tuple type.
   */
  @LazyInit(function(this: TomPropertySchema<any>): TomPropertySchema<any>[] {
    if (this.isContainer || this.isUnion || this.isTuple) {
      const subTypes: TomPropertySchema<any>[] = [];
      for (let i = 0, len = (this.config.type as TS.TomTypeInstance<'tuple'>).typeParams.length; i < len; i++) {
        subTypes.push(this.createSubType(i));
      }
      return subTypes;
    } else {
      // TODO: We can't be strict here because `transform` is not strict aware, once refactored we can add it
      // For now, this check is done in the property-serializer-schema which is strict aware, and only for serialization not for mapping.
      //   throw new Error('subTypes is valid only for a union type.');
      return undefined;
    }
  })
  subTypes?: TomPropertySchema<T, TKey>[];

  isDiscriminator?: boolean;

  private _data: any;

  /** True if property was decorated, i.e. reflected type came from reflect-metadata */
  readonly decorated: boolean;

  private _possibleCustomTypes: Type<any>[];

  constructor(private readonly config: TomPropertySchemaConfig) {
    this.name = config.key as TKey;

    this.isDiscriminator = !!config.isDiscriminator

    if ('defaultValue' in config) {
      this.defaultValue = () => this.config.defaultValue;
    }
    this.optional = !!config.optional;
    this.nullable = !!config.nullable;
    this.exclude = !!config.exclude;

    this.reflectedType = config.reflectedType;
    this.decorated = !!('reflectedType' in config);

    if (!TS.containerTypeDefMap.has(config.type?.type as any) && TS.isAllowedContainer(config.reflectedType)) {
      const valueType = config.type
        ? TS.createTomTypeInstance(config.type.type, config.type.typeParams)
        : TS.createTomTypeInstance('any')
      ;
      this.typeDef = TS.createTomTypeInstance(TS.containerRuntimeTypeDefMap.get(config.reflectedType), [valueType]);
    } else {
      this.typeDef = config.type || TS.resolveType(config.reflectedType) || TS.createTomTypeInstance('any');
    }

    const isUnknown = TS.containerTypeDefMap.has(this.typeDef.type as any)
      ? this.typeDef.typeParams[0].type === 'any'
      : this.typeDef.type === 'any'
    ;

    if (isUnknown) {
      // TODO: allow strict and throw!
      // throw new Error(`Unable to detect type for ${stringify(this.prototype.constructor)}.${this.name}, please consider providing the type.`);
    }

    this.groups = config.groups;

    this.isPrimitive = TS.nativeTypeMap.has(this.typeDef.type as any);
    this.isContainer = !this.isPrimitive && TS.containerTypeDefMap.has(this.typeDef.type as any);
    this.isUnion = this.typeDef.type === 'union';
    this.isTuple = this.typeDef.type === 'tuple';

    this.type = this.resolveType(this.typeDef);
    if (TS.EnumClass.isEnum(this.type)) {
      this.enum = this.type.type;
    }

    for (const fn of ON_NEW_TOM_PROPERTY_SCHEMA_HANDLER) {
      fn(this, config);
    }
  }

  /**
   * A Hook for plugin extensions to use when a new instance of `TomPropertySchema` is created.
   * @param fn
   */
  static onNew(fn: (tomPropertySchema: TomPropertySchema, ...args: ConstructorParameters<typeof TomPropertySchema>) => void): void {
    if (ON_NEW_TOM_PROPERTY_SCHEMA_HANDLER.indexOf(fn) === -1) {
      ON_NEW_TOM_PROPERTY_SCHEMA_HANDLER.push(fn);
    }
  }

  /** Get a data item previously set using `setData` */
  getData<T = any>(key: symbol): T | undefined {
    return this._data?.[key];
  }

  /** Set a data item */
  setData(key: symbol, value: any): void {
    if (!this._data) {
      this._data = {};
    }
    this._data[key] = value;
  }

  /**
   * Returns an array of all custom class types which are valid types for this property.
   * This can come from a direct class type, a container with a class type of a union with one or more class types.
   */
   possibleCustomTypes() {
    if (this._possibleCustomTypes) {
      return this._possibleCustomTypes;
    }
    const result: Array<Type<any>> = [];
    if (this.typeDef.type === 'class') {
      result.push(this.type);
    } else if (this.isUnion || this.isTuple) {
      for (const s of this.subTypes) {
        result.push(...s.possibleCustomTypes());
      }
    } else if (this.isContainer) {
      result.push(...this.subType.possibleCustomTypes());
    }

    return this._possibleCustomTypes = result;
  }

  /** Returns a string representation of the type */
  printType(): string {
    const type = this.typeDef;
    switch (type.type) {
      case 'union':
        return `union<${this.subTypes.map( st => st.printType() ).join(' | ')}>`;
      case 'array':
      case 'set':
        return `${type.type}<${this.subType.printType()}>`;
      case 'tuple':
        return `[${this.subTypes.map( st => st.printType() + (st.optional ? '?' : '') ).join(', ')}]`;
      case 'map':
      case 'objectMap':
        return `${type.type}<${this.subTypes.map( st => st.printType() ).reverse().join(', ')}>`;
      case 'class':
        return this.type.name;
      default:
        return TS.tomTypeInstanceToString(type);
    }
  }

  private resolveType(typeDef: TS.TomTypeInstance) {
    if (TS.nativeTypeMap.has(typeDef.type as any)) {
      return TS.nativeTypeMap.get(typeDef.type as any);
    } else if (typeDef.type === 'any') {
      return Object;
    } else if (TS.containerTypeDefMap.has(typeDef.type as any)) {
      return this.resolveType(typeDef.typeParams[0]);
    } else if (TS.bufferTypeDefMap.has(typeDef.type as any)) {
      return TS.bufferTypeDefMap.get(typeDef.type as any);
    } else if (typeDef.type === 'class') {
      return TS.isForwardRef(typeDef.typeParams) ? TS.resolveForwardRef(typeDef.typeParams) : typeDef.typeParams;
    } else if (typeDef.type === 'enum') {
      const enumType = typeDef.typeParams as TS.EnumType;
      return TS.EnumClass(typeof enumType === 'function' ? enumType() : enumType);
    }
  }

  /**
   * Creates a sub type at given index.
   * The index refers to a subSchema in `TomPropertySchemaConfig.subSchema` (config property).
   * If a sub schema does not exist (might be primitive) it will create a new one, with the index referencing `typeDef.typeParams` (which must exist!)
   */
  private createSubType(index: number): TomPropertySchema<T, TKey> {
    let subSchema = this.config.subSchemas?.[index];
    if (!subSchema) {
      subSchema = new TomPropertySchemaConfig(this.config.key as string);
      subSchema.type = this.typeDef.typeParams[index];
    }
    const subType = new TomPropertySchema<T, TKey>(subSchema);
    if (subType.isContainer) {
      subType.reflectedType = TS.containerTypeDefMap.get(subType.typeDef.type as any);
    } else {
      subType.reflectedType = subType.type;
    }

    return subType;
  }
}

const TUPLE_MIN_ITEMS = Symbol('TUPLE_MIN_ITEMS');
/**
 * Returns the minimum items required in a tuple. (i.e. all sub types that are not optional until the first optional sub type)
 * The value is cached for each instance of TomPropertySchema
 */
export function getTupleMinItems(tupleProp: TomPropertySchema) {
  let minLen = tupleProp.getData<number>(TUPLE_MIN_ITEMS);
  if (minLen === undefined) {
    const { subTypes } = tupleProp;
    minLen = subTypes.length;
    while (true) {
      if (subTypes[minLen - 1]?.optional === true) {
        minLen -= 1;
      } else {
        break;
      }
    }
    tupleProp.setData(TUPLE_MIN_ITEMS, minLen);
  }
  return minLen
}
