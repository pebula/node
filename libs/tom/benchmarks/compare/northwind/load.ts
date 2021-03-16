import { NorthWind as N } from './models';
import * as Customers from './data/customers.json';
import * as Orders from './data/orders.json';
import * as Employees from './data/employees.json';
import * as Territories from './data/territories.json';
import * as Regions from './data/regions.json';
import * as Shippers from './data/shippers.json';
import * as Products from './data/products.json';
import * as Categories from './data/categories.json';
import * as Suppliers from './data/suppliers.json';

const TOUCHED = Symbol('Touched');

export type CustomerIds = keyof typeof Customers;
export type OrderIds = keyof typeof Orders;
export type EmployeeIds = keyof typeof Employees;
export type TerritoryIds = keyof typeof Territories;
export type RegionIds = keyof typeof Regions;
export type ShipperIds = keyof typeof Shippers;
export type ProductIds = keyof typeof Products;
export type CategoryIds = keyof typeof Categories;
export type SupplierIds = keyof typeof Suppliers;

function getValues<T>(obj: T): Array<T[keyof T]> {
  return Object.values((obj as any).default);
}

function tryMarkTouched(o: any): boolean {
  if (!o) {
    return false;
  }
  if (TOUCHED in o) {
    return false;
  }
  o[TOUCHED] = true;
  return true;
}

export namespace Data {
  let withCircularRef = false;

  /**
   * Load a customer
   * @param customerID
   * @param addReferenceToExistingItems Add references to existing items which already created. If false, does not add the items.
   */
  export function loadCustomer(customerID: CustomerIds, addReferenceToExistingItems = false): N.Customer {
    withCircularRef = addReferenceToExistingItems;

    const customer: N.Customer = Customers[customerID] as any;

    if (!tryMarkTouched(customer)) {
      return customer;
    }

    if (!customer.orders) {
      customer.orders = [];
      for (const o of getValues(Orders)) {
        if (o.customerID === customerID) {
          customer.orders.push(_loadOrder(o.orderID as any))
        }
      }
    }

    return customer;
  }

  export function loadAllCustomers(addReferenceToExistingItems = false): N.Customer[] {
    return getValues(Customers).map( c => loadCustomer(c.customerID as any, addReferenceToExistingItems) );
  }

  export function loadOrder(orderId: OrderIds, addReferenceToExistingItems = false) {
    const order: N.Order = Orders[orderId] as any;
    if (!tryMarkTouched(order)) {
      return order;
    }
    const customer = loadCustomer(order.customerID as any, addReferenceToExistingItems);
    return customer.orders.find(o => o.orderID === orderId as any)
  }

  function loadEmployee(employeeId: EmployeeIds, addReferenceToExistingItems = false) {
    const employee: N.Employee = Employees[employeeId] as any;
    if (!tryMarkTouched(employee)) {
      return employee;
    }

    employeeId = parseInt(employeeId, 10) as any;
    for (const o of getValues(Orders)) {
      if (o.employeeID === employeeId as any) {
        loadCustomer(o.customerID as any, addReferenceToExistingItems);
        return (o as unknown as N.Order).employee;
      }
    }
  }


  function _loadOrder(orderId: OrderIds) {
    const order: N.Order = Orders[orderId] as any;

    if (!tryMarkTouched(order)) {
      return order;
    }

    if (withCircularRef && !order.customer && !!order.customerID) {
      order.customer = loadCustomer(order.customerID as any);
    }
    if (!order.employee && order.employeeID >= 0) {
      order.employee = _loadEmployee(order.employeeID as any);
    }
    if (!order.shipper && order.shipVia >= 0) {
      order.shipper = _loadShipper(order.shipVia as any);
    }

    for (const d of order.details) {
      if (withCircularRef) {
        d.order = order;
      }
      d.product = _loadProduct(d.productID as any);
    }
    return order;
  }

  function _loadEmployee(employeeId: EmployeeIds) {
    const employee: N.Employee = Employees[employeeId] as any;

    if (!tryMarkTouched(employee)) {
      return employee;
    }

    if (!employee.reportsToEmployee && employee.reportsTo >= 0) {
      employee.reportsToEmployee = _loadEmployee(employee.reportsTo as any);
    }

    if (withCircularRef) {
      employee.orders = [];
      for (const o of getValues(Orders)) {
        if (o.employeeID === employee.employeeID) {
          employee.orders.push(_loadOrder(o.orderID as any))
        }
      }
    }

    if (!employee.territories) {
      employee.territories = [];
      for (const tId of employee.territoryIDs) {
        employee.territories.push(_loadTerritory(tId as any));
      }
    }

    return employee;
  }

  function _loadTerritory(territoryId: TerritoryIds) {
    const territory: N.Territory = Territories[territoryId] as any;

    if (!tryMarkTouched(territory)) {
      return territory;
    }

    if (withCircularRef) {
      territory.employees = [];
      for (const o of getValues(Employees)) {
        if (o.territoryIDs.includes(territory.territoryID)) {
          territory.employees.push(_loadEmployee(o.employeeID as any))
        }
      }
    }

    if (!territory.region && territory.regionID >= 0) {
      territory.region = _loadRegion(territory.regionID as any);
    }

    return territory;
  }

  function _loadRegion(regionId: RegionIds) {
    const region: N.Region = Regions[regionId] as any;

    if (!tryMarkTouched(region)) {
      return region;
    }

    if (withCircularRef) {
      region.territories = [];
      for (const o of getValues(Territories)) {
        if (region.territoryIDs.includes(o.territoryID)) {
          region.territories.push(_loadTerritory(o.territoryID as any))
        }
      }
    }

    return region;
  }

  function _loadShipper(shipperId: ShipperIds) {
    const shipper: N.Shipper = Shippers[shipperId] as any;

    if (!tryMarkTouched(shipper)) {
      return shipper;
    }

    if (withCircularRef) {
      shipper.orders = [];
      for (const o of getValues(Orders)) {
        if (o.shipVia === shipper.shipperID) {
          shipper.orders.push(_loadOrder(o.orderID as any))
        }
      }
    }

    return shipper;
  }

  function _loadProduct(productId: ProductIds) {
    const product: N.Product = Products[productId] as any;

    if (!tryMarkTouched(product)) {
      return product;
    }

    if (!product.category && product.categoryID >= 0) {
      product.category = _loadCategory(product.categoryID as any);
    }

    if (!product.supplier && product.supplierID >= 0) {
      product.supplier = _loadSupplier(product.supplierID as any);
    }

    return product;
  }

  function _loadCategory(categoryID: CategoryIds) {
    const category: N.Category = Categories[categoryID] as any;

    if (!tryMarkTouched(category)) {
      return category;
    }

    if (withCircularRef) {
      category.products = [];
      for (const o of getValues(Products)) {
        if (o.categoryID === category.categoryID) {
          category.products.push(_loadProduct(o.productID as any))
        }
      }
    }

    return category;
  }

  function _loadSupplier(supplierID: SupplierIds) {
    const supplier: N.Supplier = Suppliers[supplierID] as any;

    if (!tryMarkTouched(supplier)) {
      return supplier;
    }

    if (withCircularRef) {
      supplier.products = [];
      for (const o of getValues(Products)) {
        if (o.supplierID === supplier.supplierID) {
          supplier.products.push(_loadProduct(o.productID as any))
        }
      }
    }

    return supplier;
  }
}
