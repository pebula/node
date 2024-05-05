import M from 'mongoose';
import { GtSchemaContainer } from '../../store';
import { Ctor } from '../../utils';

export class Schema<RawDocType = any,
                    TModelType = M.Model<RawDocType, any, any, any>,
                    TInstanceMethods = {},
                    TQueryHelpers = {},
                    TVirtuals = {},
                    TStaticMethods = {},
                    TSchemaOptions = M.DefaultSchemaOptions,
                    DocType extends M.ApplySchemaOptions<M.ObtainDocumentType<DocType, RawDocType, M.ResolveSchemaOptions<TSchemaOptions>>,
                                                         M.ResolveSchemaOptions<TSchemaOptions>
                                                        > = M.ApplySchemaOptions<M.ObtainDocumentType<any, RawDocType, M.ResolveSchemaOptions<TSchemaOptions>>,
                                                                                 M.ResolveSchemaOptions<TSchemaOptions>
                                                                                >,
                    THydratedDocumentType = M.HydratedDocument<M.FlatRecord<DocType>, TVirtuals & TInstanceMethods>
                   > extends M.Schema<RawDocType, TModelType, TInstanceMethods, TQueryHelpers, TVirtuals, TStaticMethods, TSchemaOptions, DocType, THydratedDocumentType> {

    private directClones = new Set<Schema>();

    private schemaContainer: GtSchemaContainer;
                
    constructor(definition?: M.SchemaDefinition<M.SchemaDefinitionType<RawDocType>, RawDocType> | DocType,
                options?: M.SchemaOptions<M.FlatRecord<DocType>, TInstanceMethods, TQueryHelpers, TStaticMethods, TVirtuals, THydratedDocumentType> | M.ResolveSchemaOptions<TSchemaOptions>) {
        super(definition, options);
    }

    public static create<T extends Ctor<Schema>>(this: T, schemaContainer: GtSchemaContainer) {
        const schema = new this();
        schema.schemaContainer = schemaContainer;
        return schema;
    }

    clone<T = this>(): T {
        const cloned = super.clone<T>();

        if (cloned instanceof Schema) {
            cloned.schemaContainer = this.schemaContainer;
            this.directClones.add(cloned);
        }
        
        return cloned;
    }

    schemaExtends(schema: Schema) {
        if (!schema)
          return false;
        if (schema === this)
          return true;
      
        if (this.directClones.has(schema))
            return true;

        for (const base of this.schemaContainer.hierarchy.extending) {
          if (base.schema.schemaExtends(schema))
            return true;
        }
        return false;
      }
}

M.Schema = Schema;
