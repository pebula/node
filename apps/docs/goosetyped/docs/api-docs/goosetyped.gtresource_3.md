<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@pebula/goosetyped](./goosetyped.md) &gt; [GtResource](./goosetyped.gtresource_3.md)

## GtResource() function

**Signature:**

```typescript
export declare function GtResource<T1, C1, T2, C2, T3, C3>(m1: C1 & Ctor<T1>, m2: C2 & Ctor<T2>, m3: C3 & Ctor<T3>): Ctor<SubDocument & T1 & T2 & T3> & Resource & C1 & C2 & C3;
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

m1


</td><td>

C1 &amp; [Ctor](./goosetyped.ctor.md)<!-- -->&lt;T1&gt;


</td><td>


</td></tr>
<tr><td>

m2


</td><td>

C2 &amp; [Ctor](./goosetyped.ctor.md)<!-- -->&lt;T2&gt;


</td><td>


</td></tr>
<tr><td>

m3


</td><td>

C3 &amp; [Ctor](./goosetyped.ctor.md)<!-- -->&lt;T3&gt;


</td><td>


</td></tr>
</tbody></table>
**Returns:**

[Ctor](./goosetyped.ctor.md)<!-- -->&lt;[SubDocument](./goosetyped.subdocument.md) &amp; T1 &amp; T2 &amp; T3&gt; &amp; [Resource](./goosetyped.resource.md) &amp; C1 &amp; C2 &amp; C3
