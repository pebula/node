import { C, P } from '../../../schema';
import { schemaRegistry } from '../../registry';
import { mapperSealedError } from './errors';
import { ClassSerializerSchemaFactory } from './class-serializer-schema-factory';
import { passthroughSerializer } from '../../serializers';
import { clearSerializer } from '../../define-class-serializer';

@C class TestClass {}
const testSerializer = passthroughSerializer.fork('TestSerialize');

describe('map-schema', () => {
  afterEach(() => {
    clearSerializer(testSerializer);
  });


  describe('ClassSerializerSchemaFactory', () => {
    it('should be able to seal', () => {
      new ClassSerializerSchemaFactory(testSerializer, TestClass).seal();
      expect(schemaRegistry.has(testSerializer, TestClass)).toBe(true);
      expect(schemaRegistry.get(testSerializer, TestClass).serialize).toBeTruthy();
      expect(schemaRegistry.get(testSerializer, TestClass).deserialize).toBeTruthy();
    });

    it('should be able to seal only one operation', () => {
      new ClassSerializerSchemaFactory(testSerializer, TestClass).seal('serialize');
      expect(schemaRegistry.has(testSerializer, TestClass)).toBe(true);
      expect(schemaRegistry.get(testSerializer, TestClass).serialize).toBeTruthy();
      expect(schemaRegistry.get(testSerializer, TestClass).deserialize).toBeFalsy();
      clearSerializer(testSerializer);

      new ClassSerializerSchemaFactory(testSerializer, TestClass).seal('deserialize');
      expect(schemaRegistry.has(testSerializer, TestClass)).toBe(true);
      expect(schemaRegistry.get(testSerializer, TestClass).serialize).toBeFalsy();
      expect(schemaRegistry.get(testSerializer, TestClass).deserialize).toBeTruthy();
    });

    it('should be able to seal one after the other', () => {
      let serialize = new ClassSerializerSchemaFactory(testSerializer, TestClass).seal('serialize');
      expect(schemaRegistry.has(testSerializer, TestClass)).toBe(true);
      expect(schemaRegistry.get(testSerializer, TestClass).serialize).toBeTruthy();
      expect(schemaRegistry.get(testSerializer, TestClass).deserialize).toBeFalsy();
      serialize.defineDeserialize().seal();
      expect(schemaRegistry.has(testSerializer, TestClass)).toBe(true);
      expect(schemaRegistry.get(testSerializer, TestClass).serialize).toBeTruthy();
      expect(schemaRegistry.get(testSerializer, TestClass).deserialize).toBeTruthy();

      clearSerializer(testSerializer);

      const deserialize = new ClassSerializerSchemaFactory(testSerializer, TestClass).seal('deserialize');
      expect(schemaRegistry.has(testSerializer, TestClass)).toBe(true);
      expect(schemaRegistry.get(testSerializer, TestClass).serialize).toBeFalsy();
      expect(schemaRegistry.get(testSerializer, TestClass).deserialize).toBeTruthy();
      deserialize.defineSerialize().seal();
      expect(schemaRegistry.has(testSerializer, TestClass)).toBe(true);
      expect(schemaRegistry.get(testSerializer, TestClass).serialize).toBeTruthy();
      expect(schemaRegistry.get(testSerializer, TestClass).deserialize).toBeTruthy();
    });

    it('should not register the serializer if not sealed', () => {
      new ClassSerializerSchemaFactory(testSerializer, TestClass);
      expect(schemaRegistry.has(testSerializer, TestClass)).toBe(false);
    });

    it('should throw when trying to seal an already sealed mapper', () => {
      const mapper = new ClassSerializerSchemaFactory(testSerializer, TestClass);
      mapper.seal();
      expect(() => mapper.seal()).toThrow(mapperSealedError(testSerializer, TestClass));
      expect(() => mapper.seal('serialize')).toThrow(mapperSealedError(testSerializer, TestClass));
      expect(() => mapper.seal('deserialize')).toThrow(mapperSealedError(testSerializer, TestClass));
    });


    it('should be properly extend fork', () => {
      class TestClass2 {
        @P a: number;
        @P b: string;
      }

      new ClassSerializerSchemaFactory(testSerializer, TestClass2)
        .forMember('a', ctx => ctx.map( c => 1 ))
        .forMember('b', ctx => ctx.map( c => 'A' ))
        .seal('serialize')
        .forkDeserialize()
        .resetMembers('b')
        .forMember('b', ctx => ctx.map( c => 'B'))
        .seal();

      let model = new TestClass2();
      let pojo = testSerializer.get(TestClass2).serialize(model);
      expect(pojo.a).toBe(1);
      expect(pojo.b).toBe('A');
      model = testSerializer.get(TestClass2).deserialize({});
      expect(model.a).toBe(1);
      expect(model.b).toBe('B');
    });

    it('should be properly extend define', () => {
      class TestClass2 {
        @P a: number;
        @P b: string;
      }

      new ClassSerializerSchemaFactory(testSerializer, TestClass2)
        .forMember('a', ctx => ctx.map( c => 1 ))
        .forMember('b', ctx => ctx.map( c => 'A' ))
        .seal('serialize')
        .defineDeserialize()
        .resetMembers('b')
        .forMember('b', ctx => ctx.map( c => 'B'))
        .seal();

      let model = new TestClass2();
      let pojo = testSerializer.get(TestClass2).serialize(model);
      expect(pojo.a).toBe(1);
      expect(pojo.b).toBe('A');
      model = testSerializer.get(TestClass2).deserialize({});
      expect(model.a).toBeUndefined();
      expect(model.b).toBe('B');
    });
  });

});
