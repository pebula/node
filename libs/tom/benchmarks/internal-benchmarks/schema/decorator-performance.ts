import { Case, Suite } from '@pebula/touchstone';
import { P, ClassSchemaBuilder, } from '@pebula/tom';

enum OrderStatus {
  Draft = 'draft',
  Checkout = 'checkout',
  Paid = 'paid',
  Shipped = 'shipped',
  Completed = 'completed'
}

@Suite({ name: 'Class Schema - Decorator Performance'})
export class TomDecoratorPerformance {

  @Case({ name: 'Tom Create Schema - Decorators' })
  createSchemaViaDecorators() {
    class OrderDto {
      @P id: number;
      @P date: string;
      @P shipped: boolean;
      @P status: string;
      @P.asArray(() => OrderItemDto) items: OrderItemDto[];
    }

    class OrderItemDto {
      @P sku: string;
      @P quantity: number;
      @P price: number;
    }

    class Order {
      @P id: number;
      @P date: Date;
      @P shipped: boolean;
      @P.enum(OrderStatus) status: OrderStatus;
      @P.asArray(() => OrderItem) items: OrderItem[];
    }

    class OrderItem {
      @P sku: string;
      @P quantity: number;
      @P price: number;
    }
  }


  @Case({ name: 'Tom Create Schema - Manual' })
  createSchemaViaCode() {

    class OrderDto {
      id: number;
      date: string;
      shipped: boolean;
      status: string;
      items: OrderItemDto[];
    }

    class OrderItemDto {
      sku: string;
      quantity: number;
      price: number;
    }

    class Order {
      id: number;
      date: Date;
      shipped: boolean;
      status: OrderStatus;
      items: OrderItem[];
    }

    class OrderItem {
      sku: string;
      quantity: number;
      price: number;
    }

    ClassSchemaBuilder.create(OrderDto)
      .define('id', P.as(Number).buildSchema())
      .define('date', P.as(String).buildSchema())
      .define('shipped', P.as(Boolean).buildSchema())
      .define('status', P.as(String).buildSchema())
      .define('items', P.asArray(() => OrderItemDto).buildSchema())
      .verify();

    ClassSchemaBuilder.create(Order)
      .define('id', P.as(Number).buildSchema())
      .define('date', P.as(Date).buildSchema())
      .define('shipped', P.as(Boolean).buildSchema())
      .define('status', P.enum(OrderStatus).buildSchema())
      .define('items', P.asArray(() => OrderItem).buildSchema())
      .verify();

    ClassSchemaBuilder.create(OrderItemDto)
      .define('sku', P.as(String).buildSchema())
      .define('quantity', P.as(Number).buildSchema())
      .define('price', P.as(Number).buildSchema())
      .verify();

    ClassSchemaBuilder.create(OrderItem)
      .define('sku', P.as(String).buildSchema())
      .define('quantity', P.as(Number).buildSchema())
      .define('price', P.as(Number).buildSchema())
      .verify();

  }

}
