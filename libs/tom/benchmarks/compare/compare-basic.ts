import { Suite, Case } from '@pebula/touchstone';
import * as DK from '@deepkit/type';
import * as TOM from '@pebula/tom';
import * as M from './models';

const plain = M.plainBasicModel();
const modelTom = Object.assign(new M.BasicModelTom(), plain);
const modelDeepKit = Object.assign(new M.BasicModelDeepKit(), plain);

const basicModelDeepKitSerializer = DK.jsonSerializer.for(M.BasicModelDeepKit);
const basicModelTomSerializer = TOM.jsonSerializer.create(M.BasicModelTom, { jitCompiler: 'strict' });

@Suite({ name: 'Framework Compare - Basic'})
class TestSuite {

  @Case({ name: 'DeepKit - Serialize' })
  serializeDeepKit() {
    basicModelDeepKitSerializer.serialize(modelDeepKit);
  }

  @Case({ name: 'Tom - Serialize' })
  serializeTom() {
    basicModelTomSerializer.serialize(modelTom);
  }

  @Case({ name: 'DeepKit - Deserialize' })
  deserializeDeepKit() {
    basicModelDeepKitSerializer.deserialize(plain);
  }

  @Case({ name: 'Tom - Deserialize' })
  deserializeTom() {
    basicModelTomSerializer.deserialize(plain);
  }

}
