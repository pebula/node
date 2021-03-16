import { Block } from '../../../../../js-code-builder';

export interface CompilerContextState {
  maybeCircularReference: boolean;
  groupSecurityRendered: boolean;
  /**
   * When set, points to the block that hold the property which requires the context reference.
   * Use this location reference to add the declaration BEFORE it.
   * If this value is undefined, there is not need for the context.
   */
  serializeContextLocation: Block<Block<any>>;
}
