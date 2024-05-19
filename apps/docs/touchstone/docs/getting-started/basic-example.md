---
id: basic-example
title: Basic Usage
sidebar_label: 3. Basic Usage
---
import { DocLink } from 'doc-components';

To run a benchmark you need

- At least one benchmark **Case**
- At least one **Suite**, grouping the case/s.
- A touchstone configuration container, used for configuration, composition, etc... (not mandatory)

We start with a **Suite** and 2 **Cases** benchmarks:

```typescript
import { Suite, Case, touchStone } from '@pebula/touchstone';

@Suite({ name: 'My First Benchmark Suite' })
class MyFirstBenchmarkSuite {
 @Case({ name: 'my-first-benchmark' })
  firstBenchmark() {
    /* Benchmarking... */
  }

  @Case()
  async secondBenchmark() {
     // Will automatically detect that it's async. Name is taken from method name.
    /* Benchmarking... */
  }
}

// await touchStone(); // for top level await
touchStone()
    .then( () => console.log('Done') )
    .catch( err => console.error(err) );
```

We can add more suites with cases or add cases to the existing suite.

At this point we can call `await touchStone()` to execute the suite/s.  
`touchStone()` will run go over all suites and execute all cases within each suite.

Something is missing though, it will not report anything, we need a **reporter** for that...

## Reports

Reporters are used to output the statistics and result of the suite/s, case/s and other metadata collected in the benchmarking process.

Each report implements it's own output medium, let's add the default console reporter:

```typescript
import { Suite, Case, SimpleConsoleReporter } from '@pebula/touchstone';

@Suite({ name: 'My First Benchmark Suite' })
class MyFirstBenchmarkSuite extends Mixin(SimpleConsoleReporter) {
 @Case({ name: 'my-first-benchmark' })
  firstBenchmark() {
    /* Benchmarking... */
  }

  @Case()
  async secondBenchmark() {
     // Will automatically detect that it's async. Name is taken from method name.
    /* Benchmarking... */
  }
}
```

Note that all we do here is **extend** our suite with the reporter class using the `Mixin` function.

:::tip

- A report can output to multiple mediums, it is up to the implementation of each report
- You can **mixin** multiple reports.

:::


This is pretty simple and will work with multiple suite's as well.  
You can configure a different reporter for different suites but it is also harder to manage.

To help managing the suite, creating a shared configuration and automate execution use the <DocLink to="docs/using-touchstone/suite-container">suite container</DocLink>.

:::info

A reporter is nothing but a class which hooks into life cycle events from the benchmarking process.

:::

You can read more about reporters, starting from the <DocLink to="docs/reporters/introduction">reporters introduction</DocLink>
