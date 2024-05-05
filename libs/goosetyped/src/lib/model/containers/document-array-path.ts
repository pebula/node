import { Schema, SchemaTypeOptions, Model, Document } from 'mongoose';
import { Ctor } from '../../utils';
import { GtSchemaContainer } from '../../store';
import { SCHEMA_CONTAINER } from './symbol';
import { DocumentArrayPath, EmbeddedDocumentStatic, CoreDocumentArray } from '../../mongoose.extend';

function extendEmbeddedDocument(EmbeddedDoc: EmbeddedDocumentStatic<any>) {
  return class GtDocumentArrayEmbeddedDocument<T = any> extends EmbeddedDoc {
    constructor(obj: T, parentArr: CoreDocumentArray<any>, skipId: boolean, fields: any, index: number) {
      super(parentArr ? {} : obj, parentArr, skipId, fields, index);
      if (parentArr) {
        const container: GtSchemaContainer = parentArr.$schema()[SCHEMA_CONTAINER];
        container.localInfo.processEmbeddedArrayItemModelInstance(this, obj, parentArr);
      }
    }
  };
}

export class GtDocumentArrayPath extends (Schema.Types.DocumentArray as any as Ctor<DocumentArrayPath>) {

  get casterConstructor(): EmbeddedDocumentStatic<any> { return this._casterConstructor; }

  set casterConstructor(value: EmbeddedDocumentStatic<any>) {
    if (this[SCHEMA_CONTAINER])
      this._casterConstructor = value;
    else if (!this._casterConstructor) {
      this._casterConstructor = extendEmbeddedDocument(value);
      this._constructor = this._casterConstructor;
      this._caster = this._constructor;
    }
  }

  get Constructor(): Ctor<any> & any { return this._constructor; }

  set Constructor(value: Ctor<any> & any) {
    if (this[SCHEMA_CONTAINER])
      this._constructor = value;
  }

  get caster(): typeof Schema.Types.Subdocument { return this._caster; }

  set caster(value: typeof Schema.Types.Subdocument) {
    if (this[SCHEMA_CONTAINER])
      this._caster = value;
    else if (Object.getPrototypeOf(this._caster) !== value)
      this._caster = value;
  }

  private _casterConstructor: EmbeddedDocumentStatic<any>;
  private _constructor: Ctor<any> & any;
  private _caster: typeof Schema.Types.Subdocument;

  private readonly [SCHEMA_CONTAINER]: GtSchemaContainer;

  constructor(container: GtSchemaContainer, key: string, schema: Schema, typeOpts: SchemaTypeOptions<any>) {
    super(key, schema, typeOpts);
    this[SCHEMA_CONTAINER] = container;
  }

  cast(value: any, doc: Document, init: boolean, prev?: any, options?: any): any {
    const casted = super.cast([], doc, init, prev, options);

    const arr = !value
      ? []
      : !Array.isArray(value) ? [value] : value
    ;

    const container = this[SCHEMA_CONTAINER];
    for (let i = 0, len = arr.length; i < len; i++) {
      const source = arr[i];
      if (! (source instanceof this.casterConstructor) ) {
        let ctor = this.casterConstructor;
        if (container.localInfo.discriminator) {
          const discriminatorKey = container.localInfo.container.getSchemaOptions('discriminatorKey');
          ctor = this.casterConstructor.discriminators[source[discriminatorKey]];
        }
        casted[i] = new ctor(source, casted, false, null, i, true);
      } else {
        casted[i] = source;
      }
    }

    return casted;
  }

  discriminator<U extends Document>(name: string, schema: Schema, value?: string): Model<U> {
    const created = extendEmbeddedDocument(super.discriminator(name, schema, value));
    return this.casterConstructor.discriminators[name] = created as any;
  }

  clone() {
    const ctor = this.constructor as any;
    const options = Object.assign({}, this.options);
    const schematype = new ctor(this[SCHEMA_CONTAINER], this.path, this.schema, options, this.schemaOptions);
    schematype.validators = this.validators.slice();
    schematype.Constructor.discriminators = Object.assign({}, this.Constructor.discriminators);
    return schematype;
  }
}
