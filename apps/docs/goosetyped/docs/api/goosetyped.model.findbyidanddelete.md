<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@pebula/goosetyped](./goosetyped.md) &gt; [Model](./goosetyped.model.md) &gt; [findByIdAndDelete](./goosetyped.model.findbyidanddelete.md)

## Model.findByIdAndDelete() method

Issue a mongodb findOneAndDelete command by a document's \_id field. findByIdAndDelete(id, ...) is equivalent to findByIdAndDelete(<!-- -->{ \_id: id }<!-- -->, ...). Finds a matching document, removes it, passing the found document (if any) to the callback. Executes immediately if callback is passed, else a Query object is returned.

Note: same signatures as findByIdAndRemove

<b>Signature:</b>

```typescript
findByIdAndDelete<T extends Document>(this: Ctor<T>): DocumentQuery<T | null, T, QueryHelpers> & QueryHelpers;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  this | [Ctor](./goosetyped.ctor.md)<!-- -->&lt;T&gt; |  |

<b>Returns:</b>

DocumentQuery&lt;T \| null, T, QueryHelpers&gt; &amp; QueryHelpers
