import { TypeSystem } from '@pebula/tom';

export { array } from './array';
export { set } from './set';
export { map } from './map';
export { objectMap } from './object-map';

declare module '../../../compilation/context/compiler-code-block-context' {
  export interface CompilerCodeBlockContextData {
    container?: {
      type: TypeSystem.ContainerTypes;
      skipCurrentItemCode(): string[];
    }
  }
}
