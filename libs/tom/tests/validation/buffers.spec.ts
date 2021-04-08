import { TypeSystem } from '@pebula/tom';
import { P, C ,defaultValidator, ValidationResult } from '@pebula/tom/validation';

import { tomDescribeValidationJIT } from '@pebula/tom/testing';
import { ValidationError } from '../../validation/validation-result';

tomDescribeValidationJIT('@pebula/tom', defaultValidator, childValidator => {
  afterEach(() => {
    childValidator.resetBindings();
  });

  describe('"arrayBuffer" Validation', () => {
    it('should validate type', () => {
      class Model {
        @P.as('arrayBuffer') b: ArrayBuffer;
      }

      const model = new Model();
      model.b = Buffer.from('Test').buffer;

      let result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);

      model.b = [] as any;
      result = childValidator.validate(model);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        'b',
        'arrayBuffer',
        'type',
        'Invalid runtime type, expected type arrayBuffer'
      ));
    });

  });

  describe('Typed Arrays Validation', () => {

    for (const [key, typedBuffer] of TypeSystem.typedBufferTypeDefMap) {
      it(`should validate ${key} type`, () => {
        class Model {
          @P.as(key) b: TypeSystem.TypedBufferRuntimeTypes;
        }

        const model = new Model();
        model.b = new typedBuffer(4) as any;
        let result = childValidator.validate(model);
        expect(result).toBeInstanceOf(ValidationResult);
        expect(result.valid).toBe(true);

        model.b = [] as any;
        result = childValidator.validate(model);
        expect(result.valid).toBe(false);
        expect(result.errors.length).toBe(1);
        expect(result.errors[0]).toStrictEqual(new ValidationError(
          'b',
          key,
          'type',
          `Invalid runtime type, expected type ${key}`
        ));

        const AltTB = typedBuffer === Uint8Array ? Uint16Array : Uint8Array;
        model.b = new AltTB(4) as any;
        result = childValidator.validate(model);
        expect(result.valid).toBe(false);
        expect(result.errors.length).toBe(1);
        expect(result.errors[0]).toStrictEqual(new ValidationError(
          'b',
          key,
          'type',
          `Invalid runtime type, expected type ${key}`
        ));
      });
    }

  });
});
