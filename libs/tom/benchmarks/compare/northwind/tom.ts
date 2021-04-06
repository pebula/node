import '@pebula/tom';
import { P, jsonSerializer } from '@pebula/tom/serialization';
import { NorthWind as N } from './models';

export namespace Tom {
  export const northWindSerializer = jsonSerializer.fork('northWind').setDefault('jitCompiler', 'strict').setDefault('enumAsLabels', true);
}

export namespace Tom {
  export class Address implements N.Address {
    @P street: string;
    @P city: string;
    @P.nullable.optional region?: string;
    @P.nullable postalCode: string;
    @P.enum(N.Country) country: N.Country;
    @P.optional phone?: string;
    @P.optional fax?: string;
    @P.optional homePage?: string;
  }

  export class Category implements N.Category {
    @P categoryID: number;
    @P name: string;
    @P.optional description?: string;
    @P.optional picture?: string;

    @P.asArray(() => Product) products?: Product[];
  }

  export class Customer implements N.Customer {
    @P customerID: string;
    @P.optional companyName?: string;
    @P.optional contactName?: string;
    @P.optional contactTitle?: string;
    @P.optional address?: Address;

    @P.asArray(() => Order) orders?: Order[];
  }

  export class Employee implements N.Employee {
    @P employeeID: number;
    @P lastName: string;
    @P firstName: string;
    @P.optional title?: string;
    @P.optional titleOfCourtesy?: string;
    @P.optional birthDate?: Date;
    @P.optional hireDate?: Date;
    @P.optional address?: Address;
    @P.optional photo?: string;
    @P.optional notes?: string;
    @P.optional reportsTo?: number;
    @P.optional photoPath?: string;
    @P.asArray(Number) territoryIDs: number[];

    @P.as(Employee).optional reportsToEmployee?: Employee;
    @P.asArray(() => Order) orders?: Order[];
    @P.asArray(() => Territory) territories?: Territory[];
  }

  export class OrderDetail implements N.OrderDetail {
    @P orderID: number;
    @P productID: number;
    @P.union('number', 'string') unitPrice: number | string;
    @P quantity: number;
    @P.union('number', 'string') discount?: number | string;

    @P.as(() => Order) order?: N.Order;
    @P.as(() => Product) product?: N.Product;
  }

  export class Order implements N.Order {
    @P orderID: number;
    @P customerID: string;
    @P employeeID: number;
    @P.nullable orderDate: Date;
    @P.nullable.optional requiredDate?: Date;
    @P.nullable.optional shippedDate?: Date;
    @P.optional shipVia?: number;
    @P.union('number', 'string').optional freight?: number | string;
    @P.optional shipName?: string;
    @P.optional shipAddress?: Address;
    @P.asArray(OrderDetail) details: OrderDetail[];

    @P customer: Customer;
    @P employee: Employee;
    @P.as(() => Shipper).optional shipper?: N.Shipper;
  }

  export class Product implements N.Product {
    @P productID: number;
    @P supplierID: number;
    @P categoryID: number;
    @P quantityPerUnit: string;
    @P.union('number', 'string') unitPrice: number | string;
    @P unitsInStock: number;
    @P unitsOnOrder: number;
    @P.optional reorderLevel?: number;
    @P.optional discontinued?: boolean;
    @P name: string;

    @P category?: Category;
    @P.as(() => Supplier) supplier?: N.Supplier;
  }

  export class Territory implements N.Territory {
    @P territoryID: number;
    @P name: string;
    @P.optional territoryDescription?: string;
    @P regionID: number;
    @P.as(() => Region) region: N.Region;
    @P.asArray(Employee) employees: Employee[];
  }

  export class Region implements N.Region {
    @P regionID: number;
    @P name: string;
    @P.optional regionDescription?: string;
    @P.asArray(Number) territoryIDs: number[];

    @P.asArray(Territory) territories: Territory[];
  }

  export class Shipper implements N.Shipper {
    @P shipperID: number;
    @P companyName?: string;
    @P phone?: string;

    @P.asArray(Order).optional orders?: Order[];
  }

  export class Supplier implements N.Supplier {
    @P supplierID: number;
    @P companyName?: string;
    @P.optional contactName?: string;
    @P.optional contactTitle?: string;
    @P.optional address?: Address;

    @P.asArray(Product).optional products?: Product[];
  }
}
