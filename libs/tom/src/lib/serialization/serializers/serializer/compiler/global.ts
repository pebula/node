import { ROOT } from './param-names';

/**
 * A global container that can contain shared references like the node's "global" or the browsers "window"
 * This will be available to all JIT methods under the name "global".
 *
 * GLOBAL is an array, not an object, use `setToGlobal` to add a value to the GLOBAL and the returned
 * string will represent access to that value.
 *
 * E.G
 *
 * ```typescript
 * const PATH_TO_REGEXP = setGlobal(new RegExp());
 * ```
 */
export const GLOBAL: any[] = [];

export function setToGlobal(value: any) {
  const index = GLOBAL.push(value) - 1;
  return `${ROOT.GLOBAL_PARAM}[${index}]`;
}
