<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@pebula/touchstone](./touchstone.md) &gt; [SuiteMetadataArgs](./touchstone.suitemetadataargs.md) &gt; [caseInvokeType](./touchstone.suitemetadataargs.caseinvoketype.md)

## SuiteMetadataArgs.caseInvokeType property

Define how cases in the suite are invoked.

- function: Invoke like standalone function, no context (this) is set - method: Invoke as part of the class with the context (this). I.E: A new instance of the suite is created and used as the context for all cases.

**Signature:**

```typescript
caseInvokeType?: 'method' | 'function';
```