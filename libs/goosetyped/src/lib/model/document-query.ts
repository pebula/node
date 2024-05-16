import * as mongodb from 'mongodb';
import * as M from 'mongoose';
import { ExtModel } from './mixin';

export interface DocumentQuery<ResultType, DocType, THelpers = {}, RawDocType = DocType, QueryOp = 'find'> {
  _mongooseOptions: M.MongooseQueryOptions;

  /**
   * Returns a wrapper around a [mongodb driver cursor](https://mongodb.github.io/node-mongodb-native/4.9/classes/FindCursor.html).
   * A QueryCursor exposes a Streams3 interface, as well as a `.next()` function.
   * This is equivalent to calling `.cursor()` with no arguments.
   */
  [Symbol.asyncIterator](): AsyncIterableIterator<M.Unpacked<ResultType>>;

  /** Executes the query */
  exec(): Promise<ResultType>;

  // eslint-disable-next-line @typescript-eslint/ban-types
  $where(argument: string | Function): DocumentQuery<Array<DocType>, DocType, THelpers, RawDocType, QueryOp> & THelpers;

  /** Specifies an `$all` query condition. When called with one argument, the most recent path passed to `where()` is used. */
  all(path: string, val: Array<any>): this;
  all(val: Array<any>): this;

  /** Sets the allowDiskUse option for the query (ignored for < 4.4.0) */
  allowDiskUse(value: boolean): this;

  /** Specifies arguments for an `$and` condition. */
  and(array: Array<M.FilterQuery<RawDocType>>): this;

  /** Specifies the batchSize option. */
  batchSize(val: number): this;

  /** Specifies a `$box` condition */
  box(val: any): this;
  box(lower: number[], upper: number[]): this;

  cast(model: M.Model<any, THelpers> | null, obj: any): M.UpdateQuery<DocType>;

  /**
   * Executes the query returning a `Promise` which will be
   * resolved with either the doc(s) or rejected with the error.
   * Like `.then()`, but only takes a rejection handler.
   */
  catch: Promise<ResultType>['catch'];

  /**
   * Executes the query returning a `Promise` which will be
   * resolved with `.finally()` chained.
   */
  finally: Promise<ResultType>['finally'];

  // Returns a string representation of this query.
  [Symbol.toStringTag]: string;

  /** Specifies a `$center` or `$centerSphere` condition. */
  circle(path: string, area: any): this;
  circle(area: any): this;

  /** Make a copy of this query so you can re-execute it. */
  clone(): this;

  /** Adds a collation to this op (MongoDB 3.4 and up) */
  collation(value: mongodb.CollationOptions): this;

  /** Specifies the `comment` option. */
  comment(val: string): this;

  /** Specifies this query as a `countDocuments` query. */
  countDocuments(
    criteria?: M.FilterQuery<RawDocType>,
    options?: M.QueryOptions<DocType>
  ): DocumentQuery<number, DocType, THelpers, RawDocType, 'countDocuments'> & THelpers;
  
  /**
   * Returns a wrapper around a [mongodb driver cursor](https://mongodb.github.io/node-mongodb-native/4.9/classes/FindCursor.html).
   * A QueryCursor exposes a Streams3 interface, as well as a `.next()` function.
   */
  cursor(options?: M.QueryOptions<DocType>): M.Cursor<M.Unpacked<ResultType>, M.QueryOptions<DocType>>;

  /**
   * Declare and/or execute this query as a `deleteMany()` operation. Works like
   * remove, except it deletes _every_ document that matches `filter` in the
   * collection, regardless of the value of `single`.
   */
  deleteMany(filter?: M.FilterQuery<RawDocType>,
             options?: M.QueryOptions<DocType>): DocumentQuery<any, DocType, THelpers, RawDocType, 'deleteMany'> & THelpers;
  deleteMany(filter: M.FilterQuery<RawDocType>): DocumentQuery<any, DocType, THelpers, RawDocType, 'deleteMany'> & THelpers;
  deleteMany(): DocumentQuery<any, DocType, THelpers, RawDocType, 'deleteMany'> & THelpers;
  
  /**
   * Declare and/or execute this query as a `deleteOne()` operation. Works like
   * remove, except it deletes at most one document regardless of the `single`
   * option.
   */
  deleteOne(filter?: M.FilterQuery<RawDocType>,
            options?: M.QueryOptions<DocType>): DocumentQuery<any, DocType, THelpers, RawDocType, 'deleteOne'> & THelpers;
  deleteOne(filter: M.FilterQuery<RawDocType>): DocumentQuery<any, DocType, THelpers, RawDocType, 'deleteOne'> & THelpers;
  deleteOne(): DocumentQuery<any, DocType, THelpers, RawDocType, 'deleteOne'> & THelpers;
  
  /** Creates a `distinct` query: returns the distinct values of the given `field` that match `filter`. */
  distinct<DocKey extends string, ResultType = unknown>(field: DocKey,
                                                        filter?:M. FilterQuery<RawDocType>): DocumentQuery<Array<DocKey extends keyof DocType ? M.Unpacked<DocType[DocKey]> : ResultType>, DocType, THelpers, RawDocType, 'distinct'> & THelpers;

  /** Specifies a `$elemMatch` query condition. When called with one argument, the most recent path passed to `where()` is used. */
  elemMatch<K = string>(path: K, val: any): this;
  elemMatch(val: Function | any): this;

  /**
   * Gets/sets the error flag on this query. If this flag is not null or
   * undefined, the `exec()` promise will reject without executing.
   */
  error(): NativeError | null;
  error(val: NativeError | null): this;

  /** Specifies the complementary comparison value for paths specified with `where()` */
  equals(val: any): this;

  /** Creates a `estimatedDocumentCount` query: counts the number of documents in the collection. */
  estimatedDocumentCount(options?: M.QueryOptions<DocType>): DocumentQuery<number, DocType, THelpers, RawDocType, 'estimatedDocumentCount'> & THelpers;

  /** Specifies a `$exists` query condition. When called with one argument, the most recent path passed to `where()` is used. */
  exists<K = string>(path: K, val: boolean): this;
  exists(val: boolean): this;

  /**
   * Sets the [`explain` option](https://www.mongodb.com/docs/manual/reference/method/cursor.explain/),
   * which makes this query return detailed execution stats instead of the actual
   * query result. This method is useful for determining what index your queries
   * use.
   */
  explain(verbose?: mongodb.ExplainVerbosityLike): this;

  /** Creates a `find` query: gets a list of documents that match `filter`. */
  find(filter: M.FilterQuery<RawDocType>, projection?: M.ProjectionType<RawDocType> | null, options?: M.QueryOptions<DocType> | null): DocumentQuery<Array<DocType>, DocType, THelpers, RawDocType, 'find'> & THelpers;
  find(filter: M.FilterQuery<RawDocType>, projection?: M.ProjectionType<RawDocType> | null): DocumentQuery<Array<DocType>, DocType, THelpers, RawDocType, 'find'> & THelpers;
  find(filter: M.FilterQuery<RawDocType>): DocumentQuery<Array<DocType>, DocType, THelpers, RawDocType, 'find'> & THelpers;
  find(): DocumentQuery<Array<DocType>, DocType, THelpers, RawDocType, 'find'> & THelpers;

  /** Declares the query a findOne operation. When executed, the first found document is passed to the callback. */
  findOne(filter?: M.FilterQuery<RawDocType>, projection?: M.ProjectionType<RawDocType> | null, options?: M.QueryOptions<DocType> | null): DocumentQuery<DocType | null, DocType, THelpers, RawDocType, 'findOne'> & THelpers;
  findOne(filter?: M.FilterQuery<RawDocType>, projection?: M.ProjectionType<RawDocType> | null): DocumentQuery<DocType | null, DocType, THelpers, RawDocType, 'findOne'> & THelpers;
  findOne(filter?: M.FilterQuery<RawDocType>): DocumentQuery<DocType | null, DocType, THelpers, RawDocType, 'findOne'> & THelpers;

  /** Creates a `findOneAndDelete` query: atomically finds the given document, deletes it, and returns the document as it was before deletion. */
  findOneAndDelete(filter?: M.FilterQuery<RawDocType>, options?: M.QueryOptions | null): DocumentQuery<DocType | null, DocType, THelpers, RawDocType, 'findOneAndDelete'> & THelpers;

  /** Creates a `findOneAndUpdate` query: atomically find the first document that matches `filter` and apply `update`. */
  findOneAndUpdate(filter: M.FilterQuery<RawDocType>, update: M.UpdateQuery<RawDocType>, options: M.QueryOptions & { includeResultMetadata: true }): DocumentQuery<M.ModifyResult<DocType>, DocType, THelpers, RawDocType, 'findOneAndUpdate'> & THelpers;
  findOneAndUpdate(filter: M.FilterQuery<RawDocType>, update: M.UpdateQuery<RawDocType>, options: M.QueryOptions & { upsert: true } & M.ReturnsNewDoc): DocumentQuery<DocType, DocType, THelpers, RawDocType, 'findOneAndUpdate'> & THelpers;
  findOneAndUpdate(filter?: M.FilterQuery<RawDocType>, update?: M.UpdateQuery<RawDocType>, options?: M.QueryOptions<DocType> | null): DocumentQuery<DocType | null, DocType, THelpers, RawDocType, 'findOneAndUpdate'> & THelpers;

  /** Declares the query a findById operation. When executed, returns the document with the given `_id`. */
  findById(id: mongodb.ObjectId | any, projection?: M.ProjectionType<RawDocType> | null, options?: M.QueryOptions<DocType> | null): DocumentQuery<DocType | null, DocType, THelpers, RawDocType, 'findOne'> & THelpers;
  findById(id: mongodb.ObjectId | any, projection?: M.ProjectionType<RawDocType> | null): DocumentQuery<DocType | null, DocType, THelpers, RawDocType, 'findOne'> & THelpers;
  findById(id: mongodb.ObjectId | any): DocumentQuery<DocType | null, DocType, THelpers, RawDocType, 'findOne'> & THelpers;

  /** Creates a `findByIdAndDelete` query, filtering by the given `_id`. */
  findByIdAndDelete(id: mongodb.ObjectId | any, options: M.QueryOptions<DocType> & { includeResultMetadata: true }): DocumentQuery<M.ModifyResult<DocType>, DocType, THelpers, RawDocType, 'findOneAndDelete'> & THelpers;
  findByIdAndDelete(id?: mongodb.ObjectId | any, options?: M.QueryOptions<DocType> | null): DocumentQuery<DocType | null, DocType, THelpers, RawDocType, 'findOneAndDelete'> & THelpers;

  /** Creates a `findOneAndUpdate` query, filtering by the given `_id`. */
  findByIdAndUpdate(id: mongodb.ObjectId | any, update: M.UpdateQuery<RawDocType>, options: M.QueryOptions<DocType> & { includeResultMetadata: true }): DocumentQuery<M.ModifyResult<DocType>, DocType, THelpers, RawDocType, 'findOneAndUpdate'> & THelpers;
  findByIdAndUpdate(id: mongodb.ObjectId | any, update: M.UpdateQuery<RawDocType>, options: M.QueryOptions<DocType> & { upsert: true } & M.ReturnsNewDoc): DocumentQuery<DocType, DocType, THelpers, RawDocType, 'findOneAndUpdate'> & THelpers;
  findByIdAndUpdate(id?: mongodb.ObjectId | any, update?: M.UpdateQuery<RawDocType>, options?: M.QueryOptions<DocType> | null): DocumentQuery<DocType | null, DocType, THelpers, RawDocType, 'findOneAndUpdate'> & THelpers;
  findByIdAndUpdate(id: mongodb.ObjectId | any, update: M.UpdateQuery<RawDocType>): DocumentQuery<DocType | null, DocType, THelpers, RawDocType, 'findOneAndUpdate'> & THelpers;

  /** Specifies a `$geometry` condition */
  geometry(object: { type: string, coordinates: any[] }): this;

  /**
   * For update operations, returns the value of a path in the update's `$set`.
   * Useful for writing getters/setters that can work with both update operations
   * and `save()`.
   */
  get(path: string): any;

  /** Returns the current query filter (also known as conditions) as a POJO. */
  getFilter(): M.FilterQuery<DocType>;

  /** Gets query options. */
  getOptions(): M.QueryOptions;

  /** Gets a list of paths to be populated by this query */
  getPopulatedPaths(): Array<string>;

  /** Returns the current query filter. Equivalent to `getFilter()`. */
  getQuery(): M.FilterQuery<DocType>;

  /** Returns the current update operations as a JSON object. */
  getUpdate(): M.UpdateQuery<DocType> | null;

  /** Specifies a `$gt` query condition. When called with one argument, the most recent path passed to `where()` is used. */
  gt<K = string>(path: K, val: any): this;
  gt(val: number): this;

  /** Specifies a `$gte` query condition. When called with one argument, the most recent path passed to `where()` is used. */
  gte<K = string>(path: K, val: any): this;
  gte(val: number): this;

  /** Specifies an `$in` query condition. When called with one argument, the most recent path passed to `where()` is used. */
  in<K = string>(path: K, val: any[]): this;
  in(val: Array<any>): this;

  /** Sets query hints. */
  hint(val: any): this;

  /** Declares an intersects query for `geometry()`. */
  intersects(arg?: any): this;

  /** Requests acknowledgement that this operation has been persisted to MongoDB's on-disk journal. */
  j(val: boolean | null): this;

  lean<LeanResultType = M.GetLeanResultType<RawDocType, ResultType, QueryOp>>(val?: boolean | any)
    : DocumentQuery<ResultType extends null
                      ? LeanResultType | null
                      : LeanResultType,
                    DocType,
                    THelpers,
                    RawDocType,
                    QueryOp> & THelpers;

  /** Specifies the maximum number of documents the query will return. */
  limit(val: number): this;

  /** Specifies a `$lt` query condition. When called with one argument, the most recent path passed to `where()` is used. */
  lt<K = string>(path: K, val: any): this;
  lt(val: number): this;

  /** Specifies a `$lte` query condition. When called with one argument, the most recent path passed to `where()` is used. */
  lte<K = string>(path: K, val: any): this;
  lte(val: number): this;

  /**
   * Runs a function `fn` and treats the return value of `fn` as the new value
   * for the query to resolve to.
   */
  transform<MappedType>(fn: (doc: ResultType) => MappedType): DocumentQuery<MappedType, DocType, THelpers, RawDocType, QueryOp> & THelpers;

  /** Specifies an `$maxDistance` query condition. When called with one argument, the most recent path passed to `where()` is used. */
  maxDistance(path: string, val: number): this;
  maxDistance(val: number): this;

  /**
   * Sets the [maxTimeMS](https://www.mongodb.com/docs/manual/reference/method/cursor.maxTimeMS/)
   * option. This will tell the MongoDB server to abort if the query or write op
   * has been running for more than `ms` milliseconds.
   */
  maxTimeMS(ms: number): this;

  /** Merges another Query or conditions object into this one. */
  merge(source: M.Query<any, any> | M.FilterQuery<RawDocType> | DocumentQuery<any, any>): this;

  /** Specifies a `$mod` condition, filters documents for documents whose `path` property is a number that is equal to `remainder` modulo `divisor`. */
  mod<K = string>(path: K, val: number): this;
  mod(val: Array<number>): this;

  /** The model this query was created from */
  model: ExtModel<DocType, unknown>; // Can't use DocType, causes "Type instantiation is excessively deep"

  /**
   * Getter/setter around the current mongoose-specific options for this query
   * Below are the current Mongoose-specific options.
   */
  mongooseOptions(val?: M.MongooseQueryOptions): M.MongooseQueryOptions;

  /** Specifies a `$ne` query condition. When called with one argument, the most recent path passed to `where()` is used. */
  ne<K = string>(path: K, val: any): this;
  ne(val: any): this;

  /** Specifies a `$near` or `$nearSphere` condition */
  near<K = string>(path: K, val: any): this;
  near(val: any): this;

  /** Specifies an `$nin` query condition. When called with one argument, the most recent path passed to `where()` is used. */
  nin<K = string>(path: K, val: any[]): this;
  nin(val: Array<any>): this;

  /** Specifies arguments for an `$nor` condition. */
  nor(array: Array<M.FilterQuery<RawDocType>>): this;

  /** Specifies arguments for an `$or` condition. */
  or(array: Array<M.FilterQuery<RawDocType>>): this;

  /**
   * Make this query throw an error if no documents match the given `filter`.
   * This is handy for integrating with async/await, because `orFail()` saves you
   * an extra `if` statement to check if no document was found.
   */
  orFail(err?: NativeError | (() => NativeError)): DocumentQuery<NonNullable<ResultType>, DocType, THelpers, RawDocType, QueryOp> & THelpers;

  /** Specifies a `$polygon` condition */
  polygon(path: string, ...coordinatePairs: number[][]): this;
  polygon(...coordinatePairs: number[][]): this;

  /** Specifies paths which should be populated with other documents. */
  populate(path: string | string[],
           select?: string | any,
           model?: string | M.Model<any, THelpers>,
           match?: any
          ): DocumentQuery<ResultType, DocType, THelpers, RawDocType, QueryOp> & THelpers;
  populate(options: M.PopulateOptions | (M.PopulateOptions | string)[]): DocumentQuery<ResultType, DocType, THelpers, RawDocType, QueryOp> & THelpers;
  populate<Paths>(path: string | string[],
                  select?: string | any,
                  model?: string | M.Model<any, THelpers>,
                  match?: any
                 ): DocumentQuery<M.MergePopulatePaths<RawDocType, ResultType, QueryOp, Paths, THelpers>,
                                  DocType,
                                  THelpers,
                                  M.UnpackedIntersection<RawDocType, Paths>,
                                  QueryOp> & THelpers;
  populate<Paths>(options: M.PopulateOptions | (M.PopulateOptions | string)[]): DocumentQuery<M.MergePopulatePaths<RawDocType, ResultType, QueryOp, Paths, THelpers>,
                                                                                              DocType,
                                                                                              THelpers,
                                                                                              M.UnpackedIntersection<RawDocType, Paths>,
                                                                                              QueryOp> & THelpers;

                                                                                                  /** Add pre middleware to this query instance. Doesn't affect other queries. */
  pre(fn: Function): this;

  /** Add post middleware to this query instance. Doesn't affect other queries. */
  post(fn: Function): this;

  /** Get/set the current projection (AKA fields). Pass `null` to remove the current projection. */
  projection(fields?: M.ProjectionFields<DocType> | string): M.ProjectionFields<DocType>;
  projection(fields: null): null;
  projection(): M.ProjectionFields<DocType> | null;

  /** Determines the MongoDB nodes from which to read. */
  read(pref: string | mongodb.ReadPreferenceMode, tags?: any[]): this;

  /** Sets the readConcern option for the query. */
  readConcern(level: string): this;

  /** Specifies a `$regex` query condition. When called with one argument, the most recent path passed to `where()` is used. */
  regex<K = string>(path: K, val: RegExp): this;
  regex(val: string | RegExp): this;

  /**
   * Declare and/or execute this query as a replaceOne() operation. Same as
   * `update()`, except MongoDB will replace the existing document and will
   * not accept any [atomic](https://www.mongodb.com/docs/manual/tutorial/model-data-for-atomic-operations/#pattern) operators (`$set`, etc.)
   */
  replaceOne(filter?: M.FilterQuery<RawDocType>,
             replacement?: DocType | M.AnyObject,
             options?: M.QueryOptions<DocType> | null
            ): DocumentQuery<any, DocType, THelpers, RawDocType, 'replaceOne'> & THelpers;

  /** Specifies which document fields to include or exclude (also known as the query "projection") */
  select<RawDocTypeOverride extends { [P in keyof RawDocType]?: any } = {}>(
      arg: string | string[] | Record<string, number | boolean | string | object>
  ): DocumentQuery<
      M.IfEquals<RawDocTypeOverride, {},
        ResultType,
        ResultType extends any[]
          ? ResultType extends M.HydratedDocument<any>[]
            ? M.HydratedDocument<RawDocTypeOverride>[]
            : RawDocTypeOverride[]
          : (ResultType extends M.HydratedDocument<any>
            ? M.HydratedDocument<RawDocTypeOverride>
            : RawDocTypeOverride) | (null extends ResultType ? null : never)
      >,
      DocType,
      THelpers,
      M.IfEquals<RawDocTypeOverride, {},
        RawDocType,
        RawDocTypeOverride
      >,
      QueryOp
    > & THelpers;

  /** Determines if field selection has been made. */
  selected(): boolean;

  /** Determines if exclusive field selection has been made. */
  selectedExclusively(): boolean;

  /** Determines if inclusive field selection has been made. */
  selectedInclusively(): boolean;

  /**
   * Sets the [MongoDB session](https://docs.mongodb.com/manual/reference/server-sessions/)
   * associated with this query. Sessions are how you mark a query as part of a
   * [transaction](/docs/transactions.html).
   */
  session(session: mongodb.ClientSession | null): this;

  /**
   * Adds a `$set` to this query's update without changing the operation.
   * This is useful for query middleware so you can add an update regardless
   * of whether you use `updateOne()`, `updateMany()`, `findOneAndUpdate()`, etc.
   */
  set(path: string | Record<string, unknown>, value?: any): this;

  /** Sets query options. Some options only make sense for certain operations. */
  setOptions(options: M.QueryOptions<DocType>, overwrite?: boolean): this;

  /** Sets the query conditions to the provided JSON object. */
  setQuery(val: M.FilterQuery<RawDocType> | null): void;

  setUpdate(update: M.UpdateQuery<RawDocType> | M.UpdateWithAggregationPipeline): void;

  /** Specifies an `$size` query condition. When called with one argument, the most recent path passed to `where()` is used. */
  size<K = string>(path: K, val: number): this;
  size(val: number): this;

  /** Specifies the number of documents to skip. */
  skip(val: number): this;

  /** Specifies a `$slice` projection for an array. */
  slice(path: string, val: number | Array<number>): this;
  slice(val: number | Array<number>): this;

  /** Sets the sort order. If an object is passed, values allowed are `asc`, `desc`, `ascending`, `descending`, `1`, and `-1`. */
  sort(arg?: string | { [key: string]: M.SortOrder | { $meta: any } } | [string, M.SortOrder][] | undefined | null,
       options?: { override?: boolean }): this;

  /** Sets the tailable option (for use with capped collections). */
  tailable(bool?: boolean, opts?: {
                                    numberOfRetries?: number;
                                    tailableRetryInterval?: number;
                                  }): this;

  /**
   * Executes the query returning a `Promise` which will be
   * resolved with either the doc(s) or rejected with the error.
   */
  then: Promise<ResultType>['then'];

  /** Converts this query to a customized, reusable query constructor with all arguments and options retained. */
  toConstructor<RetType = typeof M.Query>(): RetType;

  /**
   * Declare and/or execute this query as an updateMany() operation. Same as
   * `update()`, except MongoDB will update _all_ documents that match
   * `filter` (as opposed to just the first one) regardless of the value of
   * the `multi` option.
   */
  updateMany(filter?: M.FilterQuery<RawDocType>,
             update?: M.UpdateQuery<RawDocType> | M.UpdateWithAggregationPipeline,
             options?: M.QueryOptions<DocType> | null
            ): DocumentQuery<M.UpdateWriteOpResult, DocType, THelpers, RawDocType, 'updateMany'> & THelpers;
  

  /**
   * Declare and/or execute this query as an updateOne() operation. Same as
   * `update()`, except it does not support the `multi` or `overwrite` options.
   */
  updateOne(filter?: M.FilterQuery<RawDocType>,
            update?: M.UpdateQuery<RawDocType> | M.UpdateWithAggregationPipeline,
            options?: M.QueryOptions<DocType> | null
           ): DocumentQuery<M.UpdateWriteOpResult, DocType, THelpers, RawDocType, 'updateOne'> & THelpers;

  /**
   * Sets the specified number of `mongod` servers, or tag set of `mongod` servers,
   * that must acknowledge this write before this write is considered successful.
   */
  w(val: string | number | null): this;

  /** Specifies a path for use with chaining. */
  where(path: string, val?: any): this;
  where(obj: object): this;
  where(): this;

  /** Defines a `$within` or `$geoWithin` argument for geo-spatial queries. */
  within(val?: any): this;

  /**
   * If [`w > 1`](/docs/api.html#query_Query-w), the maximum amount of time to
   * wait for this write to propagate through the replica set before this
   * operation fails. The default is `0`, which means no timeout.
   */
  wtimeout(ms: number): this;
}
