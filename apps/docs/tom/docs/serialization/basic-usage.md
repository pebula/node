---
id: basic-usage
title: Basic Usage
sidebar_label: 2. Basic Usage
---
import DocLink from '@site-shared/theme/DocLink';

```typescript
import { P, jsonSerializer } from '@pebula/tom/serialization';

class Order {
  @P id: number;
  @P date: Date;
  @P shipped: boolean;
  @P.enum(OrderStatus) status: OrderStatus;
  @P.asArray(() => OrderItem) items: OrderItem[];
}

class OrderItem {
  @P sku: string;
  @P quantity: number;
  @P price: number;
}

const orderSerializer = jsonSerializer
  .setDefault('jitCompiler', 'strict')
  .add(OrderItem)
  .create(Order);

const order: Order = orderSerializer.deserialize({
  id: Date.now(),
  date: new Date().toISOString(),
  shipped: true,
  status: 'paid',
  items: [
    {
      sku: 'R107-7',
      quantity: 4,
      price: 32.22
    },
    {
      sku: 'C112-9',
      quantity: 1,
      price: 3.51
    },
    {
      sku: 'Q343-11',
      quantity: 12,
      price: 1.23
     },
     {
       sku: 'P232-33',
       quantity: 2,
       price: 1223
     }
   ]
});

const serializedOrder = orderSerializer.serialize(order);
```
