// tslint:disable: ban-types
import { Document, Model } from 'mongoose';
import { ModelExtensions, Resource } from '../model/model';
import { GtSubDocumentMetadataArgs, GtDocumentMetadataArgs } from '../interfaces';
import { GtSubDocumentMetadata, GtDocumentMetadata } from '../metadata';
import { gtSchemaStore } from '../store';
import { ClassDecoratorOf } from '../utils';
import { ExtModel } from '../model';

export function GtDocument(metadata?: GtDocumentMetadataArgs): ClassDecoratorOf<ExtModel<any, any>> {
  return (target: Function) => {
    gtSchemaStore.getCreate(target).setMetadata(GtDocumentMetadata, metadata || {}, { target });
  };
}

export function GtSubDocument(metadata?: GtSubDocumentMetadataArgs): ClassDecoratorOf<any, Resource> {
  return (target: Function) => {
    gtSchemaStore.getCreate(target).setMetadata(GtSubDocumentMetadata, metadata || {}, { target });
  };
}
