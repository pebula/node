import * as DK from '@deepkit/type';
import * as TOM from '@pebula/tom/serialization';
import * as M from './models';

describe('@pebula/tom/benchmarks', () => {

  it('basic serialization benchmarked objects should match', () => {
    const basicModelTomSerializer = TOM.jsonSerializer.create(M.BasicModelTom, { jitCompiler: 'strict' });
    const basicModelDeepKitSerializer = DK.jsonSerializer.for(M.BasicModelDeepKit);
    const plain = M.plainBasicModel();

    const deepKitBasicModel = basicModelDeepKitSerializer.deserialize(plain);
    const tomBasicModel =  basicModelTomSerializer.deserialize(plain);
    expect(deepKitBasicModel).toEqual(tomBasicModel);

    const deepKitBasicPlain = basicModelDeepKitSerializer.serialize(deepKitBasicModel);
    const tomBasicPlain = basicModelTomSerializer.serialize(tomBasicModel);

    expect(deepKitBasicPlain).toStrictEqual(tomBasicPlain);
    expect(tomBasicPlain).toStrictEqual(plain);

  });
});

