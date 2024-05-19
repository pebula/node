<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@pebula/goosetyped](./goosetyped.md) &gt; [GtColumnMetadataArgs](./goosetyped.gtcolumnmetadataargs.md) &gt; [skipVersioning](./goosetyped.gtcolumnmetadataargs.skipversioning.md)

## GtColumnMetadataArgs.skipVersioning property

Allows excluding paths from versioning (i.e., the internal revision will not be incremented even if these paths are updated). DO NOT do this unless you know what you're doing. For sub-documents, include this on the parent document using the fully qualified path.

You can also use the dedicated decorator `@SkipVersioning()`  https://mongoosejs.com/docs/4.x/docs/guide.html\#skipVersioning

**Signature:**

```typescript
skipVersioning?: boolean;
```