import { P, Nominal, jsonSerializer } from '@pebula/tom/serialization';
import { clearSerializer, tomDescribeSerializerJIT } from '@pebula/tom/testing';

tomDescribeSerializerJIT('@pebula/tom', jsonSerializer, childSerializer => {
  let items: OrderItem[];
  let primitives: Number[];

  beforeEach(() => {
    const item1 = new OrderItem();
    item1.name = 'Galaxy S10';
    item1.quantity = 1;

    const item2 = new OrderItem();
    item2.name = 'Pixel 4';
    item2.quantity = 2;

    items = [item1, item2];
    primitives = [10, 99, 232121232];

    childSerializer.create(OrderItem);
  });

  afterEach(() => {
    clearSerializer(childSerializer);
  });

  describe('type-compilers - containers (Array / Set / Map)', () => {
    it('From/To Array - Nested', () => {
      class Order {
        @P.as(() => OrderItem) itemsArray: Array<OrderItem>;
      }

      const orderSerializer = childSerializer.create(Order);

      let order = new Order();
      order.itemsArray = [...items];
      const pojo = orderSerializer.serialize(order);
      expect(pojo.itemsArray).toBeInstanceOf(Array);
      expect(pojo.itemsArray.length).toBe(2);
      pojo.itemsArray.forEach((item, index) => {
        expect(item).toBeInstanceOf(Object);
        expect(item).toEqual(items[index]);
      });

      order = orderSerializer.deserialize(pojo);

      expect(order.itemsArray).toBeInstanceOf(Array);
      expect(order.itemsArray.length).toBe(2);
      order.itemsArray.forEach((item, index) => {
        expect(item).toBeInstanceOf(OrderItem);
        expect(item).toEqual(items[index]);
      });
    });

    it('From Set/To - Nested', () => {
      class Order {
        @P.asSet(() => OrderItem) itemsSet: Set<OrderItem>;
      }

      const orderSerializer = childSerializer.create(Order);
      let order = new Order();
      order.itemsSet = new Set(items);

      const pojo = orderSerializer.serialize(order);
      expect(pojo.itemsSet).toBeInstanceOf(Array);
      expect(pojo.itemsSet.length).toBe(2);
      pojo.itemsSet.forEach((item, index) => {
        expect(item).toBeInstanceOf(Object);
        expect(item).toEqual(items[index]);
      });

      order = orderSerializer.deserialize(pojo);

      expect(order.itemsSet).toBeInstanceOf(Set);
      expect(order.itemsSet.size).toBe(2);
      Array.from(order.itemsSet).forEach((item, index) => {
        expect(item).toBeInstanceOf(OrderItem);
        expect(item).toEqual(items[index]);
      });
    });

    it('From Map/To - Nested', () => {
      class Order {
        @P.as(() => OrderItem) itemsMap: Map<string, OrderItem>;
      }

      const orderSerializer = childSerializer.create(Order);
      let order = new Order();

      order.itemsMap = new Map();
      order.itemsMap.set(items[0].name, items[0]);
      order.itemsMap.set(items[1].name, items[1]);
      const pojo = orderSerializer.serialize(order);
      expect(pojo.itemsMap).toBeInstanceOf(Object);
      expect(Object.keys(pojo.itemsMap).length).toBe(2);
      Object.entries(pojo.itemsMap).forEach(([key, item], index) => {
        expect(item).toBeInstanceOf(Object);
        expect(item).toEqual(order.itemsMap.get(key));
      });

      order = orderSerializer.deserialize(pojo);

      expect(order.itemsMap).toBeInstanceOf(Map);
      expect(order.itemsMap.size).toBe(2);
      Array.from(order.itemsMap.entries()).forEach(([key, item], index) => {
        expect(item).toBeInstanceOf(OrderItem);
        expect(item).toEqual(pojo.itemsMap[key]);
      });
    });

    it('From Array/To - Primitive', () => {
      class Order {
        @P.as(Number) primitiveArray: Array<Number>;
      }

      const orderSerializer = childSerializer.create(Order);

      let order = new Order();

      order.primitiveArray = [...primitives];
      const pojo = orderSerializer.serialize(order);
      expect(pojo.primitiveArray).toBeInstanceOf(Array);
      expect(pojo.primitiveArray.length).toBe(3);
      pojo.primitiveArray.forEach((item, index) => {
        expect(typeof item).toBe('number');
        expect(item).toEqual(primitives[index]);
      });

      order = orderSerializer.deserialize(pojo);

      expect(order.primitiveArray).toBeInstanceOf(Array);
      expect(order.primitiveArray.length).toBe(3);
      order.primitiveArray.forEach((item, index) => {
        expect(typeof item).toBe('number');
        expect(item).toEqual(primitives[index]);
      });
    });

    it('From Set/To - Primitive', () => {
      class Order {
        @P.as(Number) primitiveSet: Set<Number>;
      }

      const orderSerializer = childSerializer.create(Order);

      let order = new Order();

      order.primitiveSet = new Set(primitives);
      const pojo = orderSerializer.serialize(order);
      expect(pojo.primitiveSet).toBeInstanceOf(Array);
      expect(pojo.primitiveSet.length).toBe(3);
      pojo.primitiveSet.forEach((item, index) => {
        expect(typeof item).toBe('number');
        expect(item).toEqual(primitives[index]);
      });

      order = orderSerializer.deserialize(pojo);

      expect(order.primitiveSet).toBeInstanceOf(Set);
      expect(order.primitiveSet.size).toBe(3);
      Array.from(order.primitiveSet).forEach((item, index) => {
        expect(typeof item).toBe('number');
        expect(item).toEqual(primitives[index]);
      });
    });

    it('From Map/To - Primitive', () => {
      class Order {
        @P.as(Number) primitiveMap: Map<string, Number>;
      }
      const orderSerializer = childSerializer.create(Order);

      let order = new Order();

      order.primitiveMap = new Map();
      order.primitiveMap.set(primitives[0].toString(), primitives[0]);
      order.primitiveMap.set(primitives[1].toString(), primitives[1]);
      order.primitiveMap.set(primitives[2].toString(), primitives[2]);
      const pojo = orderSerializer.serialize(order);
      expect(pojo.primitiveMap).toBeInstanceOf(Object);
      expect(Object.keys(pojo.primitiveMap).length).toBe(3);
      Object.entries(pojo.primitiveMap).forEach(([key, item], index) => {
        expect(typeof item).toBe('number');
        expect(item).toEqual(order.primitiveMap.get(key));
      });

      order = orderSerializer.deserialize(pojo);

      expect(order.primitiveMap).toBeInstanceOf(Map);
      expect(order.primitiveMap.size).toBe(3);
      Array.from(order.primitiveMap.entries()).forEach(([key, item], index) => {
        expect(typeof item).toBe('number');
        expect(item).toEqual(pojo.primitiveMap[key]);
      });

    });
  });

});

class OrderItem extends Nominal<'OrderItem'>() {
  @P name: string;
  @P quantity: number;
}
