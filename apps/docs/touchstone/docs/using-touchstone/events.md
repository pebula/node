---
id: events
title: Events
sidebar_label: 3. Events
---

Life cycle events are called on various steps of the benchmarking process.  
We register to an event by decorating it with the relevant decorator to the event we want to register to.

Each event is fired with a fully typed event object, some are enriched (from `benchmark.js`) and some are passed as is.

:::tip
Except `OnTouchStoneStart` and `OnTouchStoneEnd` all events are originated from `benchmark.js`, you can also
read the documentation from `benchmark.js` to get better insight on each event.
:::

Here's a template class with all event decorators and event objects hooked:

```typescript
import {
  OnStart,
  OnCaseComplete,
  OnComplete,
  OnTouchStoneStart,
  OnTouchStoneEnd,
  OnError,
  OnAbort,
  OnReset,
  SuiteStartEvent,
  CaseCompleteEvent,
  SuiteErrorEvent,
  SuiteAbortEvent,
  SuiteResetEvent,
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

  @OnAbort() // Do something when there is an abort signal
  onSimpleConsoleReporterAbort(event: SuiteAbortEvent) { }

  @OnReset() // Do something when there is a benchmark.js reset event
  onSimpleConsoleReporterReset(event: OnAbort) { }

  @OnComplete() // Do something when we end benchmarking a suite
  onSimpleConsoleReporterComplete(event: SuiteCompleteEvent) { }

  @OnTouchStoneEnd() // Do something when all suites are benchmarked and we're about to end the process
  onSimpleConsoleReporterFinalize(event: TouchStoneEndEvent) { }

}
```

## Naming event methods

Since most classes in touchstone are destined to be mixed in to a main container class, it is best to
set unique names to your decorated methods.

This is true to all events but for decorated `Case` methods as well.

This will prevent type conflicts when mixing them all into a single class.
