---
id: decorator-api-suite
title: Decorator API Suite
sidebar_label: 2. Decorator API Suite
---

The decorator API suite is where we glue all of the decorator APIs together and produce the decorator functions.

The actual output we need is the decorator we supply to the end user.

```typescript
class X {
  @P.optional.default(50) value: number
}
```

We also need a way to access the **Schema Configuration** for a given type.

It generally looks like this:

```typescript
import { DecorApiSuite } from '@pebula/decorate/fluent';

export const suite = DecorApiSuite.create()
  .forClass(MyClassDecoratorFluentApiClass)            // Fluent Decorator API for a class decorator
  .forProperty(MyPropertyDecoratorFluentApiClass);     // Fluent Decorator API for a property decorator

export const C = suite.classApi;
export const P = suite.propertyApi;
export const store = suite.store;
```

We will export `C` & `P` to the end-user and use `store` to query for `Schema Configuration`.

## Suite Decorators

As you might have noticed, in the previous example we exported 2 decorators, not 1.  
Actually, there are 4 types of decorators, based on the different decorators that exist in the language.

There is a clear separation between the different decorator types in TypeScript.  
Each decorator type has a unique API.

:::info The 4 Decorators Are:

- Class decorator
- Property Decorator
- Method Decorator
- Parameter Decorator
:::

Each decorator is a unique API, built from a decorator API class which represent the API structure.  
Going back to our example:

- `C` will expose the fluent api defined in `MyClassDecoratorFluentApiClass`
- `P` will expose the fluent api defined in `MyPropertyDecoratorFluentApiClass`

We've only used 2 in this case but you can use all 4 if required.

## Decorator API Class

`MyClassDecoratorFluentApiClass` & `MyPropertyDecoratorFluentApiClass` are Fluent Decorator API classes.  

The structure of `MyPropertyDecoratorFluentApiClass` class will get reflected in `P` as if `P` is an instance of `MyPropertyDecoratorFluentApiClass` as well as a property decorator method.  

The Decorator API class holds the structure of the API as well as the implementation of the plugins and the schema configuration class.

On to the next page to learn more about the Decorator API class.

## API Suite Store

The store is simply where all **Schema Configuration** objects are stored, mapped to their respective target.
