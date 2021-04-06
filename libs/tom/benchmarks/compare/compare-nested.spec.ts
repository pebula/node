import * as DK from '@deepkit/type';
import * as TOM from '@pebula/tom/serialization';
import * as M from './models';

describe('@pebula/tom/benchmarks', () => {

  it('nested benchmarked objects should match', () => {
    const nestedModelTomSerializer = TOM.jsonSerializer.create(M.NestedModelTom, { jitCompiler: 'strict' });
    const nestedModelDeepKitSerializer = DK.jsonSerializer.for(M.NestedModelDeepKit);
    const plain = M.plainNestedModel();

    const deepKitNestedModel = nestedModelDeepKitSerializer.deserialize(plain);
    deepKitNestedModel.nested = deepKitNestedModel;
    const tomNestedModel =  nestedModelTomSerializer.deserialize(plain);
    tomNestedModel.nested = tomNestedModel;
    expect(deepKitNestedModel).toEqual(tomNestedModel);

    const deepKitNestedPlain = nestedModelDeepKitSerializer.serialize(deepKitNestedModel);
    const tomNestedPlain = nestedModelTomSerializer.serialize(tomNestedModel);

    // deepKit set it to undefined and TOM does not set it at all.
    expect(deepKitNestedModel).toHaveProperty('nested');
    delete deepKitNestedPlain.nested;

    expect(deepKitNestedPlain).toStrictEqual(tomNestedPlain);
    expect(tomNestedPlain).toStrictEqual(plain);

  });
});

