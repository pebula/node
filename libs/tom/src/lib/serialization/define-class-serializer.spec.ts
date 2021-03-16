import { C, P } from '../schema';
import { schemaRegistry } from './registry';
import { clearSerializer, defineClassSerializer } from './define-class-serializer';
import { missingPropertySchema } from './serializer-schema/class-serializer-schema/errors';
import { jsonSerializer } from './serializers';
import { deserialize, serialize } from './serialize';

describe('map-schema', () => {
  const testSerializer = jsonSerializer.fork('testSerializer');

  describe('clearSerializer', () => {
    it('should return false if clear serializer is called for a non-existing mapping', () => {
      @C class TestClass {}
      expect(clearSerializer(testSerializer, TestClass)).toBe(false);
    });

    it('should clear an existing serializer', () => {
      @C class TestClass {}
      defineClassSerializer(testSerializer, TestClass).seal();
      expect(schemaRegistry.has(testSerializer, TestClass)).toBe(true);
      expect(clearSerializer(testSerializer, TestClass)).toBe(true);
      expect(schemaRegistry.has(testSerializer, TestClass)).toBe(false);
    });
  });

  describe('defineClassSerializer', () => {
    it('should create a serializer', () => {
      @C class TestClass {}
      defineClassSerializer(testSerializer, TestClass).seal();
      expect(schemaRegistry.has(testSerializer, TestClass)).toBe(true);
    });

    it('should not create a serializer if not sealed', () => {
      @C class TestClass {}
      const m = defineClassSerializer(testSerializer, TestClass);
      expect(schemaRegistry.has(testSerializer, TestClass)).toBe(false);
    });

    it('should throw when trying to seal a sealed mapper', () => {
      @C class TestClass {}
      const mapper = defineClassSerializer(testSerializer, TestClass);
      mapper.seal();
      expect(() =>  mapper.seal()).toThrow();
    });

    it('should throw when when target is unknown', () => {
      @C
      class TestClass {
        a: string;
      }

      expect(() => {
        defineClassSerializer(testSerializer, TestClass)
          .forMember('a')
          .seal();
      }).toThrow(missingPropertySchema(testSerializer, TestClass, 'a'));
    });

    it('should throw when when property type has is missing', () => {
      class TestClass {
        @P a: string;
        b: number;
      }

      expect(() => {
        defineClassSerializer(testSerializer, TestClass)
          .forMember('a')
          .forMember('b')
          .seal();
      }).toThrow(missingPropertySchema(testSerializer, TestClass, 'b'));
    });


    it('should lazy load schemas', () => {
      class TestClass {
        a: string;
      }

      const builder = defineClassSerializer(testSerializer, TestClass).forMember('a');

      expect(() => {
        builder.seal();
      }).toThrow(missingPropertySchema(testSerializer, TestClass, 'a'));
    });

    it('should fork definitions', () => {
      @C class Model { }

      defineClassSerializer(testSerializer, Model).seal('serialize');
      expect(() => { deserialize({}, testSerializer, Model) }).toThrow();

      clearSerializer(testSerializer);

      defineClassSerializer(testSerializer, Model).seal();
      let model = new Model()
      let pojo = serialize(model, testSerializer);
      expect(pojo).not.toBe(model);
      expect(pojo.constructor).toBe(Object);
      pojo = {}
      model = deserialize(pojo, testSerializer, Model);
      expect(model).not.toBe(pojo);
      expect(model.constructor).toBe(Model);


      defineClassSerializer(testSerializer, Model).seal();
      model = new Model()
      pojo = serialize(model, testSerializer);
      expect(pojo).not.toBe(model);
      expect(pojo.constructor).toBe(Object);
      pojo = {}
      model = deserialize(pojo, testSerializer, Model);
      expect(model).not.toBe(pojo);
      expect(model.constructor).toBe(Model);
    });

    it('should reverse definitions', () => {
      const childSerializer = testSerializer;

      class Model {
        static create(pString: string, pNumber: number, pBoolean: boolean) {
          return Object.assign(new Model(), { pString, pNumber, pBoolean });
        }

        @P pString: string;
        @P pNumber: number;
        @P pBoolean: boolean;
      }

      defineClassSerializer(childSerializer, Model)
        .forMember('pString')
        .forMember('pNumber')
        .forMember('pBoolean')
        .seal();
      let model = Model.create('test', 15, true);
      let pojo = serialize(model, childSerializer);
      expect(pojo).not.toBe(model);
      expect(pojo.constructor).toBe(Object);
      expect(pojo.pString).toBe(model.pString);
      expect(pojo.pNumber).toBe(model.pNumber);
      expect(pojo.pBoolean).toBe(model.pBoolean);

      pojo = { pString: 'Reversed', pNumber: -15, pBoolean: false };
      model = deserialize(pojo, childSerializer, Model);
      expect(model).not.toBe(pojo);
      expect(model.constructor).toBe(Model);
      expect(model.pString).toBe(pojo.pString);
      expect(model.pNumber).toBe(pojo.pNumber);
      expect(model.pBoolean).toBe(pojo.pBoolean);

      defineClassSerializer(childSerializer, Model)
        .forMember('pString')
        .forMember('pNumber')
        .forMember('pBoolean')
        .seal();
      model = Model.create('test', 15, true);
      pojo = serialize(model, childSerializer);
      expect(pojo).not.toBe(model);
      expect(pojo.constructor).toBe(Object);
      expect(pojo.pString).toBe(model.pString);
      expect(pojo.pNumber).toBe(model.pNumber);
      expect(pojo.pBoolean).toBe(model.pBoolean);

      pojo = { pString: 'Reversed', pNumber: -15, pBoolean: false };
      model = deserialize(pojo, childSerializer, Model);
      expect(model).not.toBe(pojo);
      expect(model.constructor).toBe(Model);
      expect(model.pString).toBe(pojo.pString);
      expect(model.pNumber).toBe(pojo.pNumber);
      expect(model.pBoolean).toBe(pojo.pBoolean);

      defineClassSerializer(childSerializer, Model)
        .forMember('pString')
        .forMember('pNumber')
        .forMember('pBoolean')
        .seal('serialize')
        .defineDeserialize()
        .resetMembers('pString', 'pNumber', 'pBoolean')
        .forMember('pString', c => c.map( () => 'modified!' ))
        .forMember('pNumber', c => c.map( ctx => ctx.getSourceValue('pNumber') * 1000 ))
        .forMember('pBoolean', c => c.ignore() )
        .seal();
      model = Model.create('test', 15, true);
      pojo = serialize(model, childSerializer);
      expect(pojo).not.toBe(model);
      expect(pojo.constructor).toBe(Object);
      expect(pojo.pString).toBe(model.pString);
      expect(pojo.pNumber).toBe(model.pNumber);
      expect(pojo.pBoolean).toBe(model.pBoolean);

      model = deserialize(pojo, childSerializer, Model);
      expect(model).not.toBe(pojo);
      expect(model.constructor).toBe(Model);
      expect(model.pString).toBe('modified!');
      expect(model.pNumber / 1000).toBe(pojo.pNumber);
      expect(model.pBoolean).toBeUndefined();

    });
  });

});
