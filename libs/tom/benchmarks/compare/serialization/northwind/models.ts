export namespace NorthWind {
  export class Address {
    street?: string;
    city?: string;
    region?: string;
    postalCode?: string;
    country?: Country;
    phone?: string;
    fax?: string;
    homePage?: string;
  }

  export class Category {
    categoryID?: number;
    name?: string;
    description?: string;
    picture?: string;

    products?: Product[];
  }

  export class Customer {
    customerID?: string;
    companyName?: string;
    contactName?: string;
    contactTitle?: string;
    address?: Address;

    orders?: Order[];
  }

  export class Employee {
    employeeID?: number;
    lastName?: string;
    firstName?: string;
    title?: string;
    titleOfCourtesy?: string;
    birthDate?: Date;
    hireDate?: Date;
    address?: Address;
    photo?: string;
    notes?: string;
    reportsTo?: number;
    photoPath?: string;
    territoryIDs?: number[];

    reportsToEmployee?: Employee;
    orders?: Order[];
    territories?: Territory[];
  }

  export class OrderDetail {
    orderID?: number;
    productID?: number;
    unitPrice?: number | string;
    quantity?: number;
    discount?: number | string;

    order?: Order;
    product?: Product;
  }

  export class Order {
    orderID?: number;
    customerID?: string;
    employeeID?: number;
    orderDate?: Date;
    requiredDate?: Date;
    shippedDate?: Date;
    shipVia?: number;
    freight?: number | string;
    shipName?: string;
    shipAddress?: Address;
    details?: OrderDetail[];

    customer?: Customer;
    employee?: Employee;
    shipper?: Shipper;
  }

  export class Product {
    productID?: number;
    supplierID?: number;
    categoryID?: number;
    quantityPerUnit?: string;
    unitPrice?: number | string;
    unitsInStock?: number;
    unitsOnOrder?: number;
    reorderLevel?: number;
    discontinued?: boolean;
    name?: string;

    category?: Category;
    supplier?: Supplier;
  }

  export class Territory {
    territoryID?: number;
    name?: string;
    territoryDescription?: string;
    regionID?: number;
    region?: Region;
    employees?: Employee[];
  }

  export class Region {
    regionID?: number;
    name?: string;
    regionDescription?: string;
    territoryIDs: number[];

    territories?: Territory[];
  }

  export class Shipper {
    shipperID?: number;
    companyName?: string;
    phone?: string;

    orders?: Order[];
  }

  export class Supplier {
    supplierID?: number;
    companyName?: string;
    contactName?: string;
    contactTitle?: string;
    address?: Address;

    products?: Product[];
  }
}

export namespace NorthWind {
  export enum Country {
    UK,
    Sweden,
    Germany,
    France,
    Spain,
    Mexico,
    Argentina,
    Switzerland,
    Brazil,
    Canada,
    Austria,
    Italy,
    Portugal,
    Venezuela,
    USA,
    Ireland,
    Belgium,
    Norway,
    Denmark,
    Finland,
    Poland,
    Japan,
    Australia,
    Singapore,
    Netherlands,
  }
}
