import { Type } from '../../../src';
import { PropertySchema } from './property-schema';
import { MethodSchema } from './method-schema';
import { ParameterSchema } from './parameters-schema';
import { DecorSchema } from './base-schemas';

export const CLASS_SCHEMA = Symbol.for('ClassSchema<T>');

export class ClassSchema<T = any,
                         TProperty extends PropertySchema = PropertySchema,
                         TMethod extends MethodSchema = MethodSchema,
                         TParameter extends ParameterSchema = ParameterSchema> extends DecorSchema {

  name: string;

  private properties = new Map<string, TProperty>();
  private methods = new Map<string, TMethod>();
  private constructorParams: TParameter[] = [];

  constructor(type: Type<T>);
  constructor(type: Type<T>, isAnonymous: boolean);
  constructor(public readonly clsType: Type<T>, public readonly isAnonymous = false) {
    super();
  }

  addPropertySchema(propSchema: TProperty): this {
    this.properties.set(propSchema.key, propSchema);
    return this;
  }

  removePropertySchema(key: string): this {
    this.properties.delete(key);
    return this
  }

  addMethodSchema(methodSchema: TMethod): this {
    this.methods.set(methodSchema.key, methodSchema);
    return this
  }

  removeMethodSchema(key: string): this {
    this.methods.delete(key);
    return this
  }

  addConstructorParam(...paramSchema: TParameter[]): this {
    this.constructorParams.push(...paramSchema);
    return this
  }

  getProperty(key: string): TProperty | undefined {
    return this.properties.get(key);
  }

  getProperties(): IterableIterator<TProperty> {
    return this.properties.values();
  }

  getMethod(key: string): TMethod | undefined {
    return this.methods.get(key);
  }

  getMethods(): IterableIterator<TMethod> {
    return this.methods.values();
  }

  getConstructorParams(): TParameter[] {
    return this.constructorParams;
  }
}
