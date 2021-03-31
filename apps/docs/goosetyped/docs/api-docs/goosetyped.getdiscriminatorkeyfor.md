<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@pebula/goosetyped](./goosetyped.md) &gt; [getDiscriminatorKeyFor](./goosetyped.getdiscriminatorkeyfor.md)

## getDiscriminatorKeyFor() function

Returns the discriminator key for the provided Model / Resource. Only valid for discriminator implementation, thr base class will not yield a value.

<b>Signature:</b>

```typescript
export declare function getDiscriminatorKeyFor(modelClass: Ctor<any>): string | undefined;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  modelClass | [Ctor](./goosetyped.ctor.md)<!-- -->&lt;any&gt; |  |

<b>Returns:</b>

string \| undefined
