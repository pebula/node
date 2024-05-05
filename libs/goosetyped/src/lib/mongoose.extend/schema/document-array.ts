import { Schema } from 'mongoose';
import { SchemaTypePrivate } from '../schema-type';

/**
 * Represents an instance of a document array Schema for a property
 */
export interface DocumentArrayPath extends Schema.Types.DocumentArray, SchemaTypePrivate {
  schema: any;
  schemaOptions: any;
  get caster(): typeof Schema.Types.Subdocument;
  set caster(value: typeof Schema.Types.Subdocument);
}
