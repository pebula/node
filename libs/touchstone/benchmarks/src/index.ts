import * as Path from 'path';
import * as FS from 'fs';
import { TouchStone, Suite, OnTouchStoneStart, OnStart, Mixin, SimpleConsoleReporter, TouchStoneStartEvent, SuiteStartEvent } from '@pebula/touchstone';
import { VegaLiteReporter } from '@pebula/touchstone/reporters/vega-lite';
import { ALL } from './cases';
import { createData } from './data';

@Suite({ name: 'Runtime Validation and Typescript Support', caseInvokeType: 'method' })
class TestSuite extends Mixin(...ALL) {
  @OnStart()
  onStart(event: SuiteStartEvent) {
    this.data = createData();
  }
}

@TouchStone()
class TestRun extends Mixin(SimpleConsoleReporter, VegaLiteReporter) {
  benchmarkOptions = {
    delay: 0.5,
    initCount: 5,
  };

  private vegaDestFile: string;

  @OnTouchStoneStart()
  onTouchStoneStart(event: TouchStoneStartEvent) {
    const vegaDestFile = process.argv.find( a => a.startsWith('--vegaDestFile') );
    this.vegaDestFile = vegaDestFile?.match(/--vegaDestFile.(.+)/)?.[1] || process.env['vegaDestFile'];

    if (!this.vegaDestFile) {
      throw new TypeError('Missing input argument "vegaDestFile", not found in argc and environment ')
    }
  }

  getVegaLiteReporterFileOrientation() {
    return 'vertical' as 'vertical';
  }

  getVegaLiteReporterFilename(): string {
    const destFile = Path.join(process.cwd(), this.vegaDestFile);
    const destDir = Path.dirname(destFile);

    if (!FS.existsSync(destDir)) {
      FS.mkdirSync(destDir, { recursive: true });
    }
    return this.vegaDestFile;
  }

}
