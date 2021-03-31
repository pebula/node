<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@pebula/goosetyped](./goosetyped.md) &gt; [Model](./goosetyped.model.md) &gt; [mapReduce](./goosetyped.model.mapreduce.md)

## Model.mapReduce() method

Executes a mapReduce command.

<b>Signature:</b>

```typescript
mapReduce<Key, Value, T extends Document>(this: Ctor<T>, o: MapReduceOptions<T, Key, Value>, callback?: (err: any, res: any) => void): Promise<any>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  this | [Ctor](./goosetyped.ctor.md)<!-- -->&lt;T&gt; |  |
|  o | MapReduceOptions&lt;T, Key, Value&gt; | an object specifying map-reduce options |
|  callback | (err: any, res: any) =&gt; void |  |

<b>Returns:</b>

Promise&lt;any&gt;
