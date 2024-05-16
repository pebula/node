<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@pebula/goosetyped](./goosetyped.md) &gt; [ModelExtensions](./goosetyped.modelextensions.md) &gt; [findById](./goosetyped.modelextensions.findbyid.md)

## ModelExtensions.findById() method

Finds a single document by its \_id field. `findById(id)` is almost\* equivalent to `findOne({ _id: id })`<!-- -->. If you want to query by a document's `_id`<!-- -->, use `findById()` instead of `findOne()`<!-- -->.

**Signature:**

```typescript
findById<T, ResultDoc = M.HydratedDocument<T, TVirtuals & TInstanceMethods, TQueryHelpers>>(this: Ctor<T>, id: any, projection: M.ProjectionType<T> | null | undefined, options: M.QueryOptions<T> & {
        lean: true;
    }): DocumentQuery<M.GetLeanResultType<T, T, 'findOne'> | null, ResultDoc, TQueryHelpers, T, 'findOne'> & TQueryHelpers;
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

id


</td><td>

any


</td><td>


</td></tr>
<tr><td>

projection


</td><td>

M.ProjectionType&lt;T&gt; \| null \| undefined


</td><td>


</td></tr>
<tr><td>

options


</td><td>

M.QueryOptions&lt;T&gt; &amp; \{ lean: true; }


</td><td>


</td></tr>
</tbody></table>
**Returns:**

DocumentQuery&lt;M.GetLeanResultType&lt;T, T, 'findOne'&gt; \| null, ResultDoc, TQueryHelpers, T, 'findOne'&gt; &amp; TQueryHelpers
