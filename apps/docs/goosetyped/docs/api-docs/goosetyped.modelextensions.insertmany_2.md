<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@pebula/goosetyped](./goosetyped.md) &gt; [ModelExtensions](./goosetyped.modelextensions.md) &gt; [insertMany](./goosetyped.modelextensions.insertmany_2.md)

## ModelExtensions.insertMany() method

**Signature:**

```typescript
insertMany<T>(this: Ctor<T>, doc: Array<T>, options: M.InsertManyOptions & {
        ordered: false;
        rawResult: true;
    }): Promise<mongodb.InsertManyResult<M.Require_id<T>> & {
        mongoose: {
            validationErrors: (M.CastError | M.Error.ValidatorError)[];
            results: Array<M.Error | Object | M.HydratedDocument<T, TVirtuals & TInstanceMethods, TQueryHelpers>>;
        };
    }>;
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

doc


</td><td>

Array&lt;T&gt;


</td><td>


</td></tr>
<tr><td>

options


</td><td>

M.InsertManyOptions &amp; \{ ordered: false; rawResult: true; }


</td><td>


</td></tr>
</tbody></table>
**Returns:**

Promise&lt;mongodb.InsertManyResult&lt;M.Require\_id&lt;T&gt;&gt; &amp; \{ mongoose: \{ validationErrors: (M.CastError \| M.Error.ValidatorError)\[\]; results: Array&lt;M.Error \| Object \| M.HydratedDocument&lt;T, TVirtuals &amp; TInstanceMethods, TQueryHelpers&gt;&gt;; }; }&gt;

