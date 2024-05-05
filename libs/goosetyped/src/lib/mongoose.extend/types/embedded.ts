import { Document, Schema } from 'mongoose';
import { Ctor } from '../../utils';

/**
 * The runtime type of nested document in an array.
 */
export interface EmbeddedDocument extends Document {

}

export interface EmbeddedDocumentStatic<T> extends Ctor<EmbeddedDocument> {
  readonly schema: Schema;
  discriminators: { [key: string]: any };
}
