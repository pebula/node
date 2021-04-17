---
id: example
title: Real Life Example
sidebar_label: 5. Real Life Example
---

```typescript
class X {
  @P.optional.default(50) value: number
}
```

The fluent API decorator expression above is a valid expression from the library `@pebula/tom`.  
It is defined within `@pebula/tom` using `@pebula/decorate/fluent`.

The expression tells `@pebula/tom` that the property `value` is optional and it has the default value 50.  
This enables validation, serialization, etc... to be done by `@pebula/tom`.

```typescript
import { FluentMethodPlugin, FluentPropertyPlugin, ApiMixin } from '@pebula/decorate/fluent';

export class PropertyMetadataSchema {
  defaultValue?: any;
  optional?: boolean
}

export abstract class PropertyMetadataApi extends ApiMixin.MixinBase<PropertyMetadataSchema> {
  @FluentPropertyPlugin()
  get optional(): this {
    this.$$context.schema.optional = true;
    return this;
  }

  @FluentMethodPlugin()
  default(value: any): this {
    this.$$context.schema.defaultValue = value;
    return this;
  }
}
```

We ignore the mixin expression for now...  
All we need to know is that `this.$$context.schema` has the `optional` property typed because of the mixin expression.

Now, when `@pebula/tom` wants to build a schema for the class `X` it will query for 

Moving on... `@pebula/tom/validation` is a validation library based on `@pebula/tom`, if imported it will extend the fluent API so the following expression is valid:

```typescript
class X {
  @P.optional.default(50).min(5).max(5000).not.equal(999) value: number
}
```

The expression tells `@pebula/tom/validation` that on top of what known already (optional, default) the value must also
be between 5 and 5000 but not 999.

- Yes, the entire API is type-safe with full intellisense support!  
- Yes, we extended both **design time** type information and **runtime support** for the extension methods (min, max, equal, not)

:::info
If `@pebula/tom/validation` is not imported, the expression would cause a TypeScript compilation (design time) error.
:::

The API is defined using `@pebula/decorate/fluent`, mostly in `@pebula/tom` but it is so powerful that
