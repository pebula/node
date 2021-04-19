import '../src/index';
import { TouchStoneEndEvent } from '../src';
import { Suite, Case, OnStart, OnCaseComplete, OnComplete, TouchStone, OnTouchStoneEnd } from '../src/lib/decorators';
import { SuiteStartEvent, SuiteCompleteEvent, CaseCompleteEvent, touchStone } from '../src/lib/runner';

describe('@pebula/touchstone', () => {
  function promiser<T = any>() {
    const output: {
      promise: Promise<T>;
      resolve: (value: T) => void;
      reject: (error : Error | string) => void;
    } = {} as any;

    output.promise = new Promise<T>((res, rej) => {
      output.resolve = res;
      output.reject = rej;
    });

    return output;
  }

  it('should run from function and execute events and bench case', async () => {

    const p = promiser<void>();
    expect.assertions(4);

    let onStart = 0;
    let benchCase = 0;
    let onCaseComplete = 0;
    let onComplete = 0;

    @Suite()
    class TestSuite1 {
      @OnStart()
      onStart(event: SuiteStartEvent) {
        onStart += 1;
      }

      @Case({ name: 'test1' }) myCase1() {
        benchCase += 1;
      }

      @OnCaseComplete()
      onCaseComplete(event: CaseCompleteEvent) {
        onCaseComplete += 1;
      }

      @OnComplete()
      onComplete(event: SuiteCompleteEvent) {
        onComplete += 1;
      }
    }

    @TouchStone({
      onAutoRunEnd: 'ignore'
    })
    class TestBenchmarking {
      @OnTouchStoneEnd()
      onTouchStoneEnd(event: TouchStoneEndEvent) {
        expect(onStart).toBeGreaterThan(0);
        expect(benchCase).toBeGreaterThan(0);
        expect(onCaseComplete
        ).toBeGreaterThan(0);
        expect(onComplete).toBeGreaterThan(0);
        p.resolve();
      }
    }

    await p.promise;
  }, 1000 * 60);

  it('should run multiple suites', async () => {
    const p = promiser<void>();
    expect.assertions(5);

    const onStart = [];
    const benchCase = new Set<string>();
    const onCaseComplete = [];
    const onComplete = [];
    let autoRunFnInvoked = false;

    @Suite({ name: 'S1' })
    class TestSuite1 {
      @OnStart()
      onStart(event: SuiteStartEvent) {
        onStart.push(event.suite.name);
      }

      @Case({ name: 'test1-S1' }) myCase1() {
        benchCase.add('test1-S1');
      }

      @OnCaseComplete()
      onCaseComplete(event: CaseCompleteEvent) {
        onCaseComplete.push(event.suite.name);
      }

      @OnComplete()
      onComplete(event: SuiteCompleteEvent) {
        onComplete.push(event.suite.name);
      }
    }

    @Suite({ name: 'S2' })
    class TestSuite2 {
      @OnStart()
      onStart(event: SuiteStartEvent) {
        onStart.push(event.suite.name);
      }

      @Case({ name: 'test1-S2' }) myCase2() {
        benchCase.add('test1-S2');
      }
      @Case({ name: 'test2-S2' }) async myCase2b() {
        benchCase.add('test2-S2');
      }

      @OnCaseComplete()
      onCaseComplete(event: CaseCompleteEvent) {
        onCaseComplete.push(event.suite.name);
      }

      @OnComplete()
      onComplete(event: SuiteCompleteEvent) {
        onComplete.push(event.suite.name);
      }
    }

    @TouchStone({
      onAutoRunEnd: () => {
        autoRunFnInvoked = true;
        p.resolve();
      }
    })
    class TestBenchmarking {
      @OnTouchStoneEnd()
      onTouchStoneEnd(event: TouchStoneEndEvent) {
        expect(onStart).toStrictEqual(['S1', 'S2']);
        expect(Array.from(benchCase.values())).toStrictEqual(['test1-S1', 'test1-S2', 'test2-S2']);
        expect(onCaseComplete).toStrictEqual(['S1', 'S2', 'S2']);
        expect(onComplete).toStrictEqual(['S1', 'S2']);
      }
    }

    await p.promise;

    expect(autoRunFnInvoked).toBe(true);
  }, 1000 * 60);

});
