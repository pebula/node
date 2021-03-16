import { C, P, ClassMappingSchemaFactory,  defineClassMapping, mapTypes, Nominal } from '@pebula/tom';
import { clearMap, tomDescribeMapperJIT } from '@pebula/tom/testing';
import { invalidDataObjectError } from '@pebula/tom/src/lib/class-mapping/mapper/runtime/errors';

tomDescribeMapperJIT('@pebula/tom', ['enabled', 'disabled'], optionsFactory => {
  const adHocData = { verify: true };
  let orderDtoBaseline: OrderDto;
  let orderDto: OrderDto;
  let order: Order;

  beforeAll(() => {
    defineClassMapping(OrderItemDto, OrderItem, optionsFactory())
      .forMember('name', 'name')
      .forMember('quantity', 'quantity')
      .seal();

    defineClassMapping(AddressDto, Address, optionsFactory())
      .forMember('id', 'id')
      .forMember('street', 'street')
      .seal();

    defineClassMapping(CustomerDto, Customer, optionsFactory())
      .forMember('id', 'id')
      .forMember('name', ctx => ctx.map( ({source}) => `${source.firstName} ${source.lastName}` ))
      .forMember('score', 'rate')
      .seal();

    createOrderMap().seal();

    orderDtoBaseline = createOrderDto();
    orderDto = createOrderDto();
    order = mapTypes(orderDto, OrderDto, Order, { data: adHocData });
  });

  afterAll(() => {
    clearMap(OrderItemDto, OrderItem);
    clearMap(AddressDto, Address);
    clearMap(CustomerDto, Customer);
    clearMap(OrderDto, Order);
  });

  describe('transformTypes', () => {

    it('should not mutate the source', () => {
      expect(orderDtoBaseline).toEqual(orderDto);
    });

    it('should copy by reference when instructed (copyByRef())', () => {
      expect(order.directReferenceCopy).toBe(orderDto.directReferenceCopy);
    });

    it('should copy ad-hoc data', () => {
      expect(order.adHocData).toBe(adHocData);
    });

    it('should execute ad-hoc data verification and throw if failed', () => {
      createOrderMap()
        .verifyData( (data) => data && data.verify === true )
        .seal();

      const o = mapTypes(orderDto, OrderDto, Order, { data: adHocData });
      expect(o).toEqual(order);

      expect(() => mapTypes(orderDto, OrderDto, Order))
        .toThrowError(invalidDataObjectError(OrderDto, Order, true));

      createOrderMap().seal(); // return to original schema
    });

    it('should transform to a new instance of the target type', () => {
      expect(order).toBeInstanceOf(Order);
    });

    it('should transform a primitive property', () => {
      expect(order.id).toBe(orderDto.id);
    });

    it('should transform flattening (deep path access)', () => {
      expect(order.supportDeepPath).toBe(orderDto.support.deep.path);
    });

    it('should transform to a new instance of the container types', () => {
      expect(order.addresses).toBeInstanceOf(Array);
      expect(order.items).toBeInstanceOf(Set);
      expect(order.additionalItems).toBeInstanceOf(Map);
      expect(order.dictionary).toBeInstanceOf(Map);
    });

    it('should transform a single nested schema', () => {
      expect(order.customer).toBeInstanceOf(Customer);
      expect(order.customer.id).toBe(orderDto.customer.id);
      expect(order.customer.name).toBe(`${orderDto.customer.firstName} ${orderDto.customer.lastName}`);
      expect(order.customer.score).toBe(orderDto.customer.rate);
    });

    it('should transform an array of nested schemas', () => {
      expect(order.addresses).toBeInstanceOf(Array);
      expect(order.addresses[0]).toBeInstanceOf(Address);
      expect(order.addresses[0]).not.toBe(orderDto.addresses[0]);
      expect(order.addresses[0]).toEqual(orderDto.addresses[0]);
      expect(order.addresses[1]).toBeInstanceOf(Address);
      expect(order.addresses[1]).not.toBe(orderDto.addresses[1]);
      expect(order.addresses[1]).toEqual(orderDto.addresses[1]);
    });

    it('should transform a Set of nested schemas', () => {
      const orderItemDtos = Array.from(orderDto.items.values());
      const orderItems = Array.from(order.items.values());
      expect(orderItems[0]).toBeInstanceOf(OrderItem);
      expect(orderItems[0]).not.toBe(orderItemDtos[0]);
      expect(orderItems[0]).toEqual(orderItemDtos[0]);
      expect(orderItems[1]).toBeInstanceOf(OrderItem);

      expect(orderItems[1]).not.toBe(orderItemDtos[1]);
      expect(orderItems[1]).toEqual(orderItemDtos[1]);
    });

    it('should transform a Map of nested schemas', () => {
      const addOrderItemDtos = Array.from(orderDto.additionalItems.entries());
      const addOrderItems = Array.from(order.additionalItems.entries());
      expect(addOrderItems[0][1]).toBeInstanceOf(OrderItem);
      expect(addOrderItems[0][0]).toBe(addOrderItemDtos[0][0]);
      expect(addOrderItems[0][1]).not.toBe(addOrderItemDtos[0][1]);
      expect(addOrderItems[0][1]).toEqual(addOrderItemDtos[0][1]);
      expect(addOrderItems[1][1]).toBeInstanceOf(OrderItem);
      expect(addOrderItems[1][0]).toBe(addOrderItemDtos[1][0]);
      expect(addOrderItems[1][1]).not.toBe(addOrderItemDtos[1][1]);
      expect(addOrderItems[1][1]).toEqual(addOrderItemDtos[1][1]);
    });

    it('should not create duplicates (circular reference) when protection is enabled', () => {
      const orderItems = Array.from(order.items.values());
      const addOrderItems = Array.from(order.additionalItems.entries());
      expect(addOrderItems[2][1]).toBe(orderItems[0]);
    });

    it('should transform a plain javascript object', () => {
      expect(order.payment.constructor).toBe(Object);
      expect(order.payment).not.toBe(orderDto.payment);
      expect(order.payment).toEqual(orderDto.payment);
    });

    it('should transform an unmapped, schemaless object of a defined class', () => {
      expect(order.shipping).toBeInstanceOf(ShippingOption);
      expect(order.shipping).not.toBe(orderDto.shipping);
      expect(order.shipping).toEqual(orderDto.shipping);
    });

    it('should transform a map of primitives', () => {
      const dictionaryDto = Array.from(orderDto.dictionary.entries());
      const dictionary = Array.from(order.dictionary.entries());
      expect(dictionary[0][0]).toBe(dictionaryDto[0][0]);
      expect(dictionary[0][1]).toBe(dictionaryDto[0][1]);
      expect(dictionary[1][0]).toBe(dictionaryDto[1][0]);
      expect(dictionary[1][1]).toBe(dictionaryDto[1][1]);
    });

    it('should not transform properly if source objects are plain objects (no constructors...)', () => {
      const orderDtoFromPlain = createOrderDto();
      expect(orderDtoFromPlain).toEqual(orderDto);

      Object.setPrototypeOf(orderDtoFromPlain.customer, {});
      Object.setPrototypeOf(orderDtoFromPlain.shipping, {});
      orderDtoFromPlain.addresses.forEach( item => Object.setPrototypeOf(item, {}) );
      orderDtoFromPlain.items.forEach( item => Object.setPrototypeOf(item, {}) );
      orderDtoFromPlain.additionalItems.forEach( item => Object.setPrototypeOf(item, {}) );

      const orderFromPlain = mapTypes(orderDtoFromPlain, OrderDto, Order);
      expect(orderFromPlain).not.toEqual(order);
    });

    it('should transform source plain objects when schema explicitly defines the source type with direct property', () => {
      const orderDtoFromPlain = createOrderDto();
      expect(orderDtoFromPlain).toEqual(orderDto);

      createOrderMap('customer')
        .forMember('customer', 'customer', CustomerDto)
        .seal();

      const orderFromPlain = mapTypes(orderDtoFromPlain, OrderDto, Order);
      expect(orderFromPlain.customer).toEqual(order.customer);
    });

    it('should transform source plain objects when schema explicitly defines the source type with mapToProperty', () => {
      const orderDtoFromPlain = createOrderDto();
      expect(orderDtoFromPlain).toEqual(orderDto);

      createOrderMap('customer')
        .forMember('customer', ctx => ctx.mapToProperty('customer', CustomerDto))
        .seal();

      const orderFromPlain = mapTypes(orderDtoFromPlain, OrderDto, Order);
      expect(orderFromPlain.customer).toEqual(order.customer);
    });

    it('should transform source plain objects when schema explicitly defines the source type with mapToValue', () => {
      const orderDtoFromPlain = createOrderDto();
      expect(orderDtoFromPlain).toEqual(orderDto);

      createOrderMap('customer')
        .forMember('customer', ctx => ctx.mapToValue(orderDtoFromPlain.customer as any, CustomerDto))
        .seal();

      const orderFromPlain = mapTypes(orderDtoFromPlain, OrderDto, Order);
      expect(orderFromPlain.customer).toEqual(order.customer);
    });

    it('should transform source plain objects when schema explicitly defines the source type with map', () => {
      const orderDtoFromPlain = createOrderDto();
      expect(orderDtoFromPlain).toEqual(orderDto);

      createOrderMap('customer')
        .forMember('customer', ctx => ctx.map( c => c.source.customer as any, CustomerDto))
        .seal();

      const orderFromPlain = mapTypes(orderDtoFromPlain, OrderDto, Order);
      expect(orderFromPlain.customer).toEqual(order.customer);
    });

    it('should filter based on groups', () => {
      let orderWithGroupFilter = mapTypes(orderDto, OrderDto, Order, { groups: ['admin', 'accountManager']});
      expect(orderWithGroupFilter.customer).toEqual(order.customer);

      orderWithGroupFilter = mapTypes(orderDto, OrderDto, Order, { groups: ['admin']});
      expect(orderWithGroupFilter.customer).not.toEqual(order.customer);
      orderWithGroupFilter.customer.score = order.customer.score;
      expect(orderWithGroupFilter.customer).toEqual(order.customer);
    });
  });


  function createOrderMap<P extends keyof Order = never>(...allowRedefine: P[]) {
    clearMap(OrderDto, Order);
    return defineClassMapping(OrderDto, Order, optionsFactory())
      .forMember('customer', 'customer', CustomerDto)
      .forMember('supportDeepPath', ctx => ctx.mapToDeepProperty('support', 'deep', 'path', String))
      .forMember('directReferenceCopy', ctx => ctx.copyByRef().mapToProperty('directReferenceCopy'))
      .forMember('adHocData', ctx => ctx.copyByRef().map( c => c.options.data ) )
      .forMember('id', 'id')
      .forMember('addresses', 'addresses', AddressDto)
      .forAllOtherMembers( ctx => ctx.mapToProperty(ctx.targetProp as any)) as any as Omit<Order, P> extends Order
        ? ClassMappingSchemaFactory<OrderDto, Omit<Order, Exclude<keyof Order, P>>>
        : Omit<ClassMappingSchemaFactory<OrderDto, Omit<Order, Exclude<keyof Order, P>>>, 'seal'>
      ;
  }
});

/* ---------------------------------------------- */
class OrderItemDto {
  name: string;
  quantity: number;
}
class OrderItem {
  @P name: string;
  @P quantity: number;
}
/* ---------------------------------------------- */
class AddressDto {
  id: number;
  street: string;
}
// Because `Address` is also structurally `AddressDto` it will confuse the type system so we annotate it with Nominal
class Address extends Nominal<'Address'>() {
  @P id: number;
  @P street: string;
}
/* ---------------------------------------------- */
class  CustomerDto {
  id: number;
  firstName: string;
  lastName: string;
  rate: number;
}
class  Customer {
  @P id: number;
  @P name: string;
  @P.groups('accountManager')
  score: number;
}
/* ---------------------------------------------- */
class ShippingOption { // this one is unmapped!
  speed: number;
  price: number;
}
/* ---------------------------------------------- */
class OrderDto {
  id: number;
  customer: CustomerDto;
  addresses: AddressDto[];
  items: Set<OrderItem>;
  additionalItems: Map<string, OrderItem>;
  shipping: ShippingOption;
  payment: {
    type: 'creditCard' | 'paypal' | 'bitcoin';
    currency: string;
  };
  dictionary: Map<string, number>;
  support: { deep: { path: string } };
  directReferenceCopy: { [key: string]: any };
}
class Order {
  @P
  id: number;
  @P.groups('admin')
  customer: Customer;
  @P.as(() => Address)
  addresses: Address[];
  @P.as(() => OrderItem)
  items: Set<OrderItem>;
  @P.as(() => OrderItem)
  additionalItems: Map<string, OrderItem>;
  @P
  shipping: ShippingOption;
  @P
  payment: {
    type: 'creditCard' | 'paypal' | 'bitcoin';
    currency: string;
  };
  @P.as(() => Number)
  dictionary: Map<string, number>;
  @P
  supportDeepPath: string;
  @P
  directReferenceCopy: { [key: string]: any };
  @P
  adHocData: { verify: boolean };
}
/* ---------------------------------------------- */

const safeAssign: <T>(base: T, ext: Partial<T>) => T = Object.assign;

const createOrderDto = () => {
  const orderDto = safeAssign(new OrderDto(), {
    id: 1,
    customer: safeAssign(new CustomerDto(), { id: 1, firstName: 'John', lastName: 'Doe', rate: 99 }),
    shipping: safeAssign(new ShippingOption(), { speed: 10, price: 15 }),
    addresses: [
      safeAssign(new AddressDto(), { id: 1, street: 'Identity 1 Street' }),
      safeAssign(new AddressDto(), { id: 2, street: 'Identity 2 Street' }),
    ],
    items: new Set([
      safeAssign(new OrderItemDto(), { name: 'Galaxy S10', quantity: 1 }),
      safeAssign(new OrderItemDto(), { name: 'Pixel 4', quantity: 2 }),
    ]),
    additionalItems: new Map([
      ['OnePlus 7t', safeAssign(new OrderItemDto(), { name: 'OnePlus 7t', quantity: 4 })],
      ['Mi9', safeAssign(new OrderItemDto(), { name: 'Mi9', quantity: 6 })],
    ]),
    payment: { type: 'paypal', currency: 'USD' },
    dictionary: new Map([ ['ONE', 1], ['TWO', 2] ]),
    support: { deep: { path: 'DEEP' } },
    directReferenceCopy: { a: 1, b: 2, c: 3 },
  });

  const orderItemDtoRef = Array.from(orderDto.items.values())[0]; // this is expected to be a reference copy after the transform.
  orderDto.additionalItems.set(orderItemDtoRef.name, orderItemDtoRef);

  return orderDto;
};
