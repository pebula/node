import 'reflect-metadata';

export { Mixin } from '@pebula/decorate';

export {
  BenchmarkOptions,
} from './lib/interfaces';

export {
  TouchStone, TouchStoneMetadataArgs, TouchStoneRun,
  Suite, SuiteMetadataArgs,
  Case, CaseMetadataArgs,
  OnTouchStoneStart, OnTouchStoneEnd,
  OnStart, OnCaseComplete, OnAbort, OnError, OnReset, OnComplete,
} from './lib/decorators';

export {
  SuiteResult,
  CaseResult, CaseStats,
} from './lib/result';

export { SimpleConsoleReporter } from './lib/reporters';

export {
  CaseCompleteEvent,
  SuiteStartEvent,
  SuiteAbortEvent,
  SuiteCompleteEvent,
  SuiteErrorEvent,
  SuiteResetEvent,
  TouchStoneStartEvent, TouchStoneEndEvent,
  touchStone
} from './lib/runner';

