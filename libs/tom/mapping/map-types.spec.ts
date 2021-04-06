import { P } from '@pebula/tom';
import { defineClassMapping, clearMap } from './define-class-mapping';
import { schemaNotFoundError, typeUnrecognizedForMapperError } from './errors';
import { mapTypes } from './map-types';

describe('@pebula/tom', () => {

  let myClass1: MyClass1;
  let myClass2: MyClass2;

  beforeAll(() => {
    defineClassMapping(MyClass1, MyClass2)
        .forMember('p1', 'prop1')
        .forMember('p2', (config) => config.map( ctx => String(ctx.source.prop2) ))
        .seal();
  });

  afterAll( () => clearMap(MyClass1, MyClass2) );

  beforeEach(() => {
    myClass1 = new MyClass1();
    myClass1.prop1 = 'prop1';
    myClass1.prop2 = 2;
  });

  const verifyMappingOperation = () => {
    expect(myClass2).toBeInstanceOf(MyClass2);
    expect(myClass2.p1).toEqual(myClass1.prop1);
    expect(myClass2.p2).toEqual(String(myClass1.prop2));
  };

  describe('mapTypes', () => {
    it('should map with explicit source type and without options', () => {
      myClass2 = mapTypes({ ...myClass1 }, MyClass1, MyClass2);
      verifyMappingOperation();
    });

    it('should map with explicit source type and with options and explicit target', () => {
      const target = new MyClass2();
      myClass2 = mapTypes({ ...myClass1 }, MyClass1, MyClass2, { target });
      verifyMappingOperation();
      expect(myClass2).toEqual(target);
    });

    it('should map with implicit source type and without options', () => {
      myClass2 = mapTypes(myClass1, MyClass2);
      verifyMappingOperation();
    });

    it('should map with implicit source type and with options and explicit target', () => {
      const target = new MyClass2();
      myClass2 = mapTypes(myClass1, MyClass2, { target });
      verifyMappingOperation();
      expect(myClass2).toEqual(target);
    });

    it('should fail map with implicit source type that is not mapped', () => {
      class C1 {
        prop1: string;
        prop2: number;
      }
      const c1 = new C1();
      Object.assign(c1, myClass1);
      expect(() => mapTypes(c1, MyClass2)).toThrow(schemaNotFoundError(C1, MyClass2));
    });

    it('should throw if strictTypes is true and target class is not recognized', () => {
      class C1 {}
      class C2 {}
      defineClassMapping(C1, C2).seal();
      expect(() => mapTypes(new C1(), C2, { strictTypes: true })).toThrow(typeUnrecognizedForMapperError(C2));
    });

    it('should pass if strictTypes is false and target class is not recognized', () => {
      class C1 {}
      class C2 {}
      defineClassMapping(C1, C2).seal();
      const result = mapTypes(new C1(), C2, { strictTypes: false });
      expect(result).toBeInstanceOf(C2);
    });

  });

});

class MyClass1 {
  prop1: string;
  prop2: number;
}

class MyClass2 {
  @P p1: string;

  @P p2: string;
}
