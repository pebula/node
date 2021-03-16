import { P, jsonSerializer } from '@pebula/tom';
import { clearSerializer, tomDescribeSerializerJIT } from '@pebula/tom/testing';

tomDescribeSerializerJIT('@pebula/tom', jsonSerializer, childSerializer => {

  describe('type-compilers - primitive', () => {
    afterEach(() => {
      clearSerializer(childSerializer);
    });

    test('"ArrayBuffer" JSON compiler', () => {
      class Model {
        @P.as('arrayBuffer') b: ArrayBuffer;
      }

      const serializer = childSerializer.create(Model);

      let model = new Model();
      model.b = Buffer.from('Test', 'utf8')

      let pojo = serializer.serialize(model);
      expect(pojo.b).toStrictEqual({ ɵbufferɵ: Buffer.from('Test').toString('base64') });

      model = serializer.deserialize(pojo);
      expect(model.b).toBeInstanceOf(ArrayBuffer);
      expect(Buffer.from(model.b).toString('utf8')).toBe('Test');
    });

    describe('"TypedArray" JSON compiler', () => {
        test(`"int8Array" JSON compiler`, () => {
          class Model {
            @P.as(Int8Array) b: Int8Array;
            @P.as('int8Array') bt: Int8Array;
          }

          const serializer = childSerializer.create(Model);

          let model = new Model();
          model.b = new Int8Array(4) as any;
          model.b[0] = `T`.charCodeAt(0);
          model.b[1] = `e`.charCodeAt(0);
          model.b[2] = `s`.charCodeAt(0);
          model.b[3] = `t`.charCodeAt(0);
          model.bt = new Int8Array(4) as any;
          model.bt[0] = `T`.charCodeAt(0);
          model.bt[1] = `e`.charCodeAt(0);
          model.bt[2] = `s`.charCodeAt(0);
          model.bt[3] = `t`.charCodeAt(0);

          let pojo = serializer.serialize(model);
          expect(pojo.b).toStrictEqual({ ɵbufferɵ: Buffer.from('Test').toString('base64') });
          expect(pojo.bt).toStrictEqual({ ɵbufferɵ: Buffer.from('Test').toString('base64') });

          model = serializer.deserialize(pojo);
          expect(model.b).toBeInstanceOf(Int8Array);
          expect(model.bt).toBeInstanceOf(Int8Array);
          expect(Buffer.from(model.b as any).toString('utf8')).toBe('Test');
          expect(Buffer.from(model.bt as any).toString('utf8')).toBe('Test');
        });

        test(`"int16Array" JSON compiler`, () => {
          class Model {
            @P.as(Int16Array) b: Int16Array;
            @P.as('int16Array') bt: Int16Array;
          }

          const serializer = childSerializer.create(Model);

          let model = new Model();
          model.b = Int16Array.from([999, -19850, 432]);
          model.bt = Int16Array.from([21087, -5423, 12892]);

          let pojo = serializer.serialize(model);
          expect(pojo.b).toStrictEqual({ ɵbufferɵ: Buffer.from(model.b.buffer, model.b.byteOffset, model.b.byteLength).toString('base64') });
          expect(pojo.bt).toStrictEqual({ ɵbufferɵ: Buffer.from(model.bt.buffer, model.bt.byteOffset, model.bt.byteLength).toString('base64') });

          model = serializer.deserialize(pojo);
          expect(model.b).toBeInstanceOf(Int16Array);
          expect(model.bt).toBeInstanceOf(Int16Array);
          expect(model.b[0]).toBe(999);
          expect(model.b[1]).toBe(-19850);
          expect(model.b[2]).toBe(432);
          expect(model.bt[0]).toBe(21087);
          expect(model.bt[1]).toBe(-5423);
          expect(model.bt[2]).toBe(12892);
        });
    });


  });
});
