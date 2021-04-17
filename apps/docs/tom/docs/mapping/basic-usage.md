---
id: basic-usage
title: Basic Usage
sidebar_label: 2. Basic Usage
---
import DocLink from '@site-shared/theme/DocLink';

```typescript
import { defineClassMapping, getMapper } from '@pebula/tom/mapping';

class OrderDto implements Models.OrderDto {
  @P id: number;
  @P date: string;
  @P shipped: boolean;
  @P status: string;
  @P.asArray(() => OrderItemDto) items: OrderItemDto[];
  @P eTag: string;
}

class OrderItemDto implements Models.OrderItemDto {
  @P sku: string;
  @P quantity: number;
  @P price: number;
}

class Order implements Models.Order {
  @P id: number;
  @P date: Date;
  @P shipped: boolean;
  @P.enum(OrderStatus) status: OrderStatus;
  @P.asArray(() => OrderItem) items: OrderItem[];
}

class OrderItem implements Models.OrderItem {
  @P sku: string;
  @P quantity: number;
  @P price: number;
}

defineClassMapping(OrderItemDto, OrderItem, { 'strict' })
  .forMember('sku', 'sku')
  .forMember('price', 'price')
  .forMember('quantity', 'quantity')
  .seal();

defineClassMapping(OrderDto, Order, { 'strict' })
  .forMember('id', 'id')
  .forMember('date', 'date', Types.String) // Convert string to Date
  .forMember('shipped', 'shipped')
  .forMember('status', 'status', true) // Convert enum value
  .forMember('items', 'items')
  .forMember('eTag', c => c.ignore() ) // We must ignore or we can seal (enforced on design & runtime level)
  .seal();


const mapper = getMapper(OrderDto, Order);
const orderDto = new OrderDto();
// Assume populating OrderDto and OrderItemDto items

const order = mapper.transform(orderDto, {});
```
