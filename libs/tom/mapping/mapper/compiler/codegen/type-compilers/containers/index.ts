import { Code as C, TypeSystem } from '@pebula/tom';

export { array } from './array';
export { tuple } from './tuple';
export { set } from './set';
export { map } from './map';
export { objectMap } from './object-map';

declare module '../../../compilation/context/compiler-code-block-context' {
  export interface CompilerCodeBlockContextData {
    /**
     * While compiling the items in a union list, we go over different types but the "container" types (array, set, map, objectMap) are special.
     * Container types have items added into them, before hand (array) or after the checks (set, map, objectMap)
     * If the object at hand did not hit for the container (it's for another type in the union list) we need to make sure we don't add it
     * If this is the case, the compiler handler for the container will leave a trigger for us which we can check, if it's there we activate it
     * Each container type will be able to add code that handles this scenario, i.e. add code that removes the items or skip adding it.
     */
    containerInUnion?: {
      type: TypeSystem.ContainerTypes;
      handle(block: C.Block<C.Block<any>>): void;
    }
  }
}
