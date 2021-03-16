import { P, C, defineClassMapping, getMapper } from '@pebula/tom';
import { tomDescribeMapperJIT } from '@pebula/tom/testing';

tomDescribeMapperJIT('@pebula/tom', optionsFactory => {

  describe('Class Mapping Basics', () => {
    it('should serialize to Object', () => {
      @C class Model { }

      defineClassMapping(Model, optionsFactory()).seal();

      const model = new Model()
      const mappedModel = getMapper(Model).transform(model, {});
      expect(mappedModel).not.toBe(model);
      expect(mappedModel).toStrictEqual(model);
    });

    it('should serialize primitive types', () => {
      class Model {
        static create(pString: string, pNumber: number, pBoolean: boolean) {
          return Object.assign(new Model(), { pString, pNumber, pBoolean });
        }

        @P pString: string;
        @P.nullable pNumber: number;
        @P pBoolean: boolean;
      }

      defineClassMapping(Model, optionsFactory()).seal();
      const mapper = getMapper(Model);

      let model = Model.create(null, null, null);
      let mappedModel = mapper.transform(model, {});
      expect(mappedModel).not.toBe(model);
      expect(mappedModel).toStrictEqual(Model.create(undefined, null, undefined));

      model = Model.create(undefined, null, undefined);
      mappedModel = mapper.transform(model, {});
      expect(mappedModel).not.toBe(model);
      expect(mappedModel).toStrictEqual(model);

      model = Model.create('test', 15, true);
      mappedModel = mapper.transform(model, {});
      expect(mappedModel).not.toBe(model);
      expect(mappedModel).toStrictEqual(model);
    });

    it('should serialize bigInt', () => {
      class ModelA {
        @P n1: bigint;
        @P.as('bigInt') n2: BigInt;
        @P n3: bigint;

        constructor(data: Partial<ModelA> = {}) { Object.assign(this, data); }
      }

      class ModelB {
        @P n1: number;
        @P.as('bigInt') n2: BigInt;
        @P n3: string;

        constructor(data: Partial<ModelB> = {}) { Object.assign(this, data); }
      }

      defineClassMapping(ModelA, ModelB, optionsFactory())
        .forMember('n1', 'n1', true)
        .forMember('n2', 'n2')
        .forMember('n3', 'n3', true)
        .seal();

      defineClassMapping(ModelB, ModelA, optionsFactory())
        .forMember('n1', 'n1', true)
        .forMember('n2', 'n2')
        .forMember('n3', 'n3', true)
        .seal();

      const mapperAB = getMapper(ModelA, ModelB);
      const mapperBA = getMapper(ModelB, ModelA);

      let modelA = new ModelA();
      let modelB = mapperAB.transform(modelA, {});
      expect(modelB).toBeInstanceOf(ModelB);
      expect('n1' in modelB).toBe(false);
      expect('n2' in modelB).toBe(false);
      expect('n3' in modelB).toBe(false);

      modelA = new ModelA({ n1: BigInt(999), n2: BigInt(888), n3: BigInt(777) });
      modelB = mapperAB.transform(modelA, {});
      expect(modelB).toBeInstanceOf(ModelB);
      expect(typeof modelB.n1).toBe('number')
      expect(modelB.n1).toBe(999);
      expect(typeof modelB.n2).toBe('bigint')
      expect(modelB.n2).toBe(BigInt(888));
      expect(typeof modelB.n3).toBe('string')
      expect(modelB.n3).toBe('777n');

      modelB = new ModelB({ n1: 999, n2: BigInt(888), n3: '777n' });
      modelA = mapperBA.transform(modelB, {});
      expect(modelA).toBeInstanceOf(ModelA);
      expect(typeof modelA.n1).toBe('bigint')
      expect(modelA.n1).toBe(BigInt(999));
      expect(typeof modelA.n2).toBe('bigint')
      expect(modelA.n2).toBe(BigInt(888));
      expect(typeof modelA.n3).toBe('bigint')
      expect(modelA.n3).toBe(BigInt(777));

    });

    it('should transform nested objects', () => {
      class Nested {
        @P one: number;
        @P two: number;
      }

      class Model {
        @P a: number;
        @P b: number;
        @P child: Nested;
      }

      defineClassMapping(Nested, optionsFactory()).seal();
      defineClassMapping(Model, optionsFactory()).seal();
      const mapper = getMapper(Model);

      const model = new Model();
      model.a = 10;
      model.b = 20;
      model.child = new Nested();
      model.child.one = 1;
      model.child.two = 2;

      const mappedModel = mapper.transform(model, {});
      expect(mappedModel).not.toBe(model);
      expect(mappedModel.child).not.toBe(model.child);
      expect(mappedModel).toStrictEqual(model);
      expect(mappedModel).toStrictEqual(model);
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

      defineClassMapping(Model, optionsFactory())
        .resetMembers()
        .forMember('a', 'a')
        .forMember('b', ctx => ctx.mapToValue(99) )
        .forMember('c', ctx => ctx.mapToProperty('a'))
        .forMember('d', ctx => ctx.mapToDeepProperty('deep', 'at', 'the', 'bottom'))
        .forMember('ad', ctx => ctx.map( c => `${c.getSourceValue('a')} - ${c.getSourceValue('d')}`))
        .forAllOtherMembers( ctx => ctx.ignore() )
        .seal();

      const mapper = getMapper(Model);
      const model = new Model();
      model.a = 10;
      model.b = -1;
      model.c = -1;
      model.d = -1;
      model.deep = { at: { the: { bottom: -999 } } };

      let mappedModel = mapper.transform(model, {});
      expect(mappedModel).not.toBe(model);
      expect(mappedModel).toBeInstanceOf(Model);
      expect(mappedModel.a).toBe(model.a);
      expect(mappedModel.b).toBe(99);
      expect(mappedModel.c).toBe(model.a);
      expect(mappedModel.d).toBe(model.deep.at.the.bottom);
      expect('deep' in mappedModel).toBe(false);
      expect(mappedModel.ad).toBe(`${model.a} - ${model.d}`);

    });
  });
});
