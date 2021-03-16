import { Case, Suite } from '@pebula/touchstone';
import { P, jsonSerializer } from '@pebula/tom';
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

const jsonNonJIT = jsonSerializer.fork('JSON NO-JIT')
  .setDefault('jitCompiler', 'disabled')
  .add(OrderItem)
  .create(Order);

const jsonJIT = jsonSerializer.fork('JSON JIT')
  .setDefault('jitCompiler', 'strict')
  .add(OrderItem)
  .create(Order);

@Suite({ name: 'Class Serialization - JIT'})
export class TomClassSerialization {

  @Case({ name: 'Tom Class Serialization - JIT enabled' })
  mapOrderJIT() {
    const d = jsonJIT.deserialize(orderDto);
    return jsonJIT.serialize(d);
  }

  @Case({ name: 'Tom Class Serialization - JIT disabled' })
  mapOrder() {
    const d = jsonNonJIT.deserialize(orderDto);
    return jsonNonJIT.serialize(d);
  }

}
