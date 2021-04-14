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
      expect(result).toBe(true);

      model.a = 123 as any;
      result = childValidator.validate(model) as ValidationResult<ClassB>;
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        ['a'],
        'class',
        'type',
        'Invalid runtime type, expected type ClassA'
      ));

      model.a = new ClassB() as any;
      result = childValidator.validate(model) as ValidationResult<ClassB>;
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        ['a'],
        'class',
        'type',
        'Invalid runtime type, expected type ClassA'
      ));
    });

    it('should validate nested type', () => {
      class ClassA {
        @P a1: number;
      }

      class ClassB {
        @P a: ClassA;
      }

      const model = new ClassB();
      model.a = new ClassA();

      let result = childValidator.validate(model) as ValidationResult<ClassB>;
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        ['a', 'a1'],
        'number',
        'required',
        'Property is required'
      ));

    });

  });
});
