import * as CTX from '../validator/compiler/context';
import { Validator } from '../validator';

export interface CompilerContextState {
  maybeCircularReference: boolean;
}

export type CompilerContext<S extends Validator = Validator, T = any> = CTX.CompilerContext<CompilerContextState, S, T>;
export type CompilerPropertyContext<S extends Validator = Validator, T = any> = CTX.CompilerPropertyContext<CompilerContextState, S, T>;
export const CompilerPropertyContext = CTX.CompilerPropertyContext;
export { CompilerCodeBlockContext } from '../validator/compiler/context/compiler-code-block-context';
