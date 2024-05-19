---
id: basic-usage
title: Basic Usage
sidebar_label: 2. Basic Usage
---
import { DocLink } from 'doc-components';

```typescript
import { P, defaultValidator } from '@pebula/tom/serialization';

export class BasicModelTom {
  @P number: number;
  @P.negative negNumber: number;
  @P.max(500) maxNumber: number;
  @P.asArray('string') strings: string[];
  @P longString: string;
  @P boolean: boolean;
  @P.as(() => BasicModelNestedTom) deeplyNested: BasicModelNested;
}

export class BasicModelNestedTom {
  @P foo: string;
  @P num: number;
  @P bool: boolean;
}

const validator = defaultValidator.factory(BasicModelTom);

const model = {
  number: 1,
  negNumber: -1,
  maxNumber: 200,
  strings: ['a', 'b', 'c'],
  longString: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation...',
  boolean: true,
  deeplyNested: {
    foo: 'bar',
    num: 1,
    bool: false
  }
};

const result = validator(model);
if (result !== true) {
  // result contains errors 
}
```
