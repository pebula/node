<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@pebula/goosetyped](./goosetyped.md) &gt; [ModelExtensions](./goosetyped.modelextensions.md) &gt; [insertMany](./goosetyped.modelextensions.insertmany.md)

## ModelExtensions.insertMany() method

Inserts one or more new documents as a single `insertMany` call to the MongoDB server.

**Signature:**

```typescript
insertMany<T>(this: Ctor<T>, docs: Array<T>): Promise<Array<M.HydratedDocument<T, TVirtuals & TInstanceMethods, TQueryHelpers>>>;
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

docs


</td><td>

Array&lt;T&gt;


</td><td>


</td></tr>
</tbody></table>
**Returns:**

Promise&lt;Array&lt;M.HydratedDocument&lt;T, TVirtuals &amp; TInstanceMethods, TQueryHelpers&gt;&gt;&gt;

