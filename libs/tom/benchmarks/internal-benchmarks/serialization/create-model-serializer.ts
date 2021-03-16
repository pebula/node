import { Case, Suite } from '@pebula/touchstone';
import { P, defineClassSerializer, jsonSerializer } from '@pebula/tom';
import { clearSerializer } from '@pebula/tom/testing'
import * as Models from './models';

@Suite({ name: 'Class Serialization - Create Model Serializer'})
export class TomDecoratorPerformance {

  @Case({ name: 'Using Serializer.create' })
  createSchemaViaCode() {
    jsonSerializer.create(OrderItem, { jitCompiler: 'strict' });
    jsonSerializer.create(Order, { jitCompiler: 'strict' });
    clearSerializer(jsonSerializer, OrderItem);
    clearSerializer(jsonSerializer, Order);
  }

  @Case({ name: 'Using defineClassSerializer' })
  createSchemaViaDecorators() {

    defineClassSerializer(jsonSerializer, OrderItem, { jitCompiler: 'strict' })
      .forMember('sku')
      .forMember('price')
      .forMember('quantity')
      .seal();

    defineClassSerializer(jsonSerializer, Order, { jitCompiler: 'strict' })
      .forMember('id')
      .forMember('date')
      .forMember('shipped')
      .forMember('status')
      .forMember('items')
      .seal();

    clearSerializer(jsonSerializer, OrderItem);
    clearSerializer(jsonSerializer, Order);
  }
}

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
