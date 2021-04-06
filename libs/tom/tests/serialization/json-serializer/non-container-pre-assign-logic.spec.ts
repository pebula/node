import { P, jsonSerializer } from '@pebula/tom/serialization';
import { clearSerializer, tomDescribeSerializerJIT } from '@pebula/tom/testing';

tomDescribeSerializerJIT('@pebula/tom', jsonSerializer, childSerializer => {

  describe('property-code-blocks - non-container-pre-assign-logic', () => {
    afterEach(() => {
      clearSerializer(childSerializer);
    });

    test('using fixed value', () => {
      class Model {
        @P a: any;
        @P b: any;
      }

      childSerializer.define(Model)
        .resetMembers('a')
        .forMember('a', c => c.mapToValue('v' as any))
        .seal('serialize').defineDeserialize()
        .resetMembers('a', 'b')
        .forMember('a', c => c.mapToValue('v' as any))
        .forMember('b', c => c.mapToValue('P' as any))
        .seal();


      let model = new Model();
      let pojo = childSerializer.get(Model).serialize(model);
      expect(pojo.a).toBe('v');
      expect(pojo.b).toBeUndefined();

      model.a = 'test';
      pojo = childSerializer.get(Model).serialize(model);
      expect(pojo.a).toBe('v');
      expect(pojo.b).toBeUndefined();

      model = childSerializer.get(Model).deserialize({});
      expect(model.a).toBe('v');
      expect(model.b).toBe('P');

      model = childSerializer.get(Model).deserialize({ a: 'test' });
      expect(model.a).toBe('v');
      expect(model.b).toBe('P');
    });

    test('using mapped value', () => {
      class Model {
        @P a: any;
        @P b: any;
      }

      let count = 1;

      childSerializer
        .define(Model)
        .resetMembers('a', 'b')
        .forMember('a', c => c.map( ctx => count++ ))
        .forMember('b', c => c.map( ctx => count++ ))
        .seal('deserialize')
        .defineSerialize()
        .resetMembers('a')
        .forMember('a', c => c.map( ctx => count++ ))
        .seal();

      let model = new Model();
      let pojo = childSerializer.get(Model).serialize(model);
      expect(pojo.a).toBe(1);
      expect(pojo.b).toBeUndefined();

      model.a = 'test';
      pojo = childSerializer.get(Model).serialize(model);
      expect(pojo.a).toBe(2);
      expect(pojo.b).toBeUndefined();

      model = childSerializer.get(Model).deserialize({});
      expect(model.a).toBe(3);
      expect(model.b).toBe(4);

      model = childSerializer.get(Model).deserialize({ a: 'test' });
      expect(model.a).toBe(5);
      expect(model.b).toBe(6);
    });
  });
});
