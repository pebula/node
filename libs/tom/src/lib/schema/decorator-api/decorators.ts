import { DecorApiSuite } from '@pebula/decorate/fluent';
import { TomPropertyFluentApi } from './property';
import { TomClassApi } from './class';

export const suite = DecorApiSuite.create()
  .forClass(TomClassApi)
  .forProperty(TomPropertyFluentApi);

export const C = suite.classApi;
export const P = suite.propertyApi;

export const store = suite.store;
