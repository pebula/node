import { Case, Suite } from '@pebula/touchstone';
import { defineClassMapping, getMapper } from '@pebula/tom/mapping';
import { P, jsonSerializer } from '@pebula/tom/serialization';
import * as Models from './models';

class Order implements Models.Order {
  @P id: number;
  @P date: Date;
  @P shipped: boolean;
  @P.enum(Models.OrderStatus) status: Models.OrderStatus;
  @P.asArray(() => OrderItem) items: OrderItem[];
}

class OrderItem implements Models.OrderItem {
  @P sku: string;
  @P quantity: number;
  @P price: number;
}

const orderDto = Models.getOrder();

const jsonJIT = jsonSerializer.fork('JSON JIT')
  .setDefault('jitCompiler', 'strict')
  .add(OrderItem)
  .create(Order);

defineClassMapping(OrderItem, { jitCompiler: 'strict' }).seal();
defineClassMapping(Order, { jitCompiler: 'strict' }).seal();

const mapper = getMapper(Order, Order);

@Suite({ name: 'Class Serialization VS Class Mapping', caseInvokeType: 'method' })
export class TomClassSerialization {

  order: Order;

  @Case({ name: 'Tom Class Serialization - JIT enabled' })
  deserializeOrderJIT() {
    this.order = jsonJIT.deserialize(orderDto);
  }

  @Case({ name: 'Tom Class Mapping - JIT enabled' })
  mapOrderJIT() {
    mapper.transform(this.order, {});
  }
}
