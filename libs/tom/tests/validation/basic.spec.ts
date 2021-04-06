import { P, C ,defaultValidator, ValidationResult } from '@pebula/tom/validation';

import { tomDescribeValidationJIT } from '@pebula/tom/testing';
import { ValidationError } from '../../validation/validation-result';

tomDescribeValidationJIT('@pebula/tom', defaultValidator, childValidator => {
  afterEach(() => {
    childValidator.resetBindings();
  });

  describe('Validation Basics', () => {
    it('should validate to Object', () => {
      @C class Model { }

      const model = new Model()
      const result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);
    });

    it('should validate type', () => {
      class Model {
        @P.optional value: number;
      }

      const model = new Model()

      model.value = 50;
      let result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);

      delete model.value;
      result = childValidator.validate(model);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        'value',
        'number',
        'type',
        'Invalid runtime type, expected type number'
      ));

    });
    it('should validate min', () => {
      class Model {
        @P.optional.min(10) value: number;
      }

      const model = new Model()

      model.value = 50;
      let result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);

      model.value = 10;
      result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);

      model.value = 1;
      result = childValidator.validate(model);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        'value',
        'number',
        'min',
        'Minimum value is 10'
      ));

    });

    it('should validate max', () => {
      class Model {
        @P.optional.max(10) value: number;
      }

      const model = new Model()

      model.value = 5;
      let result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);

      model.value = 10;
      result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);

      model.value = 50;
      result = childValidator.validate(model);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        'value',
        'number',
        'max',
        'Maximum value is 10'
      ));

    });

  });
});
