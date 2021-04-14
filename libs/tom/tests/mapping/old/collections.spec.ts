import { P, defineClassMapping, mapTypes, Nominal } from '@pebula/tom/mapping';
import { clearMap, getSchema, tomDescribeMapperJIT} from '@pebula/tom/testing';

tomDescribeMapperJIT('@pebula/tom', optionsFactory => {
  let items: OrderItemDto[];
  let primitives: Number[];
  let orderDto: OrderDto;

  beforeEach(() => {
    const item1 = new OrderItemDto();
    item1.name = 'Galaxy S10';
    item1.quantity = 1;

    const item2 = new OrderItemDto();
    item2.name = 'Pixel 4';
    item2.quantity = 2;

    items = [item1, item2];
    primitives = [10, 99, 232121232];

    defineClassMapping(OrderItemDto, OrderItem, optionsFactory())
      .forMember('name', 'name')
      .forMember('quantity', 'quantity')
      .seal();

  });

  afterEach(() => {
    clearMap(OrderItemDto, OrderItem);
    clearMap(OrderDto, Order);
  });

  describe('Transform to Array', () => {
    it('From Array - Nested', () => {
      defineClassMapping(OrderDto, Order, optionsFactory())
        .forMember('itemsArray', 'itemsArray', OrderItemDto)
        .forAllOtherMembers(c => c.ignore())
        .seal();

      orderDto = new OrderDto();
      orderDto.itemsArray = [...items];

      const order = mapTypes(orderDto, Order);

      expect(order.itemsArray).toBeInstanceOf(Array);
      expect(order.itemsArray.length).toBe(2);
      const tItems = order.itemsArray;
      tItems.forEach((item, index) => {
        expect(item).toBeInstanceOf(OrderItem);
        expect(item).toEqual(items[index]);
      });
    });

    it('From Set - Nested', () => {
      defineClassMapping(OrderDto, Order, optionsFactory())
        .forMember('itemsArray', 'itemsSet', OrderItemDto)
        .forAllOtherMembers(c => c.ignore())
        .seal();

      orderDto = new OrderDto();
      orderDto.itemsSet = new Set(items);

      const order = mapTypes(orderDto, Order);
      expect(order.itemsArray).toBeInstanceOf(Array);
      expect(order.itemsArray.length).toBe(2);
      const tItems = order.itemsArray;
      tItems.forEach((item, index) => {
        expect(item).toBeInstanceOf(OrderItem);
        expect(item).toEqual(items[index]);
      });
    });

    it('From Map - Nested', () => {
      defineClassMapping(OrderDto, Order, optionsFactory())
        .forMember('itemsArray', 'itemsMap', OrderItemDto)
        .forAllOtherMembers(c => c.ignore())
        .seal();

      const schema = getSchema(OrderDto, Order);
      expect(schema).toBeDefined();

      orderDto = new OrderDto();
      orderDto.itemsMap = new Map();
      orderDto.itemsMap.set(items[0].name, items[0]);
      orderDto.itemsMap.set(items[1].name, items[1]);

      const order = mapTypes(orderDto, Order);
      expect(order.itemsArray).toBeInstanceOf(Array);
      expect(order.itemsArray.length).toBe(2);
      const tItems = order.itemsArray;
      tItems.forEach((item, index) => {
        expect(item).toBeInstanceOf(OrderItem);
        expect(item).toEqual(items[index]);
      });
    });

    it('From Array - Primitive', () => {
      defineClassMapping(OrderDto, Order, optionsFactory())
        .forMember('primitiveArray', 'primitiveArray')
        .forAllOtherMembers(c => c.ignore())
        .seal();

      orderDto = new OrderDto();
      orderDto.primitiveArray = [...primitives];

      const order = mapTypes(orderDto, Order);

      expect(order.primitiveArray).toBeInstanceOf(Array);
      expect(order.primitiveArray.length).toBe(3);
      const tItems = order.primitiveArray;
      tItems.forEach((item, index) => {
        expect(typeof item).toBe('number');
        expect(item).toEqual(primitives[index]);
      });
    });

    it('From Set - Primitive', () => {
      defineClassMapping(OrderDto, Order, optionsFactory())
        .forMember('primitiveArray', 'primitiveSet' as any)
        .forAllOtherMembers(c => c.ignore())
        .seal();

      orderDto = new OrderDto();
      orderDto.primitiveSet = new Set(primitives);

      const order = mapTypes(orderDto, Order);
      expect(order.primitiveArray).toBeInstanceOf(Array);
      expect(order.primitiveArray.length).toBe(3);
      const tItems = order.primitiveArray;
      tItems.forEach((item, index) => {
        expect(typeof item).toBe('number');
        expect(item).toEqual(primitives[index]);
      });
    });

    it('From Map - Primitive', () => {
      defineClassMapping(OrderDto, Order, optionsFactory())
        .forMember('primitiveArray', 'primitiveMap' as any)
        .forAllOtherMembers(c => c.ignore())
        .seal();

      const schema = getSchema(OrderDto, Order);
      expect(schema).toBeDefined();

      orderDto = new OrderDto();
      orderDto.primitiveMap = new Map();
      orderDto.primitiveMap.set(primitives[0].toString(), primitives[0]);
      orderDto.primitiveMap.set(primitives[1].toString(), primitives[1]);
      orderDto.primitiveMap.set(primitives[2].toString(), primitives[2]);

      const order = mapTypes(orderDto, Order);
      expect(order.primitiveArray).toBeInstanceOf(Array);
      expect(order.primitiveArray.length).toBe(3);
      const tItems = order.primitiveArray;
      tItems.forEach((item, index) => {
        expect(typeof item).toBe('number');
        expect(item).toEqual(primitives[index]);
      });
    });
  });

  describe('Transform To Tuple', () => {
    it('From Tuple', () => {
      defineClassMapping(OrderDto, Order, optionsFactory())
        .forMember('tuple', 'tuple', true)
        .forAllOtherMembers(c => c.ignore())
        .seal();

      orderDto = new OrderDto();
      orderDto.tuple = [4, 'test', items[0], items[1]];

      const order = mapTypes(orderDto, Order);

      expect(order.tuple).toBeInstanceOf(Array);
      expect(order.tuple.length).toBe(4);
      const tItems = order.tuple;

      expect(tItems[0]).toBe(4);
      expect(tItems[1]).toBe('test');
      expect(tItems[2]).toBeInstanceOf(OrderItem);
      expect(tItems[2]).toEqual(items[0]);
      expect(tItems[3]).toBeInstanceOf(OrderItem);
      expect(tItems[3]).toEqual(items[1]);
    });


  });

  describe('Transform to Set', () => {
    it('From Array - Nested', () => {
      defineClassMapping(OrderDto, Order, optionsFactory())
        .forMember('itemsSet', 'itemsArray', OrderItemDto)
        .forAllOtherMembers(c => c.ignore())
        .seal();

      orderDto = new OrderDto();
      orderDto.itemsArray = [...items];

      const order = mapTypes(orderDto, Order);

      expect(order.itemsSet).toBeInstanceOf(Set);
      expect(order.itemsSet.size).toBe(2);
      const tItems = Array.from(order.itemsSet.values());
      tItems.forEach((item, index) => {
        expect(item).toBeInstanceOf(OrderItem);
        expect(item).toEqual(items[index]);
      });
    });

    it('From Set - Nested', () => {
      defineClassMapping(OrderDto, Order, optionsFactory())
        .forMember('itemsSet', 'itemsSet', OrderItemDto)
        .forAllOtherMembers(c => c.ignore())
        .seal();

      orderDto = new OrderDto();
      orderDto.itemsSet = new Set(items);

      const order = mapTypes(orderDto, Order);
      expect(order.itemsSet).toBeInstanceOf(Set);
      expect(order.itemsSet.size).toBe(2);
      const tItems = Array.from(order.itemsSet.values());
      tItems.forEach((item, index) => {
        expect(item).toBeInstanceOf(OrderItem);
        expect(item).toEqual(items[index]);
      });
    });

    it('From Map - Nested', () => {
      defineClassMapping(OrderDto, Order, optionsFactory())
        .forMember('itemsSet', 'itemsMap', OrderItemDto)
        .forAllOtherMembers(c => c.ignore())
        .seal();

      const schema = getSchema(OrderDto, Order);
      expect(schema).toBeDefined();

      orderDto = new OrderDto();
      orderDto.itemsMap = new Map();
      orderDto.itemsMap.set(items[0].name, items[0]);
      orderDto.itemsMap.set(items[1].name, items[1]);

      const order = mapTypes(orderDto, Order);
      expect(order.itemsSet).toBeInstanceOf(Set);
      expect(order.itemsSet.size).toBe(2);
      const tItems = Array.from(order.itemsSet.values());
      tItems.forEach((item, index) => {
        expect(item).toBeInstanceOf(OrderItem);
        expect(item).toEqual(items[index]);
      });
    });


    it('From Array - Primitive', () => {
      defineClassMapping(OrderDto, Order, optionsFactory())
        .forMember('primitiveSet', 'primitiveArray' as any)
        .forAllOtherMembers(c => c.ignore())
        .seal();

      orderDto = new OrderDto();
      orderDto.primitiveArray = [...primitives];

      const order = mapTypes(orderDto, Order);

      expect(order.primitiveSet).toBeInstanceOf(Set);
      expect(order.primitiveSet.size).toBe(3);
      const tItems = Array.from(order.primitiveSet.values());
      tItems.forEach((item, index) => {
        expect(typeof item).toBe('number');
        expect(item).toEqual(primitives[index]);
      });
    });

    it('From Set - Primitive', () => {
      defineClassMapping(OrderDto, Order, optionsFactory())
        .forMember('primitiveSet', 'primitiveSet' as any)
        .forAllOtherMembers(c => c.ignore())
        .seal();

      orderDto = new OrderDto();
      orderDto.primitiveSet = new Set(primitives);

      const order = mapTypes(orderDto, Order);
      expect(order.primitiveSet).toBeInstanceOf(Set);
      expect(order.primitiveSet.size).toBe(3);
      const tItems = Array.from(order.primitiveSet.values());
      tItems.forEach((item, index) => {
        expect(typeof item).toBe('number');
        expect(item).toEqual(primitives[index]);
      });
    });

    it('From Map - Primitive', () => {
      defineClassMapping(OrderDto, Order, optionsFactory())
        .forMember('primitiveSet', 'primitiveMap' as any)
        .forAllOtherMembers(c => c.ignore())
        .seal();

      const schema = getSchema(OrderDto, Order);
      expect(schema).toBeDefined();

      orderDto = new OrderDto();
      orderDto.primitiveMap = new Map();
      orderDto.primitiveMap.set(primitives[0].toString(), primitives[0]);
      orderDto.primitiveMap.set(primitives[1].toString(), primitives[1]);
      orderDto.primitiveMap.set(primitives[2].toString(), primitives[2]);

      const order = mapTypes(orderDto, Order);
      expect(order.primitiveSet).toBeInstanceOf(Set);
      expect(order.primitiveSet.size).toBe(3);
      const tItems = Array.from(order.primitiveSet.values());
      tItems.forEach((item, index) => {
        expect(typeof item).toBe('number');
        expect(item).toEqual(primitives[index]);
      });
    });

  });

  describe('Transform to Map', () => {

    it('From Map - Nested', () => {
      defineClassMapping(OrderDto, Order, optionsFactory())
        .forMember('itemsMap', 'itemsMap', OrderItemDto)
        .forAllOtherMembers(c => c.ignore())
        .seal();

      orderDto = new OrderDto();
      orderDto.itemsMap = new Map();
      orderDto.itemsMap.set(items[0].name, items[0]);
      orderDto.itemsMap.set(items[1].name, items[1]);

      const order = mapTypes(orderDto, Order);
      expect(order.itemsMap).toBeInstanceOf(Map);
      expect(order.itemsMap.size).toBe(2);
      const tItems = Array.from(order.itemsMap.entries());
      tItems.forEach((item, index) => {
        expect(item[0]).toEqual(items[index].name);
        expect(item[1]).toBeInstanceOf(OrderItem);
        expect(item[1]).toEqual(items[index]);
      });
    });

    it('From Object Map - Nested', () => {
      defineClassMapping(OrderDto, Order, optionsFactory())
        .forMember('itemsMap', 'itemsObjectMap' as any)
        .forAllOtherMembers(c => c.ignore())
        .seal();

      orderDto = new OrderDto();
      orderDto.itemsObjectMap = {};
      orderDto.itemsObjectMap[items[0].name] = items[0];
      orderDto.itemsObjectMap[items[1].name] = items[1];

      const order = mapTypes(orderDto, Order);
      expect(order.itemsMap).toBeInstanceOf(Map);
      expect(order.itemsMap.size).toBe(2);
      const tItems = Array.from(order.itemsMap.entries());
      tItems.forEach((item, index) => {
        expect(item[0]).toEqual(items[index].name);
        expect(item[1]).toBeInstanceOf(OrderItem);
        expect(item[1]).toEqual(items[index]);
      });
    });

    it('From Map - Primitive', () => {
      defineClassMapping(OrderDto, Order, optionsFactory())
        .forMember('primitiveMap', 'primitiveMap' as any)
        .forAllOtherMembers(c => c.ignore())
        .seal();

      orderDto = new OrderDto();
      orderDto.primitiveMap = new Map();
      orderDto.primitiveMap.set(primitives[0].toString(), primitives[0]);
      orderDto.primitiveMap.set(primitives[1].toString(), primitives[1]);
      orderDto.primitiveMap.set(primitives[2].toString(), primitives[2]);

      const order = mapTypes(orderDto, Order);
      expect(order.primitiveMap).toBeInstanceOf(Map);
      expect(order.primitiveMap.size).toBe(3);
      const tItems = Array.from(order.primitiveMap.entries());
      tItems.forEach((item, index) => {
        expect(item[0]).toEqual(primitives[index].toString());
        expect(typeof item[1]).toBe('number');
        expect(item[1]).toEqual(primitives[index]);
      });
    });

    it('From Object Map - Primitive', () => {
      defineClassMapping(OrderDto, Order, optionsFactory())
        .forMember('primitiveMap', 'primitiveObjectMap' as any)
        .forAllOtherMembers(c => c.ignore())
        .seal();

      orderDto = new OrderDto();
      orderDto.primitiveObjectMap = {};
      orderDto.primitiveObjectMap[primitives[0].toString()] = primitives[0];
      orderDto.primitiveObjectMap[primitives[1].toString()] = primitives[1];
      orderDto.primitiveObjectMap[primitives[2].toString()] = primitives[2];

      const order = mapTypes(orderDto, Order);
      expect(order.primitiveMap).toBeInstanceOf(Map);
      expect(order.primitiveMap.size).toBe(3);
      const tItems = Array.from(order.primitiveMap.entries());
      tItems.forEach((item, index) => {
        expect(item[0]).toEqual(primitives[index].toString());
        expect(typeof item[1]).toBe('number');
        expect(item[1]).toEqual(primitives[index]);
      });
    });

  });
});


class OrderItemDto {
  @P name: string;
  @P quantity: number;
}

class OrderItem extends Nominal<'OrderItem'>() {
  @P name: string;
  @P quantity: number;
}

class OrderDto {
  @P.asArray(() => OrderItemDto) itemsArray: Array<OrderItemDto>;
  @P.asSet(() => OrderItemDto) itemsSet: Set<OrderItemDto>;
  @P.asMap(() => OrderItemDto) itemsMap: Map<string, OrderItemDto>;
  @P.asObjectMap(() => OrderItemDto) itemsObjectMap: { [key: string]: OrderItemDto };

  @P.asArray(Number) primitiveArray: Array<Number>;
  @P.asSet(Number) primitiveSet: Set<Number>;
  @P.asMap(Number) primitiveMap: Map<string, Number>;
  @P.asObjectMap(Number) primitiveObjectMap: { [key: string]: Number };

  @P.asTuple('number', 'string', OrderItem, OrderItem) tuple: [number, string, OrderItemDto, OrderItemDto];
}

class Order {
  @P.asArray(() => OrderItem) itemsArray: Array<OrderItem>;
  @P.asSet(() => OrderItem) itemsSet: Set<OrderItem>;
  @P.asMap(() => OrderItem) itemsMap: Map<string, OrderItem>;

  @P.asArray(Number) primitiveArray: Array<Number>;
  @P.asSet(Number) primitiveSet: Set<Number>;
  @P.asMap(Number) primitiveMap: Map<string, Number>;

  @P.asTuple('number', 'string', OrderItem, OrderItem) tuple: [number, string, OrderItem, OrderItem];
}
