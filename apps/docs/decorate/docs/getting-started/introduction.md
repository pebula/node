---
id: introduction
title: Introduction
sidebar_label: 1. Introduction
---
import { DocLink } from '@doc-components';

**Decorate** is a decorator management tool for metadata driven libraries / applications.

**Decorate** provides a unified framework for decorator management, life-cycle flow and storage.  
It also provide the infrastructure to build metadata driven **fluent API decorator workflows**.

The end result is an clear and self-explaining decorator API:

```typescript
class X {
  @P.optional.default(50).min(5).max(5000).not.equal(999) value: number
}
```

**Decorate** enables this in a type-safe manner, with full intellisense support!  

## Background

Decorators are mostly used for 2 scenarios:

1. Mutating the decorated target
2. Collecting metadata on the decorated target

We'll focus on the 2nd scenario, metadata.

When building metadata driven applications, we collect metadata about classes / objects which we can then use
to automate workflows, perform operations and in general drive an application.

For example, an `express` application is given a mapping of predefined routes to their handlers.  
These mappings are metadata and the express engine is using it to drive incoming request to their designated handlers.

Traditionally this was done manually:

```typescript
app.get('/orders/:id', (req, res, next) => { /* do something */ });
```

With modern TypeScript it can be done like this:

```typescript
@Controller('orders')
class OrdersController {
  @Get(':id')
  async getOrder(id: number) { /* do something */ }
}
```

This is where **Decorate** comes in.  
It provides the infrastructure to easily:

- Store and retrieve metadata per decorated target (e.g. `OrdersController` above)
- Implement custom logic when a decorator is used (invoked)
- Build type-safe decorator API the helps the user drive the metadata definition process

## Library Structure

The library contains 2 packages:

- `@pebula/decorate`  
The core library, provide the tools for decorator management, life-cycle flow and storage.

- `@pebula/decorate/fluent`  
An extension library, provide the tools for building extensible, fluent API decorators

### Decorate

The core library is where metadata is created, organized and stored.  
It is where decorators are created and where we build build the logic of how we create the metadata.

If your goal is to build a metadata driven application where decorators perform their classic rule as functions use the core library.
It will abstract the metadata management, decorator factory and other mundane processes and let you focus on the logic of your application.

```typescript
@Controller('orders')
class OrdersController {
  @Get(':id')
  async getOrder(id: number) { /* do something */ }
}
```

<DocLink to="docs/decorate/introduction">Click to read more about the core library...</DocLink>

### Decorate Fluent

The **fluent** extensions is built on top of the core library.  
It provides a plugin infrastructure to build fluent API decorators where the process of defining metadata is self explaining, easy and automatically routed by the type system.

```typescript
@Controller('orders')
  .authenticated
  .authorize('admin', 'warehouse')
class OrdersController {
  @Get(':id')
    .authorize('admin')
    .openApi('Get and order by the ID')
  async getOrder(id: number) { /* do something */ }
}
```

In **fluent** a plugin is used to extend the decorator API.  
The extension is done in 2 areas, the **design time type system** and for the **runtime**.

The plugin can be a **get accessor** (`authenticated` above) or a method with input params (`authorize` above).

**Fluent** is highly extensible, allowing plugins to be added from multiple locations in both libraries and ad-hoc application.  
You can add features on demand, allowing clear separation when developing new plugins.

:::info
The fluent example above is presented to emphasize the different between the 2 libraries so it is similar to the example above it.
It might not be the best fit to describe an MVC controller based API and it is completely up to your preferences.

In general, the fluent API approach is a best fit for class schema definitions.

```typescript
class X {
  @P.optional.default(50).min(5).max(5000).not.equal(999) value: number
}
```

:::

<DocLink to="docs/decorate-fluent/introduction">Click to read more about the decorator fluent library...</DocLink>

