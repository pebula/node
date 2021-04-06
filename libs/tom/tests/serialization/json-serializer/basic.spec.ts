import { P, C, jsonSerializer } from '@pebula/tom/serialization';
import { tomDescribeSerializerJIT, clearSerializer } from '@pebula/tom/testing';

if (!('toJSON' in BigInt.prototype)) {
  BigInt.prototype['toJSON'] = function() {
    return `${this}n`;
  }
}

tomDescribeSerializerJIT('@pebula/tom', jsonSerializer, childSerializer => {
  afterEach(() => {
    clearSerializer(childSerializer);
  });

  describe('Serialization Basics', () => {
    it('should serialize to Object', () => {
      @C class Model { }

      const model = new Model()
      const pojo = childSerializer.create(Model).serialize(model);
      expect(pojo).not.toBe(model);
      expect(pojo.constructor).toBe(Object);
    });

    it('should deserialize to instance type', () => {
      @C class Model { }

      const pojo = {}
      const model = childSerializer.create(Model).deserialize(pojo);
      expect(model).not.toBe(pojo);
      expect(model.constructor).toBe(Model);
    });


    it('should serialize primitive types', () => {
      class Model {
        static create(pString: string, pNumber: number, pBoolean: boolean) {
          return Object.assign(new Model(), { pString, pNumber, pBoolean });
        }

        @P pString: string;
        @P pNumber: number;
        @P pBoolean: boolean;
      }

      const modelSerializer = childSerializer.create(Model);

      let model = Model.create(null, null, null)
      let c2 = modelSerializer.serialize(model);
      expect(c2).not.toBe(model);
      expect(c2.constructor).toBe(Object);
      expect(c2.pString).toBeUndefined();
      expect(c2.pNumber).toBeUndefined();
      expect(c2.pBoolean).toBeUndefined();

      model = Model.create(undefined, undefined, undefined);
      c2 = modelSerializer.serialize(model);
      expect(c2.pString).toBe(model.pString);
      expect(c2.pNumber).toBe(model.pNumber);
      expect(c2.pBoolean).toBe(model.pBoolean);

      model = Model.create('test', 15, true);
      c2 = modelSerializer.serialize(model);
      expect(c2.pString).toBe(model.pString);
      expect(c2.pNumber).toBe(model.pNumber);
      expect(c2.pBoolean).toBe(model.pBoolean);
    });

    it('should serialize bigInt', () => {
      class Model {
        @P numNative: bigint;
        @P.as('bigInt') num: BigInt;
      }

      const modelSerializer = childSerializer.create(Model);

      let model = modelSerializer.deserialize({});
      expect(model).toBeInstanceOf(Model);
      expect(model.num).toBeUndefined();

      model = modelSerializer.deserialize({ num: 123 });
      expect(model).toBeInstanceOf(Model);
      expect(typeof model.num).toBe('bigint')
      expect(model.num).toBe(BigInt(123));

      model = modelSerializer.deserialize({ num: `123n`, numNative: `${Number.MAX_SAFE_INTEGER}n` });
      expect(model).toBeInstanceOf(Model);
      expect(typeof model.num).toBe('bigint');
      expect(typeof model.numNative).toBe('bigint');
      expect(model.num).toBe(BigInt(123));
      expect(model.numNative).toBe(BigInt(Number.MAX_SAFE_INTEGER));

      model = new Model();
      let pojo = modelSerializer.serialize(model);
      expect(pojo).not.toBeInstanceOf(Model);
      expect(pojo.num).toBeUndefined();

      model.num = BigInt(123);
      pojo = modelSerializer.serialize(model);
      expect(pojo).not.toBeInstanceOf(Model);
      expect(typeof pojo.num).toBe('string')
      expect(pojo.num).toBe('123n');

      model.num = 123 as any;
      pojo = modelSerializer.serialize(model);
      expect(pojo).not.toBeInstanceOf(Model);
      expect(typeof pojo.num).toBe('string')
      expect(pojo.num).toBe('123n');
    });

    it('should transform nested objects', () => {
      class Nested {
        @P one: number;
        @P two: number;
      }

      class Model {
        @P a: number;
        @P b: number;
        @P.as(Nested) child: Nested;
      }

      const modelSerializer = childSerializer.add(Nested).create(Model);

      let model = new Model();
      model.a = 10;
      model.b = 20;
      model.child = new Nested();
      model.child.one = 1;
      model.child.two = 2;

      let pojo = modelSerializer.serialize(model);
      expect(pojo.a).toBe(model.a);
      expect(pojo.b).toBe(model.b);
      expect(pojo.child).not.toBe(model.child);
      expect(pojo.child.constructor).toBe(Object);
      expect(pojo.child.one).toBe(model.child.one);
      expect(pojo.child.two).toBe(model.child.two);

      model = modelSerializer.deserialize(pojo);
      expect(model.a).toBe(pojo.a);
      expect(model.b).toBe(pojo.b);
      expect(model.child).not.toBe(pojo.child);
      expect(model.child.constructor).toBe(Nested);
      expect(model.child.one).toBe(pojo.child.one);
      expect(model.child.two).toBe(pojo.child.two);


    });

    it('should convert enums', () => {


      enum OrderStatus {
        Paid = 'paid',
        Shipped = 'shipped',
        Completed = 'completed'
      }

      class Order {
        @P id: number;
        @P date: Date;
        @P shipped: boolean;
        @P.enum(OrderStatus) status: OrderStatus;
      }

      const d = new Date();
      let order = new Order();
      order.id = Date.now();
      order.date = d;
      order.shipped = true;
      order.status = OrderStatus.Paid;

      const orderSerializer = childSerializer.create(Order);

      let pojo = orderSerializer.serialize(order);
      expect(pojo.id).toBe(order.id);
      expect(pojo.date).toStrictEqual(d.toJSON());
      expect(pojo.shipped).toBe(order.shipped);
      expect(pojo.status).toBe(order.status);

      order = orderSerializer.deserialize(pojo);
      expect(order.id).toBe(pojo.id);
      expect(order.date).toStrictEqual(d);
      expect(order.shipped).toBe(pojo.shipped);
      expect(order.status).toBe(pojo.status);
    });

    it('should apply map, mapToValue, mapToProperty, mapToDeepProperty and ignore directives', () => {
      class Model {
        @P a: number;
        @P b: number;
        @P c: number;
        @P d: number;
        @P deep: { at: { the: { bottom: number }}};
        @P ad: string;
      }

      childSerializer.define(Model)
        .resetMembers()
        .forMember('a')
        .forMember('b', ctx => ctx.mapToValue(99) )
        .forMember('c', ctx => ctx.mapToProperty('a'))
        .forMember('d', ctx => ctx.mapToDeepProperty('deep', 'at', 'the', 'bottom'))
        .forMember('ad', ctx => ctx.map( c => `${c.getSourceValue('a')} - ${c.getSourceValue('d')}`))
        .forAllOtherMembers( ctx => ctx.ignore() )
        .seal('deserialize');

      const pojo = {
        a: 10,
        b: -1,
        c: -1,
        d: -1,
        deep: { at: { the: { bottom: -999 } } },
      }

      const model = childSerializer.get(Model).deserialize(pojo);
      expect(model).not.toBe(pojo);
      expect(model).toBeInstanceOf(Model);
      expect(model.a).toBe(pojo.a);
      expect(model.b).toBe(99);
      expect(model.c).toBe(pojo.a);
      expect(model.d).toBe(pojo.deep.at.the.bottom);
      expect('deep' in model).toBe(false);
      expect(model.ad).toBe(`${pojo.a} - ${pojo.d}`);

      // TODO: We currently don't support `mapToDeepProperty` for writing.
      //       It is only possible to read from a deep path, writing requires more work
    });

  });
});
