<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@pebula/goosetyped](./goosetyped.md) &gt; [Model](./goosetyped.model.md) &gt; [findByIdAndRemove](./goosetyped.model.findbyidandremove_2.md)

## Model.findByIdAndRemove() method

<b>Signature:</b>

```typescript
findByIdAndRemove<T extends Document>(this: Ctor<T>, id: any | number | string, options: QueryOptions, callback?: (err: any, res: mongodb.FindAndModifyWriteOpResultObject<T | null>) => void): DocumentQuery<T | null, T, QueryHelpers> & QueryHelpers;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  this | [Ctor](./goosetyped.ctor.md)<!-- -->&lt;T&gt; |  |
|  id | any \| number \| string |  |
|  options | QueryOptions |  |
|  callback | (err: any, res: mongodb.FindAndModifyWriteOpResultObject&lt;T \| null&gt;) =&gt; void |  |

<b>Returns:</b>

DocumentQuery&lt;T \| null, T, QueryHelpers&gt; &amp; QueryHelpers
