import { Type } from '@pebula/decorate';
import { TypeMapOptions } from '../../../options';
import { getSchema, P, TomPropertySchema, EnumClass } from '../../../schema';
import { ClassMappingContext } from '../class-mapping-schema-context';
import { transform, transformUnknown } from './transform';
import { defineEnumMapping } from '../../../enum-mapping/define-enum-mapping';
import './convert';

function createTransformHelpers<T>(cls: Type<T>, options: TypeMapOptions = {}) {
  return {
    getProp: (name: keyof T) => getSchema(cls).getProperty(name),
    transform(value: any, propName: keyof T, valueType?: Type<any> | TomPropertySchema) {
      const tProp =  this.getProp(propName);
      return !valueType || typeof valueType === 'function'
        ? transformUnknown(new ClassMappingContext(null, null, options), value, tProp, valueType)
        : transform(new ClassMappingContext(null, null, options), value, tProp, valueType || tProp)
      ;
    },
  };
}

describe('@pebula/tom', () => {

  describe('transform', () => {

    it('should convert primitive types', () => {
      class C {
        @P
        pString: string;
        @P
        pNumber: number;
        @P
        pBoolean: boolean;
        @P.as(Date)
        pDate: Date;
      }
      const t = createTransformHelpers(C);

      expect(t.transform(null, 'pString')).toBe(null);
      expect(t.transform(undefined, 'pString')).toBe(undefined);
      expect(t.transform('test', 'pString')).toBe('test');
      expect(t.transform(15, 'pString', t.getProp('pNumber'))).toBe('15');

      expect(t.transform(null, 'pNumber')).toBe(null);
      expect(t.transform(undefined, 'pNumber')).toBe(undefined);
      expect(t.transform(15, 'pNumber')).toBe(15);
      expect(t.transform('15', 'pNumber', t.getProp('pString'))).toBe(15);

      expect(t.transform(null, 'pBoolean')).toBe(null);
      expect(t.transform(undefined, 'pBoolean')).toBe(undefined);
      expect(t.transform(true, 'pBoolean')).toBe(true);
      expect(t.transform(false, 'pBoolean')).toBe(false);
      expect(t.transform('', 'pBoolean', t.getProp('pString'))).toBe(false);

      expect(t.transform(null, 'pDate')).toBe(null);
      expect(t.transform(undefined, 'pDate')).toBe(undefined);
      const date = new Date();
      expect(t.transform(date, 'pDate')).not.toBe(date);
      expect(t.transform(date, 'pDate')).toEqual(date);
      expect(t.transform(date.toISOString(), 'pDate', t.getProp('pString'))).toEqual(date);
    });

    it('should transform a simple plain object', () => {
      class C {
        @P
        p: any;
      }

      const t = createTransformHelpers(C);
      const simpleObject = { a: 1, b: 2, c: 3};
      const transformedSimpleObject = t.transform(simpleObject, 'p');
      expect(transformedSimpleObject).not.toBe(simpleObject);
      expect(transformedSimpleObject).toEqual(simpleObject);
    });

    it('should transform nested plain objects', () => {
      class C {
        @P
        p: any;
      }

      const t = createTransformHelpers(C);
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

      const t = createTransformHelpers(C);
      const simpleObject: any = { a: 1, b: 2, c: 3 };
      simpleObject.d = simpleObject;

      const transformedSimpleObject = transform(new ClassMappingContext(null, null, { }), simpleObject, t.getProp('p'), undefined);
      expect(transformedSimpleObject).not.toBe(simpleObject);
      expect(transformedSimpleObject).toEqual(simpleObject);
      expect(transformedSimpleObject.d).not.toBe(simpleObject.d);
      expect(transformedSimpleObject.d).toEqual(simpleObject.d);
      expect(transformedSimpleObject).toBe(transformedSimpleObject.d);
    });

    it('should transform arrays', () => {
      class C {
        @P.as(Object)
        p: any[];
      }

      const t = createTransformHelpers(C);
      const simpleArray = [15, 9, 343, 948, 'r2323', true, new Date()];
      const transformedSimpleArray = t.transform(simpleArray, 'p');
      expect(transformedSimpleArray).not.toBe(simpleArray);
      expect(transformedSimpleArray).toEqual(simpleArray);

      const orgDate = simpleArray.pop();
      const tsfmDate = transformedSimpleArray.pop();
      expect(tsfmDate).not.toBe(orgDate);
      expect(tsfmDate).toEqual(orgDate);
    });

    it('should transform complex nested arrays and objects', () => {
      class C {
        @P.as(() => Object)
        p: any[];
      }

      const t = createTransformHelpers(C);
      const simpleObject: any = { a: 1, b: 2, c: 3, d: { x: 9, y: 8, z: 7 } };
      simpleObject.e = simpleObject.d;
      const simpleArray = [15, 9, 343, [ simpleObject, { a: [ { a: 1, b: 2, c: 3 }]}]];
      const transformedSimpleArray = t.transform(simpleArray, 'p');
      expect(transformedSimpleArray).not.toBe(simpleArray);
      expect(transformedSimpleArray).toEqual(simpleArray);
    });

    it('should transform enums', () => {
      enum TestNumericEnum {
        EnumOne = 1,
        EnumTwo = 2,
      }
      enum TestStringEnum {
        EnumOne = 'One',
        EnumTwo = 'Two',
      }
      class C {
        @P.enum(TestNumericEnum)
        pNumericEnum: TestNumericEnum;

        @P.enum(TestStringEnum)
        pStringEnum: TestStringEnum;

        @P.enum(TestNumericEnum)
        pNumericCollEnum: TestNumericEnum[];
      }

      const t = createTransformHelpers(C);
      expect(t.transform(TestNumericEnum.EnumOne, 'pNumericEnum')).toBe(TestNumericEnum.EnumOne);
      expect(t.transform(TestStringEnum.EnumOne, 'pStringEnum')).toBe(TestStringEnum.EnumOne);
      expect(t.transform([ TestNumericEnum.EnumOne, TestNumericEnum.EnumTwo ], 'pNumericCollEnum'))
        .toEqual([ TestNumericEnum.EnumOne, TestNumericEnum.EnumTwo ]);
    });

    it('should convert enums', () => {
      enum E1 { A, B, C }
      enum E2 { A = 100, B = 101, C = 102 }
      class C {
        @P.enum(E1) pEnum1: E1;
        @P.enum(E2) pEnum2: E2;
      }

      defineEnumMapping(E1, E2)
        .forMember('A', 'A')
        .forMember('B', 'B')
        .forMember('C', 'C')
        .seal();

      const t = createTransformHelpers(C);

      // With TomPropertySchema as value info
      expect(t.transform(E1.A, 'pEnum2', t.getProp('pEnum1'))).toBe(E2.A);

      // No value info, should not convert using converter
      expect(t.transform(E1.A, 'pEnum2')).not.toBe(E2.A);
      expect(t.transform(E1.A, 'pEnum2')).toBe(E1.A);
    });
  });
});
