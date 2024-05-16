// tslint:disable: ban-types
import mongoose from 'mongoose';
import { GtSchemaMetadataArgs, GtDocumentMetadataArgs } from '../interfaces';

import {
  GtSchemaMetadata,
  GtSubDocumentMetadata,
  GtDocumentMetadata,
  SchemaAwareMetadataClass,
  GtColumnMetadata,
} from '../metadata';
import { gtConnectionStore } from '../connection';
import { GtSchemaStore } from './schema-store';
import { setSkipVersioning } from './helpers';
import { GtLocalInfo } from '../model/local-info';
import { Ctor, createModelName, getBaseClass } from '../utils';
import { GtDocumentArrayPath, GtSubdocumentPath, Schema, createEmbeddedContainerForType } from '../model/containers';
import { GtModelCompilationError } from '../errors';
import { isFunction } from '../utils/misc';
import { GT_DISCRIMINATOR_ROOT } from '../model/constants';
import { GtModelContainer, GtResourceContainer } from '../model/base';

const BUILT = Symbol('BUILT');

export class GtSchemaContainer<TInstance extends mongoose.Document = mongoose.Document, TStatic = any> {

  private static applyQueryHelpers(proto: any, schema: mongoose.Schema): void {
    for (const pName of Object.getOwnPropertyNames(proto)) {
      if (!schema.query.hasOwnProperty(pName)) {
        const propDesc = Object.getOwnPropertyDescriptor(proto, pName);
        if (propDesc) {
          if (propDesc.value && isFunction(propDesc.value)) {
            schema.query[pName] = propDesc.value;
          }
        } else {
          schema.query[pName] = proto[pName];
        }
      }
    }
  }

  private static extendContainer(targetContainer: GtSchemaContainer, baseContainer: GtSchemaContainer, owInherited = false): void {
    baseContainer.build();

    for (const k of Object.keys(baseContainer.modifiedSchemaOptions)) {
      if (!(k in targetContainer.modifiedSchemaOptions)) {
        targetContainer.setSchemaOptions(k as keyof mongoose.SchemaOptions, baseContainer.modifiedSchemaOptions[k]);
      }
    }

    for (const baseProp of baseContainer.localInfo.props.values()) {
      const targetProp = targetContainer.localInfo.props.get(baseProp.key);
      if (!targetProp || (owInherited && targetProp.inherited)) {
        if (baseProp.local) {
          targetContainer.addLocalProp(baseProp.key);
        } else {
          const column = baseProp.columnMeta;
          if (column.key in targetContainer.schema.paths) {
            targetContainer.schema.remove(column.key);
          }
          targetContainer.addColumn(baseProp.columnMeta);
          targetContainer.applyColumn(baseProp.columnMeta);
        }
        targetContainer.localInfo.props.get(baseProp.key).inherited = true;
      }
    }
  }

  model: mongoose.Model<TInstance> & TStatic;
  schemaMetadata: GtSchemaMetadata;
  readonly schema: Schema;
  readonly hierarchy = { base: new Set<GtSchemaContainer>(), extending: new Set<GtSchemaContainer>() };
  readonly localInfo: GtLocalInfo;
  private columns = new Map<string, GtColumnMetadata>();
  private modifiedSchemaOptions: Partial<mongoose.SchemaOptions> = {};
  private mixins: Array<Ctor<any>> = [];
  private hooks: Array<['pre' | 'post', ...any[]]> = [];
  private queryHelper?: Ctor<any>;

  constructor(public readonly target: Ctor<any>, public readonly store: GtSchemaStore) {
    let baseTarget = getBaseClass(target);
    while (baseTarget && baseTarget !== Object) {
      const baseContainer = store.get(baseTarget);
      if (baseContainer) {
        this.hierarchy.base.add(baseContainer);
        baseContainer.hierarchy.extending.add(this);
      }
      baseTarget = getBaseClass(baseTarget);
    }

    this.localInfo = new GtLocalInfo(this);
    this.schema = Schema.create(this);
    this.detectDiscriminators();
  }

  getName() {
    return (this.schemaMetadata && this.schemaMetadata.name) || this.target.name;
  }

  defineQueryHelper(type: Ctor<any>): void {
    this.queryHelper = type;
  }

  defineMixins(mixins: Array<Ctor<any>>): void {
    this.mixins.push(...mixins);
  }

  addHook(stage: 'pre' | 'post', ...hookArgs: any[]) {
    this.hooks.push([stage, ...hookArgs]);
  }

  addLocalProp(key: string) {
    this.localInfo.addProp({ key, local: true });
  }

  addColumn(column: GtColumnMetadata): void {
    this.columns.set(column.key, column);
  }

  getColumn(name: string): GtColumnMetadata | undefined {
    return this.columns.get(name);
  }

  setMetadata<T>(type: typeof GtSchemaMetadata,
                 metadataOptions: GtSchemaMetadataArgs,
                 decoratorArgs: { target: Function }): T;
  setMetadata<T>(type: SchemaAwareMetadataClass<T>,
                 metadataOptions: T,
                 decoratorArgs: { target: object | Function; key?: string | symbol; descriptor?: PropertyDescriptor }): void;
  setMetadata<T>(type: SchemaAwareMetadataClass<T>,
                 metadataOptions: T,
                 decoratorArgs: { target: object | Function; key?: string | symbol; descriptor?: PropertyDescriptor }): Function | void {
    if (!!this.model) {
      throw new Error('Invalid decorator order, you must set all decorators before the `@GtSchema()` decorator.');
    }

    switch (type) {
      case GtSubDocumentMetadata:
      case GtDocumentMetadata:
        this.build(type as any, metadataOptions);
        break;
      default:
        type.setMetadata(metadataOptions, decoratorArgs, this);
        break;
    }
  }

  getSchemaOptions<TOptKey extends keyof mongoose.SchemaOptions>(key: TOptKey): mongoose.SchemaOptions[TOptKey] {
    return this.schema.get(key);
  }

  setSchemaOptions<TOptKey extends keyof mongoose.SchemaOptions>(key: TOptKey, value: mongoose.SchemaOptions[TOptKey]): void {
    this.modifiedSchemaOptions[key] = value;
    this.schema.set(key, value);
  }

  private build();
  private build(type: typeof GtSchemaMetadata, metadataArgs: GtSchemaMetadataArgs);
  private build(type?: typeof GtSchemaMetadata, metadataArgs?: GtSchemaMetadataArgs) {
    if (this[BUILT]) {
      return;
    }

    // In case build is deffered, we don't take into account base classes or mixins that are also models
    // This is because the entire proto/mixin chain must bind to the same connection.
    if (type === GtDocumentMetadata) {
      const { connectionId } = metadataArgs as GtDocumentMetadataArgs;
      if (! gtConnectionStore.canBuild(connectionId) ) {
        gtConnectionStore.whenReadyToBuild(connectionId, () => this.build(type, metadataArgs));
        return;
      }
    }

    this[BUILT] = true;

    try {
      if (this.queryHelper) {
        GtSchemaContainer.applyQueryHelpers(this.queryHelper.prototype, this.schema);
      }

      let isFirst = false;
      for (const base of this.hierarchy.base) {
        GtSchemaContainer.extendContainer(this, base);
        if (base.queryHelper) {
          GtSchemaContainer.applyQueryHelpers(base.queryHelper.prototype, this.schema);
        }
        if (!isFirst) {
          if (!base.model) {
            this.hooks.unshift(...base.hooks);
          }
          isFirst = true;
        }
      }

      for (const m of this.mixins) {
        const mixinSchema = this.store.get(m);
        if (mixinSchema) {
          GtSchemaContainer.extendContainer(this, mixinSchema, true);
          this.hooks.unshift(...mixinSchema.hooks);
        }
      }

      for (const column of this.columns.values()) {
        column.resolveType(this.target.prototype);
        this.applyColumn(column);
      }

      for (const [stage, ...args] of this.hooks) {
        this.schema[stage as any](...args);
      }

      // handling soft keys
      for (const k of Object.keys(this.modifiedSchemaOptions)) {
        switch (k) {
          case 'discriminatorKey':
          case 'versionKey':
            const value = this.modifiedSchemaOptions[k] as string;
            if (!this.columns.has(value)) {
              const metadata = new GtColumnMetadata(value, k === 'discriminatorKey' ? { type: () => String } : { type: () => Number }, true);
              metadata.resolveType(this.target.prototype);
              this.applyColumn(metadata);
            }
            break;
          case 'timestamps':
            const { createdAt, updatedAt } = this.modifiedSchemaOptions[k] as mongoose.SchemaTimestampsConfig;
            for (const key of [createdAt, updatedAt] as string[]) {
              if (key && !this.columns.has(key)) {
                const metadata = new GtColumnMetadata(key, { type: () => Date });
                metadata.resolveType(this.target.prototype);
                this.applyColumn(metadata);
              }
            }
          break;
        }
      }

      if (type) {
        this.schemaMetadata = type.setMetadata(metadataArgs, { target: this.target }, this);
        if (type !== GtDocumentMetadata) {
          return;
        }
        const { connectionId } = metadataArgs as GtDocumentMetadataArgs;
        gtConnectionStore.beforeCompile(this, connectionId);
        this.model = this.compileModel(this.schemaMetadata as GtDocumentMetadata, gtConnectionStore.getCompiler(connectionId));
        this.localInfo.onModelCompiled();
      }
    } catch (err) {
      if (type && !this.schemaMetadata) {
        this.schemaMetadata = type.setMetadata(metadataArgs, { target: this.target }, this);
      }
      throw GtModelCompilationError.create(this, err);
    }
  }

  private applyColumn(column: GtColumnMetadata): void {
    let knownContainer: GtSchemaContainer;

    if (!column.softColumn) {
      this.processGlobalOptionsSetInColumnMetadata(column);

      knownContainer = this.findKnownContainer(column);
      const schema = knownContainer ? createEmbeddedContainerForType(knownContainer, column, this.schema) : column.schema;
      this.schema.add({ [column.key]: schema } as any);

      if (knownContainer) {
        this.handleNestedDocumentsAndDiscriminators(knownContainer, column);
      }
    }
    this.localInfo.addProp({
      key: column.key,
      embedded: knownContainer ? knownContainer.localInfo : undefined,
      columnMeta: column,
    });
  }

  private processGlobalOptionsSetInColumnMetadata(column: GtColumnMetadata) {
    const { key, options } = column;
    if (options.skipVersioning) {
      setSkipVersioning(this.target, key);
    }
  }

  private compileModel(metadata: GtDocumentMetadata, compiler: mongoose.Connection) {
    const { discriminator } = this.localInfo;
    if (discriminator && discriminator.type === 'child') {
      const model = discriminator.root.container.model;
      const { schema } = this;
      return model.discriminator(this.target as any, schema) as any;
    }
    return compiler.model(this.target as any, this.schema, metadata.collection);
  }

  /**
   * The logic for handling nested sub documents, including embedded discriminators (single and array)
   */
  private handleNestedDocumentsAndDiscriminators(knownContainer: GtSchemaContainer, column: GtColumnMetadata): void {
    if (knownContainer.localInfo.discriminator && knownContainer.localInfo.discriminator.type === 'root') {
      const document = this.schema.path(column.key) as GtSubdocumentPath | GtDocumentArrayPath;
      for (const [key, c] of knownContainer.localInfo.discriminator.children) {
        const Model = document.discriminator(key, c.schema);
        // We don't compile this model because it is created as part of a column
        // The model on which this column is defined on will perform a recursive compilation
        // to all of it's embedded columns to ensure compilation of mongoose generated classes.
      }
    }
  }

  private findKnownContainer(column: GtColumnMetadata) {
    return this.store.get(column.resolvedColumnType.underlyingType);
  }

  private detectDiscriminators() {
    // discriminator, but not me... thus i'm a child
    if (this.localInfo.discriminator?.type === 'child') {
      const root: typeof GtModelContainer | typeof GtResourceContainer = this.target[GT_DISCRIMINATOR_ROOT];

      if (root.localInfo.discriminator?.type !== 'root')
        throw new Error("Invalid discriminator state");

      const discriminatorKey = root.localInfo.container.getSchemaOptions('discriminatorKey');
      const discriminatorValue = createModelName(this.target);
      this.setSchemaOptions('discriminatorKey', discriminatorKey);

      root.localInfo.discriminator.children.set(discriminatorValue, this);
      Object.defineProperty(this.target.prototype, discriminatorKey, { value: discriminatorValue, configurable: true, enumerable: true, writable: true });
    }
  }
}
