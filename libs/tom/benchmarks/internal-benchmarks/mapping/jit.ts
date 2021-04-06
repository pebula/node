import { Case, OnStart, OnCaseComplete, CaseCompleteEvent, SuiteStartEvent, Suite } from '@pebula/touchstone';
import { P, defineClassMapping, Types, mapTypes } from '@pebula/tom/mapping';
import { clearMap } from '@pebula/tom/testing';
import * as Models from './models';

class OrderDto implements Models.OrderDto {
  @P id: number;
  @P date: string;
  @P shipped: boolean;
  @P status: string;
  @P.asArray(() => OrderItemDto) items: OrderItemDto[];
}

class OrderItemDto implements Models.OrderItemDto {
  @P sku: string;
  @P quantity: number;
  @P price: number;
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

const orderDto = Models.getOrder();

function _defineClassMapping(jitCompiler: 'disabled' | 'strict') {
  defineClassMapping(OrderItemDto, OrderItem, { jitCompiler })
    .forMember('sku', 'sku')
    .forMember('price', 'price')
    .forMember('quantity', 'quantity')
    .seal();

  defineClassMapping(OrderDto, Order, { jitCompiler })
    .forMember('id', 'id')
    .forMember('date', 'date', Types.String)
    .forMember('shipped', 'shipped')
    .forMember('status', 'status', true)
    .forMember('items', 'items')
    .seal();
}

@Suite({ name: 'Class Mapping - JIT'})
export class TomTypeMapping {

  @OnStart()
  prepareTomTypeMapping(event: SuiteStartEvent): void {
    _defineClassMapping('disabled');
  }

  @OnCaseComplete()
  onCaseComplete(event: CaseCompleteEvent) {
    if (event.caseResult.name === 'Tom Class Mapping - JIT disabled') {
      clearMap(OrderDto, Order);
      clearMap(OrderItemDto, OrderItem);
      _defineClassMapping('strict');
    }
  }

  @Case({ name: 'Tom Class Mapping - JIT disabled' })
  mapOrder() {
    return mapTypes(orderDto, OrderDto, Order);
  }

  @Case({ name: 'Tom Class Mapping - JIT enabled' })
  mapOrderJIT() {
    return mapTypes(orderDto, OrderDto, Order);
  }
}
