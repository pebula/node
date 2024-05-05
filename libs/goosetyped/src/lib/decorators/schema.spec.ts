// tslint:disable: max-classes-per-file
import { GtDocumentMetadata, GtSubDocumentMetadata } from '../metadata';
import { GtDocument, GtSubDocument } from './schema';
import { GtModel, GtResource } from '../model';
import { gtSchemaStore } from '../store';
import { GtSchemaMetadataArgs } from '../interfaces';

describe('goosetyped', () => {
  describe('decorators', () => {

    it('should register a sub document using GtSubDocument without metadata', () => {
      const spy = jest.spyOn(GtSubDocumentMetadata, 'setMetadata');

      @GtSubDocument()
      class TestModel extends GtResource() {
      }

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy). toHaveBeenCalledWith({}, { target: TestModel }, gtSchemaStore.get(TestModel));

      spy.mockClear();
    });

    it('should register a sub document using GtSubDocument', () => {
      const spy = jest.spyOn(GtSubDocumentMetadata, 'setMetadata');
      @GtSubDocument()
      class TestModel1 extends GtResource() {
      }

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy). toHaveBeenCalledWith({}, { target: TestModel1 }, gtSchemaStore.get(TestModel1));

      spy.mockClear();
    });

    it('should register a document using GtDocument without metadata', () => {
      const spy = jest.spyOn(GtDocumentMetadata, 'setMetadata');

      @GtDocument()
      class TestModel extends GtModel() {
      }

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy). toHaveBeenCalledWith({}, { target: TestModel }, gtSchemaStore.get(TestModel));

      spy.mockClear();
    });

    it('should register a document using GtDocument', () => {
      const spy = jest.spyOn(GtDocumentMetadata, 'setMetadata');
      const metadata: GtSchemaMetadataArgs & any = {
        name: 'abcd',
      };

      @GtDocument(metadata)
      class TestModel1 extends GtModel() {
      }

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy). toHaveBeenCalledWith(metadata, { target: TestModel1 }, gtSchemaStore.get(TestModel1));

      spy.mockClear();
    });
  });
});
