import { tomDescribeMapperJIT } from '@pebula/tom/testing';
import { P, defineClassMapping, getMapper } from '@pebula/tom/mapping';

tomDescribeMapperJIT('@pebula/tom', optionsFactory => {

  describe('Types: literal', () => {

    test('"literal" JSON compiler', () => {
      class Model {
        @P.literal(true) a: true;
        @P.literal(false) b: false;
        @P.literal(747) c: 747;
        @P.literal('literal-value') d: 'literal-value';
        @P.literal(null) e: null;
        @P.literal(undefined) f: undefined;
      }

      defineClassMapping(Model, optionsFactory()).seal();
      const mapper = getMapper(Model);

      let model = new Model();

      let mappedOrder = mapper.transform(model, {});
      expect(mappedOrder).not.toBe(model);
      expect(mappedOrder).toStrictEqual(model);

      model.a = undefined;
      model.b = undefined;
      model.c = undefined;
      model.d = undefined;
      model.e = undefined;
      model.f = undefined;
      mappedOrder = mapper.transform(model, {});
      expect(mappedOrder.a).toBe(true);
      expect(mappedOrder.b).toBe(false);
      expect(mappedOrder.c).toBe(747);
      expect(mappedOrder.d).toBe('literal-value');
      expect(mappedOrder.e).toBe(null);
      expect(mappedOrder.f).toBe(undefined);

      model.a = null;
      model.b = null;
      model.c = null;
      model.d = null;
      model.e = null;
      model.f = null;
      mappedOrder = mapper.transform(model, {});
      expect(mappedOrder.a).toBe(true);
      expect(mappedOrder.b).toBe(false);
      expect(mappedOrder.c).toBe(747);
      expect(mappedOrder.d).toBe('literal-value');
      expect(mappedOrder.e).toBe(null);
      expect(mappedOrder.f).toBe(undefined);

      model.a = true;
      model.b = false;
      model.c = 747;
      model.d = 'literal-value';
      model.e = null;
      model.f = undefined;
      mappedOrder = mapper.transform(model, {});
      expect(mappedOrder.a).toBe(true);
      expect(mappedOrder.b).toBe(false);
      expect(mappedOrder.c).toBe(747);
      expect(mappedOrder.d).toBe('literal-value');
      expect(mappedOrder.e).toBeNull();
      expect(mappedOrder.f).toBeUndefined();

      model.a = false as any;
      model.b = 832 as any;
      model.c = 'sgr' as any;
      model.d = 'value' as any;
      model.e = 'adsdsdsd' as any;
      model.f = 999 as any;
      mappedOrder = mapper.transform(model, {});
      expect(mappedOrder.a).toBe(false);
      expect(mappedOrder.b).toBe(832);
      expect(mappedOrder.c).toBe('sgr');
      expect(mappedOrder.d).toBe('value');
      expect(mappedOrder.e).toBe('adsdsdsd');
      expect(mappedOrder.f).toBe(999);

    });

  });
});
