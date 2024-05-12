<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@pebula/goosetyped](./goosetyped.md) &gt; [GtModel](./goosetyped.gtmodel_3.md)

## GtModel() function

<b>Signature:</b>

```typescript
export declare function GtModel<T1, C1, T2, C2, T3, C3>(m1: C1 & Ctor<T1>, m2: C2 & Ctor<T2>, m3: C3 & Ctor<T3>): Ctor<Document & T1 & T2 & T3> & Model & C1 & C2 & C3;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  m1 | C1 &amp; [Ctor](./goosetyped.ctor.md)<!-- -->&lt;T1&gt; |  |
|  m2 | C2 &amp; [Ctor](./goosetyped.ctor.md)<!-- -->&lt;T2&gt; |  |
|  m3 | C3 &amp; [Ctor](./goosetyped.ctor.md)<!-- -->&lt;T3&gt; |  |

<b>Returns:</b>

[Ctor](./goosetyped.ctor.md)<!-- -->&lt;Document &amp; T1 &amp; T2 &amp; T3&gt; &amp; [Model](./goosetyped.model.md) &amp; C1 &amp; C2 &amp; C3
