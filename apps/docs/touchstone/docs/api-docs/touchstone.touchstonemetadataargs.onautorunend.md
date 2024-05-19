<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@pebula/touchstone](./touchstone.md) &gt; [TouchStoneMetadataArgs](./touchstone.touchstonemetadataargs.md) &gt; [onAutoRunEnd](./touchstone.touchstonemetadataargs.onautorunend.md)

## TouchStoneMetadataArgs.onAutoRunEnd property

The action to when auto run (`manualRun` is not true) has finished.

- processExit: Exist the process - ignore: Do nothing - Function: Invoke a handler function

 processExist

**Signature:**

```typescript
onAutoRunEnd?: 'processExit' | 'ignore' | ((err?: Error) => void);
```