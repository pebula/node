import { P, C ,defaultValidator, ValidationResult } from '@pebula/tom/validation';

import { tomDescribeValidationJIT } from '@pebula/tom/testing';
import { ValidationError } from '../../validation/validation-result';

tomDescribeValidationJIT('@pebula/tom', defaultValidator, childValidator => {
  afterEach(() => {
    childValidator.resetBindings();
  });

  describe('"boolean" Validation', () => {

    it('should validate type', () => {
      class Model {
        @P value: boolean;
      }

      const model = new Model()

      model.value = true;
      let result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);

      model.value = 'true' as any;
      result = childValidator.validate(model);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        ['value'],
        'boolean',
        'type',
        'Invalid runtime type, expected type boolean'
      ));
    });
  });

  describe('"number" Validation', () => {

    it('should validate type', () => {
      class Model {
        @P value: number;
      }

      const model = new Model()

      model.value = 50;
      let result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);

      model.value = '55' as any;
      result = childValidator.validate(model);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        ['value'],
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
        ['value'],
        'number',
        'min',
        'Minimum value is 10'
      ));

    });

    it('should validate max', () => {
      class Model {
        @P.max(10) value: number;
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
        ['value'],
        'number',
        'max',
        'Maximum value is 10'
      ));

    });

    it('should validate min max', () => {
      class Model {
        @P.min(5).max(10) value: number;
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

      model.value = 1;
      result = childValidator.validate(model);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        ['value'],
        'number',
        'min',
        'Minimum value is 5'
      ));

      model.value = 11;
      result = childValidator.validate(model);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        ['value'],
        'number',
        'max',
        'Maximum value is 10'
      ));
    });

    it('should validate equal', () => {
      class Model {
        @P.equal(10) value: number;
      }

      const model = new Model()

      model.value = 10;
      let result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);

      model.value = 50;
      result = childValidator.validate(model);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        ['value'],
        'number',
        'equal',
        'Must equal to 10'
      ));

    });

    it('should validate notEqual', () => {
      class Model {
        @P.notEqual(10) value: number;
      }

      const model = new Model()

      model.value = 50;
      let result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);

      model.value = 10;
      result = childValidator.validate(model);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        ['value'],
        'number',
        'notEqual',
        'Must not equal to 10'
      ));

    });

    it('should validate integer', () => {
      class Model {
        @P.integer value: number;
      }

      const model = new Model()

      model.value = 50;
      let result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);

      model.value = 10.4;
      result = childValidator.validate(model);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        ['value'],
        'number',
        'integer',
        'Must be an integer'
      ));

    });

    it('should validate positive', () => {
      class Model {
        @P.positive value: number;
      }

      const model = new Model()

      model.value = 50;
      let result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);

      model.value = -40;
      result = childValidator.validate(model);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        ['value'],
        'number',
        'positive',
        'Must be positive'
      ));

    });

    it('should validate negative', () => {
      class Model {
        @P.negative value: number;
      }

      const model = new Model()

      model.value = -450;
      let result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);

      model.value = 10;
      result = childValidator.validate(model);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        ['value'],
        'number',
        'negative',
        'Must be negative'
      ));

    });
  });

  describe('"string" Validation', () => {

    describe('length based', () => {
        it('should validate type', () => {
          class Model {
            @P value: string;
          }

          const model = new Model()

          model.value = 'test';
          let result = childValidator.validate(model);
          expect(result).toBeInstanceOf(ValidationResult);
          expect(result.valid).toBe(true);

          model.value = 123 as any;
          result = childValidator.validate(model);
          expect(result.valid).toBe(false);
          expect(result.errors.length).toBe(1);
          expect(result.errors[0]).toStrictEqual(new ValidationError(
            ['value'],
            'string',
            'type',
            'Invalid runtime type, expected type string'
          ));
        });

        it('should validate length', () => {
          class Model {
            @P.length(5) value: string;
          }

          const model = new Model()

          model.value = 'abcde';
          let result = childValidator.validate(model);
          expect(result).toBeInstanceOf(ValidationResult);
          expect(result.valid).toBe(true);

          model.value = 'a';
          result = childValidator.validate(model);
          expect(result.valid).toBe(false);
          expect(result.errors.length).toBe(1);
          expect(result.errors[0]).toStrictEqual(new ValidationError(
            ['value'],
            'string',
            'length',
            'Length must be 5'
          ));

          model.value = 'abcdef';
          result = childValidator.validate(model);
          expect(result.valid).toBe(false);
          expect(result.errors.length).toBe(1);
          expect(result.errors[0]).toStrictEqual(new ValidationError(
            ['value'],
            'string',
            'length',
            'Length must be 5'
          ));

        });

        it('should validate minLength', () => {
          class Model {
            @P.minLength(5) value: string;
          }

          const model = new Model()

          model.value = 'abcde';
          let result = childValidator.validate(model);
          expect(result).toBeInstanceOf(ValidationResult);
          expect(result.valid).toBe(true);

          model.value = 'abcdefg';
          result = childValidator.validate(model);
          expect(result).toBeInstanceOf(ValidationResult);
          expect(result.valid).toBe(true);

          model.value = 'abcd';
          result = childValidator.validate(model);
          expect(result.valid).toBe(false);
          expect(result.errors.length).toBe(1);
          expect(result.errors[0]).toStrictEqual(new ValidationError(
            ['value'],
            'string',
            'minLength',
            'Minimum length is 5'
          ));

        });

        it('should validate maxLength', () => {
          class Model {
            @P.maxLength(5) value: string;
          }

          const model = new Model()

          model.value = 'abcde';
          let result = childValidator.validate(model);
          expect(result).toBeInstanceOf(ValidationResult);
          expect(result.valid).toBe(true);

          model.value = 'abcd';
          result = childValidator.validate(model);
          expect(result).toBeInstanceOf(ValidationResult);
          expect(result.valid).toBe(true);

          model.value = 'abcdef';
          result = childValidator.validate(model);
          expect(result.valid).toBe(false);
          expect(result.errors.length).toBe(1);
          expect(result.errors[0]).toStrictEqual(new ValidationError(
            ['value'],
            'string',
            'maxLength',
            'Maximum length is 5'
          ));

        });

        it('should validate empty', () => {
          class Model {
            @P.empty value: string;
          }

          const model = new Model()

          model.value = '';
          let result = childValidator.validate(model);
          expect(result).toBeInstanceOf(ValidationResult);
          expect(result.valid).toBe(true);

          model.value = ' ';
          result = childValidator.validate(model);
          expect(result.valid).toBe(false);
          expect(result.errors.length).toBe(1);
          expect(result.errors[0]).toStrictEqual(new ValidationError(
            ['value'],
            'string',
            'empty',
            'Must be empty'
          ));

          model.value = 'abcdef';
          result = childValidator.validate(model);
          expect(result.valid).toBe(false);
          expect(result.errors.length).toBe(1);
          expect(result.errors[0]).toStrictEqual(new ValidationError(
            ['value'],
            'string',
            'empty',
            'Must be empty'
          ));

        });

      });

      describe('string', () => {
        it('should validate pattern (RegEx)', () => {
          class Model {
            @P.pattern(/a[0-9]b[0-9]C/) value: string;
          }

          const model = new Model()

          model.value = 'a5b2C';
          let result = childValidator.validate(model);
          expect(result).toBeInstanceOf(ValidationResult);
          expect(result.valid).toBe(true);

          model.value = 'abc';
          result = childValidator.validate(model);
          expect(result.valid).toBe(false);
          expect(result.errors.length).toBe(1);
          expect(result.errors[0]).toStrictEqual(new ValidationError(
            ['value'],
            'string',
            'pattern',
            'Pattern mismatch, "abc" does not fit the pattern /a[0-9]b[0-9]C/'
          ));

        });


        it('should validate pattern (string)', () => {
          class Model {
            @P.pattern('a[0-9]b[0-9]C', 'i') value: string;
          }

          const model = new Model()

          model.value = 'a5b2C';
          let result = childValidator.validate(model);
          expect(result).toBeInstanceOf(ValidationResult);
          expect(result.valid).toBe(true);

          model.value = 'a5b2c';
          result = childValidator.validate(model);
          expect(result).toBeInstanceOf(ValidationResult);
          expect(result.valid).toBe(true);

          model.value = 'abc';
          result = childValidator.validate(model);
          expect(result.valid).toBe(false);
          expect(result.errors.length).toBe(1);
          expect(result.errors[0]).toStrictEqual(new ValidationError(
            ['value'],
            'string',
            'pattern',
            'Pattern mismatch, "abc" does not fit the pattern /a[0-9]b[0-9]C/i'
          ));

        });

        it('should validate contains', () => {
          class Model {
            @P.contains('test123') value: string;
          }

          const model = new Model()

          model.value = '____test123____';
          let result = childValidator.validate(model);
          expect(result).toBeInstanceOf(ValidationResult);
          expect(result.valid).toBe(true);

          model.value = '____test12____';
          result = childValidator.validate(model);
          expect(result.valid).toBe(false);
          expect(result.errors.length).toBe(1);
          expect(result.errors[0]).toStrictEqual(new ValidationError(
            ['value'],
            'string',
            'contains',
            'The value "____test12____" does not contain "test123"'
          ));

        });

        it('should validate alpha', () => {
          class Model {
            @P.alpha value: string;
          }

          const model = new Model()

          model.value = 'abcdef';
          let result = childValidator.validate(model);
          expect(result).toBeInstanceOf(ValidationResult);
          expect(result.valid).toBe(true);

          model.value = 'abcd1fg';
          result = childValidator.validate(model);
          expect(result.valid).toBe(false);
          expect(result.errors.length).toBe(1);
          expect(result.errors[0]).toStrictEqual(new ValidationError(
            ['value'],
            'string',
            'alpha',
            'The value "abcd1fg" contains non alpha characters'
          ));

        });

        it('should validate alphaNumeric', () => {
          class Model {
            @P.alphaNumeric value: string;
          }

          const model = new Model()

          model.value = 'abcdef123';
          let result = childValidator.validate(model);
          expect(result).toBeInstanceOf(ValidationResult);
          expect(result.valid).toBe(true);

          model.value = 'abcd1fg_%#';
          result = childValidator.validate(model);
          expect(result.valid).toBe(false);
          expect(result.errors.length).toBe(1);
          expect(result.errors[0]).toStrictEqual(new ValidationError(
            ['value'],
            'string',
            'alphaNumeric',
            'The value "abcd1fg_%#" contains non alpha-numeric characters'
          ));

        });
      });
    });

    describe('"date" Validation', () => {

      it('should validate type', () => {
        class Model {
          @P value: Date;
        }

        const model = new Model()

        model.value = new Date();
        let result = childValidator.validate(model);
        expect(result).toBeInstanceOf(ValidationResult);
        expect(result.valid).toBe(true);

        model.value = Date.now() as any;
        result = childValidator.validate(model);
        expect(result.valid).toBe(false);
        expect(result.errors.length).toBe(1);
        expect(result.errors[0]).toStrictEqual(new ValidationError(
          ['value'],
          'date',
          'type',
          'Invalid runtime type, expected type date'
        ));

        model.value = new Date(NaN);
        result = childValidator.validate(model);
        expect(result.valid).toBe(false);
        expect(result.errors.length).toBe(1);
        expect(result.errors[0]).toStrictEqual(new ValidationError(
          ['value'],
          'date',
          'type',
          'Invalid runtime type, expected type date'
        ));
      });
    });

});
