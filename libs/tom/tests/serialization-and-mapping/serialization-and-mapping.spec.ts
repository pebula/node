import { P, jsonSerializer, mapTypes, defineClassMapping } from '@pebula/tom';
import { clearSerializer, tomDescribeSerializerJIT } from '@pebula/tom/testing';

tomDescribeSerializerJIT('@pebula/tom', jsonSerializer, childSerializer => {

  describe('Serialization & Mapping', () => {
    afterEach(() => {
      clearSerializer(childSerializer);
    });

    test('A -> deserialize -> map -> serialize -> compare TO A', () => {
      childSerializer.setDefault('enumAsLabels', true);

      enum JobStatus {
        Idle = 0,
        Running = '__running',
        Done = 100,
        Error = '__error',
      }

      class Model {
        @P bool: boolean;
        @P num: number;
        @P str: string;
        @P date: Date;
        @P.enum(JobStatus) enumProp: JobStatus;
        @P.union(P.literal('v1'), P.literal('v2'), P.as('number')) union: 'v1' | 'v2' | number;
        @P.as(() => SubModel) subModels: Array<SubModel>;
      }

      class SubModel {
        @P bool: boolean;
        @P num: number;
        @P str: string;
      }

      class ModelB {
        @P boolB: boolean;
        @P numB: number;
        @P strB: string;
        @P dateB: Date;
        @P.enum(JobStatus) enumPropB: JobStatus;
        @P.union(P.literal('v1'), P.literal('v2'), P.as('number')) unionB: 'v1' | 'v2' | number;
        @P.as(() => SubModel) subModelsB: Array<SubModel>;
      }

      class SubModelB {
        @P boolB: boolean;
        @P numB: number;
        @P strB: string;
      }

      const plain = {
        _bool: true,
        _num: 4323,
        _str: 'Test',
        _date: new Date().toJSON(),
        _enumProp: 'Running',
        _union: 'v2',
        _subModels: [
          {
            bool: false,
            num: -4329,
            str: 'SubTest1'
          },
          {
            bool: true,
            num: 781198,
            str: 'SubTest2'
          }
        ]
      };

      childSerializer.define(Model)
        .resetMembers()
        .forMember('bool', ctx => ctx.mapToProperty('_bool') )
        .forMember('num', ctx => ctx.mapToProperty('_num'))
        .forMember('str', ctx => ctx.mapToProperty('_str'))
        .forMember('date', ctx => ctx.mapToProperty('_date'))
        .forMember('enumProp', ctx => ctx.mapToProperty('_enumProp'))
        .forMember('union', ctx => ctx.mapToProperty('_union'))
        .forMember('subModels', ctx => ctx.mapToProperty('_subModels'))
        .seal('deserialize');

      defineClassMapping(SubModel, SubModelB, { jitCompiler: childSerializer.defaultFactoryOptions.jitCompiler })
        .forMember('boolB', 'bool')
        .forMember('numB', 'num')
        .forMember('strB', 'str')
        .seal();

      defineClassMapping(Model, ModelB, { jitCompiler: childSerializer.defaultFactoryOptions.jitCompiler })
        .forMember('boolB', 'bool')
        .forMember('numB', 'num')
        .forMember('strB', 'str')
        .forMember('dateB', 'date')
        .forMember('enumPropB', 'enumProp')
        .forMember('unionB', 'union')
        .forMember('subModelsB', 'subModels')
        .seal();


      childSerializer.define(ModelB)
        .resetMembers()
        .forMember('boolB', ctx => ctx.mapToProperty('_bool') )
        .forMember('numB', ctx => ctx.mapToProperty('_num'))
        .forMember('strB', ctx => ctx.mapToProperty('_str'))
        .forMember('dateB', ctx => ctx.mapToProperty('_date'))
        .forMember('enumPropB', ctx => ctx.mapToProperty('_enumProp'))
        .forMember('unionB', ctx => ctx.mapToProperty('_union'))
        .forMember('subModelsB', ctx => ctx.mapToProperty('_subModels'))
        .seal('serialize');

      const serializer = childSerializer.get(Model);
      const serializerB = childSerializer.get(ModelB);

      const model = serializer.deserialize(plain);
      const modelB = mapTypes(model, ModelB);
      const plainB = serializerB.serialize(modelB);

      expect(plainB).toStrictEqual(plain);
    });

  });
});
