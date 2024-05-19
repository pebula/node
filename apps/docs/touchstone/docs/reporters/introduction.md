---
id: introduction
title: Introduction
sidebar_label: 1. Introduction
---
import { DocLink } from 'doc-components';

Reporters are used to output the statistics and result of the suite/s, case/s and other metadata collected in the benchmarking process.

Each report implements it's own output medium (console, file, network, etc...).  
A reporter can output into multiple mediums and you can assign any number of reporters to your suite/container.

**Touchstone** comes with one built in reporter and additional external built-in reports which are
physically part of the `@pebula/touchstone` package but are not imported from the main module.

:::info
This is by design to prevent dependency hell since some reporters require additional 3rd party node modules which are not required by the core module.
:::

## Using a reporter

To use a reporter just mix it into a suite/container and it will just work.

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

:::info
Note that some reporter are configurable (optional or required).
This is done through properties or methods provided on the mixin host.

See the documentation for each reporter for details.
:::

## External Built-In reporters

An external built-int reporter is a reporter which is available when you install the `@pebula/touchstone` module
but not as part of the core module. **I.E.** You can't import it from `@pebula/touchstone` directly.  

For example, to use <DocLink to="docs/reporters/pretty-console-reporter">`PrettyConsoleReporter`</DocLink> import it from `@pebula/touchstone/reporters/pretty-console`.

Some external reporters require dependencies and some not, see the documentation for each one to better understand each reporter and the requirements for it.

:::warning
If an external built-in reporter require dependencies you must install them.  
The dependencies of all external built-in reporters are part of the **peerDependencies** list of the core module.
:::

## Customizing your own reporter

It is easy to customize your own reporter.  
In fact, all reports are "customized" using the same customization format.

**A reporter is nothing but a class hooked into life-cycle events**

Here's the gist of it:

```typescript
import {
  OnStart,
  OnCaseComplete,
  OnComplete,
  OnTouchStoneStart,
  OnTouchStoneEnd,
  OnError,
  SuiteStartEvent,
  CaseCompleteEvent,
  SuiteErrorEvent,
  SuiteCompleteEvent,
  TouchStoneStartEvent,
  TouchStoneEndEvent
} from '@pebula/touchstone';

export abstract class SimpleConsoleReporter {

  @OnTouchStoneStart() // Do something when we start benchmarking
  onSimpleConsoleReporterInitialize(event: TouchStoneStartEvent) { }

  @OnStart() // Do something when we start benchmarking a new suite
  onSimpleConsoleReporterStart(event: SuiteStartEvent) { }

  @OnCaseComplete() // Do something when we end benchmarking a case
  onSimpleConsoleReporterCycle(event: CaseCompleteEvent) { }

  @OnError() // Do something when there is an error while benchmarking
  onSimpleConsoleReporterError(event: SuiteErrorEvent) { }

  @OnComplete() // Do something when we end benchmarking a suite
  onSimpleConsoleReporterComplete(event: SuiteCompleteEvent) { }

  @OnTouchStoneEnd() // Do something when all suites are benchmarked and we're about to end the process
  onSimpleConsoleReporterFinalize(event: TouchStoneEndEvent) { }

}
```

> Note that not all events we're used in the above template
