import { Type } from '@pebula/decorate';
import { Schema, P } from '@pebula/tom';
import { ClassSerializerSchema } from '../../../../serializer-schema';
import { SerializerOp } from '../../../../types';
import { emptySerializer } from '../../../built-in/empty';
import { ClassSerializerContext, SerializerOptions } from '../../../serializer';
import { transform, transformUnknown } from './transform';

function mockSerializationSchema(op: SerializerOp) {
  return new ClassSerializerSchema(emptySerializer, Object, [], op, {});
}

function createTransformHelpers<T>(cls: Type<T>, op: SerializerOp, options: SerializerOptions = {}) {
  return {
    getProp: (name: keyof T) => Schema.getSchema(cls).getProperty(name),
    transform(value: any, propName: keyof T, valueType?: Type<any> | Schema.TomPropertySchema) {
      return valueType
        ? transformUnknown(new ClassSerializerContext(mockSerializationSchema(op), null, null, options), value, this.getProp(propName), valueType)
        : transform(new ClassSerializerContext(mockSerializationSchema(op), null, null, options), value, this.getProp(propName))
      ;
    },
  };
}

describe('@pebula/tom', () => {

  describe('transform - serialize', () => {

    it('should convert primitive types', () => {
      class C {
        @P pString: string;
        @P.nullable pStringNullable: string;
        @P pNumber: number;
        @P pBoolean: boolean;
        @P.as(() => Date)
        pDate: Date;
      }
      const t = createTransformHelpers(C, 'serialize');

      expect(t.transform(null, 'pString')).toBe(undefined);
      expect(t.transform(null, 'pStringNullable')).toBe(null);
      expect(t.transform(undefined, 'pString')).toBe(undefined);
      expect(t.transform('test', 'pString')).toBe('test');
      expect(t.transform(15, 'pString')).toBe(15); // We don't have any runtime converter here, so we get the same value

      expect(t.transform(null, 'pNumber')).toBe(undefined);
      expect(t.transform(undefined, 'pNumber')).toBe(undefined);
      expect(t.transform(15, 'pNumber')).toBe(15);

      expect(t.transform(null, 'pBoolean')).toBe(undefined);
      expect(t.transform(undefined, 'pBoolean')).toBe(undefined);
      expect(t.transform(true, 'pBoolean')).toBe(true);
      expect(t.transform(false, 'pBoolean')).toBe(false);

      expect(t.transform(null, 'pDate')).toBe(undefined);
      expect(t.transform(undefined, 'pDate')).toBe(undefined);
    });

    it('should transform a simple plain object', () => {
      class C {
        @P p: any;
      }

      const t = createTransformHelpers(C, 'serialize');
      const simpleObject = { a: 1, b: 2, c: 3};
      const transformedSimpleObject = t.transform(simpleObject, 'p');
      expect(transformedSimpleObject).not.toBe(simpleObject);
      expect(transformedSimpleObject).toEqual(simpleObject);
    });

    it('should transform nested plain objects', () => {
      class C {
        @P p: any;
      }

      const t = createTransformHelpers(C, 'serialize');
      const simpleObject = { a: 1, b: 2, c: 3, d: { x: 9, y: 8, z: 7 }};
      const transformedSimpleObject = t.transform(simpleObject, 'p');
      expect(transformedSimpleObject).not.toBe(simpleObject);
      expect(transformedSimpleObject).toEqual(simpleObject);
      expect(transformedSimpleObject.d).not.toBe(simpleObject.d);
      expect(transformedSimpleObject.d).toEqual(simpleObject.d);
    });

    it('should transform nested plain objects with circular reference protection', () => {
      class C {
        @P
        p: any;
      }

      const t = createTransformHelpers(C, 'serialize');
      const simpleObject: any = { a: 1, b: 2, c: 3 };
      simpleObject.d = simpleObject;

      const transformedSimpleObject = transform(new ClassSerializerContext(mockSerializationSchema('serialize'), null, null, {  }), simpleObject, t.getProp('p'));
      delete simpleObject.d;
      expect(transformedSimpleObject).not.toBe(simpleObject);
      expect(transformedSimpleObject).toStrictEqual(simpleObject);
      // expect(transformedSimpleObject.d).not.toBe(simpleObject.d);
      // expect(transformedSimpleObject.d).toEqual(simpleObject.d);
      // expect(transformedSimpleObject).toBe(transformedSimpleObject.d);
    });

    it('should transform arrays', () => {
      class C {
        @P.asArray('any') p: any[];
      }

      const t = createTransformHelpers(C, 'serialize');
      const simpleArray = [15, 9, 343, 948, 'r2323', true];
      const transformedSimpleArray = t.transform(simpleArray, 'p');
      expect(transformedSimpleArray).not.toBe(simpleArray);
      expect(transformedSimpleArray).toEqual(simpleArray);
    });

    it('should transform complex nested arrays and objects', () => {
      class C {
        @P.asArray(Object) p: any[];
      }

      const t = createTransformHelpers(C, 'serialize');
      const simpleObject: any = { a: 1, b: 2, c: 3, d: { x: 9, y: 8, z: 7 } };
      simpleObject.e = simpleObject.d;
      const simpleArray = [15, 9, 343, [ simpleObject, { a: [ { a: 1, b: 2, c: 3 }]}]];
      const transformedSimpleArray = t.transform(simpleArray, 'p');
      expect(transformedSimpleArray).not.toBe(simpleArray);
      expect(transformedSimpleArray).toEqual(simpleArray);
    });

  });

  describe('transform - deserialize', () => {

    it('should convert primitive types', () => {
      class C {
        @P pString: string;
        @P.nullable pStringNullable: string;
        @P pNumber: number;
        @P pBoolean: boolean;
        @P.as(Date) pDate: Date;
      }
      const t = createTransformHelpers(C, 'deserialize');

      expect(t.transform(null, 'pString')).toBe(undefined);
      expect(t.transform(null, 'pStringNullable')).toBe(null);
      expect(t.transform(undefined, 'pString')).toBe(undefined);
      expect(t.transform('test', 'pString')).toBe('test');
      expect(t.transform(15, 'pString')).toBe(15);

      expect(t.transform(null, 'pNumber')).toBe(undefined);
      expect(t.transform(undefined, 'pNumber')).toBe(undefined);
      expect(t.transform(15, 'pNumber')).toBe(15);
      expect(t.transform('15', 'pNumber')).toBe('15');

      expect(t.transform(null, 'pBoolean')).toBe(undefined);
      expect(t.transform(undefined, 'pBoolean')).toBe(undefined);
      expect(t.transform(true, 'pBoolean')).toBe(true);
      expect(t.transform(false, 'pBoolean')).toBe(false);

      expect(t.transform(null, 'pDate')).toBe(undefined);
      expect(t.transform(undefined, 'pDate')).toBe(undefined);
    });

    it('should transform a simple plain object', () => {
      class C {
        @P p: any;
      }

      const t = createTransformHelpers(C, 'deserialize');
      const simpleObject = { a: 1, b: 2, c: 3};
      const transformedSimpleObject = t.transform(simpleObject, 'p');
      expect(transformedSimpleObject).not.toBe(simpleObject);
      expect(transformedSimpleObject).toEqual(simpleObject);
    });

    it('should transform nested plain objects', () => {
      class C {
        @P p: any;
      }

      const t = createTransformHelpers(C, 'deserialize');
      const simpleObject = { a: 1, b: 2, c: 3, d: { x: 9, y: 8, z: 7 }};
      const transformedSimpleObject = t.transform(simpleObject, 'p');
      expect(transformedSimpleObject).not.toBe(simpleObject);
      expect(transformedSimpleObject).toEqual(simpleObject);
      expect(transformedSimpleObject.d).not.toBe(simpleObject.d);
      expect(transformedSimpleObject.d).toEqual(simpleObject.d);
    });

    it('should transform nested plain objects with circular reference protection', () => {
      class C {
        @P p: any;
      }

      const t = createTransformHelpers(C, 'deserialize');
      const simpleObject: any = { a: 1, b: 2, c: 3 };
      simpleObject.d = simpleObject;

      const transformedSimpleObject = transform(new ClassSerializerContext(mockSerializationSchema('deserialize'), null, null, { }), simpleObject, t.getProp('p'));
      delete simpleObject.d;
      expect(transformedSimpleObject).not.toBe(simpleObject);
      expect(transformedSimpleObject).toStrictEqual(simpleObject);
      // expect(transformedSimpleObject.d).not.toBe(simpleObject.d);
      // expect(transformedSimpleObject.d).toEqual(simpleObject.d);
      // expect(transformedSimpleObject).toBe(transformedSimpleObject.d);
    });

    it('should transform arrays', () => {
      class C {
        @P.asArray(() => Object) p: any[];
      }

      const t = createTransformHelpers(C, 'deserialize');
      const simpleArray = [15, 9, 343, 948, 'r2323', true];
      const transformedSimpleArray = t.transform(simpleArray, 'p');
      expect(transformedSimpleArray).not.toBe(simpleArray);
      expect(transformedSimpleArray).toEqual(simpleArray);
    });

    it('should transform complex nested arrays and objects', () => {
      class C {
        @P.asArray('any') p: any[];
      }

      const t = createTransformHelpers(C, 'deserialize');
      const simpleObject: any = { a: 1, b: 2, c: 3, d: { x: 9, y: 8, z: 7 } };
      simpleObject.e = simpleObject.d;
      const simpleArray = [15, 9, 343, [ simpleObject, { a: [ { a: 1, b: 2, c: 3 }]}]];
      const transformedSimpleArray = t.transform(simpleArray, 'p');
      expect(transformedSimpleArray).not.toBe(simpleArray);
      expect(transformedSimpleArray).toEqual(simpleArray);
    });

  });
});
