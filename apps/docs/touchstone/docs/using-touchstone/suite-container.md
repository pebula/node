---
id: suite-container
title: Suite Container
sidebar_label: 1. Suite Container
---

A configuration container allows sharing benchmark execution configuration, reporters and other settings between suites.

```typescript
import { TouchStone, SimpleConsoleReporter } from '@pebula/touchstone';
import './suites'; // make sure all suites are loaded

@TouchStone()
class MyPerformanceTest extends Mixin(SimpleConsoleReporter) {
  benchmarkOptions = {
    delay: 0.5,
    initCount: 5,
  };
}
```

Here we assume that suites are defined in the `./suites` folder, we import them and the container will automatically detect them.  

Benchmarking will automatically start on the next JS tick.

## Benchmark options

We can define the default benchmark options (`benchmarkOptions`) which will apply to all suites and cases.

:::tip
You can define the `benchmarkOptions` per **Suite** and/or per **Case**, at each level the options from the parent level are cloned and the new
options are merged into them (overridden).
:::

:::info
Note that the container `MyPerformanceTest` get instantiated and the instance is used as the context (`this`) for all life cycle events by default.
This is also true for classes decorated with **Suite**, i.e. life cycle events defined on the **Suite** share a context (`this`).
:::

:::warning
By default, **@Case()** methods are **NOT** invoked with a context, even though they are class members.
This is done to prevent any impact on the benchmark results.

If you wish to provide the suite's instance to the case method, same as done for life cycle methods you need to set
the `caseInvokeType` property in the `@Suite()` metadata argument parameter.

```typescript
@Suite({ caseInvokeType: 'method' })
class MyCase {
  private myProp: number;

  @OnStart()
  start() {
    this.myProp = 99; // can also be done in the constructor
  }

  @Case()
  validate() {
    const oneHundred = this.myProp + 1;
    // oneHundred -> 100
  }
}
```

It is recommended to initialize suite's in the `@OnStart` life cycle event and not in the constructor.
This way you will never define a constructor in a mixin class, which in the case of mixins never run!
:::

## Manual Run

You can disable the automatic benchmark execution by enabling manual run:

```typescript

@TouchStone({ manualRun: true })
class MyPerformanceTest extends Mixin(SimpleConsoleReporter) {
}
```
