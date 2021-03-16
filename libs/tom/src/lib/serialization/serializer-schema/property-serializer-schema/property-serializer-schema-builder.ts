import { Type } from '@pebula/decorate';
import { PropertySerializerContext } from '../../serializers';
import { RawPropertySerializerSchema, PropertySerializerSchema } from './property-serializer-schema';

export type PropertySerializerBuilderHandler<T, TKey extends keyof T> = (configuration: PropertySerializerBuilder<T, TKey>) => void;

export class PropertySerializerBuilder<T, TKey extends keyof T> {

  private rawSchema: RawPropertySerializerSchema<T, TKey> = {}

  private constructor(public readonly targetProp: TKey) { }

  /**
   * Creates a builder, provide it to an handler that will use it to define the property map schema and return the property map schema.
   * @param target
   * @param prop
   * @param handler
   */
  static resolve<S, T, TKey extends keyof T>(target: Type<T>,
                                             prop: TKey,
                                             handler: PropertySerializerBuilderHandler<T, TKey>): PropertySerializerSchema<T, TKey> {
    const builder = new PropertySerializerBuilder<T, TKey>(prop);
    handler(builder);
    return new PropertySerializerSchema(builder.rawSchema, prop, target);
  }

  /**
   * Set the type of the source when mapping the source to the target.
   * If a type is not set, the target type is used.
   */
  type(type: Type<any>) {
    this.rawSchema.sourceType = type;
    return this;
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
  map<Q>(mapper: (context: PropertySerializerContext<T>) => Q, returnType: Type<Q>): this;
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
  map(mapper: (context: PropertySerializerContext<T>) => T[TKey], returnType?: Type<T[TKey]>): this
  map(mapper: (context: PropertySerializerContext<T>) => any, returnType?: Type<any>): this {
    this.rawSchema.map = mapper;
    if (returnType) {
      this.rawSchema.sourceType = returnType;
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
  ignore(predicate: (context: PropertySerializerContext<T>) => boolean): this;
  ignore(predicate?: (context: PropertySerializerContext<T>) => boolean): this {
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
   * Map the target property to a constant value.
   */
  mapToValue(value: T[TKey], valueType?: Type<any>): this {
    this.rawSchema.value = value;
    if (valueType) {
      this.rawSchema.sourceType = valueType;
    }
    return this;
  }

  /**
   * Map the target property to a specific value on the source, referenced by the provided property
   */
  mapToProperty(property: string, valueType?: Type<any>): this {
    this.rawSchema.sourcePath = [property];
    if (valueType) {
      this.rawSchema.sourceType = valueType;
    }
    return this;
  }

  mapToDeepProperty(valueType: Type<any>, ...props: [...Array<string | number>]): this;
  mapToDeepProperty(...props: Array<string | number>): this;
  mapToDeepProperty(...props: any[]): this {
    if (typeof props[0] === 'function') {
      this.rawSchema.sourceType = props.shift();
    }
    this.rawSchema.sourcePath = props;

    return this;
  }
}
