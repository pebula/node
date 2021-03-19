import * as mongodb from 'mongodb';
import * as M from 'mongoose';

export interface DocumentQuery<ResultType, DocType extends M.Document, THelpers = {}> {
  _mongooseOptions: M.MongooseQueryOptions;

  /** Executes the query */
  exec(): Promise<ResultType>;
  exec(callback?: (err: M.CallbackError, res: ResultType) => void): void;
  // @todo: this doesn't seem right
  exec(callback?: (err: any, result: ResultType) => void): Promise<ResultType> | any;

  // eslint-disable-next-line @typescript-eslint/ban-types
  $where(argument: string | Function): DocumentQuery<Array<DocType>, DocType, THelpers> & THelpers;

  /** Specifies an `$all` query condition. When called with one argument, the most recent path passed to `where()` is used. */
  all(val: Array<any>): this;
  all(path: string, val: Array<any>): this;

  /** Specifies arguments for an `$and` condition. */
  and(array: Array<M.FilterQuery<DocType>>): this;

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

  /** Specifies a `$center` or `$centerSphere` condition. */
  circle(area: any): this;
  circle(path: string, area: any): this;

  /** Adds a collation to this op (MongoDB 3.4 and up) */
  collation(value: mongodb.CollationDocument): this;

  /** Specifies the `comment` option. */
  comment(val: string): this;

  /** Specifies this query as a `count` query. */
  count(callback?: (err: any, count: number) => void): M.Query<number, DocType, THelpers> & THelpers;
  count(criteria: M.FilterQuery<DocType>, callback?: (err: any, count: number) => void): M.Query<number, DocType, THelpers> & THelpers;

  /** Specifies this query as a `countDocuments` query. */
  countDocuments(callback?: (err: any, count: number) => void): M.Query<number, DocType, THelpers> & THelpers;
  countDocuments(criteria: M.FilterQuery<DocType>, callback?: (err: any, count: number) => void): M.Query<number, DocType, THelpers> & THelpers;

  /**
   * Returns a wrapper around a [mongodb driver cursor](http://mongodb.github.io/node-mongodb-native/2.1/api/Cursor.html).
   * A M.QueryCursor exposes a Streams3 interface, as well as a `.next()` function.
   */
  cursor(options?: any): M.QueryCursor<DocType>;

  /**
   * Declare and/or execute this query as a `deleteMany()` operation. Works like
   * remove, except it deletes _every_ document that matches `filter` in the
   * collection, regardless of the value of `single`.
   */
  deleteMany(filter?: M.FilterQuery<DocType>, options?: M.QueryOptions, callback?: (err: M.CallbackError, res: any) => void): DocumentQuery<any, DocType, THelpers> & THelpers;

  /**
   * Declare and/or execute this query as a `deleteOne()` operation. Works like
   * remove, except it deletes at most one document regardless of the `single`
   * option.
   */
  deleteOne(filter?: M.FilterQuery<DocType>, options?: M.QueryOptions, callback?: (err: M.CallbackError, res: any) => void): DocumentQuery<any, DocType, THelpers> & THelpers;

  /** Creates a `distinct` query: returns the distinct values of the given `field` that match `filter`. */
  distinct(field: string, filter?: M.FilterQuery<DocType>, callback?: (err: any, count: number) => void): M.Query<Array<any>, DocType, THelpers> & THelpers;

  /** Specifies a `$elemMatch` query condition. When called with one argument, the most recent path passed to `where()` is used. */
  // eslint-disable-next-line @typescript-eslint/ban-types
  elemMatch(val: Function | any): this;
  // eslint-disable-next-line @typescript-eslint/ban-types
  elemMatch(path: string, val: Function | any): this;

  /**
   * Gets/sets the error flag on this query. If this flag is not null or
   * undefined, the `exec()` promise will reject without executing.
   */
  error(): M.NativeError | null;
  error(val: M.NativeError | null): this;

  /** Specifies the complementary comparison value for paths specified with `where()` */
  equals(val: any): this;

  /** Creates a `estimatedDocumentCount` query: counts the number of documents in the collection. */
  estimatedDocumentCount(options?: M.QueryOptions, callback?: (err: any, count: number) => void): M.Query<number, DocType, THelpers> & THelpers;

  /** Specifies a `$exists` query condition. When called with one argument, the most recent path passed to `where()` is used. */
  exists(val: boolean): this;
  exists(path: string, val: boolean): this;

  /**
   * Sets the [`explain` option](https://docs.mongodb.com/manual/reference/method/cursor.explain/),
   * which makes this query return detailed execution stats instead of the actual
   * query result. This method is useful for determining what index your queries
   * use.
   */
  explain(verbose?: string): this;

  /** Creates a `find` query: gets a list of documents that match `filter`. */
  find(callback?: (err: any, docs: DocType[]) => void): DocumentQuery<Array<DocType>, DocType, THelpers> & THelpers;
  find(filter: M.FilterQuery<DocType>, callback?: (err: any, docs: DocType[]) => void): DocumentQuery<Array<DocType>, DocType, THelpers> & THelpers;

  /** Declares the query a findOne operation. When executed, the first found document is passed to the callback. */
  findOne(filter?: M.FilterQuery<DocType>, projection?: any | null, options?: M.QueryOptions | null, callback?: (err: M.CallbackError, doc: DocType | null) => void): DocumentQuery<DocType | null, DocType, THelpers> & THelpers;

  /** Creates a `findOneAndDelete` query: atomically finds the given document, deletes it, and returns the document as it was before deletion. */
  findOneAndDelete(filter?: M.FilterQuery<DocType>, options?: M.QueryOptions | null, callback?: (err: any, doc: DocType | null, res: any) => void): DocumentQuery<DocType | null, DocType, THelpers> & THelpers;

  /** Creates a `findOneAndRemove` query: atomically finds the given document and deletes it. */
  findOneAndRemove(filter?: M.FilterQuery<DocType>, options?: M.QueryOptions | null, callback?: (err: any, doc: DocType | null, res: any) => void): DocumentQuery<DocType | null, DocType, THelpers> & THelpers;

  /** Creates a `findOneAndUpdate` query: atomically find the first document that matches `filter` and apply `update`. */
  findOneAndUpdate(filter: M.FilterQuery<DocType>, update: M.UpdateQuery<DocType>, options: M.QueryOptions & { rawResult: true }, callback?: (err: any, doc: mongodb.FindAndModifyWriteOpResultObject<DocType>, res: any) => void): DocumentQuery<mongodb.FindAndModifyWriteOpResultObject<DocType>, DocType, THelpers> & THelpers;
  findOneAndUpdate(filter: M.FilterQuery<DocType>, update: M.UpdateQuery<DocType>, options: M.QueryOptions & { upsert: true } & M.ReturnsNewDoc, callback?: (err: any, doc: DocType, res: any) => void): DocumentQuery<DocType, DocType, THelpers> & THelpers;
  findOneAndUpdate(filter?: M.FilterQuery<DocType>, update?: M.UpdateQuery<DocType>, options?: M.QueryOptions | null, callback?: (err: any, doc: DocType | null, res: any) => void): DocumentQuery<DocType | null, DocType, THelpers> & THelpers;

  /** Creates a `findByIdAndDelete` query, filtering by the given `_id`. */
  findByIdAndDelete(id?: mongodb.ObjectId | any, options?: M.QueryOptions | null, callback?: (err: any, doc: DocType | null, res: any) => void): DocumentQuery<DocType | null, DocType, THelpers> & THelpers;

  /** Creates a `findOneAndUpdate` query, filtering by the given `_id`. */
  findByIdAndUpdate(id: mongodb.ObjectId | any, update: M.UpdateQuery<DocType>, options: M.QueryOptions & { rawResult: true }, callback?: (err: any, doc: mongodb.FindAndModifyWriteOpResultObject<DocType>, res: any) => void): DocumentQuery<mongodb.FindAndModifyWriteOpResultObject<DocType>, DocType, THelpers> & THelpers;
  findByIdAndUpdate(id: mongodb.ObjectId | any, update: M.UpdateQuery<DocType>, options: M.QueryOptions & { upsert: true } & M.ReturnsNewDoc, callback?: (err: any, doc: DocType, res: any) => void): DocumentQuery<DocType, DocType, THelpers> & THelpers;
  findByIdAndUpdate(id?: mongodb.ObjectId | any, update?: M.UpdateQuery<DocType>, options?: M.QueryOptions | null, callback?: (err: any, doc: DocType | null, res: any) => void): DocumentQuery<DocType | null, DocType, THelpers> & THelpers;

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
  gt(val: number): this;
  gt(path: string, val: number): this;

  /** Specifies a `$gte` query condition. When called with one argument, the most recent path passed to `where()` is used. */
  gte(val: number): this;
  gte(path: string, val: number): this;

  /** Sets query hints. */
  hint(val: any): this;

  /** Specifies an `$in` query condition. When called with one argument, the most recent path passed to `where()` is used. */
  in(val: Array<any>): this;
  in(path: string, val: Array<any>): this;

  /** Declares an intersects query for `geometry()`. */
  intersects(arg?: any): this;

  /** Requests acknowledgement that this operation has been persisted to MongoDB's on-disk journal. */
  j(val: boolean | null): this;

  /** Sets the lean option. */
  lean<LeanResultType = M.LeanDocumentOrArray<ResultType>>(val?: boolean | any): DocumentQuery<LeanResultType, DocType, THelpers> & THelpers;

  /** Specifies the maximum number of documents the query will return. */
  limit(val: number): this;

  /** Specifies a `$lt` query condition. When called with one argument, the most recent path passed to `where()` is used. */
  lt(val: number): this;
  lt(path: string, val: number): this;

  /** Specifies a `$lte` query condition. When called with one argument, the most recent path passed to `where()` is used. */
  lte(val: number): this;
  lte(path: string, val: number): this;

  /**
   * Runs a function `fn` and treats the return value of `fn` as the new value
   * for the query to resolve to.
   */
  map<MappedType>(fn: (doc: DocType) => MappedType): DocumentQuery<MappedType, DocType, THelpers> & THelpers;

  /** Specifies an `$maxDistance` query condition. When called with one argument, the most recent path passed to `where()` is used. */
  maxDistance(val: number): this;
  maxDistance(path: string, val: number): this;

  /** Specifies the maxScan option. */
  maxScan(val: number): this;

  /**
   * Sets the [maxTimeMS](https://docs.mongodb.com/manual/reference/method/cursor.maxTimeMS/)
   * option. This will tell the MongoDB server to abort if the query or write op
   * has been running for more than `ms` milliseconds.
   */
  maxTimeMS(ms: number): this;

  /** Merges another DocumentQuery or conditions object into this one. */
  merge(source: DocumentQuery<any, any>): this;

  /** Specifies a `$mod` condition, filters documents for documents whose `path` property is a number that is equal to `remainder` modulo `divisor`. */
  mod(val: Array<number>): this;
  mod(path: string, val: Array<number>): this;

  /**
   * Getter/setter around the current mongoose-specific options for this query
   * Below are the current Mongoose-specific options.
   */
  mongooseOptions(val?: M.MongooseQueryOptions): M.MongooseQueryOptions;

  /** Specifies a `$ne` query condition. When called with one argument, the most recent path passed to `where()` is used. */
  ne(val: any): this;
  ne(path: string, val: any): this;

  /** Specifies a `$near` or `$nearSphere` condition */
  near(val: any): this;
  near(path: string, val: any): this;

  /** Specifies an `$nin` query condition. When called with one argument, the most recent path passed to `where()` is used. */
  nin(val: Array<any>): this;
  nin(path: string, val: Array<any>): this;

  /** Specifies arguments for an `$nor` condition. */
  nor(array: Array<M.FilterQuery<DocType>>): this;

  /** Specifies arguments for an `$or` condition. */
  or(array: Array<M.FilterQuery<DocType>>): this;

  /**
   * Make this query throw an error if no documents match the given `filter`.
   * This is handy for integrating with async/await, because `orFail()` saves you
   * an extra `if` statement to check if no document was found.
   */
  orFail(err?: M.NativeError | (() => M.NativeError)): DocumentQuery<NonNullable<ResultType>, DocType, THelpers> & THelpers;

  /** Specifies a `$polygon` condition */
  polygon(...coordinatePairs: number[][]): this;
  polygon(path: string, ...coordinatePairs: number[][]): this;

  /** Specifies paths which should be populated with other documents. */
  populate(path: string | any, select?: string | any, model?: string | M.Model<any, THelpers>, match?: any): this;
  populate(options: M.PopulateOptions | Array<M.PopulateOptions>): this;

  /** Get/set the current projection (AKA fields). Pass `null` to remove the current projection. */
  projection(fields?: any | null): any;

  /** Determines the MongoDB nodes from which to read. */
  read(pref: string | mongodb.ReadPreferenceMode, tags?: any[]): this;

  /** Sets the readConcern option for the query. */
  readConcern(level: string): this;

  /** Specifies a `$regex` query condition. When called with one argument, the most recent path passed to `where()` is used. */
  regex(val: string | RegExp): this;
  regex(path: string, val: string | RegExp): this;

  /**
   * Declare and/or execute this query as a remove() operation. `remove()` is
   * deprecated, you should use [`deleteOne()`](#query_Query-deleteOne)
   * or [`deleteMany()`](#query_Query-deleteMany) instead.
   */
  remove(filter?: M.FilterQuery<DocType>, callback?: (err: M.CallbackError, res: mongodb.WriteOpResult['result']) => void): DocumentQuery<mongodb.WriteOpResult['result'], DocType, THelpers> & THelpers;

  /**
   * Declare and/or execute this query as a replaceOne() operation. Same as
   * `update()`, except MongoDB will replace the existing document and will
   * not accept any [atomic](https://docs.mongodb.com/manual/tutorial/model-data-for-atomic-operations/#pattern) operators (`$set`, etc.)
   */
  replaceOne(filter?: M.FilterQuery<DocType>, replacement?: M.DocumentDefinition<DocType>, options?: M.QueryOptions | null, callback?: (err: any, res: any) => void): DocumentQuery<any, DocType, THelpers> & THelpers;

  /** Specifies which document fields to include or exclude (also known as the query "projection") */
  select(arg: string | any): this;

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
  set(path: string, value: any): this;

  /** Sets query options. Some options only make sense for certain operations. */
  setOptions(options: M.QueryOptions, overwrite?: boolean): this;

  /** Sets the query conditions to the provided JSON object. */
  setQuery(val: M.FilterQuery<DocType> | null): void;

  setUpdate(update: M.UpdateQuery<DocType>): void;

  /** Specifies an `$size` query condition. When called with one argument, the most recent path passed to `where()` is used. */
  size(val: number): this;
  size(path: string, val: number): this;

  /** Specifies the number of documents to skip. */
  skip(val: number): this;

  /** Specifies a `$slice` projection for an array. */
  slice(val: number | Array<number>): this;
  slice(path: string, val: number | Array<number>): this;

  /** Specifies this query as a `snapshot` query. */
  snapshot(val?: boolean): this;

  /** Sets the sort order. If an object is passed, values allowed are `asc`, `desc`, `ascending`, `descending`, `1`, and `-1`. */
  sort(arg: string | any): this;

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
  toConstructor(): new (...args: any[]) => DocumentQuery<ResultType, DocType, THelpers>;

  /** Declare and/or execute this query as an update() operation. */
  update(filter?: M.FilterQuery<DocType>, update?: M.UpdateQuery<DocType>, options?: M.QueryOptions | null, callback?: (err: M.CallbackError, res: any) => void): DocumentQuery<any, DocType, THelpers> & THelpers;

  /**
   * Declare and/or execute this query as an updateMany() operation. Same as
   * `update()`, except MongoDB will update _all_ documents that match
   * `filter` (as opposed to just the first one) regardless of the value of
   * the `multi` option.
   */
  updateMany(filter?: M.FilterQuery<DocType>, update?: M.UpdateQuery<DocType>, options?: M.QueryOptions | null, callback?: (err: M.CallbackError, res: any) => void): DocumentQuery<any, DocType, THelpers> & THelpers;

  /**
   * Declare and/or execute this query as an updateOne() operation. Same as
   * `update()`, except it does not support the `multi` or `overwrite` options.
   */
  updateOne(filter?: M.FilterQuery<DocType>, update?: M.UpdateQuery<DocType>, options?: M.QueryOptions | null, callback?: (err: M.CallbackError, res: any) => void): DocumentQuery<any, DocType, THelpers> & THelpers;

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
