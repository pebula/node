import { tomDescribeMapperJIT } from '@pebula/tom/testing';
import { P, defineClassMapping, getMapper } from '@pebula/tom/mapping';

tomDescribeMapperJIT('@pebula/tom', optionsFactory => {

  it('Circular Reference in Objects', () => {
    class Order {
      @P.as(() => Order) order: Order;
      @P.as(() => Order) order1: Order;
      @P.as(() => Order) order2: Order;
      @P.as(() => Order) order3: Order;
      @P.as(() => Order) order4: Order;
      @P value: number;

      constructor(value: number) {
        this.value = value;
      }
    }

    defineClassMapping(Order, optionsFactory()).seal();
    const mapper = getMapper(Order);

    let order = new Order(5);
    order.order = new Order(50);
    order.order1 = new Order(500)
    order.order2 = order;
    order.order3 = new Order(5000)
    order.order4 = order.order1;

    let mappedOrder = mapper.transform(order, {});
    expect(mappedOrder).not.toBe(order);
    expect(mappedOrder).toStrictEqual(order);

    expect(mappedOrder.value).toBe(5);
    expect(mappedOrder.order).toBeInstanceOf(Order);
    expect(mappedOrder.order.value).toBe(50);
    expect(mappedOrder.order1).toBeInstanceOf(Order);
    expect(mappedOrder.order1.value).toBe(500);
    expect(mappedOrder.order3).toBeInstanceOf(Order);
    expect(mappedOrder.order3.value).toBe(5000);

    expect(mappedOrder.order === mappedOrder.order1 || mappedOrder.order === mappedOrder.order3 || mappedOrder.order1 === mappedOrder.order3).toBe(false);
    expect(mappedOrder.order2 === mappedOrder).toBe(true);
    expect(mappedOrder.order4 === mappedOrder.order1).toBe(true);

  });

  describe('circular reference in collections', () => {
    it('Circular Reference in Array', () => {
      class Order {
        @P.asArray(() => Order) collection: Array<Order>;
        @P value: number;

        constructor(value: number) {
          this.value = value;
        }
      }

      defineClassMapping(Order, optionsFactory()).seal();
      const mapper = getMapper(Order);

      const order = new Order(5);
      const order1 = new Order(500);
      order.collection =[
        new Order(50),
        order1,
        order,
        new Order(5000),
        order1,
      ]

      let mappedOrder = mapper.transform(order, {});
      expect(mappedOrder).not.toBe(order);
      expect(mappedOrder).toBeInstanceOf(Order);
      expect(mappedOrder.value).toBe(5);
      expect(mappedOrder).toStrictEqual(order);

      const collection = mappedOrder.collection;

      for (const o of collection) {
        expect(o).toBeInstanceOf(Order);
      }

      expect(collection[0].value).toBe(50);
      expect(collection[1].value).toBe(500);
      expect(collection[3].value).toBe(5000);

      expect(collection[0] === collection[1] || collection[0] === collection[3] || collection[1] === collection[3]).toBe(false);
      expect(collection[2] === mappedOrder).toBe(true);
      expect(collection[4] === collection[1]).toBe(true);
    });

    // Circular Reference in Set -> There is no such thing!

    it('Circular Reference in Map', () => {
      class Order {
        @P.asMap(() => Order) collection: Map<any, Order>;
        @P value: number;

        constructor(value: number) {
          this.value = value;
        }
      }

      defineClassMapping(Order, optionsFactory()).seal();
      const mapper = getMapper(Order);

      const order = new Order(5);
      const order1 = new Order(500);
      order.collection = new Map([
        [0, new Order(50)],
        [1, order1],
        [2, order],
        [3, new Order(5000)],
        [4, order1],
      ]);

      let mappedOrder = mapper.transform(order, {});
      expect(mappedOrder).not.toBe(order);
      expect(mappedOrder).toBeInstanceOf(Order);
      expect(mappedOrder.value).toBe(5);
      expect(mappedOrder).toStrictEqual(order);

      const collection = Array.from(mappedOrder.collection.values());

      for (const o of collection) {
        expect(o).toBeInstanceOf(Order);
      }

      expect(collection[0].value).toBe(50);
      expect(collection[1].value).toBe(500);
      expect(collection[3].value).toBe(5000);

      expect(collection[0] === collection[1] || collection[0] === collection[3] || collection[1] === collection[3]).toBe(false);
      expect(collection[2] === mappedOrder).toBe(true);
      expect(collection[4] === collection[1]).toBe(true);

    });

    it('Circular Reference in ObjectMap', () => {
      class Order {
        @P.asObjectMap(() => Order) collection: any;
        @P value: number;

        constructor(value: number) {
          this.value = value;
        }
      }

      defineClassMapping(Order, optionsFactory()).seal();
      const mapper = getMapper(Order);

      const order = new Order(5);
      const order1 = new Order(500);
      order.collection = {
        0: new Order(50),
        1: order1,
        2: order,
        3: new Order(5000),
        4: order1,
      };

      let mappedOrder = mapper.transform(order, {});
      expect(mappedOrder).not.toBe(order);
      expect(mappedOrder).toBeInstanceOf(Order);
      expect(mappedOrder.value).toBe(5);
      expect(mappedOrder).toStrictEqual(order);

      const collection: Order[] = Object.values(mappedOrder.collection);

      for (const o of collection) {
        expect(o).toBeInstanceOf(Order);
      }

      expect(collection[0].value).toBe(50);
      expect(collection[1].value).toBe(500);
      expect(collection[3].value).toBe(5000);

      expect(collection[0] === collection[1] || collection[0] === collection[3] || collection[1] === collection[3]).toBe(false);
      expect(collection[2] === mappedOrder).toBe(true);
      expect(collection[4] === collection[1]).toBe(true);

    });
  });
});
