import { Schema } from 'mongoose';
import { SchemaTypePrivate } from '../schema-type';

export interface MapPath extends SchemaTypePrivate, Schema.Types.Map {
}
