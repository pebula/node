<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@pebula/goosetyped](./goosetyped.md) &gt; [ModelExtensions](./goosetyped.modelextensions.md) &gt; [deleteOne](./goosetyped.modelextensions.deleteone.md)

## ModelExtensions.deleteOne() method

Deletes the first document that matches `conditions` from the collection. Behaves like `remove()`<!-- -->, but deletes at most one document regardless of the `single` option.

**Signature:**

```typescript
deleteOne<T>(this: Ctor<T>, filter?: M.FilterQuery<T>, options?: (mongodb.DeleteOptions & M.MongooseBaseQueryOptions<T>) | null): DocumentQuery<mongodb.DeleteResult, M.HydratedDocument<T, TVirtuals & TInstanceMethods, TQueryHelpers>, TQueryHelpers, T, 'deleteOne'> & TQueryHelpers;
```

## Parameters

<table><thead><tr><th>

Parameter


</th><th>

Type


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

this


</td><td>

[Ctor](./goosetyped.ctor.md)<!-- -->&lt;T&gt;


</td><td>


</td></tr>
<tr><td>

filter


</td><td>

M.FilterQuery&lt;T&gt;


</td><td>

_(Optional)_


</td></tr>
<tr><td>

options


</td><td>

(mongodb.DeleteOptions &amp; M.MongooseBaseQueryOptions&lt;T&gt;) \| null


</td><td>

_(Optional)_


</td></tr>
</tbody></table>
**Returns:**

DocumentQuery&lt;mongodb.DeleteResult, M.HydratedDocument&lt;T, TVirtuals &amp; TInstanceMethods, TQueryHelpers&gt;, TQueryHelpers, T, 'deleteOne'&gt; &amp; TQueryHelpers
