import { P, C ,defaultValidator, ValidationResult } from '@pebula/tom/validation';

import { tomDescribeValidationJIT } from '@pebula/tom/testing';
import { ValidationError } from '../../validation/validation-result';

tomDescribeValidationJIT('@pebula/tom', defaultValidator, childValidator => {
  afterEach(() => {
    childValidator.resetBindings();
  });

  describe('Validation Basics', () => {
    it('should validate to ValidationResult', () => {
      @C class Model { }

      const model = new Model()
      const result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);
    });

    it('should emit all error if not short circuited or a single error if short circuit is enabled', () => {
      class Model {
        @P v1: number;
        @P v2: string;
        @P v3: boolean;
      }

      const model = new Model()
      let result = childValidator.validate(model);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(3);
      expect(result.errors).toStrictEqual([
        new ValidationError(['v1'], 'number', 'required', 'Property is required'),
        new ValidationError(['v2'], 'string', 'required', 'Property is required'),
        new ValidationError(['v3'], 'boolean', 'required', 'Property is required'),
      ]);

      result = childValidator.fork('Short Circuited').setDefault('shortCircuit', true).validate(model);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors).toStrictEqual([
        new ValidationError(['v1'], 'number', 'required', 'Property is required'),
      ]);
    });

    it('should skip validation if skipValidation is set', () => {
      class Model {
        @P value: number;
        @P.skipValidation freeAgent: number;
      }

      const model = new Model()
      let result = childValidator.validate(model);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        ['value'],
        'number',
        'required',
        'Property is required'
      ));

      model.value = 1;
      result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);

      model.freeAgent = 2;
      result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);

      delete model.value;
      result = childValidator.validate(model);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        ['value'],
        'number',
        'required',
        'Property is required'
      ));
    });

    it('should skip validation if skipValidation is set', () => {
      class Model {
        @P.asArray('number') value: number[];
        @P.asArray(P.as('string').skipValidation.buildSchema()) freeAgent: number[];
      }

      const model = new Model()
      model.value = [1, '2' as any];
      model.freeAgent = [];
      let result = childValidator.validate(model);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        ['value', 1],
        'number',
        'type',
        'Invalid runtime type, expected type number'
      ));

      model.value = [1];
      model.freeAgent = [1, '2' as any];
      result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);

      model.freeAgent = [1];
      result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);

    });
  });

  describe('"required" validation', () => {
    it('should validate required', () => {
      class Model {
        @P value: number;
      }

      const model = new Model()

      model.value = 1;
      let result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);

      delete model.value;
      result = childValidator.validate(model);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        ['value'],
        'number',
        'required',
        'Property is required'
      ));

    });

    it('should skip required if optional', () => {
      class Model {
        @P.optional value: number;
      }

      const model = new Model()

      model.value = 1;
      let result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);

      delete model.value;
      result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);
    });

    it('should skip required if nullable and value is null, if undefined throw', () => {
      class Model {
        @P.nullable value: number;
      }

      const model = new Model()

      model.value = 1;
      let result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);

      model.value = null;
      result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);

      delete model.value;
      result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        ['value'],
        'number',
        'required',
        'Property is required'
      ));
    });

    it('should skip required if nullable and optional', () => {
      class Model {
        @P.nullable.optional value: number;
      }

      const model = new Model()

      model.value = 1;
      let result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);

      model.value = null;
      result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);

      delete model.value;
      result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);
    });
  });

});
