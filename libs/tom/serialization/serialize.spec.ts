import { C, P } from '@pebula/tom';
import { deserialize, serialize } from './serialize';
import { serializerSchemaNotFoundError } from './errors';
import { defineClassSerializer, clearSerializer } from './define-class-serializer';
import { emptySerializer } from './serializers/built-in/empty/index';

describe('@pebula/tom', () => {
  class TestSerializer extends emptySerializer.forkType('TestSerializer') {  }

  let testSerializer: TestSerializer;

  describe('serialize', () => {
    class TestClass { }

    beforeAll(() => {
      testSerializer = new TestSerializer();
      defineClassSerializer(testSerializer, TestClass).seal();
    });

    afterAll(() => {
      clearSerializer(testSerializer);
    });


    it('should throw when the serializer and target does not have a defined schema', () => {
      clearSerializer(testSerializer, TestClass);

      expect(() => {
        serialize({}, testSerializer);
      }).toThrow(serializerSchemaNotFoundError(testSerializer, Object, 'serialize'));

      expect(() => {
        serialize(null, testSerializer);
      }).toThrow(serializerSchemaNotFoundError(testSerializer, class undefined {}, 'serialize'));

      expect(() => {
        serialize(new TestClass(), testSerializer);
      }).toThrow(serializerSchemaNotFoundError(testSerializer, TestClass, 'serialize'));

      expect(() => {
        serialize({}, testSerializer, {}, TestClass);
      }).toThrow(serializerSchemaNotFoundError(testSerializer, TestClass, 'serialize'));

      expect(() => {
        class X {};
        serialize(new X(), testSerializer, {}, TestClass);
      }).toThrow(serializerSchemaNotFoundError(testSerializer, TestClass, 'serialize'));
    });

  });

  describe('deserialize', () => {
    class TestClass { }

    beforeAll(() => {
      testSerializer = new TestSerializer();
      defineClassSerializer(testSerializer, TestClass).seal();
    });

    afterAll(() => {
      clearSerializer(testSerializer);
    });


    it('should throw when target type is not provided', () => {
      expect(() => {
        @C class X { }
        deserialize({}, testSerializer, null);
      }).toThrow(serializerSchemaNotFoundError(testSerializer, null, 'deserialize'));

    });

    it('should throw when the serializer and target does not have a defined schema', () => {
      clearSerializer(testSerializer, TestClass);

      expect(() => {
        deserialize({}, testSerializer, TestClass);
      }).toThrow(serializerSchemaNotFoundError(testSerializer, TestClass, 'deserialize'));

      expect(() => {
        deserialize({}, testSerializer, TestClass);
      }).toThrow(serializerSchemaNotFoundError(testSerializer, TestClass, 'deserialize'));

      expect(() => {
        deserialize({}, testSerializer, TestClass);
      }).toThrow(serializerSchemaNotFoundError(testSerializer, TestClass, 'deserialize'));

      expect(() => {
        deserialize({}, testSerializer, TestClass);
      }).toThrow(serializerSchemaNotFoundError(testSerializer, TestClass, 'deserialize'));
    });

  });
});


