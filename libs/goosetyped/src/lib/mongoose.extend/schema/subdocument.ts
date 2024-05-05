import { Schema } from 'mongoose';
import { SchemaTypePrivate } from '../schema-type';

/**
 * Represents an instance of a document array Schema for a property
 */
export interface SubdocumentPath extends Schema.Types.Subdocument, SchemaTypePrivate {

}
