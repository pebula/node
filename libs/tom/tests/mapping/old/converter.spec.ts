import { Schema } from '@pebula/tom';
import { clearConverter, clearMap, tomDescribeMapperJIT } from '@pebula/tom/testing';
import { P, defineClassMapping, defineEnumMapping, mapTypes, Types } from '@pebula/tom/mapping';

tomDescribeMapperJIT('@pebula/tom', optionsFactory => {

  describe('Converter Basics', () => {
    it('should undefined and nulls', () => {
      class C1 {
        constructor(pString: string, pNumber: number, pBoolean: boolean, pDate: Date) {
          this.pString = pString;
          this.pNumber = pNumber;
          this.pBoolean = pBoolean;
          this.pDate = pDate;
        }
        @P pString: string;
        @P pNumber: number;
        @P pBoolean: boolean;
        @P.as(Date) pDate: Date;
      }

      class C2 extends C1 { }

      defineClassMapping(C1, C2, optionsFactory())
        .forMember('pString', 'pString')
        .forMember('pNumber', 'pNumber')
        .forMember('pBoolean', 'pBoolean')
        .forMember('pDate', 'pDate')
        .seal();


      const undefyish = new C1(undefined, undefined, undefined, undefined);
      expect(mapTypes(undefyish, C2)).toEqual(undefyish);
      const nullish = new C1(null, null, null, null);
      expect(mapTypes(nullish, C2)).toEqual(undefyish);


      clearMap(C1, C2);
    });

    it('should undefined and nulls with nullable', () => {
      class C1 {
        constructor(pString: string, pNumber: number, pBoolean: boolean, pDate: Date) {
          this.pString = pString;
          this.pNumber = pNumber;
          this.pBoolean = pBoolean;
          this.pDate = pDate;
        }
        @P.nullable pString: string;
        @P.nullable pNumber: number;
        @P.nullable pBoolean: boolean;
        @P.nullable.as(Date) pDate: Date;
      }

      class C2 extends C1 {
        @P.nullable pString: string;
        @P.nullable pNumber: number;
        @P.nullable pBoolean: boolean;
        @P.nullable.as(Date) pDate: Date;
      }

      defineClassMapping(C1, C2, optionsFactory())
        .forMember('pString', 'pString')
        .forMember('pNumber', 'pNumber')
        .forMember('pBoolean', 'pBoolean')
        .forMember('pDate', 'pDate')
        .seal();

      const nullish = new C1(null, null, null, null);
      expect(mapTypes(nullish, C2)).toEqual(nullish);
      const undefyish = new C1(undefined, undefined, undefined, undefined);
      expect(mapTypes(undefyish, C2)).toEqual(nullish);

      clearMap(C1, C2);
    });

    it('should convert primitive types', () => {
      class C1 {
        constructor(pString: string, pNumber: number, pBoolean: boolean, pDate: Date) {
          this.pString = pString;
          this.pNumber = pNumber;
          this.pBoolean = pBoolean;
          this.pDate = pDate;
          this.pDateStr = pDate?.toISOString();
        }
        @P pString: string;
        @P pNumber: number;
        @P pBoolean: boolean;
        @P.as(Date) pDate: Date;
        @P pDateStr: string;
      }

      class C2 {
        @P pString: number;
        @P pNumber: string;
        @P pBoolean: string;
        @P.as(Date) pDate: Date;
        @P.as(Date) pDateStr: Date;
      }

      defineClassMapping(C1, C2, optionsFactory())
        .forMember('pString', 'pString', Types.String)
        .forMember('pNumber', 'pNumber', Types.Number)
        .forMember('pBoolean', 'pBoolean', Types.Boolean)
        .forMember('pDate', 'pDate')
        .forMember('pDateStr', 'pDateStr', Types.String)
        .seal();


      const date = new Date();
      const casted = new C1('99', 55, true, date);
      expect(mapTypes(casted, C2)).toEqual({
        pString: 99,
        pNumber: '55',
        pBoolean: 'true',
        pDate: date,
        pDateStr: date,
      });

      defineClassMapping(C2, C1, optionsFactory())
        .forMember('pString', 'pString', Types.Number)
        .forMember('pNumber', 'pNumber', Types.String)
        .forMember('pBoolean', 'pBoolean', Types.String)
        .forMember('pDate', 'pDate')
        .forMember('pDateStr', 'pDateStr', Types.Date)
        .seal();


      const casted2 = Object.assign(new C2(), { pString: 99, pNumber: '55', pBoolean: 'true', pDate: date, pDateStr: date });
      expect(mapTypes(casted2, C1)).toEqual({
        pString: '99',
        pNumber: 55,
        pBoolean: true,
        pDate: date,
        pDateStr: date.toISOString(),
      });


      clearMap(C1, C2);
      clearMap(C2, C1);
    });

  it('should cast primitive types', () => {
      class C1 {
        constructor(pString: string, pNumber: number, pBoolean: string) {
          this.pString = pString;
          this.pNumber = pNumber;
          this.pBoolean = pBoolean;
        }
        pString: string;
        pNumber: number;
        pBoolean: string;
      }

      class C2 {
        @P _pString: string;
        @P _pNumber: number;
        @P _pBoolean: boolean;
      }

      defineClassMapping(C1, C2, optionsFactory())
        .forMember('_pString', 'pNumber', Types.Number)
        .forMember('_pNumber', 'pString', Types.String)
        .forMember('_pBoolean', 'pBoolean', Types.String)
        .seal();

      const c1 = new C1('99', 15, '');
      const c2 = mapTypes(c1, C2);
      expect(c2).not.toBe(c1);
      expect(c2._pString).toBe('15');
      expect(c2._pNumber).toBe(99);
      expect(c2._pBoolean).toBe(false);

      clearMap(C1, C2);
    });

  });

  describe('Converter with collections', () => {
    it('should use value converters in collections', () => {
      class OrderDto {
        @P.as(Types.String)
        dates: Array<string>;
      }

      class Order {
        @P.as(Date)
        dates: Array<Date>;
      }

      defineClassMapping(OrderDto, Order, optionsFactory())
        .forMember('dates', 'dates', Types.String)
        .seal();

      const dates = [
        new Date(Date.now() + 432343),
        new Date(Date.now() - 42343),
        new Date(Date.now() - 4132343),
        new Date(Date.now() + 421432343),
      ];

      let orderDto = new OrderDto();
      orderDto.dates = dates.map(d => d.toISOString());
      let order = mapTypes(orderDto, Order);
      expect(order.dates).toEqual(dates);

      defineClassMapping(Order, OrderDto, optionsFactory())
        .forMember('dates', 'dates', Types.Date)
        .seal();

      order = new Order();
      order.dates = dates;
      orderDto = mapTypes(order, OrderDto);
      expect(orderDto.dates).toEqual(dates.map(d => d.toISOString()));

      clearMap(OrderDto, Order);
      clearMap(Order, OrderDto);
    });

    it('should use enum converters in collections', () => {
      enum E1 {
        A = 5,
        B = 20,
        C = 101
      }
      enum E2 {
        A = E1.A + 1,
        B = E1.B + 1,
        C = E1.C + 1
      }

      defineEnumMapping(E1, E2)
        .forMember('A', 'A')
        .forMember('B', 'B')
        .forMember('C', 'C')
        .seal();

      defineEnumMapping(E2, E1)
        .forMember('A', 'A')
        .forMember('B', 'B')
        .forMember('C', 'C')
        .seal();

      class OrderDto {
        @P.enum(E1)
        values: Array<E1>;
      }

      class Order {
        @P.enum(E2)
        values: Array<E2>;
      }

      defineClassMapping(OrderDto, Order, optionsFactory())
        .forMember('values', 'values', Schema.EnumClass(E1))
        .seal();

      const values = [
        E1.A,
        E1.B,
        E1.C,
      ];

      let orderDto = new OrderDto();
      orderDto.values = values;
      let order = mapTypes(orderDto, Order);
      expect(order.values).toEqual([E2.A, E2.B, E2.C]);

      defineClassMapping(Order, OrderDto, optionsFactory())
        .forMember('values', 'values', true)
        .seal();

      order = new Order();
      order.values = [E2.A, E2.B, E2.C].reverse();
      orderDto = mapTypes(order, OrderDto);
      expect(orderDto.values).toEqual(values.reverse());

      clearConverter(E1, E2);
      clearConverter(E2, E1);
      clearMap(OrderDto, Order);
      clearMap(Order, OrderDto);
    });
  });
});

