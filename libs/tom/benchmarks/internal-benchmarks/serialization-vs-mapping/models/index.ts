export enum OrderStatus {
  Draft = 'draft',
  Checkout = 'checkout',
  Paid = 'paid',
  Shipped = 'shipped',
  Completed = 'completed'
}

export interface OrderDto {
  id: number;
  date: string;
  shipped: boolean;
  status: string;
  items: OrderItemDto[];
}

export interface OrderItemDto {
  sku: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  date: Date;
  shipped: boolean;
  status: OrderStatus;
  items: OrderItem[];
}

export interface OrderItem {
  sku: string;
  quantity: number;
  price: number;
}

export function getOrder(): OrderDto {
  return Object.freeze({
    id: Date.now(),
    date: new Date().toISOString(),
    shipped: true,
    status: 'paid',
    items: [
      {
        sku: 'R107-7',
        quantity: 4,
        price: 32.22
      },
      {
        sku: 'C112-9',
        quantity: 1,
        price: 3.51
      },
      {
        sku: 'Q343-11',
        quantity: 12,
        price: 1.23
      },
      {
        sku: 'P232-33',
        quantity: 2,
        price: 1223
      }
    ]
  });
}
