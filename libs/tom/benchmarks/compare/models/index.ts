import * as M from './iface';

export * from './iface';
export * from './deepkit';
export * from './tom';

export function plainBasicModel(): M.BasicModel {
  return {
    name: 'name',
    id: 2,
    tags: ['a', 'b', 'c'],
    priority: 5,
    ready: true,
  };
}

export function plainNestedModel(): M.NestedModel {
  return {
    uuid: '5487-5579-9137-5915',
    serial: 'CXI3312CKE4321OD',
    basic: plainBasicModel(),
  };
}
