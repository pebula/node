// export * from './containers';
export * from './document-query';
export * from './model';
export * from './mixin';

declare module "mongoose" {
    export interface Schema {
        readonly $id: number;
        readonly $originalSchemaId: number;
    }
}