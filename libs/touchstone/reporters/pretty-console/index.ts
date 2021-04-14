import chalk from 'chalk';
import ora from 'ora';
import { Suite } from 'benchmark';
import { OnStart, OnCaseComplete, OnComplete, OnTouchStoneEnd, OnError } from '../../src/lib/decorators';
import { SuiteStartEvent, CaseCompleteEvent, SuiteErrorEvent, SuiteCompleteEvent, TouchStoneEndEvent } from '../../src/lib/runner/events';

class SuiteSession {
  currentCaseIndex = -1;
  readonly totalCaseCount: number
  readonly maxNameLength: number;

  currentCase: any;

  constructor(public readonly suite: Suite) {
    this.totalCaseCount = suite.length;
    this.next();

    let maxName = 0;
    for (let i = 0; i < this.totalCaseCount; i++) {
      maxName = Math.max(maxName, suite[i].name.length);
    }
    this.maxNameLength = maxName;
  }

  next(): boolean {
    this.currentCaseIndex += 1;
    if (this.currentCaseIndex < this.totalCaseCount) {
      this.currentCase = this.suite[this.currentCaseIndex];
      return !!this.currentCase;
    }
    return false;
  }
}

export abstract class PrettyConsoleReporter {

  private session: SuiteSession
  private spinner: ora.Ora;


  @OnStart()
  onPrettyConsoleReporterStart(event: SuiteStartEvent) {
    this.session = new SuiteSession(event.suite);

    console.log('\n');
    console.log(chalk.magenta.bold(`Suite: ${event.suite.name} [${event.suiteProgress.current}/${event.suiteProgress.total}]\n`));

    this.initCaseView();
  }

  @OnCaseComplete()
  onPrettyConsoleReporterCycle(event: CaseCompleteEvent) {
    this.logCaseResult(event);

    if (this.session.next()) {
      this.initCaseView();
      this.spinner.start();
    }
  }

  @OnError()
  onPrettyConsoleReporterError(event: SuiteErrorEvent) {
    console.error(event.error);
  }

  @OnComplete()
  onPrettyConsoleReporterComplete(event: SuiteCompleteEvent) {
    // console.log('======================================================================');
    // console.log(`Suite Ended: ${event.suite.name}`);
    // console.log('======================================================================');
    // console.log('\n');
  }

  @OnTouchStoneEnd()
  onPrettyConsoleReporterFinalize(event: TouchStoneEndEvent) {
    this.spinner?.info('Benchmark Finished!');
  }

  private initCaseView() {
    const name = this.session.currentCase.name;

    if (!this.spinner) {
      this.spinner = ora({ text: `Benchmarking ${name}` }).start();
    } else {
      this.spinner.text = `Benchmarking ${name}`;
    }
  }

  private logCaseResult(event: CaseCompleteEvent) {
    if (!!event.rawEvent.target['error']) {
      this.spinner.fail(String(event.rawEvent.target));
    } else {
      const caseResults = event.caseResult;

      const rme = caseResults.stats.rme.toFixed(2);
      const size = caseResults.stats.sample.length;
      this.spinner.succeed(`${this.session.currentCase.name.padEnd(this.session.maxNameLength + 5, ' ')} ${formatNumber(caseResults.hz.toFixed(caseResults.hz < 100 ? 2 : 0))} ops/sec (\xb1${rme}%) [${size} samples]`)
    }

  }
}

function formatNumber(number: number | string) {
  const str = String(number).split('.');
  return str[0].replace(/(?=(?:\d{3})+$)(?!\b)/g, ',') +
    (str[1] ? '.' + str[1] : '');
}
