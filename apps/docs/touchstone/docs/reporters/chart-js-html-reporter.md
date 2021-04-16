---
id: chart-js-html-reporter
title: ChartJS HTML Reporter
sidebar_label: 4. ChartJS HTML Reporter
---

The `ChartJsHtmlReporter` is a charting reporter which outputs an HTML file that uses the `CharJS` charting library.

|               |                                                                                  |
|---------------|----------------------------------------------------------------------------------|
| Import        | import { ChartJsHtmlReporter } from '@pebula/touchstone/reporters/chart-js-html' |
| Dependencies  | None                                                                             |
| Configuration | Optional                                                                         |

## Configuration

There is only **one optional** configuration available, which controls the HTML file output location.

The default output is set to `"benchmark-chart.html"`, which resolved to the current working directory and this filename.

To change the output path set the `chartJsHtmlReporterOutputFile` property on the mixin host to the path you would like to save the file to.  
If you set a relative path it will be relative to the current working directory (the folder which executed the process).

```typescript
import { TouchStone } from '@pebula/touchstone';
import { ChartJsHtmlReporter } from '@pebula/touchstone/chart-js-html';
import './suites'; // make sure all suites are loaded

@TouchStone()
class MyPerformanceTest extends Mixin(ChartJsHtmlReporter) {
  chartJsHtmlReporterOutputFile = `./my-custom-path.html';
}
```
