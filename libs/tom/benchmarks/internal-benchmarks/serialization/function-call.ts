import { Suite, Case } from '@pebula/touchstone';
import { defineClassSerializer, P, serialize, jsonSerializer } from '@pebula/tom/serialization';
import { schemaRegistry } from '../../../serialization/registry/serializer-registry';

class Model {
  @P ready?: boolean;

  @P priority: number = 0;

  @P public id: number;
  @P public name: string;
}

const model = new Model();

Object.assign(model, { name: 'name', id: 2, priority: 5, ready: true });
const options = {}

const s1 = jsonSerializer.fork('s1');
defineClassSerializer(s1, Model, { jitCompiler: 'strict' })
  .forMember('ready')
  .forMember('priority')
  .forMember('id')
  .forMember('name')
  .seal();

const s2 = jsonSerializer.fork('s2');
defineClassSerializer(s2, Model, { jitCompiler: 'strict' })
  .forMember('ready')
  .forMember('priority')
  .forMember('id')
  .forMember('name')
  .seal();

const directSerializeFn = schemaRegistry.getOperation(s2, Model, 'serialize');

const serializerSerializeFn = jsonSerializer.fork('s3').create(Model);

@Suite({ name: 'Class Serialization - Caller'})
class TestSuite {

  @Case({ name: 'Wrapping Serializer' })
  wrappingSerializer() {
    serialize(model, s1, {}, Model);
  }

  @Case({ name: 'Direct Serializer Function' })
  directSerializeFn() {
    directSerializeFn.transform(model, {});
  }

  @Case({ name: 'Serializer Serialize Function' })
  serializerSerializeFn() {
    serializerSerializeFn.serialize(model, {});
  }
}
