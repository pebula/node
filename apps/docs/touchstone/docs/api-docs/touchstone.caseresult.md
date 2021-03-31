<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@pebula/touchstone](./touchstone.md) &gt; [CaseResult](./touchstone.caseresult.md)

## CaseResult interface

<b>Signature:</b>

```typescript
export interface CaseResult 
```

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [benchmarkOptions](./touchstone.caseresult.benchmarkoptions.md) | [BenchmarkOptions](./touchstone.benchmarkoptions.md) | The benchmark options used to run this case. |
|  [hz](./touchstone.caseresult.hz.md) | number | The number of executions per second. (Operations Per Second)  https://benchmarkjs.com/docs\#prototype\_hz |
|  [hzDeviation](./touchstone.caseresult.hzdeviation.md) | number |  |
|  [hzSamples](./touchstone.caseresult.hzsamples.md) | number\[\] |  |
|  [name](./touchstone.caseresult.name.md) | string |  |
|  [stats](./touchstone.caseresult.stats.md) | [CaseStats](./touchstone.casestats.md) | An object of stats including mean, margin or error, and standard deviation. |
|  [timing](./touchstone.caseresult.timing.md) | Times | An object of timing data including cycle, elapsed, period, start, and stop.  https://benchmarkjs.com/docs\#prototype\_times |
|  [variantParent](./touchstone.caseresult.variantparent.md) | string | Indicates (when truthy) if the current case is a variant case. If truthy, the actual value represents the name of the root case which it is a variant of. |
