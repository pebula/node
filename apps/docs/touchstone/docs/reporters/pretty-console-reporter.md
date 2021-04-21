---
id: pretty-console-reporter
title: Pretty Console Reporter
sidebar_label: 3. Pretty Console Reporter
---
import useBaseUrl from '@docusaurus/useBaseUrl';

The `PrettyConsoleReporter` is a modern CLI console reporter with colors, indentation, spinner and other nice things...

|               |                                                                                     |
|---------------|-------------------------------------------------------------------------------------|
| Import        | import { PrettyConsoleReporter } from '@pebula/touchstone/reporters/pretty-console' |
| Dependencies  | ora, chalk                                                                          |
| Configuration | No                                                                                  |

```typescript
import { TouchStone } from '@pebula/touchstone';
import { PrettyConsoleReporter } from '@pebula/touchstone/pretty-console';
import './suites'; // make sure all suites are loaded

@TouchStone()
class MyPerformanceTest extends Mixin(PrettyConsoleReporter) {
}
```

<img alt="Pretty Console Reporter" src={useBaseUrl('img/pretty-console-report.gif')} />
