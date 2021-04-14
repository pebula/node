import '@deepkit/type';
import { f, jsonSerializer, PropertySchema, CompilerState } from '@deepkit/type';
import { NorthWind as N } from './models';

// DeepKit jsonSerializer does not treat enum as labels both ways
const deepKitNorthWindSerializer = new (jsonSerializer.fork('northWind'))();
deepKitNorthWindSerializer.fromClass.register('enum', (property: PropertySchema, state: CompilerState) => {
  const allowLabelsAsValue = property.allowLabelsAsValue;
  const typeValue = state.setVariable('typeValue', property.resolveClassType);

  if (allowLabelsAsValue) {
    state.addCodeForSetter(`
    var typeValue = ${typeValue};
    ${state.setter} = typeValue[${state.accessor}];
`);
  } else {
    state.addCodeForSetter(`${state.setter} = ${state.accessor};`);
  }
});


export namespace DeepKit {
  export const northWindSerializer = deepKitNorthWindSerializer;
}

export namespace DeepKit {
  export class Address implements N.Address {
    @f street: string;
    @f city: string;
    @f.nullable.optional region?: string;
    @f.nullable postalCode: string;
    @f.enum(N.Country, true) country: N.Country;
    @f.optional phone?: string;
    @f.optional fax?: string;
    @f.optional homePage?: string;
  }

  export class Category implements N.Category {
    @f categoryID: number;
    @f name: string;
    @f.optional description?: string;
    @f.optional picture?: string;

    @f.array(() => Product) products?: Product[];
  }

  export class Customer implements N.Customer {
    @f customerID: string;
    @f.optional companyName?: string;
    @f.optional contactName?: string;
    @f.optional contactTitle?: string;
    @f.optional address?: Address;

    @f.array(() => Order) orders?: Order[];
  }

  export class Employee implements N.Employee {
    @f employeeID: number;
    @f lastName: string;
    @f firstName: string;
    @f.optional title?: string;
    @f.optional titleOfCourtesy?: string;
    @f.optional birthDate?: Date;
    @f.optional hireDate?: Date;
    @f.optional address?: Address;
    @f.optional photo?: string;
    @f.optional notes?: string;
    @f.optional reportsTo?: number;
    @f.optional photoPath?: string;
    @f.array(Number) territoryIDs: number[];

    @f.type(Employee).optional reportsToEmployee?: Employee;
    @f.array(() => Order) orders?: Order[];
    @f.array(() => Territory) territories?: Territory[];
  }

  export class OrderDetail implements N.OrderDetail {
    @f orderID: number;
    @f productID: number;
    @f.union(Number, String) unitPrice: number | string;
    @f quantity: number;
    @f.union(Number, String) discount?: number | string;

    @f.type(() => Order) order?: N.Order;
    @f.type(() => Product) product?: N.Product;
  }

  export class Order implements N.Order {
    @f orderID: number;
    @f customerID: string;
    @f employeeID: number;
    @f orderDate: Date;
    @f.nullable.optional requiredDate?: Date;
    @f.nullable.optional shippedDate?: Date;
    @f.optional shipVia?: number;
    @f.union(Number, String).optional freight?: number | string;
    @f.optional shipName?: string;
    @f.optional shipAddress?: Address;
    @f.array(OrderDetail) details: OrderDetail[];

    @f customer: Customer;
    @f employee: Employee;
    @f.type(() => Shipper).optional shipper?: N.Shipper;
  }

  export class Product implements N.Product {
    @f productID: number;
    @f supplierID: number;
    @f categoryID: number;
    @f quantityPerUnit: string;
    @f.union(Number, String) unitPrice: number | string;
    @f unitsInStock: number;
    @f unitsOnOrder: number;
    @f.optional reorderLevel?: number;
    @f.optional discontinued?: boolean;
    @f name: string;

    @f category?: Category;
    @f.type(() => Supplier) supplier?: N.Supplier;
  }

  export class Territory implements N.Territory {
    @f territoryID: number;
    @f name: string;
    @f.optional territoryDescription?: string;
    @f regionID: number;
    @f.type(() => Region) region: N.Region;
    @f.array(Employee) employees: Employee[];
  }

  export class Region implements N.Region {
    @f regionID: number;
    @f name: string;
    @f.optional regionDescription?: string;
    @f.array(Number) territoryIDs: number[];

    @f.array(Territory) territories: N.Territory[];
  }

  export class Shipper implements N.Shipper {
    @f shipperID: number;
    @f companyName?: string;
    @f phone?: string;

    @f.array(Order).optional orders?: Order[];
  }

  export class Supplier implements N.Supplier {
    @f supplierID: number;
    @f companyName?: string;
    @f.optional contactName?: string;
    @f.optional contactTitle?: string;
    @f.optional address?: Address;
    @f.array(Product).optional products?: Product[];
  }
}
