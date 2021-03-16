import * as TOM from '@pebula/tom';
import * as NW from './northwind';

const tomNorthWindSerializer = TOM.jsonSerializer

describe('@pebula/tom/benchmarks', () => {

  it('nortwind benchmarked objects should match', () => {
    const tomCustomerSerializer = NW.Tom.northWindSerializer.create(NW.Tom.Customer);
    const deepKitCustomerSerializer = NW.DeepKit.northWindSerializer.for(NW.DeepKit.Customer);

    for (const plainCustomer of NW.Data.loadAllCustomers()) {
      const tomCustomer = tomCustomerSerializer.deserialize(plainCustomer);
      const deepKitCustomer = deepKitCustomerSerializer.deserialize(plainCustomer);
      expect(deepKitCustomer).toEqual(tomCustomer);

      const tomPlainCustomer = tomCustomerSerializer.serialize(tomCustomer);
      const deepKitPlainCustomer = deepKitCustomerSerializer.serialize(deepKitCustomer);
      expect(deepKitPlainCustomer).toStrictEqual(tomPlainCustomer);
    }
  });
});

