// tslint:disable: ban-types
import M from 'mongoose';
import * as mongodb from 'mongodb';
import { Ctor } from '../utils';
import { DocumentQuery } from './document-query';
import { GT_SUB_DOCUMENT, GT_DOCUMENT } from './constants';

export interface SubDocument { } // tslint:disable-line: no-empty-interface

export interface Resource<T = unknown> {
  [GT_SUB_DOCUMENT]: boolean;
  schema: M.Schema;

  /** Like `create()` but without the save, replaces the constructor. Useful when you want to create a new instance from a base discriminator class */
  ctor<T extends SubDocument>(this: Ctor<T>, doc: Partial<T>): T;

  prototype: SubDocument & T;

  new(doc?: any): SubDocument & T;
}

export interface ModelExtensions<TQueryHelpers = {},
                                 TInstanceMethods = {},
                                 TVirtuals = {},
                                 TSchema = any> {

  /** Like `create()` but without the save, replaces the constructor. Useful when you want to create a new instance from a base discriminator class */
  ctor<T extends M.Document>(this: Ctor<T>, doc?: Partial<T>): T;

  model<T>(this: Ctor<T>): M.Model<T, TQueryHelpers, TInstanceMethods, TVirtuals>

  /** Collection the model uses. */
  collection: M.Collection;
  /** Connection the model uses. */
  db: M.Connection;

  init<T>(this: Ctor<T>): Promise<M.HydratedDocument<T, TVirtuals & TInstanceMethods, TQueryHelpers>>;

  aggregate<R = any, T = never>(this: Ctor<T>, pipeline?: M.PipelineStage[], options?: M.AggregateOptions): M.Aggregate<Array<R>>;
  aggregate<R = any, T = never>(this: Ctor<T>, pipeline: M.PipelineStage[]): M.Aggregate<Array<R>>;
                    
  //#region bulkWrite

  /**
   * Sends multiple `insertOne`, `updateOne`, `updateMany`, `replaceOne`,
   * `deleteOne`, and/or `deleteMany` operations to the MongoDB server in one
   * command. This is faster than sending multiple independent operations (e.g.
   * if you use `create()`) because with `bulkWrite()` there is only one network
   * round trip to the MongoDB server.
   */
  bulkWrite<T>(this: Ctor<T>,
               writes: Array<M.AnyBulkWriteOperation<T extends M.Document ? any : (T extends {} ? T : any)>>,
               options: M.MongooseBulkWriteOptions & { ordered: false }
              ): Promise<mongodb.BulkWriteResult & { mongoose?: { validationErrors: Error[] } }>;
  bulkWrite<T>(this: Ctor<T>,
               writes: Array<M.AnyBulkWriteOperation<T extends M.Document ? any : (T extends {} ? T : any)>>,
               options?: M.MongooseBulkWriteOptions
              ): Promise<mongodb.BulkWriteResult>;
  
  //#endregion

  /**
   * Sends multiple `save()` calls in a single `bulkWrite()`. This is faster than
   * sending multiple `save()` calls because with `bulkSave()` there is only one
   * network round trip to the MongoDB server.
   */
  bulkSave<T>(this: Ctor<T>, documents: Array<M.Document>, options?: M.MongooseBulkSaveOptions): Promise<mongodb.BulkWriteResult>;

  /** Creates a `countDocuments` query: counts the number of documents that match `filter`. */
  countDocuments<T>(this: Ctor<T>,
                    filter?: M.FilterQuery<T>,
                    options?: (mongodb.CountOptions & M.MongooseBaseQueryOptions<T>) | null
                   ): DocumentQuery<number, M.HydratedDocument<T, TVirtuals & TInstanceMethods, TQueryHelpers>, TQueryHelpers, T, 'countDocuments'> & TQueryHelpers;

//#region create

  // /**
  //  * Shortcut for saving one or more documents to the database. MyModel.create(docs)
  //  * does new MyModel(doc).save() for every doc in docs.
  //  * Triggers the save() hook.
  //  */
  create<T>(this: Ctor<T>, docs: Array<Partial<T>>, options: M.CreateOptions & { aggregateErrors: true }): Promise<(M.HydratedDocument<T, TVirtuals & TInstanceMethods, TQueryHelpers> | M.Error)[]>;
  create<T>(this: Ctor<T>, docs: Array<Partial<T>>, options: M.CreateOptions): Promise<M.HydratedDocument<T, TVirtuals & TInstanceMethods, TQueryHelpers>[]>;
  create<T>(this: Ctor<T>, doc: Partial<T>): Promise<M.HydratedDocument<T, TVirtuals & TInstanceMethods, TQueryHelpers>>;
  create<T>(this: Ctor<T>, doc1: Partial<T>, doc2: Partial<T>, ...docs: Array<Partial<T>>): Promise<M.HydratedDocument<T, TVirtuals & TInstanceMethods, TQueryHelpers>[]>;

//#endregion

  /**
   * Create the collection for this model. By default, if no indexes are specified,
   * mongoose will not create the collection for the model until any documents are
   * created. Use this method to create the collection explicitly.
   */
  createCollection<T, D extends mongodb.Document>(this: Ctor<T>, options?: mongodb.CreateCollectionOptions & Pick<M.SchemaOptions, 'expires'>): Promise<mongodb.Collection<D>>;

  /**
   * Create an [Atlas search index](https://www.mongodb.com/docs/atlas/atlas-search/create-index/).
   * This function only works when connected to MongoDB Atlas.
   */
  createSearchIndex<T>(this: Ctor<T>, description: M.SearchIndexDescription): Promise<string>;

//#region delete

  /**
   * Deletes all of the documents that match `conditions` from the collection.
   * Behaves like `remove()`, but deletes all documents that match `conditions`
   * regardless of the `single` option.
   */
  deleteMany<T>(this: Ctor<T>,
                filter?: M.FilterQuery<T>,
                options?: (mongodb.DeleteOptions & M.MongooseBaseQueryOptions<T>) | null
               ): DocumentQuery<mongodb.DeleteResult,
                                M.HydratedDocument<T, TVirtuals & TInstanceMethods, TQueryHelpers>,
                                TQueryHelpers,
                                T,
                                'deleteMany'> & TQueryHelpers;
  deleteMany<T>(this: Ctor<T>, filter: M.FilterQuery<T>): DocumentQuery<mongodb.DeleteResult,
                                                                        M.HydratedDocument<T, TVirtuals & TInstanceMethods, TQueryHelpers>,
                                                                        TQueryHelpers,
                                                                        T,
                                                                        'deleteMany'> & TQueryHelpers;

  /**
   * Deletes the first document that matches `conditions` from the collection.
   * Behaves like `remove()`, but deletes at most one document regardless of the
   * `single` option.
   */
  deleteOne<T>(this: Ctor<T>,
               filter?: M.FilterQuery<T>,
               options?: (mongodb.DeleteOptions & M.MongooseBaseQueryOptions<T>) | null
              ): DocumentQuery<mongodb.DeleteResult,
                               M.HydratedDocument<T, TVirtuals & TInstanceMethods, TQueryHelpers>,
                               TQueryHelpers,
                               T,
                               'deleteOne'> & TQueryHelpers;
  deleteOne<T>(this: Ctor<T>, filter: M.FilterQuery<T>): DocumentQuery<mongodb.DeleteResult,
                                                                       M.HydratedDocument<T, TVirtuals & TInstanceMethods, TQueryHelpers>,
                                                                       TQueryHelpers,
                                                                       T,
                                                                       'deleteOne'> & TQueryHelpers;
//#endregion

  /**
   * Delete an existing [Atlas search index](https://www.mongodb.com/docs/atlas/atlas-search/create-index/) by name.
   * This function only works when connected to MongoDB Atlas.
   */
  dropSearchIndex<T>(this: Ctor<T>, name: string): Promise<void>;
  
  //#region findById

  /**
   * Finds a single document by its _id field. `findById(id)` is almost*
   * equivalent to `findOne({ _id: id })`. If you want to query by a document's
   * `_id`, use `findById()` instead of `findOne()`.
   */
  findById<T, ResultDoc = M.HydratedDocument<T, TVirtuals & TInstanceMethods, TQueryHelpers>>(this: Ctor<T>, 
                                                                                              id: any,
                                                                                              projection: M.ProjectionType<T> | null | undefined,
                                                                                              options: M.QueryOptions<T> & { lean: true }
                                                                                             ): DocumentQuery<M.GetLeanResultType<T, T, 'findOne'> | null,
                                                                                                              ResultDoc,
                                                                                                              TQueryHelpers,
                                                                                                              T,
                                                                                                              'findOne'> & TQueryHelpers;
  findById<T, ResultDoc = M.HydratedDocument<T, TVirtuals & TInstanceMethods, TQueryHelpers>>(this: Ctor<T>,
                                                                                              id: any,
                                                                                              projection?: M.ProjectionType<T> | null,
                                                                                              options?: M.QueryOptions<T> | null
                                                                                             ): DocumentQuery<ResultDoc | null, ResultDoc, TQueryHelpers, T, 'findOne'> & TQueryHelpers;
  findById<T, ResultDoc = M.HydratedDocument<T, TVirtuals & TInstanceMethods, TQueryHelpers>>(this: Ctor<T>, id: any, projection?: M.ProjectionType<T> | null): DocumentQuery<ResultDoc | null, ResultDoc, TQueryHelpers, T, 'findOne'> & TQueryHelpers;

  //#endregion

//#region findOne

  findOne<T, ResultDoc = M.HydratedDocument<T, TVirtuals & TInstanceMethods, TQueryHelpers>>(this: Ctor<T>, 
                                                                                             filter: M.FilterQuery<T>,
                                                                                             projection: M.ProjectionType<T> | null | undefined,
                                                                                             options: M.QueryOptions<T> & { lean: true }
                                                                                            ): DocumentQuery<M.GetLeanResultType<T, T, 'findOne'> | null,
                                                                                                             ResultDoc,
                                                                                                             TQueryHelpers,
                                                                                                             T,
                                                                                                             'findOne'> & TQueryHelpers;
  findOne<T, ResultDoc = M.HydratedDocument<T, TVirtuals & TInstanceMethods, TQueryHelpers>>(this: Ctor<T>, filter?: M.FilterQuery<T>,
                                                                                             projection?: M.ProjectionType<T> | null,
                                                                                             options?: M.QueryOptions<T> | null): DocumentQuery<ResultDoc | null, ResultDoc, TQueryHelpers, T, 'findOne'> & TQueryHelpers;
  findOne<T, ResultDoc = M.HydratedDocument<T, TVirtuals & TInstanceMethods, TQueryHelpers>>(this: Ctor<T>, filter?: M.FilterQuery<T>, projection?: M.ProjectionType<T> | null): DocumentQuery<ResultDoc | null, ResultDoc, TQueryHelpers, T, 'findOne'> & TQueryHelpers;
  findOne<T, ResultDoc = M.HydratedDocument<T, TVirtuals & TInstanceMethods, TQueryHelpers>>(this: Ctor<T>, filter?: M.FilterQuery<T>): DocumentQuery<ResultDoc | null, ResultDoc, TQueryHelpers, T, 'findOne'> & TQueryHelpers;

//#endregion

  /** Adds a `$where` clause to this query */
  $where<T>(this: Ctor<T>, argument: string | Function): DocumentQuery<Array<M.HydratedDocument<T, TVirtuals & TInstanceMethods, TQueryHelpers>>, M.HydratedDocument<T, TVirtuals & TInstanceMethods, TQueryHelpers>, TQueryHelpers, T, 'find'> & TQueryHelpers;

//#region insertMany

  /** Inserts one or more new documents as a single `insertMany` call to the MongoDB server. */
  insertMany<T>(this: Ctor<T>, docs: Array<T>): Promise<Array<M.HydratedDocument<T, TVirtuals & TInstanceMethods, TQueryHelpers>>>;
  insertMany<T>(this: Ctor<T>, docs: Array<T>, options: M.InsertManyOptions & { lean: true; }): Promise<Array<M.Require_id<T>>>;
  insertMany<T>(this: Ctor<T>,
                doc: Array<T>,
                options: M.InsertManyOptions & { ordered: false; rawResult: true; }
               ): Promise<mongodb.InsertManyResult<M.Require_id<T>> & {
                                                                   mongoose: {
                                                                     validationErrors: (M.CastError | M.Error.ValidatorError)[];
                                                                     results: Array<M.Error | Object | M.HydratedDocument<T, TVirtuals & TInstanceMethods, TQueryHelpers>>
                                                                   }
                                                                 }>;
  insertMany<T>(this: Ctor<T>,
                docs: Array<T>,
                options: M.InsertManyOptions & { lean: true, rawResult: true; }
               ): Promise<mongodb.InsertManyResult<M.Require_id<T>>>;
  insertMany<T>(this: Ctor<T>, 
                docs: Array<T>,
                options: M.InsertManyOptions & { rawResult: true; }
               ): Promise<mongodb.InsertManyResult<M.Require_id<M.HydratedDocument<T, TVirtuals & TInstanceMethods, TQueryHelpers>>>>;
  insertMany<T>(this: Ctor<T>, 
                doc: Array<T>,
                options: M.InsertManyOptions
               ): Promise<Array<M.HydratedDocument<T, TVirtuals & TInstanceMethods, TQueryHelpers>>>;  
//#endregion


//#region find

  /** Creates a `find` query: gets a list of documents that match `filter`. */
  find<T, ResultDoc = M.HydratedDocument<T, TVirtuals & TInstanceMethods, TQueryHelpers>>(this: Ctor<T>, 
                                                                                          filter: M.FilterQuery<T>,
                                                                                          projection: M.ProjectionType<T> | null | undefined,
                                                                                          options: M.QueryOptions<T> & { lean: true }
                                                                                         ): DocumentQuery<M.GetLeanResultType<T, T[], 'find'>,
                                                                                                          ResultDoc,
                                                                                                          TQueryHelpers,
                                                                                                          T,
                                                                                                          'find'> & TQueryHelpers;
  find<T, ResultDoc = M.HydratedDocument<T, TVirtuals & TInstanceMethods, TQueryHelpers>>(this: Ctor<T>, 
                                                                                          filter: M.FilterQuery<T>,
                                                                                          projection?: M.ProjectionType<T> | null | undefined,
                                                                                          options?: M.QueryOptions<T> | null | undefined
                                                                                         ): DocumentQuery<Array<ResultDoc>, ResultDoc, TQueryHelpers, T, 'find'> & TQueryHelpers;
  find<T, ResultDoc = M.HydratedDocument<T, TVirtuals & TInstanceMethods, TQueryHelpers>>(this: Ctor<T>, 
                                                                                          filter: M.FilterQuery<T>,
                                                                                          projection?: M.ProjectionType<T> | null | undefined
                                                                                         ): DocumentQuery<Array<ResultDoc>, ResultDoc, TQueryHelpers, T, 'find'> & TQueryHelpers;
  find<T, ResultDoc = M.HydratedDocument<T, TVirtuals & TInstanceMethods, TQueryHelpers>>(this: Ctor<T>, filter: M.FilterQuery<T>): DocumentQuery<Array<ResultDoc>, ResultDoc, TQueryHelpers, T, 'find'> & TQueryHelpers;
  find<T, ResultDoc = M.HydratedDocument<T, TVirtuals & TInstanceMethods, TQueryHelpers>>(this: Ctor<T>): DocumentQuery<Array<ResultDoc>, ResultDoc, TQueryHelpers, T, 'find'> & TQueryHelpers;

  //#endregion

  // /**
  //  * Issue a mongodb findAndModify remove command by a document's _id field.
  //  * findByIdAndRemove(id, ...) is equivalent to findOneAndRemove({ _id: id }, ...).
  //  * Finds a matching document, removes it, passing the found document (if any) to the callback.
  //  * Executes immediately if callback is passed, else a Query object is returned.
  //  *
  //  * If mongoose option 'useFindAndModify': set to false it uses native findOneAndUpdate() rather than deprecated findAndModify().
  //  * https://mongoosejs.com/docs/api.html#mongoose_Mongoose-set
  //  *
  //  * Note: same signatures as findByIdAndDelete
  //  *
  //  * @param id value of _id to query by
  //  */
  // findByIdAndRemove<T extends Document>(this: Ctor<T>): DocumentQuery<T | null, T, QueryHelpers> & QueryHelpers;
  // findByIdAndRemove<T extends Document>(this: Ctor<T>,
  //                                       id: any | number | string,
  //                                       callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T, QueryHelpers> & QueryHelpers;
  // findByIdAndRemove<T extends Document>(this: Ctor<T>, id: any | number | string, options: QueryOptions,
  //                                       callback?: (err: any, res: mongodb.FindAndModifyWriteOpResultObject<T | null>) => void)
  //                                         : DocumentQuery<T | null, T, QueryHelpers> & QueryHelpers;
  // findByIdAndRemove<T extends Document>(this: Ctor<T>,
  //                                       id: any | number | string,
  //                                       options: QueryOptions,
  //                                       callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T, QueryHelpers> & QueryHelpers;

  // /**
  //  * Issue a mongodb findOneAndDelete command by a document's _id field.
  //  * findByIdAndDelete(id, ...) is equivalent to findByIdAndDelete({ _id: id }, ...).
  //  * Finds a matching document, removes it, passing the found document (if any) to the callback.
  //  * Executes immediately if callback is passed, else a Query object is returned.
  //  *
  //  * Note: same signatures as findByIdAndRemove
  //  *
  //  * @param id value of _id to query by
  //  */
  // findByIdAndDelete<T extends Document>(this: Ctor<T>): DocumentQuery<T | null, T, QueryHelpers> & QueryHelpers;
  // findByIdAndDelete<T extends Document>(this: Ctor<T>, id: any | number | string,
  //                                       callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T, QueryHelpers> & QueryHelpers;
  // findByIdAndDelete<T extends Document>(this: Ctor<T>, id: any | number | string, options: QueryOptions,
  //                                       callback?: (err: any, res: mongodb.FindAndModifyWriteOpResultObject<T | null>) => void)
  //                                         : DocumentQuery<T | null, T, QueryHelpers> & QueryHelpers;
  // findByIdAndDelete<T extends Document>(this: Ctor<T>,
  //                                       id: any | number | string,
  //                                       options: QueryOptions,
  //                                       callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T, QueryHelpers> & QueryHelpers;

  // /**
  //  * Issues a mongodb findAndModify update command by a document's _id field. findByIdAndUpdate(id, ...)
  //  * is equivalent to findOneAndUpdate({ _id: id }, ...).
  //  *
  //  * If mongoose option 'useFindAndModify': set to false it uses native findOneAndUpdate() rather than deprecated findAndModify().
  //  * https://mongoosejs.com/docs/api.html#mongoose_Mongoose-set
  //  *
  //  * @param id value of _id to query by
  //  */
  // findByIdAndUpdate<T extends Document>(this: Ctor<T>): DocumentQuery<T | null, T, QueryHelpers> & QueryHelpers;
  // findByIdAndUpdate<T extends Document>(this: Ctor<T>, id: any | number | string, update: any,
  //                                       callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T, QueryHelpers> & QueryHelpers;
  // findByIdAndUpdate<T extends Document>(this: Ctor<T>, id: any | number | string, update: any,
  //                                       options: { rawResult: true } & { upsert: true } & { new: true } & QueryOptions,
  //                                       callback?: (err: any, res: T) => void): DocumentQuery<T, T, QueryHelpers> & QueryHelpers;
  // findByIdAndUpdate<T extends Document>(this: Ctor<T>, id: any | number | string, update: any,
  //                                       options: { upsert: true, new: true } & QueryOptions,
  //                                       callback?: (err: any, res: mongodb.FindAndModifyWriteOpResultObject<T>) => void)
  //                                       : DocumentQuery<T | null, T, QueryHelpers> & QueryHelpers;
  // findByIdAndUpdate<T extends Document>(this: Ctor<T>, id: any | number | string, update: any,
  //                                       options: { rawResult: true } & QueryOptions,
  //                                       callback?: (err: any, res: mongodb.FindAndModifyWriteOpResultObject<T | null>) => void)
  //                                         : DocumentQuery<T | null, T, QueryHelpers> & QueryHelpers;
  // findByIdAndUpdate<T extends Document>(this: Ctor<T>, id: any | number | string, update: any,
  //                                       options: QueryOptions,
  //                                       callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T, QueryHelpers> & QueryHelpers;

  // /**
  //  * Finds one document.
  //  * The conditions are cast to their respective SchemaTypes before the command is sent.
  //  * @param projection optional fields to return
  //  */
  // findOne<T extends Document>(this: Ctor<T>, conditions?: any,
  //                             callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T, QueryHelpers> & QueryHelpers;
  // findOne<T extends Document>(this: Ctor<T>, conditions: any, projection: any,
  //                             callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T, QueryHelpers> & QueryHelpers;
  // findOne<T extends Document>(this: Ctor<T>, conditions: any, projection: any, options: any,
  //                             callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T, QueryHelpers> & QueryHelpers;

  // /**
  //  * Issue a mongodb findAndModify remove command.
  //  * Finds a matching document, removes it, passing the found document (if any) to the callback.
  //  * Executes immediately if callback is passed else a Query object is returned.
  //  *
  //  * If mongoose option 'useFindAndModify': set to false it uses native findOneAndUpdate() rather than deprecated findAndModify().
  //  * https://mongoosejs.com/docs/api.html#mongoose_Mongoose-set
  //  *
  //  * Note: same signatures as findOneAndDelete
  //  *
  //  */
  // findOneAndRemove<T extends Document>(this: Ctor<T>): DocumentQuery<T | null, T, QueryHelpers> & QueryHelpers;
  // findOneAndRemove<T extends Document>(this: Ctor<T>, conditions: any,
  //                                      callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T, QueryHelpers> & QueryHelpers;
  // findOneAndRemove<T extends Document>(this: Ctor<T>, conditions: any, options: { rawResult: true } & QueryOptions,
  //                                      callback?: (err: any, doc: mongodb.FindAndModifyWriteOpResultObject<T | null>, res: any) => void)
  //                                       : DocumentQuery<T | null, T, QueryHelpers> & QueryHelpers;
  // findOneAndRemove<T extends Document>(this: Ctor<T>,
  //                                      conditions: any,
  //                                      options: QueryOptions,
  //                                      callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T, QueryHelpers> & QueryHelpers;

  // /**
  //  * Issues a mongodb findOneAndDelete command.
  //  * Finds a matching document, removes it, passing the found document (if any) to the
  //  * callback. Executes immediately if callback is passed.
  //  *
  //  * Note: same signatures as findOneAndRemove
  //  *
  //  */
  // findOneAndDelete<T extends Document>(this: Ctor<T>): DocumentQuery<T | null, T, QueryHelpers> & QueryHelpers;
  // findOneAndDelete<T extends Document>(this: Ctor<T>, conditions: any,
  //                                      callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T, QueryHelpers> & QueryHelpers;
  // findOneAndDelete<T extends Document>(this: Ctor<T>, conditions: any, options: { rawResult: true } & QueryOptions,
  //                                      callback?: (err: any, doc: mongodb.FindAndModifyWriteOpResultObject<T | null>, res: any) => void)
  //                                        : DocumentQuery<T | null, T, QueryHelpers> & QueryHelpers;
  // findOneAndDelete<T extends Document>(this: Ctor<T>,
  //                                      conditions: any,
  //                                      options: QueryOptions,
  //                                      callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T, QueryHelpers> & QueryHelpers;

  // /**
  //  * Issues a mongodb findAndModify update command.
  //  * Finds a matching document, updates it according to the update arg, passing any options,
  //  * and returns the found document (if any) to the callback. The query executes immediately
  //  * if callback is passed else a Query object is returned.
  //  *
  //  + If mongoose option 'useFindAndModify': set to false it uses native findOneAndUpdate() rather than the deprecated findAndModify().
  //  + https://mongoosejs.com/docs/api.html#mongoose_Mongoose-set
  //  */
  // findOneAndUpdate<T extends Document>(this: Ctor<T>): DocumentQuery<T | null, T, QueryHelpers> & QueryHelpers;
  // findOneAndUpdate<T extends Document>(this: Ctor<T>, conditions: any, update: any,
  //                                      callback?: (err: any, doc: T | null, res: any) => void): DocumentQuery<T | null, T, QueryHelpers> & QueryHelpers;
  // findOneAndUpdate<T extends Document>(this: Ctor<T>, conditions: any, update: any,
  //                                      options: { rawResult : true } & { upsert: true, new: true } & QueryOptions,
  //                                      callback?: (err: any, doc: mongodb.FindAndModifyWriteOpResultObject<T>, res: any) => void)
  //                                        : DocumentQuery<T | null, T, QueryHelpers> & QueryHelpers;
  // findOneAndUpdate<T extends Document>(this: Ctor<T>, conditions: any, update: any,
  //                                      options: { upsert: true, new: true } & QueryOptions,
  //                                      callback?: (err: any, doc: T, res: any) => void): DocumentQuery<T, T, QueryHelpers> & QueryHelpers;
  // findOneAndUpdate<T extends Document>(this: Ctor<T>, conditions: any, update: any,
  //                                      options: { rawResult: true } & QueryOptions,
  //                                      callback?: (err: any, doc: mongodb.FindAndModifyWriteOpResultObject<T | null>, res: any) => void)
  //                                        : DocumentQuery<T | null, T, QueryHelpers> & QueryHelpers;
  // findOneAndUpdate<T extends Document>(this: Ctor<T>, conditions: any, update: any,
  //                                      options: QueryOptions,
  //                                      callback?: (err: any, doc: T | null, res: any) => void): DocumentQuery<T | null, T, QueryHelpers> & QueryHelpers;

  // /**
  //  * Implements $geoSearch functionality for Mongoose
  //  * @param conditions an object that specifies the match condition (required)
  //  * @param options for the geoSearch, some (near, maxDistance) are required
  //  * @param callback optional callback
  //  */
  // geoSearch<T extends Document>(this: Ctor<T>,
  //                               conditions: any,
  //                               options: {
  //                                 /** x,y point to search for */
  //                                 near: number[];
  //                                 /** the maximum distance from the point near that a result can be */
  //                                 maxDistance: number;
  //                                 /** The maximum number of results to return */
  //                                 limit?: number;
  //                                 /** return the raw object instead of the Mongoose Model */
  //                                 lean?: boolean;
  //                               },
  //                               callback?: (err: any, res: T[]) => void): DocumentQuery<T[], T, QueryHelpers> & QueryHelpers;

  // /**
  //  * Shortcut for creating a new Document from existing raw data,
  //  * pre-saved in the DB. The document returned has no paths marked
  //  * as modified initially.
  //  */
  // hydrate<T extends Document>(this: Ctor<T>, obj: any): T;

  // /**
  //  * Shortcut for validating an array of documents and inserting them into
  //  * MongoDB if they're all valid. This function is faster than .create()
  //  * because it only sends one operation to the server, rather than one for each
  //  * document.
  //  * This function does not trigger save middleware.
  //  * @param docs Documents to insert.
  //  * @param options Optional settings.
  //  * @param options.ordered  if true, will fail fast on the first error encountered.
  //  *        If false, will insert all the documents it can and report errors later.
  //  * @param options.rawResult if false, the returned promise resolves to the documents that passed mongoose document validation.
  //  *        If `false`, will return the [raw result from the MongoDB driver](http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#~insertWriteOpCallback)
  //  *        with a `mongoose` property that contains `validationErrors` if this is an unordered `insertMany`.
  //  */
  // insertMany<T extends Document>(this: Ctor<T>, docs: any[], callback?: (error: any, docs: T[]) => void): Promise<T[]>;
  // insertMany<T extends Document>(this: Ctor<T>, docs: any[],
  //                                options?: { ordered?: boolean, rawResult?: boolean } & InsertManyOptions,
  //                                callback?: (error: any, docs: T[]) => void): Promise<T[]>;
  // insertMany<T extends Document>(this: Ctor<T>, doc: any, callback?: (error: any, doc: T) => void): Promise<T>;
  // insertMany<T extends Document>(this: Ctor<T>, doc: any,
  //                                options?: { ordered?: boolean, rawResult?: boolean } & InsertManyOptions,
  //                                callback?: (error: any, doc: T) => void): Promise<T>;

  // /**
  //  * Performs any async initialization of this model against MongoDB.
  //  * This function is called automatically, so you don't need to call it.
  //  * This function is also idempotent, so you may call it to get back a promise
  //  * that will resolve when your indexes are finished building as an alternative
  //  * to `MyModel.on('index')`
  //  * @param callback optional
  //  */
  // init<T extends Document>(this: Ctor<T>, callback?: (err: any) => void): Promise<T>;

  // /**
  //  * Executes a mapReduce command.
  //  * @param o an object specifying map-reduce options
  //  * @param callbackoptional callback
  //  */
  // mapReduce<Key, Value, T extends Document>(this: Ctor<T>,
  //                                           o: MapReduceOptions<T, Key, Value>,
  //                                           callback?: (err: any, res: any) => void): Promise<any>;

  // /**
  //  * Populates document references.
  //  * @param docs Either a single document or array of documents to populate.
  //  * @param options A hash of key/val (path, options) used for population.
  //  * @param callback Optional callback, executed upon completion. Receives err and the doc(s).
  //  */
  // populate<T extends Document>(this: Ctor<T>,
  //                              docs: any[],
  //                              options: PopulateOptions | PopulateOptions[],
  //                              callback?: (err: any, res: T[]) => void): Promise<T[]>;
  // populate<T>(docs: any, options: PopulateOptions | PopulateOptions[],
  //             callback?: (err: any, res: T) => void): Promise<T>;

}
