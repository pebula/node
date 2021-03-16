import { Type } from '@pebula/decorate';
import { TomClassSchemaConfig } from '../decorator-api';
import { TomPropertySchema } from './property-schema';
import { getSchema } from './store';

export const SCHEMA_SYMBOL = Symbol('SCHEMA_SYMBOL');

export class TomClassSchema<T = any> {

  readonly type: Type<T>;

  discriminator?: TomPropertySchema;

  private properties: Record<keyof T, TomPropertySchema<T, keyof T>> = {} as any;
  private customClassProps: TomClassSchema[] = [];

  constructor(private readonly config: TomClassSchemaConfig<T>) {
    this.type = config.clsType;

    Object.defineProperty(this.type, SCHEMA_SYMBOL, {
      value: this,
      writable: false,
      configurable: false,
      enumerable: false,
    });

    const proto = config.clsType.prototype;
    for (const p of config.getProperties()) {
      this.addPropertySchema(new TomPropertySchema(proto, p));
    }
  }

  extend<Z>(schema: TomClassSchema<Z>): TomClassSchema<Z & T> {
    for (const p of schema.getProperties()) {
      if (!this.hasProperty(p.name as any)) {
        this.addPropertySchema(p as any);
      }
    }
    return this as any;
  }

  addPropertySchema(propSchema: TomPropertySchema<T>): this {
    this.properties[propSchema.name] = propSchema;
    for (const t of propSchema.possibleCustomTypes()) {
      const classSchema = getSchema(t);
      if (classSchema) {
        this.customClassProps.push(classSchema);
      }
    }
    if (propSchema.isDiscriminator) {
      this.discriminator = propSchema;
    }
    return this;
  }

  hasProperty(key: string): boolean {
    return key in this.properties;
  }

  getProperty<K extends keyof T>(key: K): TomPropertySchema<T, K> | undefined {
    return this.properties[key] as TomPropertySchema<T, K>;
  }

  getProperties(): TomPropertySchema<T>[] {
    return Object.values(this.properties);
  }

  getPropertiesAsT(): Record<keyof T, TomPropertySchema> {
    return this.properties;
  }

  public hasCircularReference(stack: TomClassSchema[] = []): boolean {
    if (stack.includes(this)) return true;
    stack.push(this);

    for (const classSchema of this.customClassProps) {
      if (classSchema.hasCircularReference(stack)) {
        return true;
      }
    }

    stack.pop();
    return false;
  }
}

