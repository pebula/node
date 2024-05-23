import { Schema, Document, Model } from "mongoose";
import { GtColumnMetadata } from "../../metadata";
import { GtSchemaContainer } from "../../store";
import { Ctor } from "../../utils";
import { EmbeddedDocumentStatic, SubdocumentPath } from "../../mongoose.extend";
import { findSchemaContainerOfChildDiscriminator, hasInstance } from "../utils";
import { syncModelInstance } from "../sync";

const GT_SINGLE_NESTED_EMBEDDED_DOCUMENT = Symbol('GtSingleNestedEmbeddedDocument');

function extendEmbeddedDocument(schemaContainer: GtSchemaContainer, base: EmbeddedDocumentStatic<any>) {
    const { localInfo, schema } = schemaContainer;
    return class GtSingleNestedEmbeddedDocument<T = any> extends base {
        get [GT_SINGLE_NESTED_EMBEDDED_DOCUMENT]() { return localInfo.cls; }

        constructor(obj: T, path: string, parent: Document) {
            super(obj, path, parent);
            if (obj)
                syncModelInstance(obj, this, localInfo, true, true);
        }

        static [Symbol.hasInstance](instance: any): boolean {
            return hasInstance.call(this, instance) || schema.schemaExtends(instance.$__schema || instance.schema);
        }
    };
}

function extendRootDiscriminatorEmbeddedDocument(schemaContainer: GtSchemaContainer, base: EmbeddedDocumentStatic<any>) {
    const { localInfo, schema } = schemaContainer;
    return class GtDiscriminatorRootSingleNestedEmbeddedDocument<T = any> extends base {
        constructor(obj: T, path: string, parent: Document) {
            super(obj, path, parent);
            const childLocalInfo = findSchemaContainerOfChildDiscriminator(obj, localInfo);
            this[GT_SINGLE_NESTED_EMBEDDED_DOCUMENT] = childLocalInfo.cls;
            if (obj)
                syncModelInstance(obj, this, childLocalInfo, true, true);
        }

        static [Symbol.hasInstance](instance: any): boolean {
            return hasInstance.call(this, instance) || schema.schemaExtends(instance.$__schema || instance.schema);
        }
    };
}


function extendChildDiscriminatorEmbeddedDocument(rootSchemaContainer: GtSchemaContainer, base: EmbeddedDocumentStatic<any>, discriminatorValue: string) {
    if (rootSchemaContainer.localInfo.discriminator.type !== 'root')
        throw new Error(`Invalid call for discriminator, ${rootSchemaContainer.getName()} is not a root discriminator`);

    const schemaContainer = rootSchemaContainer.localInfo.discriminator.children.get(discriminatorValue);
    if (!schemaContainer)
        throw new Error(`Invalid discriminator request for ${rootSchemaContainer.getName()}, discriminator: ${discriminatorValue}`);

    return class GtDiscriminatorChildSingleNestedEmbeddedDocument<T = any> extends extendEmbeddedDocument(schemaContainer, base) {
        constructor(obj: T, path: string, parent: Document) {
            super(obj, path, parent);
        }

        static [Symbol.hasInstance](instance: any): boolean {
            return hasInstance.call(this, instance) || schemaContainer.schema.schemaExtends(instance.$__schema || instance.schema);
        }
    };
}

/**
 * An internal GT version for a Subdocument
 * GtSubdocumentPath represents is a class for building sub document schemas
 */
export class GtSubdocumentPath extends (Schema.Types.Subdocument as any as Ctor<SubdocumentPath>) {
    public caster: EmbeddedDocumentStatic<any>;
    public readonly knownContainer: GtSchemaContainer;
    public readonly column: GtColumnMetadata;

    constructor(knownContainer: GtSchemaContainer, column: GtColumnMetadata, protected parent: Schema, options?: any) {
        super(column.schema.type, column.key, { ...(options ?? {}), type: column.schema.type });
        Object.defineProperty(this, 'knownContainer', {
            get: () => knownContainer,
            configurable: false,
            enumerable: false,
        });
        Object.defineProperty(this, 'column', {
            get: () => column,
            configurable: false,
            enumerable: false,
        });
        switch (knownContainer.localInfo.discriminator?.type) {
            case 'root': {
                this.caster = extendRootDiscriminatorEmbeddedDocument(knownContainer, this.caster);
                break;
            }
            case 'child': {
                this.caster = extendEmbeddedDocument(knownContainer, this.caster);
                break;
            }
            default: {
                this.caster = extendEmbeddedDocument(knownContainer, this.caster);
                break;
            }
        }
    }

    cast(value: any, doc: Document, init: boolean, prev?: any, options?: any): any {
        if(value[GT_SINGLE_NESTED_EMBEDDED_DOCUMENT] === findSchemaContainerOfChildDiscriminator(value, this.knownContainer.localInfo).cls)
            return value;

        return super.cast(value, doc, init, prev, options);
    }
    
    discriminator<U extends Document>(name: string, schema: Schema, value?: string): Model<U> {
        const created = extendChildDiscriminatorEmbeddedDocument(this.knownContainer, super.discriminator(name, schema, value) as any, name);
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