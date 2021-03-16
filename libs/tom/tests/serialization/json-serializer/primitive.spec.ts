import { P, jsonSerializer } from '@pebula/tom';
import { clearSerializer, tomDescribeSerializerJIT } from '@pebula/tom/testing';

tomDescribeSerializerJIT('@pebula/tom', jsonSerializer, childSerializer => {

  describe('type-compilers - primitive', () => {
    afterEach(() => {
      clearSerializer(childSerializer);
    });

    test('"boolean" JSON compiler', () => {
      class Model {
        @P a: boolean;
        @P b: boolean;
        @P c: boolean;
        @P d: boolean;
      }

      const serializer = childSerializer.create(Model);

      let model = new Model();
      model.a = true;
      model.b = false;
      // model.c = true;
      model.d = null;

      let pojo = serializer.serialize(model);
      expect(pojo.a).toBe(true);
      expect(pojo.b).toBe(false);

      model = serializer.deserialize({ a: true, b: false, c: 'true', d: 'false' });
      expect(model.a).toBe(true);
      expect(model.b).toBe(false);
      expect(model.c).toBe(true);
      expect(model.d).toBe(false);

      model = serializer.deserialize({ a: 1, b: 0, c: '1', d: '0' });
      expect(model.a).toBe(true);
      expect(model.b).toBe(false);
      expect(model.c).toBe(true);
      expect(model.d).toBe(false);
    });

    test('"number" JSON compiler', () => {
      class Model {
        @P a: number;
        @P b: number;
        @P c: number;
        @P d: number;
      }

      const serializer = childSerializer.create(Model);

      let model = new Model();
      model.a = 5;
      model.b = 6;
      // model.c = true;
      model.d = null;

      let pojo = serializer.serialize(model);
      expect(pojo.a).toBe(5);
      expect(pojo.b).toBe(6);

      model = serializer.deserialize({ a: 5, b: 6, c: '7' });
      expect(model.a).toBe(5);
      expect(model.b).toBe(6);
      expect(model.c).toBe(7);

      model = serializer.deserialize({ a: null, b: undefined, c: '' });
      expect(model.a).toBeUndefined(); // because it's not nullable
      expect(model.b).toBeUndefined();
      expect(model.c).toBe(0);
    });

    test('"string" JSON compiler', () => {
      class Model {
        @P a: string;
        @P b: string;
        @P c: string;
        @P d: string;
      }

      const serializer = childSerializer.create(Model);

      let model = new Model();
      model.a = 'test';
      model.b = '6';
      // model.c = true;
      model.d = null;

      let pojo = serializer.serialize(model);
      expect(pojo.a).toBe('test');
      expect(pojo.b).toBe('6');
      expect(pojo.c).toBeUndefined();
      expect(pojo.d).toBeUndefined();

      model = serializer.deserialize({ a: 'letter', b: 'six', c: '7' });
      expect(model.a).toBe('letter');
      expect(model.b).toBe('six');
      expect(model.c).toBe('7');

      model = serializer.deserialize({ a: null, b: undefined, c: '' });
      expect(model.a).toBeUndefined(); // because it's not nullable
      expect(model.b).toBeUndefined();
      expect(model.c).toBe('');
    });

    test('"date" JSON compiler', () => {
      class Model {
        @P a: Date;
        @P b: Date;
        @P c: Date;
        @P d: Date;
      }

      const serializer = childSerializer.create(Model);

      let model = new Model();
      const d = new Date();
      model.a = d;
      model.b = null;
      model.c = undefined;

      let pojo = serializer.serialize(model);
      expect(pojo.a).toBe(d.toJSON());
      expect(pojo.b).toBeUndefined(); // because its not nullable
      expect(pojo.c).toBeUndefined();

      model = serializer.deserialize({ a: d.toJSON(), b: null, c: undefined });
      expect(model.a).toEqual(d);
      expect(model.b).toBeUndefined();
      expect(model.c).toBeUndefined();
    });
  });
});
