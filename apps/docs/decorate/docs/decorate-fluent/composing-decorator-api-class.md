---
id: composing-decorator-api-class
title: Decorator API Class Mixins
sidebar_label: 4. Decorator API Class Mixins
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { ExtRelativeLink } from 'doc-components';

In the previous page we create one big decorator API class with all of our plugins inside.  
This is not extensible enough, we want to be able to populate our API with predefined plugins which we can share, install etc...

This is exactly what the library is designed for!

## Mixins

A Mixin is small encapsulated logical container which implement a specific behavior which can be mixed into another class.  

With mixins we want to be able to write plugins in small, encapsulated and reuseable classes or better yet download them as a `node_module` package

We then import them and mix them onto our main **Fluent Decorator API** class adding their behavior to our API.

:::info Mixin 101
JavaScript does not allow multiple inheritance, a class may only extend from a single class.  
To workaround this limitation we use Mixins.

Mixins are classes which are not extends but merged into a host class extending their functionality (methods, accessors) onto the host.
Simply put, copying all of the property descriptors (static and prototype) onto the host class.

**There is one constraint with Mixins**, they are treated as abstract classes, never initialized nor their constructor invoked

Read more about mixins in the <a href="https://www.typescriptlang.org/docs/handbook/mixins.html" target="_blank">TypeScript Documentation for Mixins</a>
:::

The library provides all of the tools to handle mixins, including handling of the combined type of all mixins, through the namespaces `ApiMixin` & `SchemaMixin`.


## Decorator API Composition
Going back to our property class decorator API `MyPropertyDecoratorFluentApiClass`, let's re-write it to use mixin plugins instead of coding
them in the body

<Tabs
  defaultValue="api"
  values={[
    { label: 'Decorator API', value: 'api', },
    { label: './optional.ts', value: 'optional', },
    { label: './default.ts', value: 'default', },
  ]
}>

<TabItem value="api">

```typescript
import { PropertyDecoratorArgs } from '@pebula/decorate';
import { SchemaMixin, ApiMixin } from '@pebula/decorate/fluent';

import { OptionalSchemaConfig, OptionalPluginApi } from './options';
import { DefaultSchemaConfig, DefaultPluginApi } from './default';

export class MyPropertyDecoratorSchemaConfig extends SchemaMixin.Property().With(OptionalSchemaConfig, DefaultSchemaConfig) { }

export class MyPropertyDecoratorFluentApiClass extends ApiMixin.Property<MyPropertyDecoratorSchemaConfig>().With(OptionalPluginApi, DefaultPluginApi) {
  static schemaFactory(args: PropertyDecoratorArgs): MyPropertyDecoratorSchemaConfig {
    return new MyPropertyDecoratorSchemaConfig(args.key as string);
  }
}
```

</TabItem>

<TabItem value="optional">

```typescript title="/optional.ts"
import { FluentMethodPlugin, FluentPropertyPlugin, ApiMixin } from '@pebula/decorate/fluent';

export class OptionalSchemaConfig {
  optional?: boolean
}

export abstract class OptionalPluginApi extends ApiMixin.MixinBase<OptionalSchemaConfig> {
  @FluentPropertyPlugin()
  get optional(): this {
    this.$$context.schema.optional = true;
    return this;
  }
}

```

</TabItem>

<TabItem value="default">

```typescript title="/default.ts"
import { FluentMethodPlugin, FluentPropertyPlugin, ApiMixin } from '@pebula/decorate/fluent';

export class DefaultSchemaConfig {
  defaultValue?: any;
}

export abstract class DefaultPluginApi extends ApiMixin.MixinBase<DefaultSchemaConfig> {
  @FluentMethodPlugin()
  default(value: any): this {
    this.$$context.schema.defaultValue = value;
    return this;
  }

}
```

</TabItem>
</Tabs>

Couple of points:

1. Plugins **do not** extend the same class the main *Fluent Decorator API* class does (e.g. `DecorPropertyApi`).  
Instead, they extend a designated mixin base class, `ApiMixin.MixinBase`, following the template type used as their schema configuration object.  
Extending from `MixinBase` is mandatory, the framework will not accept mixins that does not originate from `MixinBase`.

2. The main *Fluent Decorator API* class and **Schema Configuration** class now have a **different extend expression**

:::note
We've forced one plugin for each `optional` and `default`.  
In real life plugins usually group several members which share the same logical idea.
:::

:::caution
On this page we address the composition of a **Fluent Decorator API** class through a base class mixin.  
That is, we create a new base class and mix in all of our mixins into the new base class, we then declare a class which **extend** the new mixed in base class.

This is the classic approach to mixins.

There is another mixin scenario where a **Fluent Decorator API** class already exists and we want to extend it after the fact.  
This is bit more advanced as it requires using typescript augmentation and a slightly different mixin behavior.

For example, a node module you've installed which uses the **Fluent** library and you would like to extend it....

We'll discuss this topic in a later phase
:::
