import { Type } from '@pebula/decorate';
import { ClassSerializerSchema } from '../serializer-schema';
import { SerializerOp } from '../types';
import { Serializer } from '../serializers';

export interface ClassSerializerOperations<S extends Serializer, T> {
  serialize?: ClassSerializerSchema<S, T, 'serialize'>;
  deserialize?: ClassSerializerSchema<S, T, 'deserialize'>;
}

class InternalSchemaRegistry<S extends Serializer> {

  private schemas = new Map<Type<any>, ClassSerializerOperations<any, any>>();

  register<T>(target: Type<T>, schema: ClassSerializerSchema<S, T>): void {
    const operations = this.schemas.get(target) || (this.schemas.set(target, {}).get(target));
    operations[schema.operation] = schema as any;
  }

  has(target: Type<any>): boolean {
    return this.schemas.has(target);
  }

  hasOperation(target: Type<any>, operation: SerializerOp): boolean {
    return !!this.schemas.get(target)?.[operation] ?? false;
  }

  get<T>(target: Type<T>): ClassSerializerOperations<S, T> | undefined {
    return this.schemas.get(target);
  }

  getOperation<T, TOp extends SerializerOp>(target: Type<T>, operation: TOp): ClassSerializerSchema<S, T, TOp> | undefined {
    return this.schemas.get(target)?.[operation] as any;
  }

  delete(target: Type<any>): boolean {
    return this.schemas.delete(target);
  }

  deleteOperation(target: Type<any>, operation: SerializerOp): boolean {
    const operations = this.schemas.get(target);
    if (operations?.[operation]) {
      operations[operation] = undefined;
      return true;
    }
    return false;
  }
}

export class SchemaRegistry {
  static get(): SchemaRegistry { return schemaRegistry || new SchemaRegistry(); }

  private schemas = new Map<Serializer, InternalSchemaRegistry<any>>();

  private constructor() { }

  register<S extends Serializer, T>(schema: ClassSerializerSchema<S, T>): void {
    (this.schemas.get(schema.serializer) || this.schemas.set(schema.serializer, new InternalSchemaRegistry<S>()).get(schema.serializer))
      .register(schema.target, schema);
  }

  has(serializer: Serializer, target?: Type<any>): boolean {
    const internal = this.schemas.get(serializer);
    return target
      ? internal?.has(target) ?? false
      : !!internal;
  }

  hasOperation(serializer: Serializer, target: Type<any>, operation: SerializerOp): boolean {
    return this.schemas.get(serializer)?.hasOperation(target, operation) ?? false;
  }

  get<S extends Serializer, T>(serializer: S, target: Type<T>): ClassSerializerOperations<S, T> | undefined {
    return this.schemas.get(serializer)?.get(target);
  }

  getOperation<S extends Serializer, T, TOp extends SerializerOp>(serializer: S, target: Type<T>, operation: TOp): ClassSerializerSchema<S, T, TOp> | undefined {
    return this.schemas.get(serializer)?.getOperation(target, operation);
  }

  delete(serializer: Serializer, target?: Type<any>): boolean {
    return target
      ? this.schemas.get(serializer)?.delete(target) ?? false
      : this.schemas.delete(serializer)
  }

  deleteOperation(serializer: Serializer, target: Type<any>, operation: SerializerOp): boolean {
    return this.schemas.get(serializer)?.deleteOperation(target, operation) ?? false
  }
}

export const schemaRegistry = SchemaRegistry.get();
