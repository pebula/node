import { P, jsonSerializer } from '@pebula/tom/serialization';
import { clearSerializer, tomDescribeSerializerJIT } from '@pebula/tom/testing';

tomDescribeSerializerJIT('@pebula/tom', jsonSerializer, childSerializer => {

  describe('type-compilers - literal', () => {
    afterEach(() => {
      clearSerializer(childSerializer);
    });

    test('"literal" JSON compiler', () => {
      class Model {
        @P.literal(true) a: true;
        @P.literal(false) b: false;
        @P.literal(747) c: 747;
        @P.literal('literal-value') d: 'literal-value';
        @P.literal(null) e: null;
        @P.literal(undefined) f: undefined;
      }

      const serializer = childSerializer.create(Model);

      let model = new Model();
      let pojo = serializer.serialize(model);
      expect(pojo.a).toBeUndefined()
      expect(pojo.b).toBeUndefined();
      expect(pojo.c).toBeUndefined();
      expect(pojo.d).toBeUndefined();
      expect(pojo.e).toBeUndefined();
      expect(pojo.f).toBeUndefined();

      model.a = undefined;
      model.b = undefined;
      model.c = undefined;
      model.d = undefined;
      model.e = undefined;
      model.f = undefined;
      pojo = serializer.serialize(model);
      expect(pojo.a).toBe(true);
      expect(pojo.b).toBe(false);
      expect(pojo.c).toBe(747);
      expect(pojo.d).toBe('literal-value');
      expect(pojo.e).toBeNull();
      expect(pojo.f).toBeUndefined();

      model.a = null;
      model.b = null;
      model.c = null;
      model.d = null;
      model.e = null;
      model.f = null;
      pojo = serializer.serialize(model);
      expect(pojo.a).toBe(true);
      expect(pojo.b).toBe(false);
      expect(pojo.c).toBe(747);
      expect(pojo.d).toBe('literal-value');
      expect(pojo.e).toBeNull();
      expect(pojo.f).toBeUndefined();

      model.a = true;
      model.b = false;
      model.c = 747;
      model.d = 'literal-value';
      model.e = null;
      model.f = undefined;
      pojo = serializer.serialize(model);
      expect(pojo.a).toBe(true);
      expect(pojo.b).toBe(false);
      expect(pojo.c).toBe(747);
      expect(pojo.d).toBe('literal-value');
      expect(pojo.e).toBeNull();
      expect(pojo.f).toBeUndefined();

      // On serialization we assume runtime type-safety so we don't override values and pass them as-is to the serialized target.
      // The exception (as seen above) is only for null/undefined when NOT nullable/optional respectively, there we do step in.
      model.a = false as any;
      model.b = 832 as any;
      model.c = 'sgr' as any;
      model.d = 'value' as any;
      model.e = 'adsdsdsd' as any;
      model.f = 999 as any;
      pojo = serializer.serialize(model);
      expect(pojo.a).toBe(false);
      expect(pojo.b).toBe(832);
      expect(pojo.c).toBe('sgr');
      expect(pojo.d).toBe('value');
      expect(pojo.e).toBe('adsdsdsd');
      expect(pojo.f).toBe(999);

      // DESERIALIZE:
      model = serializer.deserialize({});
      expect(model.a).toBeUndefined()
      expect(model.b).toBeUndefined();
      expect(model.c).toBeUndefined();
      expect(model.d).toBeUndefined();
      expect(model.e).toBeUndefined();
      expect(model.f).toBeUndefined();

      model = serializer.deserialize({ a: undefined, b: undefined, c: undefined, d: undefined, e: undefined, f: undefined });
      expect(model.a).toBe(true);
      expect(model.b).toBe(false);
      expect(model.c).toBe(747);
      expect(model.d).toBe('literal-value');
      expect(model.e).toBe(null);
      expect(model.f).toBe(undefined);

      model = serializer.deserialize({ a: null, b: null, c: null, d: null, e: null, f: null });
      expect(model.a).toBe(true);
      expect(model.b).toBe(false);
      expect(model.c).toBe(747);
      expect(model.d).toBe('literal-value');
      expect(model.e).toBe(null);
      expect(model.f).toBe(undefined);

      model = serializer.deserialize({ a: true, b: false, c: 747, d: 'literal-value', e: null, f: undefined });
      expect(model.a).toBe(true);
      expect(model.b).toBe(false);
      expect(model.c).toBe(747);
      expect(model.d).toBe('literal-value');
      expect(model.e).toBe(null);
      expect(model.f).toBe(undefined);

      model = serializer.deserialize({ a: 'test', b: 55, c: 'what', d: true, e: '4323', f: 999 });
      expect(model.a).toBe(true);
      expect(model.b).toBe(false);
      expect(model.c).toBe(747);
      expect(model.d).toBe('literal-value');
      expect(model.e).toBe(null);
      expect(model.f).toBe(undefined);
    });

  });
});
