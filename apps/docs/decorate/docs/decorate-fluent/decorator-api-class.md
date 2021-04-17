---
id: decorator-api-class
title: Decorator API Class
sidebar_label: 3. Decorator API Class
---

The Decorator API Class is where all of the magic happens.

- Define the Schema Configuration class
- Define the plugin interface and implement it

If we go back to API Suite we define in the previous page:

```typescript {5,8}
import { DecorApiSuite } from '@pebula/decorate/fluent';

export const suite = DecorApiSuite.create()
  .forClass(MyClassDecoratorFluentApiClass)            // Fluent Decorator API for a class decorator
  .forProperty(MyPropertyDecoratorFluentApiClass);     // Fluent Decorator API for a property decorator

export const C = suite.classApi;
export const P = suite.propertyApi;
export const store = suite.store;
```

How will `MyPropertyDecoratorFluentApiClass` look like for the end-user to be able to do the following?

```typescript
class X {
  @P.optional.default(50) value: number
}
```

## Building the API

```typescript
import { FluentMethodPlugin, FluentPropertyPlugin, DecorPropertyApi, PropertySchema } from '@pebula/decorate/fluent';

export class MyPropertyDecoratorSchemaConfig extends PropertySchema {
  defaultValue?: any;
  optional?: boolean
}

export class MyPropertyDecoratorFluentApiClass extends DecorPropertyApi<MyPropertyDecoratorSchemaConfig> {
  // IGNORE THE CLASS BODY, THESE ARE THE PLUGINS AND WE WILL VISIT THEM NEXT SECTION
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

  // Override the base class schema factory, teach it how to instantiate a new property schema configuration object.
  static schemaFactory(args: PropertyDecoratorArgs): TomPropertySchemaConfig {
    return new TomPropertySchemaConfig(args.key as string);
  }
}
```

We define the schema configuration class, which extend `PropertySchema` (more on this later...)  
Then we define the API class which extends `DecorPropertyApi` of our schema configuration class.

The base classes we extend are mandatory and we must extend the one relevant to the class we extend.

Decorator | Schema Config | Fluent API Class
----------|-------------------|-----------------
Class     | ClassSchema       | DecorClassApi
Property  | PropertySchema    | DecorPropertyApi
Method    | MethodSchema      | DecorMethodApi
Parameter | ParameterSchema   | DecorParameterApi

:::tip
Don't waste time on these types, the library provides helper to make this easy.  
We will cover them soon
:::

If you're looking at this code and thinking, this is not really extensible you're right!  
This is a simple example to ease you in.

On the next page we'll review how to compose an API class from small plugin chunks (mixins) which make the API class empty from any code.

### Custom Class Decorator API

If we also implement a custom class decorator API we need to reflect it's schema configuration so our plugins will know how the class schema looks like.

```typescript
import { DecorPropertyApi, PropertySchema } from '@pebula/decorate/fluent';
import { MyClassDecoratorSchemaConfig } from './some-where';

                                                                                                        // Type info on the class schema config
export class MyPropertyDecoratorFluentApiClass extends DecorPropertyApi<MyPropertyDecoratorSchemaConfig, MyClassDecoratorSchemaConfig> {
}
```

## Plugins

Plugins are instructions we add to the API, by so extending the API.  
A plugin provides logic that will run once it is called, allowing the plugin to add the metadata required.

```typescript
class X {
  @P.optional.default(50) value: number
}
```

In the example above, `P` is the decorator, `optional` and `default` are the plugins.

There are 2 types of fluent API plugins:

- `FluentPropertyPlugin` - A property plugin (get accessor) which does not require input (`optional` above)
- `FluentMethodPlugin` - A method plugin which requires input (`default` above, getting 50 as input)

And a general API plugin:

- `MethodPlugin` - A method plugin

Do not confuse the fluent property/method plugin with the fluent API suite property and method APIs.
The fluent API suite sets the decorator type. A property decorator can only decorate properties, etc...  
The fluent property/method plugin instruct the type of member on the API.

:::info
The different between `FluentMethodPlugin` amd `MethodPlugin` is that `FluentMethodPlugin` must return the same type (design time) & value (runtime) of the context it was called from (this).

`MethodPlugin` can return any type and matching value it desires, possibly breaking the fluent API chain.
:::

**Fluent** is highly extensible, allowing plugins to be added from multiple locations in both libraries and ad-hoc application.  
You can add features on demand, allowing clear separation when developing new plugins.

## Design Time and Runtime

The library is type safe and must keep design time data accurate to provide a solid user experience.

In **fluent**, the design time is as important as the runtime

Because **fluent** is plugin based and can be extended from any location it also provide the tools to extend the type system along side the runtime.

The design time is generated as part of building the runtime process and requires an additional 3-line effort of pairing it via type augmentation.  
