---
id: introduction
title: Introduction
sidebar_label: 1. Introduction
---

`@pebula/decorate/fluent` (fluent) is a package built on-top of `@pebula/decorate` which implement a decorator domain used for building fluent decorator APIs.

## TL;DR

Take a decorator function and make it a Fluent API object that can enrich the metadata for the decorated property.

Another way to visualize it:

```typescript
class X {
  @P({
    optional: true,
    default: 50,
  })
  value: number
}
```

Convert the above API to:

```typescript
class X {
  @P.optional.default(50) value: number
}
```

While allowing plugins, adding functionality on the fly, type safety and more...

:::note
  You can achieve the same results with each of the approaches above, including type enforcement, plugin system, etc...  
  It is just a matter of preference.
:::

## Overview

1. With **Fluent**, we define plugins which compose a **Fluent Decorator API**. The end-user uses this API to define the metadata.  

1. The API will store the metadata in a **Schema Configuration** object, bound to the decorated target.  

1. We can then query for the **Schema Configuration** for a target and use it to implement our business logic.

Let's break it down:

---

(1) With **Fluent**, we define plugins which compose a **Fluent Decorator API**. The end-user uses this API to define the metadata.

---

```typescript
class X {
  @P.optional.default(50) value: number
}
```

`optional` and `default` are plugins which we implement and they create the **Fluent Decorator API**.  
They are not part of the library, we call them plugins because they extends the bare naked decorator (`P` above).

For each plugin, we provide a function that will handle the input and change the state.

---

(2) The API will store the metadata in a *Schema Configuration* object, bound to the decorated target.

---

We mentioned that the plugin implementations we provide will change the state.  
We call this state **Schema Configuration** and it is a fully typed interface we provide when extending the API with plugins.

An abstract illustration of the `optional` & `default` plugin:

```typescript
class SchemaConfig {
  defaultValue?: any;
  isOptional?: boolean;
}

class Plugin {
  get optional(): this {
    this.$$context.schema.isOptional = true;
    return this;
  }
  default(value: any): this {
    this.$$context.schema.defaultValue = value;
    return this;
  }
}
```

Where `this.$$context.schema` extends `SchemaConfig`

---

(3) We can then query for the *Schema Configuration* for a target and use it to implement our business logic.

---

Basically, we ask the library if it has a `SchemaConfig` for a class.  
If it does, we can implement our logic.

```typescript
class X {
  @P.optional.default(50) value: number
}
```

Above, when we query for a **Schema Configuration** for `X`, we will get back the following `SchemaConfig` instance:

```json
{
  "defaultValue": 50,
  "isOptional": true
};
```

Now, we can implement our logic.

For example, if we build a validation/sanitation library we will be able to set the value 50 to the property `value` if it is not set.

Now we're ready to start the walk-through!

## Fluent Decorator API

A fluent decorator API is a decorator method which also contains additional methods and properties.

In the following end-user example:

```typescript
class X {
  @P.optional.default(50) value: number
}
```

`P` is the decorator, it also returns and object with the `optional` and `default` members.  
Each of these members is also the `P` decorator as well as returning the same object as `P`.

We can describe the API using the following interface:

```typescript
interface DecoratorFluentApi {
  (target: object, key: string | symbol, descriptor?: PropertyDescriptor): PropertyDescriptor | void;

  optional: this;
  default(value: any): this;
}
```

A fluent decorator API means that at each point, the value return must be a valid decorator but also the context for an additional API operation.

