---
id: schema
title: Schema
sidebar_label: 2. Schema
---
import ExtRelativeLink from '@site-shared/theme/ExtRelativeLink';

A schema is a collection of metadata objects that describe the structure of a type/class/object.

For example:

```typescript
interface X {
  y?: string;
}
```

For the above interface, we can build a schema that describe the interface `X`.  
It will have a metadata item that describes the property `y` and that metadata item will also describe that it is **optional** and it is of type **string**.

This is the basic idea with simple metadata we can quickly understand. From here lot's of information is added and based on this information we can do different things.

## Decorators

To obtain metadata we need to allow the user to express it.  
One simple way is to have the user provide a schema object which is not natural, verbose and most importantly not type-safe.

We want to allow the user to define it's own classes and while doing it express the metadata required based on the domain logic.  
We achieve this via decorators:

```typescript
class Order {
  @P id: number;
  @P date: Date;
  @P shipped: boolean;
  @P.enum(OrderStatus) status: OrderStatus;
  @P.asArray('string') coupons: string[];
}
```

In the example above, we used the decorator `P` to mark the properties we want to be part of the schema for the class `Order`.  
By doing so, typescript automatically provide us runtime information about the type.  
I.E. **TOM** knows that:

  - There is a class `Order`
  - It is made out of 5 properties (id, date, shipped, status, coupons)
  - `id` is a **number**, `date` is a **Date** and so on...

### Special Type Information

Typescript decorators can provide a limited runtime reflection of the types.

- It can not reflect enums
- It can not reflect unresolved objects (circular reference classes)
- It can not reflect generics
  - Array&lt;string> will reflect as `Array`
  - Set&lt;string> will reflect as `Set`
  - Map&lt;string, string> will reflect as `Map`
  - Etc...

To workaround these limitations several decorators are used.

```typescript

class PreTest {
  @P v: number;
}

class Test {

  @P.enum(MyEnum) v1: MyEnum;
  @P.asArray('string') v2: string[];
  @P.asSet('string') v3: Set<string>;
  @P.asMap('string', 'date') v4: Map<Date, string>;  // 2nd type param (data) is optional
  @P.asObjectMap('date') v5: Record<string, Date>;  // 2nd type param (data) is optional
  @P.asTuple('string', 'number', 'boolean') v6: [string, number, boolean];
  @P.literal('xyz') v7: 'xyz';
  @P.union('string', 'date', @P.literal(99), P.asArray('number')) v8: string | Date | 99 | number[];
 
  @P v9: PreTest; // This will work cause `PreTest` is already defined
  @P.as(() => PostTest) v10: PostTest; // This must be wrapped in a function, as reference to the type, because it is still undefined when the decorator is invoked.
}

class PostTest {
  @P v: number;
}

```

:::info
Decorators are only valid on a class, a class method or a class property.
:::
