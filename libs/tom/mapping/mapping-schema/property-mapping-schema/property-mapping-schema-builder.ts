import { Type } from '@pebula/decorate';
import { PropertyMappingContext } from '../../mapper/class-mapping-schema-context';
import { RawPropertyMappingSchema, PropertyMappingSchema } from './property-mapping-schema';

export type PropertyMapBuilderHandler<S, T, TKey extends keyof T> = (configuration: PropertyMapBuilder<S, T, TKey>) => void;

export class PropertyMapBuilder<S, T, TKey extends keyof T, SKey extends keyof S = keyof S> {

  private rawSchema: RawPropertyMappingSchema<S, T, TKey, SKey> = {}

  private constructor(public readonly targetProp: TKey) { }

  /**
   * Creates a builder, provide it to an handler that will use it to define the property map schema and return the property map schema.
   * @param sourceType
   * @param targetType
   * @param targetProp
   * @param handler
   */
  static resolve<S, T, TKey extends keyof T, SKey extends keyof S = keyof S>(sourceType: Type<S>,
                                                                             targetType: Type<T>,
                                                                             targetProp: TKey,
                                                                             handler: PropertyMapBuilderHandler<S, T, TKey>): PropertyMappingSchema<S, T, TKey, SKey> {
    const builder = new PropertyMapBuilder<S, T, TKey, SKey>(targetProp);
    handler(builder);
    return new PropertyMappingSchema(builder.rawSchema, targetProp, sourceType, targetType);
  }

  /**
   * Dynamically map a value to the target property
   *
   * The returned value type is different then the target value type so you also need to provide the return type so
   * the library can transform it internally.
   *
   * > Note that this is a dynamic transformation that requires runtime evaluation of the mapping function.
   * @param mapper The mapping function
   * @param returnType The type that the mapping function returns.
   */
  map<Q>(mapper: (context: PropertyMappingContext<S, T>) => Q, returnType: Type<Q>): this;
  /**
   * Dynamically map a value to the target property
   *
   * If the target property is decorated with `@Prop` you do not need to provide the `returnType`.
   * Otherwise, please provide it.
   *
   * If not provided, the library will use a runtime transformer for this property mapping.
   *
   * > Note that this is a dynamic transformation that requires runtime evaluation of the mapping function.
   * @param mapper The mapping function
   * @param returnType The type that the mapping function returns.
   */
  map(mapper: (context: PropertyMappingContext<S, T>) => T[TKey], returnType?: Type<T[TKey]>): this
  map(mapper: (context: PropertyMappingContext<S, T>) => any, returnType?: Type<any>): this {
    this.rawSchema.map = mapper;
    if (returnType) {
      this.rawSchema.sourceKeyType = returnType;
    }
    return this;
  }

  /**
   * Ignore assigning the value to the target property.
   * The target property is always ignored, this is static and does not require runtime evaluation.
   */
  ignore(): this;
  /**
   * Ignore assigning the value to the target property only when the provided predicate function returns false.
   * When the predicate returns true the target property is not ignored.
   *
   * You must specify an additional assignment method (map, mapToProperty, mapToValue) to use when the target property is not ignored.
   *
   * > Note that this is a dynamic transformation that requires runtime evaluation of the predicate.
   */
  ignore(predicate: (context: PropertyMappingContext<S, T>) => boolean): this;
  ignore(predicate?: (context: PropertyMappingContext<S, T>) => boolean): this {
    if (predicate) {
      this.rawSchema.condition = predicate;
    } else {
      this.rawSchema.ignore = true;
    }
    return this;
  }

  /** Assign by reference and will not transform the value */
  copyByRef(): this {
    this.rawSchema.copyByRef = true;
    return this;
  }

  /**
   * Map the target property to a constant value which is not of the same type
   * The value type and the type at the target MUST have an existing mapping contract.
   * If a valueType is not provided, the value's constructor is used instead.
   */
  mapToValue<Q>(value: Q, valueType: Type<Q>): this;
  /**
   * Map the target property to a constant value.
   */
  mapToValue(value: T[TKey], valueType?: Type<T[TKey]>): this;
  mapToValue(value: any, valueType?: Type<any>): this {
    this.rawSchema.value = value;
    if (valueType) {
      this.rawSchema.sourceKeyType = valueType;
    }
    return this;
  }

  /**
   * Map the target property to a specific value on the source, referenced by the provided property
   */
  mapToProperty(property: SKey, sourceType?: Type<S[SKey]>): this {
    this.rawSchema.sourcePath = [property];
    if (sourceType) {
      this.rawSchema.sourceKeyType = sourceType;
    }
    return this;
  }

  // tslint:disable: max-line-length
  mapToDeepProperty<TKey1 extends keyof S, TKey2 extends keyof S[TKey1]>(p1: TKey1, p2: TKey2, valueType?: Type<S[TKey1][TKey2]>): this;
  mapToDeepProperty<TKey1 extends keyof S, TKey2 extends keyof S[TKey1], TKey3 extends keyof S[TKey1][TKey2]>(p1: TKey1, p2: TKey2, p3: TKey3, valueType?: Type<any>): this;
  mapToDeepProperty<TKey1 extends keyof S, TKey2 extends keyof S[TKey1], TKey3 extends keyof S[TKey1][TKey2], TKey4 extends keyof S[TKey1][TKey2][TKey3]>(p1: TKey1, p2: TKey2, p3: TKey3, p4: TKey4, valueType?: Type<any>): this;
  mapToDeepProperty<TKey1 extends keyof S, TKey2 extends keyof S[TKey1], TKey3 extends keyof S[TKey1][TKey2], TKey4 extends keyof S[TKey1][TKey2][TKey3], TKey5 extends keyof S[TKey1][TKey2][TKey3][TKey4]>(p1: TKey1, p2: TKey2, p3: TKey3, p4: TKey4, p5: TKey5, valueType?: Type<any>): this;
  mapToDeepProperty(...props: any[]): this {
  // TODO: Change to -> mapToDeepProperty(...props: string[], valueType?: Type<any>)          https://github.com/microsoft/TypeScript/issues/1360
    if (typeof props[props.length - 1] === 'function') {
      this.rawSchema.sourceKeyType = props.pop();
    }
    this.rawSchema.sourcePath = props as [SKey, ...Array<string | number>];
    return this;
  }
}
