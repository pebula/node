import { P, defineClassMapping, mapTypes, Nominal } from '@pebula/tom/mapping';
import { clearMap, tomDescribeMapperJIT } from '@pebula/tom/testing';

tomDescribeMapperJIT('@pebula/tom', optionsFactory => {


  describe('Mapper Basics', () => {

    it('should transform nested objects with circular reference protection', () => {

      class C1 {
        @P a: number;
        @P b: number;
        @P.as(() => C1) child: C1;
      }

      class C2 extends Nominal<'C2'>() {
        @P a: number;
        @P b: number;
        @P.as(() => C2) child: C2;
      }

      defineClassMapping(C1, C2, optionsFactory())
        .forMember('a', 'a')
        .forMember('b', 'b')
        .forMember('child', 'child', true)
        .seal();

      const c1 = new C1();
      c1.a = 1;
      c1.b = 2;
      c1.child = c1;

      const c2 = mapTypes(c1, C2, {  });

      expect(c2).not.toBe(c1);
      expect(c2).toEqual(c1);
      expect(c2.child).not.toBe(c1.child);
      expect(c2.child).toEqual(c1.child);
      expect(c2.child).toBe(c2.child);

      clearMap(C1, C2);
    });

    it('should transform nested array items with circular reference protection', () => {

      class C1 {
        @P a: number;
        @P b: number;
        constructor(a: number, b: number) {
          this.a = a;
          this.b = b;
        }
      }

      class C2 extends Nominal<'C2'>() {
        @P a: number;
        @P b: number;
      }

      class P1 {
        @P.asArray(() => C1) c: C1[];
      }

      class P2 extends Nominal<'P2'>() {
        @P.asArray(() => C2) c: C2[];
      }

      defineClassMapping(C1, C2, optionsFactory())
        .forMember('a', 'a')
        .forMember('b', 'b')
        .seal();

      defineClassMapping(P1, P2, optionsFactory())
        .forMember('c', 'c', true)
        .seal();

      const cItems = [ new C1(1, 2), new C1(3, 4)];
      cItems.push(cItems[1]);

      const p1 = new P1();
      p1.c = cItems;

      const p2 = mapTypes(p1, P2, { });

      expect(p2).not.toBe(p1);
      expect(p2).toEqual(p1);
      expect(p2.c).toBeInstanceOf(Array);
      expect(p2.c).not.toBe(p1.c);
      expect(p2.c.length).toBe(cItems.length);

      for (let i = 0; i < cItems.length; i++) {
        expect(p2.c[i]).toEqual(cItems[i]);
        expect(p2.c[i]).not.toBe(cItems[i]);
      }

      expect(p2.c[0]).not.toEqual(p2.c[1]);
      expect(p2.c[0]).not.toBe(p2.c[1]);
      expect(p2.c[1]).toBe(p2.c[2]);

      clearMap(C1, C2);
      clearMap(P1, P2);
    });

  });
});

