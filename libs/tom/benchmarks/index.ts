import * as FS from 'fs';
import simpleGit from 'simple-git';

import { TouchStone, Mixin, TouchStoneEndEvent, OnTouchStoneEnd } from '@pebula/touchstone';
import { PrettyConsoleReporter } from '@pebula/touchstone/reporters/pretty-console';

import './internal-benchmarks';
import './compare';
import './js';

const suiteFilterIndex = process.argv.findIndex( a => a.startsWith('--suite'));
const filter = suiteFilterIndex > -1 ? process.argv[suiteFilterIndex] : '';

@TouchStone()
class TestRun extends Mixin(PrettyConsoleReporter) {
  benchmarkOptions = {
    initCount: 5,
  };

  suites: string | string[] | RegExp | RegExp[] | ((name: string) => boolean) = filter
    ? new RegExp(filter.match(/--suite=?(.+)/)[1].trim())
    : undefined
  ;

  @OnTouchStoneEnd()
  async onVegaLiteReporterFinalize(event: TouchStoneEndEvent) {
    const file = `${__dirname}/benchmarks.json`;
    const benchmarks = FS.existsSync(file) ? JSON.parse(FS.readFileSync(file, { encoding: 'utf8' })) : {};

    const git = simpleGit();

    const log = await git.log({ file: './libs/tom'});

    const curr = benchmarks[log.latest.hash] || {};

    const commitDate = new Date(log.latest.date);
    curr.__commitDate = commitDate.toJSON();
    curr.__runDate = new Date().toJSON();

    for (const suite of event.results) {
      const suiteBench = curr[suite.name] || {};

      for (const c of suite.cases) {
        const caseBench = suiteBench[c.name] || {};
        const { timing, stats, hz, hzDeviation } = c;
        const newStats = Object.assign({}, stats);
        delete newStats['sample'];
        Object.assign(caseBench, { timing, stats: newStats, hz, hzDeviation });
        suiteBench[c.name] = caseBench;
      }

      curr[suite.name] = suiteBench;
    }

    benchmarks[log.latest.hash] = curr;

    FS.writeFileSync(file, JSON.stringify(benchmarks, null, 2), { encoding: 'utf8' });
  }
}
