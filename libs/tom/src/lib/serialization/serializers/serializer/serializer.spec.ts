import { P } from '../../../schema';
import { clearSerializer } from '../../define-class-serializer';
import { jsonSerializer } from '../built-in';
import * as TC from '..//built-in/_codegen/type-compilers';

describe('Serializers/Serializer', () => {
  afterEach(() => {
    clearSerializer(jsonSerializer);
  });

  it('should automatically define a serialization and deserialization schemas when using the serializer instance', () => {
    class Nested {
      @P one: number;
      @P two: number;
    }

    class Model {
      @P a: number;
      @P b: number;
      @P.as(Nested) child: Nested;
    }

    jsonSerializer.create(Nested, { jitCompiler: 'strict' });
    const serializer = jsonSerializer.create(Model, { jitCompiler: 'strict' });

    let model = new Model();
    model.a = 10;
    model.b = 20;
    model.child = new Nested();
    model.child.one = 1;
    model.child.two = 2;

    let pojo = serializer.serialize(model);
    expect(pojo.a).toBe(model.a);
    expect(pojo.b).toBe(model.b);
    expect(pojo.child).not.toBe(model.child);
    expect(pojo.child.constructor).toBe(Object);
    expect(pojo.child.one).toBe(model.child.one);
    expect(pojo.child.two).toBe(model.child.two);

    model = serializer.deserialize(pojo);
    expect(model.a).toBe(pojo.a);
    expect(model.b).toBe(pojo.b);
    expect(model.child).not.toBe(pojo.child);
    expect(model.child.constructor).toBe(Nested);
    expect(model.child.one).toBe(pojo.child.one);
    expect(model.child.two).toBe(pojo.child.two);
  });

  it('should not serialize excluded items', () => {
    class Nested {
      @P.exclude one: number;
      @P two: number;
    }

    class Model {
      @P.exclude a: number;
      b: number;
      @P.as(Nested) child: Nested;
    }

    jsonSerializer.create(Nested, { jitCompiler: 'strict' });
    const serializer = jsonSerializer.create(Model, { jitCompiler: 'strict' });

    let model = new Model();
    model.a = 10;
    model.b = 20;
    model.child = new Nested();
    model.child.one = 1;
    model.child.two = 2;

    let pojo = serializer.serialize(model);
    expect(pojo.a).toBeUndefined();
    expect(pojo.b).toBeUndefined();
    expect(pojo.child).not.toBe(model.child);
    expect(pojo.child.constructor).toBe(Object);
    expect(pojo.child.one).toBeUndefined();
    expect(pojo.child.two).toBe(model.child.two);

    pojo.a = 99;
    pojo.b = 100;
    pojo.child.one = 101;
    model = serializer.deserialize(pojo);
    expect(model.a).toBeUndefined();
    expect(model.b).toBeUndefined();
    expect(model.child).not.toBe(pojo.child);
    expect(model.child.constructor).toBe(Nested);
    expect(model.child.one).toBeUndefined();
    expect(model.child.two).toBe(pojo.child.two);
  });

  it('should copy default parent options when forking', () => {
    const s1 = jsonSerializer.fork('s1').setDefault('jitCompiler', 'disabled').setDefault('enumAsLabels', false);
    const s2 = s1.fork('s2').setDefault('jitCompiler', 'enabled').setDefault('enumAsLabels', true);
    const s3 = s2.fork('s3').setDefault('jitCompiler', 'strict');

    expect(s1.defaultFactoryOptions.jitCompiler).toBe('disabled');
    expect(s2.defaultFactoryOptions.jitCompiler).toBe('enabled');
    expect(s3.defaultFactoryOptions.jitCompiler).toBe('strict');

    expect(s1.defaultFactoryOptions.enumAsLabels).toBe(false);
    expect(s2.defaultFactoryOptions.enumAsLabels).toBe(true);
    expect(s3.defaultFactoryOptions.enumAsLabels).toBe(true);

    s2.setDefault('jitCompiler', 'disabled');
    expect(s1.defaultFactoryOptions.jitCompiler).toBe('disabled');
    expect(s2.defaultFactoryOptions.jitCompiler).toBe('disabled');
    expect(s3.defaultFactoryOptions.jitCompiler).toBe('strict');
  });

  it('should reflect parent type compilers and override them when defined', () => {
    class TestSerializer extends jsonSerializer.forkType('TestSerializer') {
      configure() {
        this.setTypeCompiler('number').register(TC.exclude, TC.exclude);
      }
    }
    const testSerializer = new TestSerializer();

    class Model {
      @P a: boolean;
      @P b: number;
    }

    let model = new Model();
    model.a = true;
    model.b = 100;

    let pojo = testSerializer.create(Model).serialize(model);
    expect(pojo.a).toBe(true);
    expect(pojo.b).toBeUndefined();
    pojo = jsonSerializer.create(Model).serialize(model);
    expect(pojo.a).toBe(true);
    expect(pojo.b).toBe(100);


    model = testSerializer.create(Model).deserialize({ a: true, b: 100 });
    expect(model.a).toBe(true);
    expect(model.b).toBeUndefined();
    model = jsonSerializer.create(Model).deserialize({ a: true, b: 100 });
    expect(model.a).toBe(true);
    expect(model.b).toBe(100);

    class TestSerializer2 extends jsonSerializer.forkType('TestSerializer2') {
      configure() {
        this.setTypeCompiler('number').serializer = TC.exclude;
      }
    }
    const testSerializer2 = new TestSerializer2();
    model = new Model();
    model.a = true;
    model.b = 100;
    pojo = testSerializer2.create(Model).serialize(model);
    expect(pojo.a).toBe(true);
    expect(pojo.b).toBeUndefined();
    model = testSerializer2.create(Model).deserialize({ a: true, b: 100 });
    expect(model.a).toBe(true);
    expect(model.b).toBe(100);
  });

  it('should reflect parent runtime converters and override them when defined', () => {
    class TestSerializer extends jsonSerializer.forkType('TestSerializer') {
      configure() {
        this.setRuntimeConverter('number').register(() => 9999, () => 8888);
      }
    }
    const testSerializer = new TestSerializer().setDefault('jitCompiler', 'disabled');

    class Model {
      @P a: boolean;
      @P b: number;
    }

    let model = new Model();
    model.a = true;
    model.b = 100;

    let pojo = testSerializer.create(Model).serialize(model);
    expect(pojo.a).toBe(true);
    expect(pojo.b).toBe(9999);
    pojo = jsonSerializer.create(Model).serialize(model);
    expect(pojo.a).toBe(true);
    expect(pojo.b).toBe(100);


    model = testSerializer.create(Model).deserialize({ a: true, b: 100 });
    expect(model.a).toBe(true);
    expect(model.b).toBe(8888);
    model = jsonSerializer.create(Model).deserialize({ a: true, b: 100 });
    expect(model.a).toBe(true);
    expect(model.b).toBe(100);

    class TestSerializer2 extends jsonSerializer.forkType('TestSerializer2') {
      configure() {
        this.setRuntimeConverter('number').serializer = () => 9999;
      }
    }
    const testSerializer2 = new TestSerializer2().setDefault('jitCompiler', 'disabled');
    model = new Model();
    model.a = true;
    model.b = 100;
    pojo = testSerializer2.create(Model).serialize(model);
    expect(pojo.a).toBe(true);
    expect(pojo.b).toBe(9999);
    model = testSerializer2.create(Model).deserialize({ a: true, b: 100 });
    expect(model.a).toBe(true);
    expect(model.b).toBe(100);
  });


  it('should fork serializer', () => {
    enum JobStatus {
      Running = '__running',
      Done = 100,
    }

    class Model {
      @P.enum(JobStatus) status: JobStatus;
      @P.enum(JobStatus) status1: JobStatus;
    }

    const enumSerializer = jsonSerializer.fork('enumSerializer')
      .setDefault('jitCompiler', 'strict')
      .setDefault('enumAsLabels', false)
      .create(Model);

    const enumLabelSerializer = jsonSerializer.fork('enumLabelSerializer')
      .setDefault('jitCompiler', 'strict')
      .setDefault('enumAsLabels', true)
      .create(Model);

    const model = new Model();
    model.status = JobStatus.Running;
    model.status1 = JobStatus.Done;

    const noLabel = enumSerializer.serialize(model);
    expect(noLabel.status).toBe('__running');
    expect(noLabel.status1).toBe(100);
    const noLabelModel = enumSerializer.deserialize(noLabel);
    expect(noLabelModel.status).toBe(JobStatus.Running);
    expect(noLabelModel.status1).toBe(JobStatus.Done);

    const label = enumLabelSerializer.serialize(model);
    expect(label.status).toBe('Running');
    expect(label.status1).toBe('Done');
    const labelModel = enumLabelSerializer.deserialize(label);
    expect(labelModel.status).toBe(JobStatus.Running);
    expect(labelModel.status1).toBe(JobStatus.Done);
  });
});
