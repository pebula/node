import mongoose from 'mongoose';
import { EmbeddedDocument } from '../mongoose.extend';
import { GtSchemaContainer } from '../store';
import { GtColumnMetadata } from '../metadata';
import { GT_DISCRIMINATOR_ROOT, GT_LOCAL_INFO } from './constants';
import { ensureInstanceOf } from './utils';
import { GtModelContainer, GtResourceContainer } from './base';
import { syncModelInstance } from './sync';

const GT_SCHEMA_PATH_SETTER = Symbol('GT_SCHEMA_PATH_SETTER');

export interface GtLocalPropInfo {
  key: string;
  inherited?: boolean;
  local?: boolean;
  embedded?: GtLocalInfo;
  columnMeta?: GtColumnMetadata;
}

export class GtLocalInfo {

  readonly cls: typeof GtModelContainer | typeof GtResourceContainer;
  discriminator?: { type: 'root', children: Map<string, GtSchemaContainer>; } | { type: 'child', root: GtLocalInfo; };

  readonly props = new Map<string, GtLocalPropInfo>();
  readonly embeddedColumns = new Map<string, GtLocalInfo>();

  constructor(public readonly container: GtSchemaContainer) {
    const { target } = container;
    this.cls = target as any;
    this.cls[GT_LOCAL_INFO] = this;

    const root: typeof GtModelContainer | typeof GtResourceContainer = target[GT_DISCRIMINATOR_ROOT];
    // discriminator, but not me... thus i'm a child
    if (root && root !== target)
      this.discriminator = { type: 'child', root: root.localInfo };
  }

  hasProp(column: GtColumnMetadata | string)
  {
    return this.props.has(typeof column === 'string' ? column : column.key);
  }

  addProp(info: GtLocalPropInfo): void {
    this.props.set(info.key, info);
    if (info.embedded) {
      this.embeddedColumns.set(info.key, info.embedded);
    }
  }

  /**
   * Do stuff on models to support goosetyped wrapping.
   * If `model` is not provided, the container's model is used.
   * Provide a model when working with schema path level discriminators.
   */
  onModelCompiled(): void;
  onModelCompiled(model: mongoose.Model<any>, ...paths: string[]): void; // tslint:disable-line: unified-signatures
  onModelCompiled(model?: mongoose.Model<any>, ...paths: string[]): void {
    if (!model)
      model = this.container.model;
    const modelPrototype = model.prototype;

    // Walk on all embedded columns, i.e. user defined classes which are complex objects...
    // Each embedded column is a nested document or a collection of a nested document.
    for (const [key, localInfo] of this.embeddedColumns.entries()) {
      this.processEmbeddedColumn(modelPrototype, key, localInfo, paths);
    }
  }

  private processEmbeddedColumn(modelPrototype: any, key: string, localInfo: GtLocalInfo, paths: string[]) {
    const descriptor = Object.getOwnPropertyDescriptor(modelPrototype, key);
    if (!descriptor || descriptor.set[GT_SCHEMA_PATH_SETTER]) {
      return;
    }

    const { get, set } = descriptor;
    if (!this.props.get(key).columnMeta.isContainer) {
      function newSet(source) {
        if (!source) { // we don't mind "falsy" values because we're always in the context of embedded columns.
          set.call(this, source);
        } else {
          const { pLocalInfo, propValue } = ensureInstanceOf(source, localInfo, this);
          // if provValue is not doc it means we created a new instance so DO NOT bind
          // if they both equal, it means that doc was an instance from the user so do bind.
          const bind = propValue === source;

          /* Direct assign propValue to model, the syncModelInstance all will duplicate work */
          set.call(this, propValue);
          const target = get.call(this);
          if (propValue !== target)
            syncModelInstance(propValue, target, pLocalInfo, false, bind);

          /* Assign minimal object to model (like in CTOR) and then sync to model, more risky cause we don't know user logic when assigning */
          // if (propLocalInfo !== localInfo) {
          //   const discriminatorKey = propLocalInfo.container.getSchemaOptions('discriminatorKey');
          //   set.call(this, { [discriminatorKey]: propValue[discriminatorKey] });
          // } else {
          //   set.call(this, {});
          // }
          // const target = get.call(this);
          // syncModelInstance(propValue, target, propLocalInfo, false, bind);
        }
      }
      newSet[GT_SCHEMA_PATH_SETTER] = true;
      Object.defineProperty(modelPrototype, key, { get, set: newSet });
    } else {
      set[GT_SCHEMA_PATH_SETTER] = true;
    }

    // we know we have a caster because we're in the context of embedded columns.
    const childModel = (this.container.schema.path(key) as any).caster;
    if (localInfo.discriminator && localInfo.discriminator.type === 'root') {
      for (const [dKey, dContainer] of localInfo.discriminator.children) {
        const dChildModel = childModel.discriminators[dKey];
        dContainer.localInfo.onModelCompiled(dChildModel, ...paths, key);
      }
    } else {
      localInfo.onModelCompiled(childModel, ...paths, key);
    }
  }

  processEmbeddedArrayItemModelInstance(embeddedDoc: EmbeddedDocument, doc: any, parent: any): void {
    const { pLocalInfo, propValue } = ensureInstanceOf(doc, this, parent);
    // if provValue is not doc it means we created a new instance so DO NOT bind
    // if they both equal, it means that doc was an instance from the user so do bind.
    const bind = propValue === doc;
    syncModelInstance(propValue, embeddedDoc, pLocalInfo, false, bind);
  }

  /**
   * Returns the root discriminator local info for this child, only if this is a child discriminator
   */
  getRootDiscriminator() {
    return this.discriminator?.type === 'child'
      ? this.discriminator.root
      : undefined;
  }
}
