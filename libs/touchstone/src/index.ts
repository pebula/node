import 'reflect-metadata';

export { Mixin } from './lib/decoration';

export {
  BenchmarkOptions,
} from './lib/interfaces';

export {
  TouchStone, TouchStoneMetadataArgs, TouchStoneRun,
  Suite, SuiteMetadataArgs,
  Case, CaseMetadataArgs,
  OnTouchStoneStart, OnTouchStoneEnd,
  OnStart, OnCaseComplete, OnAbort, OnError, OnReset, OnComplete, NoopMetadataArgs,
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

