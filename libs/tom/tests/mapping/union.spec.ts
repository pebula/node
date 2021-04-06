import { tomDescribeMapperJIT } from '@pebula/tom/testing';
import { P, defineClassMapping, getMapper } from '@pebula/tom/mapping';

tomDescribeMapperJIT('@pebula/tom', optionsFactory => {

  describe('Types: union', () => {

    describe('Union type narrow/widen', () => {
      it('should narrow and widen union & numeric', () => {
        class ModelA {
          @P value: number;
          constructor(value?: any) {
            if (arguments.length === 1) {
              this.value = value;
            }
          }
        }

        class ModelB {
          @P.nullable.union(P.literal(5), P.literal(500), P.literal(true), P.literal('test'), P.literal('best')) value: 'test' | 'best' | true | 500 | 5;
          constructor(value?: any) {
            if (arguments.length === 1) {
              this.value = value;
            }
          }
        }

        defineClassMapping(ModelA, ModelB, optionsFactory())
          .forMember('value', 'value', true)
          .seal();
        defineClassMapping(ModelB, ModelA, optionsFactory())
          .forMember('value', 'value', true)
          .seal();

        const mapperAB = getMapper(ModelA, ModelB);
        const mapperBA = getMapper(ModelB, ModelA);

        expect(mapperAB.transform(new ModelA(500), {})).toEqual({ value: 500 });
        expect(mapperAB.transform(new ModelA(5), {})).toEqual({ value: 5 });
        expect(mapperAB.transform(new ModelA(99), {})).toEqual({ });

        expect(mapperBA.transform(new ModelB(500), {})).toEqual({ value: 500 });
        expect(mapperBA.transform(new ModelB(5), {})).toEqual({ value: 5 });
        expect(mapperBA.transform(new ModelB(97979), {})).toEqual({ });
      });

      it('should narrow and widen union & literal', () => {
        class ModelA {
          @P.literal('test') value: 'test';
          constructor(value?: any) {
            if (arguments.length === 1) {
              this.value = value;
            }
          }
        }

        class ModelB {
          @P.nullable.union(P.literal(5), P.literal(500), P.literal(true), P.literal('test'), P.literal('best')) value: 'test' | 'best' | true | 500 | 5;
          constructor(value?: any) {
            if (arguments.length === 1) {
              this.value = value;
            }
          }
        }

        defineClassMapping(ModelA, ModelB, optionsFactory())
          .forMember('value', 'value')
          .seal();
        defineClassMapping(ModelB, ModelA, optionsFactory())
          .forMember('value', 'value', true)
          .seal();

        const mapperAB = getMapper(ModelA, ModelB);
        const mapperBA = getMapper(ModelB, ModelA);

        expect(mapperAB.transform(new ModelA('test'), {})).toEqual({ value: 'test' });
        expect(mapperAB.transform(new ModelA('best'), {})).toEqual({ });
        expect(mapperAB.transform(new ModelA(true), {})).toEqual({ });
        expect(mapperAB.transform(new ModelA(500), {})).toEqual({ });
        expect(mapperAB.transform(new ModelA(5), {})).toEqual({ });
        expect(mapperAB.transform(new ModelA(99), {})).toEqual({ });

        expect(mapperBA.transform(new ModelB('test'), {})).toEqual({ value: 'test' });
        expect(mapperBA.transform(new ModelB('best'), {})).toEqual({ });
        expect(mapperBA.transform(new ModelB(97979), {})).toEqual({ });
      });
    });

    it('should map union types', () => {
      class ModelA {
        @P.nullable.union(P.literal('test'), P.as('number'), P.as('boolean')) value: 'test' | number | boolean | null;
        constructor(value?: any) {
          if (arguments.length === 1) {
            this.value = value;
          }
        }
      }

      class ModelB {
        @P.nullable.union(P.literal(5), P.literal(500), P.literal(true), P.literal('test'), P.literal('best')) value: 'test' | 'best' | true | 500 | 5;
        constructor(value?: any) {
          if (arguments.length === 1) {
            this.value = value;
          }
        }
      }

      defineClassMapping(ModelA, ModelB, optionsFactory())
        .forMember('value', 'value', true)
        .seal();
      defineClassMapping(ModelB, ModelA, optionsFactory())
        .forMember('value', 'value', true)
        .seal();

      const mapperAB = getMapper(ModelA, ModelB);
      const mapperBA = getMapper(ModelB, ModelA);

      expect(mapperAB.transform(new ModelA('test'), {})).toEqual({ value: 'test' });
      expect(mapperAB.transform(new ModelA(500), {})).toEqual({ value: 500 });
      expect(mapperAB.transform(new ModelA(true), {})).toEqual({ value: true });

      expect(mapperAB.transform(new ModelA(99), {})).toEqual({ });
      expect(mapperAB.transform(new ModelA(false), {})).toEqual({ });

      expect(mapperBA.transform(new ModelB('test'), {})).toEqual({ value: 'test' });
      expect(mapperBA.transform(new ModelB(500), {})).toEqual({ value: 500 });
      expect(mapperBA.transform(new ModelB(true), {})).toEqual({ value: true });

      expect(mapperBA.transform(new ModelB('best'), {})).toEqual({ });
      expect(mapperBA.transform(new ModelB(97979), {})).toEqual({ });
    });

    it('should map union types with array', () => {
      class ModelA {
        @P.asArray(P.union(P.literal('test'), P.as('number'), P.as('boolean'))) value: 'test' | number | boolean | null;
        constructor(value?: any) {
          if (arguments.length === 1) {
            this.value = value;
          }
        }
      }

      class ModelB {
        @P.asArray(P.union(P.literal(5), P.literal(500), P.literal(true), P.literal('test'), P.literal('best'))) value: 'test' | 'best' | true | 500 | 5;
        constructor(value?: any) {
          if (arguments.length === 1) {
            this.value = value;
          }
        }
      }

      defineClassMapping(ModelA, ModelB, optionsFactory())
        .forMember('value', 'value', true)
        .seal();
      defineClassMapping(ModelB, ModelA, optionsFactory())
        .forMember('value', 'value', true)
        .seal();

      const mapperAB = getMapper(ModelA, ModelB);
      const mapperBA = getMapper(ModelB, ModelA);

      expect(mapperAB.transform(new ModelA(['test']), {})).toEqual({ value: ['test'] });
      expect(mapperAB.transform(new ModelA([500]), {})).toEqual({ value: [500] });
      expect(mapperAB.transform(new ModelA([true]), {})).toEqual({ value: [true] });

      expect(mapperAB.transform(new ModelA([99]), {})).toEqual({ value: [] });
      expect(mapperAB.transform(new ModelA([false]), {})).toEqual({ value: [] });

      expect(mapperBA.transform(new ModelB(['test']), {})).toEqual({ value: ['test'] });
      expect(mapperBA.transform(new ModelB([500]), {})).toEqual({ value: [500] });
      expect(mapperBA.transform(new ModelB([true]), {})).toEqual({ value: [true] });

      expect(mapperBA.transform(new ModelB(['best']), {})).toEqual({ value: [] });
      expect(mapperBA.transform(new ModelB([97979]), {})).toEqual({ value: [] });
    });

    it('should map union types with set', () => {
      class ModelA {
        @P.asSet(P.union(P.literal('test'), P.as('number'), P.as('boolean'))) value: 'test' | number | boolean | null;
        constructor(value?: any) {
          if (arguments.length === 1) {
            this.value = value;
          }
        }
      }

      class ModelB {
        @P.asArray(P.union(P.literal(5), P.literal(500), P.literal(true), P.literal('test'), P.literal('best'))) value: 'test' | 'best' | true | 500 | 5;
        constructor(value?: any) {
          if (arguments.length === 1) {
            this.value = value;
          }
        }
      }

      defineClassMapping(ModelA, ModelB, optionsFactory())
        .forMember('value', 'value', true)
        .seal();
      defineClassMapping(ModelB, ModelA, optionsFactory())
        .forMember('value', 'value', true)
        .seal();

      const mapperAB = getMapper(ModelA, ModelB);
      const mapperBA = getMapper(ModelB, ModelA);

      expect(mapperAB.transform(new ModelA(new Set(['test'])), {})).toEqual({ value: ['test'] });
      expect(mapperAB.transform(new ModelA(new Set([500])), {})).toEqual({ value: [500] });
      expect(mapperAB.transform(new ModelA(new Set([true])), {})).toEqual({ value: [true] });

      expect(mapperAB.transform(new ModelA(new Set([99])), {})).toEqual({ value: [] });
      expect(mapperAB.transform(new ModelA(new Set([false])), {})).toEqual({ value: [] });

      expect(mapperBA.transform(new ModelB(['test']), {})).toEqual({ value: new Set(['test']) });
      expect(mapperBA.transform(new ModelB([500]), {})).toEqual({ value: new Set([500]) });
      expect(mapperBA.transform(new ModelB([true]), {})).toEqual({ value: new Set([true]) });

      expect(mapperBA.transform(new ModelB(['best']), {})).toEqual({ value: new Set() });
      expect(mapperBA.transform(new ModelB([97979]), {})).toEqual({ value: new Set() });
    });

    it('should map union types with map', () => {
      class ModelA {
        @P.asMap(P.union(P.literal('test'), P.as('number'), P.as('boolean'))) value: 'test' | number | boolean | null;
        constructor(value?: any) {
          if (arguments.length === 1) {
            this.value = value;
          }
        }
      }

      class ModelB {
        @P.asArray(P.union(P.literal(5), P.literal(500), P.literal(true), P.literal('test'), P.literal('best'))) value: 'test' | 'best' | true | 500 | 5;
        constructor(value?: any) {
          if (arguments.length === 1) {
            this.value = value;
          }
        }
      }

      defineClassMapping(ModelA, ModelB, optionsFactory())
        .forMember('value', 'value', true)
        .seal();
      defineClassMapping(ModelB, ModelA, optionsFactory())
        .forMember('value', 'value', true)
        .seal();

      const mapperAB = getMapper(ModelA, ModelB);
      const mapperBA = getMapper(ModelB, ModelA);

      expect(mapperAB.transform(new ModelA(new Map([[0, 'test']])), {})).toEqual({ value: ['test'] });
      expect(mapperAB.transform(new ModelA(new Map([[0, 500]])), {})).toEqual({ value: [500] });
      expect(mapperAB.transform(new ModelA(new Map([[0, true]])), {})).toEqual({ value: [true] });

      expect(mapperAB.transform(new ModelA(new Map([[0, 99]])), {})).toEqual({ value: [] });
      expect(mapperAB.transform(new ModelA(new Map([[0, false]])), {})).toEqual({ value: [] });

      expect(mapperBA.transform(new ModelB(['test']), {})).toEqual({ value: new Map([[0, 'test']]) });
      expect(mapperBA.transform(new ModelB([500]), {})).toEqual({ value: new Map([[0, 500]]) });
      expect(mapperBA.transform(new ModelB([true]), {})).toEqual({ value: new Map([[0, true]]) });

      expect(mapperBA.transform(new ModelB(['best']), {})).toEqual({ value: new Map() });
      expect(mapperBA.transform(new ModelB([97979]), {})).toEqual({ value: new Map() });
    });

    it('should map union types with objectMap', () => {
      class ModelA {
        @P.asObjectMap(P.union(P.literal('test'), P.as('number'), P.as('boolean'))) value: 'test' | number | boolean | null;
        constructor(value?: any) {
          if (arguments.length === 1) {
            this.value = value;
          }
        }
      }

      class ModelB {
        @P.asArray(P.union(P.literal(5), P.literal(500), P.literal(true), P.literal('test'), P.literal('best'))) value: 'test' | 'best' | true | 500 | 5;
        constructor(value?: any) {
          if (arguments.length === 1) {
            this.value = value;
          }
        }
      }

      defineClassMapping(ModelA, ModelB, optionsFactory())
        .forMember('value', 'value', true)
        .seal();
      defineClassMapping(ModelB, ModelA, optionsFactory())
        .forMember('value', 'value', true)
        .seal();

      const mapperAB = getMapper(ModelA, ModelB);
      const mapperBA = getMapper(ModelB, ModelA);

      expect(mapperAB.transform(new ModelA({ a: 'test'}), {})).toEqual({ value: ['test'] });
      expect(mapperAB.transform(new ModelA({ b: 500 }), {})).toEqual({ value: [500] });
      expect(mapperAB.transform(new ModelA({ c: true }), {})).toEqual({ value: [true] });

      expect(mapperAB.transform(new ModelA({ b: 99 }), {})).toEqual({ value: [] });
      expect(mapperAB.transform(new ModelA({ b: false }), {})).toEqual({ value: [] });

      expect(mapperBA.transform(new ModelB(['test']), {})).toEqual({ value: { 0: 'test'} });
      expect(mapperBA.transform(new ModelB([500]), {})).toEqual({ value: { 0: 500 } });
      expect(mapperBA.transform(new ModelB([true]), {})).toEqual({ value: { 0: true } });

      expect(mapperBA.transform(new ModelB(['best']), {})).toEqual({ value: {} });
      expect(mapperBA.transform(new ModelB([97979]), {})).toEqual({ value: {} });
    });
  });
});
