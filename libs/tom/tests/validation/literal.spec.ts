import { P, C ,defaultValidator, ValidationResult } from '@pebula/tom/validation';

import { tomDescribeValidationJIT } from '@pebula/tom/testing';
import { ValidationError } from '../../validation/validation-result';

tomDescribeValidationJIT('@pebula/tom', defaultValidator, childValidator => {
  afterEach(() => {
    childValidator.resetBindings();
  });

  describe('"literal" Validation', () => {
    it('should validate type', () => {

      class Job {
        @P.literal('xyz') literal: 'xyz';
      }

      const model = new Job();
      model.literal = 'xyz';

      let result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);

      model.literal = 'XYZ' as any;
      result = childValidator.validate(model);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        ['literal'],
        'literal',
        'type',
        'Invalid runtime type, expected type literal'
      ));

    });

  });
});
