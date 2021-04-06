import { Suite, Case } from '@pebula/touchstone';
import { P, jsonSerializer } from '@pebula/tom/serialization';

enum JobStatus {
  Idle = 0,
  Running = '__running',
  Done = 100,
  Error = '__error',
}

class Model {
  @P.enum(JobStatus) status: JobStatus;
  @P.enum(JobStatus) status1: JobStatus;
  @P.enum(JobStatus) status2: JobStatus;
}

const enumSerializer = jsonSerializer
  .setDefault('jitCompiler', 'strict')
  .setDefault('enumAsLabels', false)
  .create(Model);

const enumLabelSerializer = jsonSerializer
  .setDefault('jitCompiler', 'strict')
  .setDefault('enumAsLabels', true)
  .create(Model);

const model = new Model();
model.status = JobStatus.Running;
model.status1 = JobStatus.Done;

@Suite({ name: 'Class Serialization - Enum'})
class TestSuite {

  @Case({ name: 'Enum Serialization without labels' })
  enumWithoutLabels() {
    enumSerializer.deserialize(enumSerializer.serialize(model));
  }

  @Case({ name: 'Enum Serialization with labels' })
  enumWithLabels() {
    enumLabelSerializer.deserialize(enumLabelSerializer.serialize(model));
  }
}
