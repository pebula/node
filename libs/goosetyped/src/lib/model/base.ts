// tslint:disable: max-classes-per-file
import { Model, Types, Schema } from 'mongoose';
import { CTOR_INVOKED, GT_LOCAL_INFO, GT_SUB_DOCUMENT, GT_DOCUMENT, GT_DISCRIMINATOR_ROOT } from './constants';
import { findSchemaContainerOfChildDiscriminator, hasInstance } from './utils';
import { syncModelInstance } from './sync';
import { GtLocalInfo } from './local-info';
import { Ctor } from '../utils/types';

export class GtModelContainer extends Model {
  static get localInfo(): GtLocalInfo { return this[GT_LOCAL_INFO]; }

  static readonly [GT_DOCUMENT] = true;
  private static [GT_LOCAL_INFO]: GtLocalInfo;
  private static [GT_DISCRIMINATOR_ROOT]?: typeof GtModelContainer;
  private readonly [CTOR_INVOKED] = true;

  static ctor<T extends GtModelContainer>(this: Ctor<T>, doc?: Partial<T>): T {
    if (this[GT_DISCRIMINATOR_ROOT] === this) {
      const localInfo = findSchemaContainerOfChildDiscriminator(doc, this[GT_LOCAL_INFO]);
      return new localInfo.cls(doc) as any;
    } else {
      return new this(doc);
    }
  }

  static [Symbol.hasInstance](instance: any): boolean {
    return hasInstance.call(this, instance) || this[GT_LOCAL_INFO].container.schema.schemaExtends(instance.$__schema || instance.schema);
  }

  constructor(doc?: any) {
    super();
    if (this.constructor[GT_DISCRIMINATOR_ROOT] === this.constructor)
      throw new Error(`Directly instantiating the base discriminator type is not allowed`);

    if (doc)
      syncModelInstance(doc, this, this.constructor[GT_LOCAL_INFO], true);
  }
}

export class GtResourceContainer {
  static get localInfo(): GtLocalInfo { return this[GT_LOCAL_INFO]; }
  static get schema(): Schema { return this[GT_LOCAL_INFO].container.schema; }
  static readonly [GT_SUB_DOCUMENT] = true;
  private static [GT_LOCAL_INFO]: GtLocalInfo;
  private static [GT_DISCRIMINATOR_ROOT]?: typeof GtResourceContainer;
  private readonly [CTOR_INVOKED] = true;

  static ctor<T extends GtResourceContainer>(this: Ctor<T>, doc: Partial<T>): T {
    if (this[GT_DISCRIMINATOR_ROOT] === this) {
      const localInfo = findSchemaContainerOfChildDiscriminator(doc, this[GT_LOCAL_INFO]);
      return new localInfo.cls(doc) as any;
    } else {
      return new this(doc);
    }
  }

  static [Symbol.hasInstance](instance: any): boolean {
    return hasInstance.call(this, instance) || this[GT_LOCAL_INFO].container.schema.schemaExtends(instance.$__schema || instance.schema);
  }

  constructor(doc?: any) {
    if (this.constructor[GT_DISCRIMINATOR_ROOT] === this.constructor)
      throw new Error(`Directly instantiating the base discriminator type is not allowed`);

    if (doc)
      syncModelInstance(doc, this, this.constructor[GT_LOCAL_INFO], true);
  }
}
