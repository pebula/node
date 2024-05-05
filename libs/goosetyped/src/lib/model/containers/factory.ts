import { Schema, SchemaType } from 'mongoose';
import { GtSchemaContainer } from '../../store';
import { GtColumnMetadata } from '../../metadata';
import { GtDocumentArrayPath } from './document-array-path';
import { GtMapPath } from './map';
import { GtSubdocumentPath } from './subdocument-path';

export function createEmbeddedContainerForType(knownContainer: GtSchemaContainer, column: GtColumnMetadata, parent: Schema): SchemaType {
  if (column.isContainer)
    return column.resolvedColumnType.reflectedType.tsType === Map
      ? new GtMapPath(knownContainer, column.key, column.schema.of as any, parent)
      : new GtDocumentArrayPath(knownContainer, column.key, column.schema.type[0], column.schema)
    ;

    // return column.schema as unknown as SchemaType;
  return new GtSubdocumentPath(knownContainer, column, parent);
}
