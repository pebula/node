import { P, C ,defaultValidator, ValidationResult } from '@pebula/tom/validation';

import { tomDescribeValidationJIT } from '@pebula/tom/testing';
import { ValidationError } from '../../validation/validation-result';

tomDescribeValidationJIT('@pebula/tom', defaultValidator, childValidator => {
  afterEach(() => {
    childValidator.resetBindings();
  });

  describe('"enum" Validation', () => {
    it('should validate type', () => {
      enum JobStatus {
        Idle,
        Running,
        Done,
        Error = 999,
      }

      class Job {
        @P.enum(JobStatus) status: JobStatus;
      }

      const model = new Job();
      model.status = JobStatus.Done;

      let result = childValidator.validate(model);
      expect(result).toBe(true);

      model.status = 'Done' as any;
      result = childValidator.validate(model) as ValidationResult<Job>;
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        ['status'],
        'enum',
        'type',
        'Invalid runtime type, expected type enum'
      ));

      model.status = 555;
      result = childValidator.validate(model) as ValidationResult<Job>;
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toStrictEqual(new ValidationError(
        ['status'],
        'enum',
        'type',
        'Invalid runtime type, expected type enum'
      ));
    });

  });
});
