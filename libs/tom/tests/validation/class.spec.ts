import { P, C ,defaultValidator, ValidationResult } from '@pebula/tom/validation';

import { tomDescribeValidationJIT } from '@pebula/tom/testing';
import { ValidationError } from '../../validation/validation-result';

tomDescribeValidationJIT('@pebula/tom', defaultValidator, childValidator => {
  afterEach(() => {
    childValidator.resetBindings();
  });

  describe('"class" Validation', () => {
    it('should validate type', () => {
      class ClassA {
        @P a1: number;
      }

      class ClassB {
        @P a: ClassA;
        @P n: string;
      }

      const model = new ClassB();
      model.n = 'test';
      model.a = new ClassA();
      model.a.a1 = 15;

      let result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);

      model.a = 123 as any;
      result = childValidator.validate(model);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        'a',
        'class',
        'type',
        'Invalid runtime type, expected type class'
      ));

      model.a = new ClassB() as any;
      result = childValidator.validate(model);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        'a',
        'class',
        'type',
        'Invalid runtime type, expected type class'
      ));
    });

  });
});
