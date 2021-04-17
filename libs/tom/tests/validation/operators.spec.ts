import { P, C ,defaultValidator, ValidationResult } from '@pebula/tom/validation';

import { tomDescribeValidationJIT } from '@pebula/tom/testing';
import { ValidationError } from '../../validation/validation-result';

tomDescribeValidationJIT('@pebula/tom', defaultValidator, childValidator => {
  afterEach(() => {
    childValidator.resetBindings();
  });

  describe('"not" Validation', () => {
    it('should negate when not min is used', () => {
      class Model {
        @P.optional.not.min(10) value: number;
      }

      const model = new Model()

      model.value = 50;
      let result = childValidator.validate(model) as ValidationResult<Model>;
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        ['value'],
        'number',
        'min',
        '[NOT] Minimum value is 10'
      ));

      model.value = 10;
      result = childValidator.validate(model) as ValidationResult<Model>;
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        ['value'],
        'number',
        'min',
        '[NOT] Minimum value is 10'
      ));

      model.value = 1;
      expect(childValidator.validate(model)).toBe(true);
    });

    it('should negate when not equal is used', () => {
      class Model {
        @P.not.equal(10) value: number;
      }

      const model = new Model()

      model.value = 50;
      expect(childValidator.validate(model)).toBe(true);

      model.value = 10;
      let result = childValidator.validate(model) as ValidationResult<Model>;
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        ['value'],
        'number',
        'equal',
        'Must not equal to 10'
      ));

    });

    it('should support complex expressions', () => {
      class Model {
        @P.optional.default(50).min(5).max(5000).not.equal(999) value: number
      }

      const model = new Model()
      expect(childValidator.validate(model)).toBe(true);
      expect(model.value).toBe(50);
      expect(childValidator.validate(model)).toBe(true);

      model.value = 5;
      expect(childValidator.validate(model)).toBe(true);

      model.value = 4000;
      expect(childValidator.validate(model)).toBe(true);

      model.value = 1000;
      expect(childValidator.validate(model)).toBe(true);

      model.value = 3;
      let result = childValidator.validate(model) as ValidationResult<Model>;
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        ['value'],
        'number',
        'min',
        'Minimum value is 5'
      ));

      model.value = 999;
      result = childValidator.validate(model) as ValidationResult<Model>;
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        ['value'],
        'number',
        'equal',
        'Must not equal to 999'
      ));

      model.value = 5001;
      result = childValidator.validate(model) as ValidationResult<Model>;
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        ['value'],
        'number',
        'max',
        'Maximum value is 5000'
      ));
    });
  });
});
