import { Suite, Case } from '@pebula/touchstone';
import * as DK from '@deepkit/type';
import * as TOM from '@pebula/tom/serialization';
import * as M from './models';


const plain = M.plainNestedModel();
const modelTom = Object.assign(new M.NestedModelTom(), { uuid: plain.uuid, serial: plain.serial, basic: Object.assign(new M.BasicModelTom, plain.basic) });
modelTom.nested = modelTom;
const modelDeepKit = Object.assign(new M.NestedModelDeepKit(), { uuid: plain.uuid, serial: plain.serial, basic: Object.assign(new M.BasicModelDeepKit, plain.basic) });
modelDeepKit.nested = modelDeepKit;

const nestedModelTomSerializer = TOM.jsonSerializer.create(M.NestedModelTom, { jitCompiler: 'strict' });
const nestedModelDeepKitSerializer = DK.jsonSerializer.for(M.NestedModelDeepKit);

@Suite({ name: 'Serialization Framework Compare - Nested'})
class TestSuite {

  @Case({ name: 'DeepKit - Serialize' })
  serializeDeepKit() {
    nestedModelDeepKitSerializer.serialize(modelDeepKit);
  }

  @Case({ name: 'Tom - Serialize' })
  serializeTom() {
    nestedModelTomSerializer.serialize(modelTom);
  }

  @Case({ name: 'DeepKit - Deserialize' })
  deserializeDeepKit() {
    nestedModelDeepKitSerializer.deserialize(plain);
  }

  @Case({ name: 'Tom - Deserialize' })
  deserializeTom() {
    nestedModelTomSerializer.deserialize(plain);
  }

}
