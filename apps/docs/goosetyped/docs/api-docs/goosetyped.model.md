<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@pebula/goosetyped](./goosetyped.md) &gt; [Model](./goosetyped.model.md)

## Model interface

<b>Signature:</b>

```typescript
export interface Model<QueryHelpers = {}> extends MongooseModel<Document<any>, QueryHelpers> 
```
<b>Extends:</b> MongooseModel&lt;Document&lt;any&gt;, QueryHelpers&gt;

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [\[GT\_DOCUMENT\]](./goosetyped.model._gt_document_.md) | boolean |  |

## Methods

|  Method | Description |
|  --- | --- |
|  [$where(this, argument)](./goosetyped.model._where.md) | Creates a Query and specifies a $where condition. |
|  [create(this, docs, callback)](./goosetyped.model.create.md) | Shortcut for saving one or more documents to the database. MyModel.create(docs) does new MyModel(doc).save() for every doc in docs. Triggers the save() hook. |
|  [create(this, docs, options, callback)](./goosetyped.model.create_1.md) |  |
|  [create(this, docs)](./goosetyped.model.create_2.md) |  |
|  [create(this, docsWithCallback)](./goosetyped.model.create_3.md) |  |
|  [ctor(this, doc)](./goosetyped.model.ctor.md) | Like <code>create()</code> but without the save, replaces the constructor. Useful when you want to create a new instance from a base discriminator class |
|  [find(this, callback)](./goosetyped.model.find.md) | Finds documents. |
|  [find(this, conditions, callback)](./goosetyped.model.find_1.md) |  |
|  [find(this, conditions, projection, callback)](./goosetyped.model.find_2.md) |  |
|  [find(this, conditions, projection, options, callback)](./goosetyped.model.find_3.md) |  |
|  [findById(this, id, callback)](./goosetyped.model.findbyid.md) | Finds a single document by its \_id field. findById(id) is almost\* equivalent to findOne(<!-- -->{ \_id: id }<!-- -->). findById() triggers findOne hooks. |
|  [findById(this, id, projection, callback)](./goosetyped.model.findbyid_1.md) |  |
|  [findById(this, id, projection, options, callback)](./goosetyped.model.findbyid_2.md) |  |
|  [findByIdAndDelete(this)](./goosetyped.model.findbyidanddelete.md) | Issue a mongodb findOneAndDelete command by a document's \_id field. findByIdAndDelete(id, ...) is equivalent to findByIdAndDelete(<!-- -->{ \_id: id }<!-- -->, ...). Finds a matching document, removes it, passing the found document (if any) to the callback. Executes immediately if callback is passed, else a Query object is returned.<!-- -->Note: same signatures as findByIdAndRemove |
|  [findByIdAndDelete(this, id, callback)](./goosetyped.model.findbyidanddelete_1.md) |  |
|  [findByIdAndDelete(this, id, options, callback)](./goosetyped.model.findbyidanddelete_2.md) |  |
|  [findByIdAndDelete(this, id, options, callback)](./goosetyped.model.findbyidanddelete_3.md) |  |
|  [findByIdAndRemove(this)](./goosetyped.model.findbyidandremove.md) | Issue a mongodb findAndModify remove command by a document's \_id field. findByIdAndRemove(id, ...) is equivalent to findOneAndRemove(<!-- -->{ \_id: id }<!-- -->, ...). Finds a matching document, removes it, passing the found document (if any) to the callback. Executes immediately if callback is passed, else a Query object is returned.<!-- -->If mongoose option 'useFindAndModify': set to false it uses native findOneAndUpdate() rather than deprecated findAndModify(). https://mongoosejs.com/docs/api.html\#mongoose\_Mongoose-set<!-- -->Note: same signatures as findByIdAndDelete |
|  [findByIdAndRemove(this, id, callback)](./goosetyped.model.findbyidandremove_1.md) |  |
|  [findByIdAndRemove(this, id, options, callback)](./goosetyped.model.findbyidandremove_2.md) |  |
|  [findByIdAndRemove(this, id, options, callback)](./goosetyped.model.findbyidandremove_3.md) |  |
|  [findByIdAndUpdate(this)](./goosetyped.model.findbyidandupdate.md) | Issues a mongodb findAndModify update command by a document's \_id field. findByIdAndUpdate(id, ...) is equivalent to findOneAndUpdate(<!-- -->{ \_id: id }<!-- -->, ...).<!-- -->If mongoose option 'useFindAndModify': set to false it uses native findOneAndUpdate() rather than deprecated findAndModify(). https://mongoosejs.com/docs/api.html\#mongoose\_Mongoose-set |
|  [findByIdAndUpdate(this, id, update, callback)](./goosetyped.model.findbyidandupdate_1.md) |  |
|  [findByIdAndUpdate(this, id, update, options, callback)](./goosetyped.model.findbyidandupdate_2.md) |  |
|  [findByIdAndUpdate(this, id, update, options, callback)](./goosetyped.model.findbyidandupdate_3.md) |  |
|  [findByIdAndUpdate(this, id, update, options, callback)](./goosetyped.model.findbyidandupdate_4.md) |  |
|  [findByIdAndUpdate(this, id, update, options, callback)](./goosetyped.model.findbyidandupdate_5.md) |  |
|  [findOne(this, conditions, callback)](./goosetyped.model.findone.md) | Finds one document. The conditions are cast to their respective SchemaTypes before the command is sent. |
|  [findOne(this, conditions, projection, callback)](./goosetyped.model.findone_1.md) |  |
|  [findOne(this, conditions, projection, options, callback)](./goosetyped.model.findone_2.md) |  |
|  [findOneAndDelete(this)](./goosetyped.model.findoneanddelete.md) | Issues a mongodb findOneAndDelete command. Finds a matching document, removes it, passing the found document (if any) to the callback. Executes immediately if callback is passed.<!-- -->Note: same signatures as findOneAndRemove |
|  [findOneAndDelete(this, conditions, callback)](./goosetyped.model.findoneanddelete_1.md) |  |
|  [findOneAndDelete(this, conditions, options, callback)](./goosetyped.model.findoneanddelete_2.md) |  |
|  [findOneAndDelete(this, conditions, options, callback)](./goosetyped.model.findoneanddelete_3.md) |  |
|  [findOneAndRemove(this)](./goosetyped.model.findoneandremove.md) | Issue a mongodb findAndModify remove command. Finds a matching document, removes it, passing the found document (if any) to the callback. Executes immediately if callback is passed else a Query object is returned.<!-- -->If mongoose option 'useFindAndModify': set to false it uses native findOneAndUpdate() rather than deprecated findAndModify(). https://mongoosejs.com/docs/api.html\#mongoose\_Mongoose-set<!-- -->Note: same signatures as findOneAndDelete |
|  [findOneAndRemove(this, conditions, callback)](./goosetyped.model.findoneandremove_1.md) |  |
|  [findOneAndRemove(this, conditions, options, callback)](./goosetyped.model.findoneandremove_2.md) |  |
|  [findOneAndRemove(this, conditions, options, callback)](./goosetyped.model.findoneandremove_3.md) |  |
|  [findOneAndUpdate(this)](./goosetyped.model.findoneandupdate.md) | Issues a mongodb findAndModify update command. Finds a matching document, updates it according to the update arg, passing any options, and returns the found document (if any) to the callback. The query executes immediately if callback is passed else a Query object is returned.<!-- -->+ If mongoose option 'useFindAndModify': set to false it uses native findOneAndUpdate() rather than the deprecated findAndModify(). + https://mongoosejs.com/docs/api.html\#mongoose\_Mongoose-set |
|  [findOneAndUpdate(this, conditions, update, callback)](./goosetyped.model.findoneandupdate_1.md) |  |
|  [findOneAndUpdate(this, conditions, update, options, callback)](./goosetyped.model.findoneandupdate_2.md) |  |
|  [findOneAndUpdate(this, conditions, update, options, callback)](./goosetyped.model.findoneandupdate_3.md) |  |
|  [findOneAndUpdate(this, conditions, update, options, callback)](./goosetyped.model.findoneandupdate_4.md) |  |
|  [findOneAndUpdate(this, conditions, update, options, callback)](./goosetyped.model.findoneandupdate_5.md) |  |
|  [geoSearch(this, conditions, options, callback)](./goosetyped.model.geosearch.md) | Implements $geoSearch functionality for Mongoose |
|  [hydrate(this, obj)](./goosetyped.model.hydrate.md) | Shortcut for creating a new Document from existing raw data, pre-saved in the DB. The document returned has no paths marked as modified initially. |
|  [init(this, callback)](./goosetyped.model.init.md) | Performs any async initialization of this model against MongoDB. This function is called automatically, so you don't need to call it. This function is also idempotent, so you may call it to get back a promise that will resolve when your indexes are finished building as an alternative to <code>MyModel.on('index')</code> |
|  [insertMany(this, docs, callback)](./goosetyped.model.insertmany.md) | Shortcut for validating an array of documents and inserting them into MongoDB if they're all valid. This function is faster than .create() because it only sends one operation to the server, rather than one for each document. This function does not trigger save middleware. |
|  [insertMany(this, docs, options, callback)](./goosetyped.model.insertmany_1.md) |  |
|  [insertMany(this, doc, callback)](./goosetyped.model.insertmany_2.md) |  |
|  [insertMany(this, doc, options, callback)](./goosetyped.model.insertmany_3.md) |  |
|  [mapReduce(this, o, callback)](./goosetyped.model.mapreduce.md) | Executes a mapReduce command. |
|  [populate(this, docs, options, callback)](./goosetyped.model.populate.md) | Populates document references. |
|  [populate(docs, options, callback)](./goosetyped.model.populate_1.md) |  |

