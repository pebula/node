<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@pebula/goosetyped](./goosetyped.md) &gt; [ModelExtensions](./goosetyped.modelextensions.md) &gt; [countDocuments](./goosetyped.modelextensions.countdocuments.md)

## ModelExtensions.countDocuments() method

Creates a `countDocuments` query: counts the number of documents that match `filter`<!-- -->.

**Signature:**

```typescript
countDocuments<T>(this: Ctor<T>, filter?: M.FilterQuery<T>, options?: (mongodb.CountOptions & M.MongooseBaseQueryOptions<T>) | null): DocumentQuery<number, M.HydratedDocument<T, TVirtuals & TInstanceMethods, TQueryHelpers>, TQueryHelpers, T, 'countDocuments'> & TQueryHelpers;
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

(mongodb.CountOptions &amp; M.MongooseBaseQueryOptions&lt;T&gt;) \| null


</td><td>

_(Optional)_


</td></tr>
</tbody></table>
**Returns:**

DocumentQuery&lt;number, M.HydratedDocument&lt;T, TVirtuals &amp; TInstanceMethods, TQueryHelpers&gt;, TQueryHelpers, T, 'countDocuments'&gt; &amp; TQueryHelpers

