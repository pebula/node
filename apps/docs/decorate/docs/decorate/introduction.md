---
id: introduction
title: Introduction
sidebar_label: 1. Introduction
---
**Decorate** (core library) provides a unified framework for decorator management, life-cycle flow and storage.

## Structure

There are 2 key components:

- Decorator domain
- Target Classifier

In **Decorate** we use **decorator domains** to create strictly typed decorator functions.  
All decorators created by the domain are bound to it, grouped together storing the metadata for their decorated targets in the same place, the domain.  

A domain uses a target classifier class to manage metadata related operation for each decorated target.  
When creating a new domain you can provide your own target classifier class which extends the core classifier, override some of it's behavior and make work for your requirements.

When a new decorated target is introduces, a new target classifier instance is created, which will store all metadata created by decorators of the domain for that target.

:::info
A **decorated target** is the class a decorator decorates (including member decoration).

```typescript
class MyDecoratedTarget {
  @MyDecorator value: number
}
```

In the example above, `MyDecoratedTarget` is a decorated target.
:::


## Mixins

MixinFW + Mixin in decorate  
Maybe in chapter on TargetClassifier and how it extends metadata

## Decorator Domain

A **decorator domains** is like a store which is able to generate decorators and store all the metadata created when they get invoked.

```typescript
import { DecoratedDomain } from '@pebula/decorate';

export const domain = new DecoratedDomain();
```

Now we have a new domain which we can use to create decorators from.  

```typescript
const MyDecor = domain.createDecorator({
  name: 'MyDecor',
  allowedScopes: ['property'],
  classifierData: { } // any data you want to pass forward
});

const MyDecorFlat = domain.createImmediateDecorator({
  name: 'MyDecorFlat',
  allowedScopes: ['property'],
  classifierData: { } // any data you want to pass forward
});
```

Targets decorated by decorators created in our new domain will be stored in the domain.

```typescript
class MyApplicationClass {
  @MyDecor() value: number;
  @MyDecorFlat value2: number;
}
```

When a decorator is activated, the domain is notified and it will start generating a metadata record.  
The domain has no logic, so we add logic that "tells" the domain what to do when a decorated is invoked.

The logic is places inside the `TargetClassifier` class.  
When a target class is first decorated the domain assign's a classifier to it (`TargetClassifier`) which will
store all metadata from all decorators on the domain which are invoked on this target.

The domain will operate using methods on the classifier.  
It will use the classifier to:

- Create a new metadata records
- Extend the metadata from existing metadata on an already decorated base class
- Query if the target has metadata for a given decorator

The `TargetClassifier` class contains all of the functionality above but it can be replaced by a custom class, which extends `TargetClassifier`.  

```typescript
export const domain = new DecoratedDomain(MyCustomTargetClassifier);
```

## Target Classifier

By default when we create a new domain:

```typescript
import { DecoratedDomain } from '@pebula/decorate';

export const domain = new DecoratedDomain();
```

The domain is created with the `TargetClassifier` class as the class to manage targets.  
We can modify this behavior:

```typescript
class MyTargetClassifier extends TargetClassifier {
  protected createRecord(decor: Decorator | DecoratorInitializer<TRecordMeta>,
                         record: ClassifierRecord<TRecordMeta>,
                         options: DecoratorOptions): TRecord {
    // override behavior
  }

  protected extendDecoratorMetadata(targetClassifier: TargetClassifier) {
    // override behavior
  }
}

export const domain = new DecoratedDomain(MyTargetClassifier);

```
