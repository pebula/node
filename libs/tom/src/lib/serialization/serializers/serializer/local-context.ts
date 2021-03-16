import { Block } from '../../../js-code-builder';
import * as CTX from './compiler';
import { Serializer } from './serializer';


export interface CompilerContextState {
  maybeCircularReference: boolean;
  /**
   * When set, points to the block that hold the property which requires the context reference.
   * Use this location reference to add the declaration BEFORE it.
   * If this value is undefined, there is not need for the context.
   */
  serializeContextLocation: Block<Block<any>>;
  groupSecurityRendered: boolean;
}

export type CompilerContext<S extends Serializer = Serializer, T = any> = CTX.CompilerContext<CompilerContextState, S, T>;
export type CompilerPropertyContext<S extends Serializer = Serializer, T = any> = CTX.CompilerPropertyContext<CompilerContextState, S, T>;
export const CompilerPropertyContext = CTX.CompilerPropertyContext;
export { CompilerCodeBlockContext } from '../serializer/compiler';
