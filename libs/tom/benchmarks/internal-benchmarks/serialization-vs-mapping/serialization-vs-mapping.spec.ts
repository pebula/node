import { defineClassMapping, getMapper } from '@pebula/tom/mapping';
import { P, jsonSerializer } from '@pebula/tom/serialization';
import * as Models from './models';

describe('@pebula/tom/benchmarks', () => {

  it('serialization-vs-mapping should match', () => {
    class Order implements Models.Order {
      @P id: number;
      @P date: Date;
      @P shipped: boolean;
      @P.enum(Models.OrderStatus) status: Models.OrderStatus;
      @P.asArray(() => OrderItem) items: OrderItem[];
    }

    class OrderItem implements Models.OrderItem {
      @P sku: string;
      @P quantity: number;
      @P price: number;
    }

    const jsonJIT = jsonSerializer.fork('JSON JIT')
      .setDefault('jitCompiler', 'strict')
      .add(OrderItem)
      .create(Order);

    defineClassMapping(OrderItem, { jitCompiler: 'strict' }).seal();
    defineClassMapping(Order, { jitCompiler: 'strict' }).seal();
    const mapper = getMapper(Order, Order);

    const orderDtoRequest = Models.getOrder();
    const order = jsonJIT.deserialize(orderDtoRequest);
    const orderMapped = mapper.transform(order, {});
    const orderDtoResponse = jsonJIT.serialize(orderMapped);

    expect(order).not.toBe(orderMapped);
    expect(order).toStrictEqual(orderMapped);
    expect(orderDtoRequest).toEqual(orderDtoResponse);

  });
});

