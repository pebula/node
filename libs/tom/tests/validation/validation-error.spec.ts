import { P, C ,defaultValidator, ValidationResult } from '@pebula/tom/validation';

import { tomDescribeValidationJIT } from '@pebula/tom/testing';
import { ValidationError } from '../../validation/validation-result';

tomDescribeValidationJIT('@pebula/tom', defaultValidator, childValidator => {
  afterEach(() => {
    childValidator.resetBindings();
  });

  describe('resolving error path', () => {
    it('should resolve the error path', () => {
      class Model {
        @P myPathToNumber: number;
      }

      const model = new Model()
      let result = childValidator.validate(model) as ValidationResult<Model>;
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0].path).toStrictEqual(['myPathToNumber']);
    });

    it('should resolve the error path from nested class', () => {
      class ClassA {
        @P myPathToNumber: number;
      }

      class ClassB {
        @P myPathToA: ClassA;
      }

      const model = new ClassB();
      model.myPathToA = new ClassA();

      let result = childValidator.validate(model) as ValidationResult<ClassB>;
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0].path).toStrictEqual(['myPathToA', 'myPathToNumber']);
    });

    it('should resolve the error path from nested array', () => {
      class Model {
        @P.asArray('string') myPathToStringArray: string[];
      }

      const model = new Model()
      model.myPathToStringArray = ['valid', 123 as any];
      let result = childValidator.validate(model) as ValidationResult<Model>;
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0].path).toStrictEqual(['myPathToStringArray', 1]);
    });

    it('should resolve the error path from nested set', () => {
      class Model {
        @P.asSet('string') myPathToStringSet: Set<string>;
      }

      const model = new Model()
      model.myPathToStringSet = new Set(['valid0', 1 as any, 'valid2', 3 as any, 'valid4']);
      let result = childValidator.validate(model) as ValidationResult<Model>;
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(2);
      expect(result.errors[0].path).toStrictEqual(['myPathToStringSet', 1]);
      expect(result.errors[1].path).toStrictEqual(['myPathToStringSet', 3]);
    });

    it('should resolve the error path from nested map', () => {
      class Model {
        @P.asMap('string') myPathToStringMap: Map<any, string>;
      }

      const model = new Model()
      model.myPathToStringMap = new Map<any, string>([
        [0, 'valid0'],
        ['one', {} as any],
        ['T-W-O', true as any],
        [3, 'valid3'],
      ]);
      let result = childValidator.validate(model) as ValidationResult<Model>;
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(2);
      expect(result.errors[0].path).toStrictEqual(['myPathToStringMap', 'one']);
      expect(result.errors[1].path).toStrictEqual(['myPathToStringMap', 'T-W-O']);
    });


  })
});
