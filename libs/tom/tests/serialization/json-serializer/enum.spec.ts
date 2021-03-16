import { P, jsonSerializer } from '@pebula/tom';
import { clearSerializer, tomDescribeSerializerJIT } from '@pebula/tom/testing';

tomDescribeSerializerJIT('@pebula/tom', jsonSerializer, childSerializer => {
  afterEach(() => {
    clearSerializer(childSerializer);
  });

  describe('type-compiler - enum', () => {

    it('should serialize numeric enums', () => {

      enum JobStatus {
        Idle,
        Running,
        Done,
        Error = 999,
      }

      class Job {
        @P.enum(JobStatus) status: JobStatus;
      }

      const serializer = childSerializer.create(Job);
      let job = new Job();

      expect(serializer.serialize(job).status).toBeUndefined();

      job.status = JobStatus.Idle;
      expect(serializer.serialize(job).status).toBe(JobStatus.Idle);

      job.status = JobStatus.Running;
      expect(serializer.serialize(job).status).toBe(1);

      job.status = JobStatus.Error;
      expect(serializer.serialize(job).status).toBe(JobStatus.Error);

      job.status = 666;
      expect(serializer.serialize(job).status).toBe(666);

      const pojo: { status?: JobStatus } = { };
      expect(serializer.deserialize(pojo).status).toBeUndefined();

      pojo.status = JobStatus.Idle;
      expect(serializer.deserialize(pojo).status).toBe(JobStatus.Idle);

      pojo.status = JobStatus.Running;
      expect(serializer.deserialize(pojo).status).toBe(1);

      pojo.status = 2;
      expect(serializer.deserialize(pojo).status).toBe(JobStatus.Done);

      pojo.status = JobStatus.Error;
      expect(serializer.deserialize(pojo).status).toBe(JobStatus.Error);

      pojo.status = 666;
      expect(serializer.deserialize(pojo).status).toBeUndefined();

    });

    it('should serialize alpha enums', () => {

      enum JobStatus {
        Idle = '__idle',
        Running = '__running',
        Done = '__done',
        Error = '__error',
      }

      class Job {
        @P.enum(JobStatus) status: JobStatus;
      }

      const serializer = childSerializer.create(Job);
      let job = new Job();

      expect(serializer.serialize(job).status).toBeUndefined();

      job.status = JobStatus.Idle;
      expect(serializer.serialize(job).status).toBe(JobStatus.Idle);

      job.status = JobStatus.Running;
      expect(serializer.serialize(job).status).toBe('__running');

      job.status = '__done' as any;
      expect(serializer.serialize(job).status).toBe(JobStatus.Done);

      job.status = JobStatus.Error;
      expect(serializer.serialize(job).status).toBe(JobStatus.Error);

      job.status = '__NONE' as any;
      expect(serializer.serialize(job).status).toBe('__NONE');

      const pojo: { status?: JobStatus } = { };
      expect(serializer.deserialize(pojo).status).toBeUndefined();

      pojo.status = JobStatus.Idle;
      expect(serializer.deserialize(pojo).status).toBe(JobStatus.Idle);

      pojo.status = JobStatus.Running;
      expect(serializer.deserialize(pojo).status).toBe('__running');

      pojo.status = '__done' as any;
      expect(serializer.deserialize(pojo).status).toBe(JobStatus.Done);

      pojo.status = JobStatus.Error;
      expect(serializer.deserialize(pojo).status).toBe(JobStatus.Error);

      pojo.status = '__NONE' as any;
      expect(serializer.deserialize(pojo).status).toBeUndefined();

    });

    it('should serialize alpha-numeric enums', () => {

      enum JobStatus {
        Idle = 0,
        Running = '__running',
        Done = 100,
        Error = '__error',
      }

      class Job {
        @P.enum(JobStatus) status: JobStatus;
      }

      const serializer = childSerializer.create(Job);
      let job = new Job();

      expect(serializer.serialize(job).status).toBeUndefined();

      job.status = JobStatus.Idle;
      expect(serializer.serialize(job).status).toBe(JobStatus.Idle);

      job.status = JobStatus.Running;
      expect(serializer.serialize(job).status).toBe('__running');

      job.status = 100;
      expect(serializer.serialize(job).status).toBe(JobStatus.Done);

      job.status = JobStatus.Error;
      expect(serializer.serialize(job).status).toBe(JobStatus.Error);

      job.status = '__NONE' as any;
      expect(serializer.serialize(job).status).toBe('__NONE');

      job.status = 666;
      expect(serializer.serialize(job).status).toBe(666);

      const pojo: { status?: JobStatus } = { };
      expect(serializer.deserialize(pojo).status).toBeUndefined();

      pojo.status = JobStatus.Idle;
      expect(serializer.deserialize(pojo).status).toBe(JobStatus.Idle);

      pojo.status = JobStatus.Running;
      expect(serializer.deserialize(pojo).status).toBe('__running');

      pojo.status = '__running' as any;
      expect(serializer.deserialize(pojo).status).toBe(JobStatus.Running);

      pojo.status = 100;
      expect(serializer.deserialize(pojo).status).toBe(JobStatus.Done);

      pojo.status = JobStatus.Error;
      expect(serializer.deserialize(pojo).status).toBe(JobStatus.Error);

      pojo.status = '__NONE' as any;
      expect(serializer.deserialize(pojo).status).toBeUndefined();

      pojo.status = 666;
      expect(serializer.deserialize(pojo).status).toBeUndefined();

    });


    it('should serialize with enumAsLabels enabled', () => {

      enum JobStatus {
        Idle = 0,
        Running = '__running',
        Done = 100,
        Error = '__error',
      }

      class Job {
        @P.enum(JobStatus) status: JobStatus;
      }

      const serializer = childSerializer.fork('enumAsLabels_true').setDefault('enumAsLabels', true).create(Job);
      let job = new Job();

      expect(serializer.serialize(job).status).toBeUndefined();

      job.status = JobStatus.Idle;
      expect(serializer.serialize(job).status).toBe('Idle');

      job.status = JobStatus.Running;
      expect(serializer.serialize(job).status).toBe('Running');

      job.status = 100;
      expect(serializer.serialize(job).status).toBe('Done');

      job.status = JobStatus.Error;
      expect(serializer.serialize(job).status).toBe('Error');

      job.status = '__NONE' as any;
      expect(serializer.serialize(job).status).toBeUndefined();

      job.status = 666;
      expect(serializer.serialize(job).status).toBeUndefined();

      const pojo: { status?: keyof typeof JobStatus } = { };
      expect(serializer.deserialize(pojo).status).toBeUndefined();

      pojo.status = 'Idle';
      expect(serializer.deserialize(pojo).status).toBe(JobStatus.Idle);

      pojo.status = 'Running';
      expect(serializer.deserialize(pojo).status).toBe('__running');

      pojo.status = '__running' as any;
      expect(serializer.deserialize(pojo).status).toBeUndefined();

      pojo.status = 100 as any;
      expect(serializer.deserialize(pojo).status).toBeUndefined();

      pojo.status = 'Done';
      expect(serializer.deserialize(pojo).status).toBe(JobStatus.Done);

      pojo.status = JobStatus.Error as any;
      expect(serializer.deserialize(pojo).status).toBeUndefined();

      pojo.status = 'Error';
      expect(serializer.deserialize(pojo).status).toBe(JobStatus.Error);

      pojo.status = '__NONE' as any;
      expect(serializer.deserialize(pojo).status).toBeUndefined();

      pojo.status = 666 as any;
      expect(serializer.deserialize(pojo).status).toBeUndefined();

    });
  });
});
