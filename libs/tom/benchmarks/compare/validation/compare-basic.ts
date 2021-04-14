import { Suite, Case } from '@pebula/touchstone';
import * as DK from '@deepkit/type';
import Validator from 'fastest-validator';
import Ajv from 'ajv';
import * as TOM from '@pebula/tom/serialization';
import { defaultValidator } from '@pebula/tom/validation';

import * as M from './models';

const modelDeepKit = DK.jsonSerializer.for(M.BasicModelDeepKit)
  .deserialize(M.plainBasicModel());

const modelTom = TOM.jsonSerializer.create(M.BasicModelTom, { jitCompiler: 'strict' })
  .deserialize(M.plainBasicModel());

const modelFV = M.plainBasicModel();
const modelAJV = M.plainBasicModel();

const validatorDK = DK.validateFactory(M.BasicModelDeepKit);
const validatorTOM = defaultValidator.factory(M.BasicModelTom);
const validatorFV = new Validator().compile(M.BasicModelFV);
const validatorAJV = new Ajv().compile(M.BasicModelAJV);

if (!validatorDK(modelDeepKit)) throw new Error('Should be valid');
if (!validatorFV(modelFV)) throw new Error('Should be valid');
if (!validatorAJV(modelAJV)) throw new Error('Should be valid');
if (validatorTOM(modelTom) !== true) throw new Error('Should be valid');

@Suite({ name: 'Validation Framework Compare - Basic'})
class TestSuite {

  @Case({ name: 'DeepKit' })
  serializeDeepKit() {
    validatorDK(modelDeepKit);
  }

  @Case({ name: 'Fastest Validator' })
  serializeFV() {
    validatorFV(modelFV);
  }

  @Case({ name: 'AJV' })
  serializeAJV() {
    validatorAJV(modelAJV);
  }

  @Case({ name: 'Tom' })
  serializeTom() {
    validatorTOM(modelTom);
  }
}
