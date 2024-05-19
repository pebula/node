<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@pebula/touchstone](./touchstone.md) &gt; [CaseMetadataArgs](./touchstone.casemetadataargs.md) &gt; [variants](./touchstone.casemetadataargs.variants.md)

## CaseMetadataArgs.variants property

A list of variants that will run in the suite, each as a separate case. I.E. run the same method as a new case but with a different benchmark configuration set.

&gt; Note that each variant must have a unique name across the entire suite and must not match the original name or any other variant name for this method and other methods within the Suite.

&gt; Note that filters apply on each variant like it will on any regular case.

**Signature:**

```typescript
variants?: Array<Required<Omit<CaseMetadataArgs, 'variants'>>>;
```