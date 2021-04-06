import { P, jsonSerializer } from '@pebula/tom/serialization';
import { clearSerializer, tomDescribeSerializerJIT } from '@pebula/tom/testing';

tomDescribeSerializerJIT('@pebula/tom', jsonSerializer, childSerializer => {
  afterEach(() => {
    clearSerializer(childSerializer);
  });

  describe('', () => {
    it('Circular Reference in Objects', () => {
      class Order {
        @P.as(() => Order) order: Order;
        @P.as(() => Order) order1: Order;
        @P.as(() => Order) order2: Order;
        @P.as(() => Order) order3: Order;
        @P value: number;

        constructor(value: number) {
          this.value = value;
        }
      }

      const orderSerializer = childSerializer.create(Order);

      let order = new Order(5);
      order.order = new Order(50);
      order.order1 = new Order(500)
      order.order2 = order;
      order.order3 = new Order(5000)
      const pojo = orderSerializer.serialize(order);
      expect(pojo.value).toBe(5);
      expect(pojo.order).toBeInstanceOf(Object);
      expect(pojo.order.value).toBe(50);
      expect(pojo.order1).toBeInstanceOf(Object);
      expect(pojo.order1.value).toBe(500);
      expect(pojo.order3).toBeInstanceOf(Object);
      expect(pojo.order3.value).toBe(5000);
      expect(pojo).not.toHaveProperty('order2');

    });
  });

  describe('circular reference in collections', () => {
    it('Circular Reference in Array', () => {
      class Order {
        @P.as(() => Order) collection: Array<Order>;
        @P value: number;

        constructor(value: number) {
          this.value = value;
        }
      }

      const orderSerializer = childSerializer.create(Order);

      const order = new Order(5);
      const order50000 = new Order(50000);

      order.collection = [new Order(50), new Order(500), order, new Order(5000), order50000, order50000 ];
      const pojo = orderSerializer.serialize(order);
      expect(pojo.value).toBe(5);
      expect(pojo.collection).toBeInstanceOf(Array);
      expect(pojo.collection.length).toBe(5);
      expect(pojo.collection[0]).toBeInstanceOf(Object);
      expect(pojo.collection[0].value).toBe(50);
      expect(pojo.collection[1]).toBeInstanceOf(Object);
      expect(pojo.collection[1].value).toBe(500);
      expect(pojo.collection[2]).toBeInstanceOf(Object);
      expect(pojo.collection[2].value).toBe(5000);
      expect(pojo.collection[3]).toBeInstanceOf(Object);
      expect(pojo.collection[3].value).toBe(50000);
      expect(pojo.collection[4]).toBeInstanceOf(Object);
      expect(pojo.collection[4].value).toBe(50000);

    });

    it('Circular Reference in Set', () => {
      class Order {
        @P.as(() => Order) collection: Set<Order>;
        @P value: number;

        constructor(value: number) {
          this.value = value;
        }
      }

      const orderSerializer = childSerializer.create(Order);

      let order = new Order(5);
      order.collection = new Set([new Order(50), new Order(500), order, new Order(5000), new Order(50000)]);
      const pojo = orderSerializer.serialize(order);
      expect(pojo.value).toBe(5);
      expect(pojo.collection).toBeInstanceOf(Array);
      expect(pojo.collection.length).toBe(4);
      expect(pojo.collection[0]).toBeInstanceOf(Object);
      expect(pojo.collection[0].value).toBe(50);
      expect(pojo.collection[1]).toBeInstanceOf(Object);
      expect(pojo.collection[1].value).toBe(500);
      expect(pojo.collection[2]).toBeInstanceOf(Object);
      expect(pojo.collection[2].value).toBe(5000);
      expect(pojo.collection[3]).toBeInstanceOf(Object);
      expect(pojo.collection[3].value).toBe(50000);

    });

    it('Circular Reference in Map', () => {
      class Order {
        @P.as(() => Order) collection: Map<any, Order>;
        @P value: number;

        constructor(value: number) {
          this.value = value;
        }
      }

      const orderSerializer = childSerializer.create(Order);

      let order = new Order(5);
      order.collection = new Map([[50, new Order(50)], [500, new Order(500)], [0, order], [5000, new Order(5000)], [50000, new Order(50000)]]);
      const pojo = orderSerializer.serialize(order);
      expect(pojo.value).toBe(5);
      expect(pojo.collection).toBeInstanceOf(Object);
      const collection: any[] = Object.values(pojo.collection);
      expect(collection.length).toBe(4);
      expect(collection[0]).toBeInstanceOf(Object);
      expect(collection[0].value).toBe(50);
      expect(collection[1]).toBeInstanceOf(Object);
      expect(collection[1].value).toBe(500);
      expect(collection[2]).toBeInstanceOf(Object);
      expect(collection[2].value).toBe(5000);
      expect(collection[3]).toBeInstanceOf(Object);
      expect(collection[3].value).toBe(50000);

    });

    it('Circular Reference in ObjectMap', () => {
      class Order {
        @P.asObjectMap(() => Order) collection: any;
        @P value: number;

        constructor(value: number) {
          this.value = value;
        }
      }

      const orderSerializer = childSerializer.create(Order);

      let order = new Order(5);
      order.collection = { 50: new Order(50), 500: new Order(500), 0: order, 5000: new Order(5000), 50000: new Order(50000) };

      const pojo = orderSerializer.serialize(order);
      expect(pojo.value).toBe(5);
      expect(pojo.collection).toBeInstanceOf(Object);
      const collection: any[] = Object.values(pojo.collection);
      expect(collection.length).toBe(4);
      expect(collection[0]).toBeInstanceOf(Object);
      expect(collection[0].value).toBe(50);
      expect(collection[1]).toBeInstanceOf(Object);
      expect(collection[1].value).toBe(500);
      expect(collection[2]).toBeInstanceOf(Object);
      expect(collection[2].value).toBe(5000);
      expect(collection[3]).toBeInstanceOf(Object);
      expect(collection[3].value).toBe(50000);

    });
  });
});
