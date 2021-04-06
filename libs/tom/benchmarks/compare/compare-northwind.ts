import { Suite, Case, OnStart, SuiteStartEvent } from '@pebula/touchstone';
import * as DK from '@deepkit/type';
import * as TOM from '@pebula/tom/serialization';
import * as NW from './northwind';

const tomNorthWindSerializer = TOM.jsonSerializer

const tomCustomerSerializer = NW.Tom.northWindSerializer.create(NW.Tom.Customer);
const deepKitCustomerSerializer = NW.DeepKit.northWindSerializer.for(NW.DeepKit.Customer);

@Suite({ name: 'Framework Compare - NorthWind', caseInvokeType: 'method' })
class TestSuite {

  plainCustomers: NW.NorthWind.Customer[];
  deepKitCustomers: NW.DeepKit.Customer[];
  tomCustomers: NW.Tom.Customer[];

  @OnStart()
  onStart(event: SuiteStartEvent): void {
    this.plainCustomers = NW.Data.loadAllCustomers();
  }

  @Case({ name: 'DeepKit - Serialize' })
  serializeDeepKit() {
    this.deepKitCustomers = this.plainCustomers.map( p => deepKitCustomerSerializer.deserialize(p) );
  }

  @Case({ name: 'Tom - Serialize' })
  serializeTom() {
    this.tomCustomers = this.plainCustomers.map( p => tomCustomerSerializer.deserialize(p) );
  }

  @Case({ name: 'DeepKit - Deserialize' })
  deserializeDeepKit() {
    this.deepKitCustomers.map( c => deepKitCustomerSerializer.serialize(c) );
  }

  @Case({ name: 'Tom - Deserialize' })
  deserializeTom() {
    this.tomCustomers.map( c => tomCustomerSerializer.serialize(c) );
  }

}
