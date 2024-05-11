import M from 'mongoose';
import { GtSchemaContainer } from '../../store';
import { Ctor, resolveModelName } from '../../utils';
import { GT_BASED_ON } from '../constants';

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

    private readonly directClones: Set<Schema>;
    private schemaContainer: GtSchemaContainer;
                
    constructor(definition?: M.SchemaDefinition<M.SchemaDefinitionType<RawDocType>, RawDocType> | DocType,
                options?: M.SchemaOptions<M.FlatRecord<DocType>, TInstanceMethods, TQueryHelpers, TStaticMethods, TVirtuals, THydratedDocumentType> | M.ResolveSchemaOptions<TSchemaOptions>) {
        super(definition, options);
        const directClones = new Set<Schema>();
        Object.defineProperty(this, 'directClones', {
          get: () => directClones,
          configurable: false,
          enumerable: false,
        });
    }

    public static create<T extends Ctor<Schema>>(this: T, schemaContainer: GtSchemaContainer) {
        const schema = new this();
        Schema.initLocal(schema, schemaContainer);
        return schema;
    }

    private static initLocal(schema: Schema, schemaContainer: GtSchemaContainer) {
      Object.defineProperty(schema, 'schemaContainer', {
        get: () => schemaContainer,
        configurable: false,
        enumerable: false,
      });
      schema[GT_BASED_ON] = schemaContainer.localInfo.cls;
    }

    clone<T = this>(): T {
        const cloned = super.clone<T>();

        if (cloned instanceof Schema) {
          Schema.initLocal(cloned as Schema, this.schemaContainer);
          this.directClones.add(cloned);
          // console.log(`[${this[GT_BASED_ON].name}] cloned created @ ${this.directClones.size - 1}: ${cloned[GT_BASED_ON].name} [${this.$id}, ${cloned.$id}, ${cloned.$originalSchemaId}]`);
        }
        
        return cloned;
    }

    discriminator<DisSchema = Schema>(name: string | number, schema: DisSchema): this {
      console.log(`SCHEMA: [${this[GT_BASED_ON].name}] used as base for discriminator ${resolveModelName(name)}`);
      return super.discriminator(name, schema)
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
