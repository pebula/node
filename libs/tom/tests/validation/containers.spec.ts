import { P, C ,defaultValidator, ValidationResult } from '@pebula/tom/validation';

import { tomDescribeValidationJIT } from '@pebula/tom/testing';
import { ValidationError } from '../../validation/validation-result';

tomDescribeValidationJIT('@pebula/tom', defaultValidator, childValidator => {
  afterEach(() => {
    childValidator.resetBindings();
  });

  describe('"array" Validation', () => {

    it('should validate type', () => {
      class Model {
        @P.asArray('string') value: string[];
      }

      const model = new Model()

      model.value = [];
      let result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);

      model.value = ['aa'];
      result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);

      model.value = [123 as any];
      result = childValidator.validate(model);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        'value',
        'string',
        'type',
        'Invalid runtime type, expected type string'
      ));

      model.value = new Set<string>(['test']) as any;
      result = childValidator.validate(model);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        'value',
        'array',
        'type',
        'Invalid runtime type, expected type array<string>'
      ));
    });

    it('should validate length', () => {
      class Model {
        @P.asArray('string').length(5) value: string[];
      }

      const model = new Model()

      model.value = ['a', 'b', 'c', 'd', 'e'];
      let result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);

      model.value = ['a'];
      result = childValidator.validate(model);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        'value',
        'array',
        'length',
        'Length must be 5'
      ));

      model.value = ['a', 'b', 'c', 'd', 'e', 'f'];
      result = childValidator.validate(model);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        'value',
        'array',
        'length',
        'Length must be 5'
      ));
    });

    it('should validate minLength', () => {
      class Model {
        @P.asArray('string').minLength(5) value: string[];
      }

      const model = new Model()

      model.value = ['a', 'b', 'c', 'd', 'e'];
      let result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);

      model.value = ['a', 'b', 'c', 'd', 'e', 'f'];
      result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);

      model.value = ['a', 'b', 'c', 'd'];
      result = childValidator.validate(model);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        'value',
        'array',
        'minLength',
        'Minimum length is 5'
      ));

    });

    it('should validate maxLength', () => {
      class Model {
        @P.asArray('string').maxLength(5) value: string[];
      }

      const model = new Model()

      model.value = ['a', 'b', 'c', 'd', 'e'];
      let result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);

      model.value = ['a', 'b', 'c', 'd'];
      result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);

      model.value = ['a', 'b', 'c', 'd', 'e', 'f'];
      result = childValidator.validate(model);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        'value',
        'array',
        'maxLength',
        'Maximum length is 5'
      ));

    });

    it('should validate empty', () => {
      class Model {
        @P.asArray('string').empty value: string[];
      }

      const model = new Model()

      model.value = [];
      let result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);

      model.value = [''];
      result = childValidator.validate(model);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        'value',
        'array',
        'empty',
        'Must be empty'
      ));

      model.value = ['abcde'];
      result = childValidator.validate(model);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        'value',
        'array',
        'empty',
        'Must be empty'
      ));

    });

  });

  describe('"set" Validation', () => {

    it('should validate type', () => {
      class Model {
        @P.asSet('string') value: Set<string>;
      }

      const model = new Model()

      model.value = new Set();
      let result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);

      model.value.add('a');
      result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);

      model.value.clear();
      model.value.add(123 as any);
      result = childValidator.validate(model);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        'value',
        'string',
        'type',
        'Invalid runtime type, expected type string'
      ));

      model.value = ['test'] as any;
      result = childValidator.validate(model);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        'value',
        'set',
        'type',
        'Invalid runtime type, expected type set<string>'
      ));
    });

    it('should validate length', () => {
      class Model {
        @P.asSet('string').length(5) value: Set<string>;
      }

      const model = new Model()

      model.value = new Set(['a', 'b', 'c', 'd', 'e']);
      let result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);

      model.value = new Set(['a']);
      result = childValidator.validate(model);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        'value',
        'set',
        'length',
        'Length must be 5'
      ));

      model.value = new Set(['a', 'b', 'c', 'd', 'e', 'f']);
      result = childValidator.validate(model);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        'value',
        'set',
        'length',
        'Length must be 5'
      ));
    });

    it('should validate minLength', () => {
      class Model {
        @P.asSet('string').minLength(5) value: Set<string>;
      }

      const model = new Model()

      model.value = new Set(['a', 'b', 'c', 'd', 'e']);
      let result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);

      model.value = new Set(['a', 'b', 'c', 'd', 'e', 'f']);
      result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);

      model.value = new Set(['a', 'b', 'c', 'd']);
      result = childValidator.validate(model);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        'value',
        'set',
        'minLength',
        'Minimum length is 5'
      ));

    });

    it('should validate maxLength', () => {
      class Model {
        @P.asSet('string').maxLength(5) value: Set<string>;
      }

      const model = new Model()

      model.value = new Set(['a', 'b', 'c', 'd', 'e']);
      let result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);

      model.value = new Set(['a', 'b', 'c', 'd']);
      result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);

      model.value = new Set(['a', 'b', 'c', 'd', 'e', 'f']);
      result = childValidator.validate(model);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        'value',
        'set',
        'maxLength',
        'Maximum length is 5'
      ));

    });

    it('should validate empty', () => {
      class Model {
        @P.asSet('string').empty value: Set<string>;
      }

      const model = new Model()

      model.value = new Set([]);
      let result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);

      model.value = new Set(['']);
      result = childValidator.validate(model);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        'value',
        'set',
        'empty',
        'Must be empty'
      ));

      model.value = new Set(['abcde']);
      result = childValidator.validate(model);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        'value',
        'set',
        'empty',
        'Must be empty'
      ));

    });

  });

  describe('"map" Validation', () => {

    it('should validate type', () => {
      class Model {
        @P.asMap('string') value: Map<any, string>;
      }

      const model = new Model()

      model.value = new Map();
      let result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);

      model.value.set(1, 'a');
      result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);

      model.value.clear();
      model.value.set(1, 123 as any);
      result = childValidator.validate(model);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        'value',
        'string',
        'type',
        'Invalid runtime type, expected type string'
      ));

      model.value = ['test'] as any;
      result = childValidator.validate(model);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        'value',
        'map',
        'type',
        'Invalid runtime type, expected type map<any, string>'
      ));
    });

    it('should validate length', () => {
      class Model {
        @P.asMap('string').length(5) value: Map<any, string>;
      }

      const model = new Model()

      model.value = new Map([ [1, 'a'], [2, 'b'], [3, 'c'], [4, 'd'], [5, 'e'] ]);
      let result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);

      model.value = new Map([ [1, 'a'] ]);
      result = childValidator.validate(model);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        'value',
        'map',
        'length',
        'Length must be 5'
      ));

      model.value = new Map([ [1, 'a'], [2, 'b'], [3, 'c'], [4, 'd'], [5, 'e'], [6, 'f'] ]);
      result = childValidator.validate(model);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        'value',
        'map',
        'length',
        'Length must be 5'
      ));
    });

    it('should validate minLength', () => {
      class Model {
        @P.asMap('string').minLength(5) value: Map<any, string>;
      }

      const model = new Model()

      model.value = new Map([ [1, 'a'], [2, 'b'], [3, 'c'], [4, 'd'], [5, 'e'] ]);
      let result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);

      model.value = new Map([ [1, 'a'], [2, 'b'], [3, 'c'], [4, 'd'], [5, 'e'], [6, 'f'] ]);
      result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);

      model.value = new Map([ [1, 'a'] ]);
      result = childValidator.validate(model);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        'value',
        'map',
        'minLength',
        'Minimum length is 5'
      ));

    });

    it('should validate maxLength', () => {
      class Model {
        @P.asMap('string').maxLength(5) value: Map<any, string>;
      }

      const model = new Model()

      model.value = new Map([ [1, 'a'], [2, 'b'], [3, 'c'], [4, 'd'], [5, 'e'] ]);
      let result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);

      model.value = new Map([ [1, 'a'], [2, 'b'], [3, 'c'], [4, 'd'] ]);
      result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);

      model.value = new Map([ [1, 'a'], [2, 'b'], [3, 'c'], [4, 'd'], [5, 'e'], [6, 'f'] ]);
      result = childValidator.validate(model);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        'value',
        'map',
        'maxLength',
        'Maximum length is 5'
      ));

    });

    it('should validate empty', () => {
      class Model {
        @P.asMap('string').empty value: Map<any, string>;
      }

      const model = new Model()

      model.value = new Map([ ]);
      let result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);

      model.value = new Map([ [1, ''] ]);
      result = childValidator.validate(model);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        'value',
        'map',
        'empty',
        'Must be empty'
      ));

      model.value = new Map([ [1, 'abcde'] ]);
      result = childValidator.validate(model);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        'value',
        'map',
        'empty',
        'Must be empty'
      ));

    });

  });

  describe('"objectMap" Validation', () => {

    it('should validate type', () => {
      class Model {
        @P.asObjectMap('string') value: Record<any, string>;
      }

      const model = new Model()

      model.value = { };
      let result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);

      model.value['one'] = 'a';
      result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);

      model.value.one = 123 as any;
      result = childValidator.validate(model);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        'value',
        'string',
        'type',
        'Invalid runtime type, expected type string'
      ));

      model.value = [ 'one', 'test' ] as any;
      result = childValidator.validate(model);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        'value',
        'objectMap',
        'type',
        'Invalid runtime type, expected type objectMap<, string>'
      ));
    });

    it('should validate length', () => {
      class Model {
        @P.asObjectMap('string').length(5) value: Record<any, string>;
      }

      const model = new Model()

      model.value = { one: 'a', two: 'b', three: 'c', four: 'd', five: 'e' };
      let result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);

      model.value = { one: 'a' };
      result = childValidator.validate(model);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        'value',
        'objectMap',
        'length',
        'Length must be 5'
      ));

      model.value = { one: 'a', two: 'b', three: 'c', four: 'd', five: 'e', six: 'f' };
      result = childValidator.validate(model);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        'value',
        'objectMap',
        'length',
        'Length must be 5'
      ));
    });

    it('should validate minLength', () => {
      class Model {
        @P.asObjectMap('string').minLength(5) value: Record<any, string>;
      }

      const model = new Model()

      model.value = { one: 'a', two: 'b', three: 'c', four: 'd', five: 'e' };
      let result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);

      model.value = { one: 'a', two: 'b', three: 'c', four: 'd', five: 'e', six: 'f' };
      result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);

      model.value = { one: 'a', two: 'b', three: 'c', four: 'd' };
      result = childValidator.validate(model);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        'value',
        'objectMap',
        'minLength',
        'Minimum length is 5'
      ));

    });

    it('should validate maxLength', () => {
      class Model {
        @P.asObjectMap('string').maxLength(5) value: Record<any, string>;
      }

      const model = new Model()

      model.value = { one: 'a', two: 'b', three: 'c', four: 'd', five: 'e' };
      let result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);

      model.value = { one: 'a', two: 'b', three: 'c', four: 'd' };
      result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);

      model.value = { one: 'a', two: 'b', three: 'c', four: 'd', five: 'e', six: 'f' };
      result = childValidator.validate(model);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        'value',
        'objectMap',
        'maxLength',
        'Maximum length is 5'
      ));

    });

    it('should validate empty', () => {
      class Model {
        @P.asObjectMap('string').empty value: Record<any, string>;
      }

      const model = new Model()

      model.value = { };
      let result = childValidator.validate(model);
      expect(result).toBeInstanceOf(ValidationResult);
      expect(result.valid).toBe(true);

      model.value = { one: '' };
      result = childValidator.validate(model);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        'value',
        'objectMap',
        'empty',
        'Must be empty'
      ));

      model.value = { one: 'a' };
      result = childValidator.validate(model);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        'value',
        'objectMap',
        'empty',
        'Must be empty'
      ));

    });

  });
});
