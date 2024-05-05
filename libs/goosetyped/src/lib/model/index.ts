// export * from './containers';
export * from './model';
export * from './mixin';

declare module "mongoose" {
    export interface Schema {
        readonly $id: number;
        readonly $originalSchemaId: number;
    }
}