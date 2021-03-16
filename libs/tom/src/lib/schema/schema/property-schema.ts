import { LazyInit, Proto, Type } from '@pebula/decorate';
import { TomPropertySchemaConfig } from '../decorator-api';
import * as T from '../type-system';

export class TomPropertySchema<T = any, TKey extends keyof T = keyof T> {
  name: TKey;
  type: Type<any>;
  enum?: T.Enum;
  reflectedType: Type<any>;

  typeDef: T.TomTypeInstance;

  readonly isPrimitive: boolean;
  /** When true, this type is Array/Set/Map/ObjectMap of T */
  readonly isContainer: boolean;
  readonly isUnion: boolean;

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
  @LazyInit(function(this: TomPropertySchema<any>): TomPropertySchema<any> {
    // TODO: We can't be strict here because `transform` is not strict aware, once refactored we can add it
    // For now, this check is done in the property-serializer-schema which is strict aware, and only for serialization not for mapping.
    if (!this.isContainer) {
      // throw new Error('subType is valid only for containers');
      return undefined;
    }
    return this.createSubType(0);
  })
  subType?: TomPropertySchema<T, TKey>;

  /**
   * The sub-types of a union type
   * Applicable only on union type.
   */
  @LazyInit(function(this: TomPropertySchema<any>): TomPropertySchema<any>[] {
    if (!this.isUnion) {
      // TODO: We can't be strict here because `transform` is not strict aware, once refactored we can add it
      // For now, this check is done in the property-serializer-schema which is strict aware, and only for serialization not for mapping.
      //   throw new Error('unionSubTypes is valid only for a union type.');
      return undefined;
    }
    const unionSubTypes: TomPropertySchema<any>[] = [];
    for (let i = 0, len = this.config.subSchemas.length; i < len; i++) {
      unionSubTypes.push(this.createSubType(i));
    }
    return unionSubTypes;
  })
  unionSubTypes?: TomPropertySchema<T, TKey>[];

  isDiscriminator?: boolean;

  /** True if property was decorated, i.e. reflected type came from reflect-metadata */
  readonly decorated: boolean;

  private _possibleCustomTypes: Type<any>[];

  constructor(private prototype: Proto<T>, private readonly config: TomPropertySchemaConfig) {
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

    if (!T.containerTypeDefMap.has(config.type?.type as any) && T.isAllowedContainer(config.reflectedType)) {
      const valueType = config.type
        ? T.createTomTypeInstance(config.type.type, config.type.typeParams)
        : T.createTomTypeInstance('any')
      ;
      this.typeDef = T.createTomTypeInstance(T.containerRuntimeTypeDefMap.get(config.reflectedType), [valueType]);
    } else {
      this.typeDef = config.type || T.resolveType(config.reflectedType) || T.createTomTypeInstance('any');
    }

    const isUnknown = T.containerTypeDefMap.has(this.typeDef.type as any)
      ? this.typeDef.typeParams[0].type === 'any'
      : this.typeDef.type === 'any'
    ;

    if (isUnknown) {
      // TODO: allow strict and throw!
      // throw new Error(`Unable to detect type for ${stringify(this.prototype.constructor)}.${this.name}, please consider providing the type.`);
    }

    this.groups = config.groups;

    this.isPrimitive = T.nativeTypeMap.has(this.typeDef.type as any);
    this.isContainer = !this.isPrimitive && T.containerTypeDefMap.has(this.typeDef.type as any);
    this.isUnion = this.typeDef.type === 'union';

    this.type = this.resolveType(this.typeDef);
    if (T.EnumClass.isEnum(this.type)) {
      this.enum = this.type.type;
    }
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
    } else if (this.isContainer) {
      result.push(...this.subType.possibleCustomTypes());
    } else if (this.isUnion) {
      for (const s of this.unionSubTypes) {
        result.push(...s.possibleCustomTypes());
      }
    }
    return this._possibleCustomTypes = result;
  }

  private resolveType(typeDef: T.TomTypeInstance) {
    if (T.nativeTypeMap.has(typeDef.type as any)) {
      return T.nativeTypeMap.get(typeDef.type as any);
    } else if (typeDef.type === 'any') {
      return Object;
    } else if (T.containerTypeDefMap.has(typeDef.type as any)) {
      return this.resolveType(typeDef.typeParams[0]);
    } else if (T.bufferTypeDefMap.has(typeDef.type as any)) {
      return T.bufferTypeDefMap.get(typeDef.type as any);
    } else if (typeDef.type === 'class') {
      return T.isForwardRef(typeDef.typeParams) ? T.resolveForwardRef(typeDef.typeParams) : typeDef.typeParams;
    } else if (typeDef.type === 'enum') {
      const enumType = typeDef.typeParams as T.EnumType;
      return T.EnumClass(typeof enumType === 'function' ? enumType() : enumType);
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
    const subType = new TomPropertySchema<T, TKey>(this.prototype, subSchema);
    if (subType.isContainer) {
      subType.reflectedType = T.containerTypeDefMap.get(subType.typeDef.type as any);
    } else {
      subType.reflectedType = subType.type;
    }

    return subType;
  }
}
