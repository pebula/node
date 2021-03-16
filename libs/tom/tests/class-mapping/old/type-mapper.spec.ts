import { mapTypes, defineClassMapping, P, ClassMappingSchemaFactoryOptions } from '@pebula/tom';
import { clearMap } from '@pebula/tom/testing';

describe('@pebula/tom - End to End', () => {

  describe('root', () => {
    it('should return health status', () => {

      const createMapWithOptions = (options?: ClassMappingSchemaFactoryOptions<any, any>) => {
        clearMap(MyClass1, MyClass2);
        defineClassMapping(MyClass1, MyClass2, options)
          .forMember('p1', 'prop1')
          .forMember('p2', (config) => config.map( ({source}) => String(source.prop2) ))
          .forMember('p3', c => c.ignore() )
          .forMember('p4', c => {
            c.ignore( ({source}) => source.prop4 === 'prop4');
            c.map( ({source}) => source.prop4 );
          })
          .forMember('p5', c => {
            c.ignore( ({source}) => source.prop5 === 'prop4');
            c.map( ({source}) => source.prop5 );
          })
          .forAllOtherMembers( ctx => ctx.ignore() )
          .seal();
      }

      for (const options of [{}, { jitCompiler: 'disabled' as const }]) {
        createMapWithOptions(options);
        const myClass1 = new MyClass1();
        myClass1.prop1 = 'prop1';
        myClass1.prop2 = 2;
        myClass1.prop3 = 'prop3';
        myClass1.prop4 = 'prop4';
        myClass1.prop5 = 'prop5';
        myClass1.prop6 = 'prop6';

        const myClass2 = mapTypes(myClass1, MyClass2);
        expect(myClass2).toBeInstanceOf(MyClass2);
        expect(myClass2.p1).toEqual(myClass1.prop1);
        expect(myClass2.p2).toEqual(String(myClass1.prop2));
        expect(myClass2.p3).toBeUndefined();
        expect(myClass2.p4).toEqual(myClass1.prop4);
        expect(myClass2.p5).toBeUndefined();
      }

    });
  });
});

class MyClass1 {
  prop1: string;
  prop2: number;
  prop3: string;
  prop4: string;
  prop5: string;
  prop6: string;
}

class MyClass2 {
  @P
  p1: string;
  @P
  p2: string;
  @P
  p3: string;
  @P
  p4: string;
  @P
  p5: string;
  @P
  p6: string;
}
