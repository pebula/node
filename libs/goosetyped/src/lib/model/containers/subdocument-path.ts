import { Schema, Document, Model } from "mongoose";
import { GtColumnMetadata } from "../../metadata";
import { GtSchemaContainer } from "../../store";
import { Ctor } from "../../utils";
import { EmbeddedDocumentStatic, SubdocumentPath } from "../../mongoose.extend";
import { findSchemaContainerOfChildDiscriminator, hasInstance } from "../utils";
import { syncModelInstance } from "../sync";

const GT_SINGLE_NESTED_EMBEDDED_DOCUMENT = Symbol('GtSingleNestedEmbeddedDocument');

function extendEmbeddedDocument(schema: GtSubdocumentPath, base: EmbeddedDocumentStatic<any>) {
    return class GtSingleNestedEmbeddedDocument<T = any> extends base {
      constructor(obj: T, path: string, parent: Document) {
        super(obj, path, parent);
        const localInfo = findSchemaContainerOfChildDiscriminator(obj, schema.knownContainer.localInfo);
        syncModelInstance(obj, this, localInfo, true, true);
        this[GT_SINGLE_NESTED_EMBEDDED_DOCUMENT] = localInfo.cls;
      }

      static [Symbol.hasInstance](instance: any): boolean {
        return hasInstance.call(this, instance) || schema.knownContainer.schema.schemaExtends(instance.$__schema || instance.schema);
      }
    };
}

export class GtSubdocumentPath extends (Schema.Types.Subdocument as any as Ctor<SubdocumentPath>) {
    public caster: EmbeddedDocumentStatic<any>;

    constructor(public readonly knownContainer: GtSchemaContainer, public readonly column: GtColumnMetadata, protected parent: Schema, options?: any) {
        super(column.schema.type, column.key, { ...(options ?? {}), type: column.schema.type });
        this.caster = extendEmbeddedDocument(this, this.caster);
    }

    cast(value: any, doc: Document, init: boolean, prev?: any, options?: any): any {
        if(value[GT_SINGLE_NESTED_EMBEDDED_DOCUMENT] === findSchemaContainerOfChildDiscriminator(value, this.knownContainer.localInfo).cls)
            return value;

        var casted = super.cast(value, doc, init, prev, options);
        return casted;
    }
    
    discriminator<U extends Document>(name: string, schema: Schema, value?: string): Model<U> {
        const created = extendEmbeddedDocument(this, super.discriminator(name, schema, value) as any);
        return this.caster.discriminators[name] = created as any;
    }

    clone() {
        const ctor = this.constructor as any;
        const options = Object.assign({}, this.options, { _skipApplyDiscriminators: true });
        const { knownContainer, column, parent } = this;
        const schematype = new ctor(knownContainer, column, parent, options);
        schematype.validators = this.validators.slice();
        // if (this.requiredValidator !== undefined) {
        //     schematype.requiredValidator = this.requiredValidator;
        // }
        schematype.caster.discriminators = Object.assign({}, this.caster.discriminators);
        return schematype;
    }
}