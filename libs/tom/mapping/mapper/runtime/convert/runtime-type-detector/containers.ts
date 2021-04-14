import { mapperRuntimeTypeDetectorRegistry } from '../../mapping';
import { object } from './primitive';

export const array = v => Array.isArray(v);
export const set = v => v instanceof Set;
export const map = v => v instanceof Map;
export const objectMap = object;

mapperRuntimeTypeDetectorRegistry
  .set('array', array)
  .set('tuple', array)
  .set('set', set)
  .set('map', map)
  .set('objectMap', objectMap);
