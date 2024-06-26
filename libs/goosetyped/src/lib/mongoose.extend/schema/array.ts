import { Schema } from 'mongoose';
import { SchemaTypePrivate } from '../schema-type';

/**
 * Represents an instance of a document array Schema for a property
 */
export interface ArrayPath extends SchemaTypePrivate, Schema.Types.Array {
  schemaOptions: any;
}
