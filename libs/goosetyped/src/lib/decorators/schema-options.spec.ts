// tslint:disable: max-classes-per-file
import * as mongoose from 'mongoose';
import { GtColumn } from './column';
import {
  GtSkipVersioning,
  GtTimestampCreated,
  GtTimestampUpdated,
  GtVersionKey,
  GtToJSON,
  GtToObject,
} from './schema-options';
import { gtSchemaStore } from '../store';
import { GtDiscriminator } from './discriminator-type';
import { GtModel } from '../model';

function getOptionValue<TOptKey extends keyof mongoose.SchemaOptions, TOpt extends mongoose.SchemaOptions = mongoose.SchemaOptions>(cls: any, key: TOptKey): TOpt[TOptKey] {
  return gtSchemaStore.get(cls).getSchemaOptions(key) as TOpt[TOptKey];
}

describe('goosetyped', () => {
  describe('decorators', () => {
    it('should register a `discriminatorKey` using GtDiscriminator', () => {
      class TestModel {
        @GtDiscriminator()
        myDiscriminatorKey: string;
      }

      expect(getOptionValue(TestModel, 'discriminatorKey')).toBe('myDiscriminatorKey');
    });

    it('should register a `skipVersioning` record using GtSkipVersioning', () => {
      class TestModel {
        @GtSkipVersioning()
        skip1: string;

        @GtSkipVersioning()
        skip2: string;

        @GtColumn()
        noSkip: string;
      }

      expect(getOptionValue(TestModel, 'skipVersioning')).toEqual({ skip1: true, skip2: true });
    });

    it('should register timestamps using GtTimestampCreated & GtTimestampUpdated', () => {
      class TestModel {
        @GtTimestampCreated()
        created: Date;
        @GtTimestampUpdated()
        updated: Date;
      }

      expect(getOptionValue(TestModel, 'timestamps')).toEqual({ createdAt: 'created', updatedAt: 'updated' });
    });

    it('should register a `versionKey` using GtVersionKey', () => {
      class TestModel0 {
        @GtColumn()
        myVersionKey: number;
      }
      expect(getOptionValue(TestModel0, 'versionKey')).toBe('__v');

      class TestModel {
        @GtVersionKey()
        myVersionKey: number;
      }
      expect(getOptionValue(TestModel, 'versionKey')).toBe('myVersionKey');
    });

    it('should register a toObject config & transform using GtToObject', () => {
      const metadata: mongoose.ToObjectOptions = {
        virtuals: true,
        versionKey: false,
      };

      class TestModel {
        @GtToObject(metadata)
        toObjectTransform(ret: any, options: any): void {
          ret.self = this;
        }
      }

      const { transform, ...config } = getOptionValue<'toObject', mongoose.SchemaOptions<any>>(TestModel, 'toObject');
      expect(config).toEqual(metadata);
      expect(transform).toBeInstanceOf(Function);

      const testModel = new TestModel();
      const retValue: any = {};
      const spy = jest.spyOn(testModel, 'toObjectTransform');
      if (typeof transform !== 'boolean')
        transform(testModel, retValue, null);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(retValue, null);
      expect(retValue.self).toBe(testModel);
    });

    it('should register a toJSON config & transform using GtToJSON', () => {
      const metadata: mongoose.ToObjectOptions = {
        virtuals: true,
        versionKey: false,
      };

      class TestModel {
        @GtToJSON(metadata)
        toJSONTransform(ret: any, options: any): void {
          ret.self = this;
        }
      }

      const { transform, ...config } = getOptionValue<'toJSON', mongoose.SchemaOptions<any>>(TestModel, 'toJSON');
      expect(config).toEqual(metadata);
      expect(transform).toBeInstanceOf(Function);
      
      const testModel = new TestModel();
      const retValue: any = {};
      const spy = jest.spyOn(testModel, 'toJSONTransform');
      if (typeof transform !== 'boolean')
        transform(testModel, retValue, null);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(retValue, null);
      expect(retValue.self).toBe(testModel);
    });
  });
});
