import { Type } from '@pebula/decorate';
import { iterateClassHierarchy } from '../../../src/lib/utils';
import { ClassSchema } from './class-schema';

export const CLASS_SCHEMA = Symbol.for('ClassSchema<T>');

export type ClassSchemaFactory<C extends ClassSchema> = (type: Type<any>, isAnonymous: boolean) => C;

/**
 * Base class for storing ClassSchema like records.
 */
export class DecorClassSchemaStore<C extends ClassSchema> {

  constructor(private readonly factory: ClassSchemaFactory<C>) { }

  get(type: Type<any>, create: true): C;
  get(type: Type<any>): C | undefined;
  get(type: Type<any>, create?: boolean): C {
    return this._get(type) || (create && this.create(type));
  }

  create(name: string): C;
  create(type?: Type<any> | Function, name?: string): C;
  create(typeOrName?: Type<any> | Function | string, name?: string): C {
    let type: Type<any>;
    if (typeof type === 'string') {
      name = type;
      type = undefined;
    } else {
      type = typeOrName as any;
    }

    const isAnonymous = !type;

    if (!isAnonymous) {
      const schema = this._get(type);
      if (schema) {
        return schema;
      }
    } else {
      type = class {} as any;
    }

    const schema = this._set(type, isAnonymous);
    if (name) {
      schema.name = name;
    }
    return schema;
  }

  protected _has(type: Type<any>): boolean {
    return !!this._get(type);
  }

  protected _get(type: Type<any>): C | undefined {
    return DecorClassSchemaStore.getSchema(type);
  }

  protected _set(type: Type<any>, isAnonymous: boolean): C {
    const classSchema: C = this.factory(type, isAnonymous);
    DecorClassSchemaStore.extendSchema(classSchema);
    DecorClassSchemaStore.setSchema(classSchema);
    return classSchema;
  }

  static getSchema<C extends ClassSchema>(type: Type<any>): C | undefined {
    return Object.getOwnPropertyDescriptor(type, CLASS_SCHEMA)?.value;
  }

  static setSchema<C extends ClassSchema>(schema: C): void {
    Object.defineProperty(schema.clsType, CLASS_SCHEMA, {
      value: schema,
      writable: false,
      configurable: false,
      enumerable: false,
    });
  }

  static extendSchema(schema: ClassSchema): void {
    // This will catch extending classes with schema and extend their schema
    // TODO: Add support for methods and params

    for (const subClass of iterateClassHierarchy(schema.clsType, { emitSelf: false })) {
      const subSchema = DecorClassSchemaStore.getSchema(subClass as Type<any>);
      if (subSchema) {
        for (const p of subSchema.getProperties()) {
          if (!schema.getProperty(p.key)) {
            schema.addPropertySchema(p);
          }
        }
      }
    }
  }

}
