import { Code as C } from '@pebula/tom';
import { Constraint, RegisteredConstraints } from '../../../constraints';
import { CompilerCodeBlockContext, CompilerPropertyContext } from './context';

export type ValidationCompilerHandler<BIn extends C.Block<C.Block<any>> = C.Block<C.Block<any>>,
                                      BOut extends C.Block<C.Block<any>> = C.Block<C.Block<any>>> = (codeBlockContext: CompilerCodeBlockContext<BIn>,
                                                                                                     propContext: CompilerPropertyContext) => CompilerCodeBlockContext<BOut> | void;

/**
 * The signature for a validator jit compiler that generates code which validate the value of a property.
 * A property might have multiple validators, each of them must implement `TypeValidationCompilerHandler`
 *
 * The expected output code is an if statement with an expression that when evaluates to `true` it means that the value failed to validate.
 *
 * You can add code inside the if block handling a true expression but note that the framework will also add code there based on the logic in each scenario.
 * I.E, sometimes it will add validation error reporting code, sometimes other things (e.g. handling union type checks)
 *
 * Same apply for the `else` block, you can add code statements but note that the framework will also add code there, based on the logic for the type and validation being used.
 */
export type TypeValidationCompilerHandler<BIn extends C.Block<C.Block<any>> = C.Block<C.Block<any>>,
                                          TValidatorId extends keyof RegisteredConstraints = keyof RegisteredConstraints> = (codeBlockContext: CompilerCodeBlockContext<BIn>,
                                                                                                                           propContext: CompilerPropertyContext,
                                                                                                                           constraintData: Constraint<TValidatorId>) => CompilerCodeBlockContext<C.IfBlock<C.Block<any>>> | void;

export function chainBlocks(codeContext: CompilerCodeBlockContext, propContext: CompilerPropertyContext, ...reducers: ValidationCompilerHandler[]) {
  for (const c of reducers) {
    if (codeContext.terminated) {
      break;
    }
    codeContext = c(codeContext, propContext) || codeContext;
  }
  return codeContext;
}

/**
 * Runs the type validation code validator builder and returns the result.
 * When nothing is returned, no code added.
 */
export function runTypeValidationBlock(codeContext: CompilerCodeBlockContext,
                                       propContext: CompilerPropertyContext,
                                       constraint: Constraint,
                                       block: TypeValidationCompilerHandler): CompilerCodeBlockContext<C.IfBlock<C.Block<any>>> | undefined {
  if (!codeContext.terminated) {
    const resultCtx = block(codeContext, propContext, constraint);
    if (resultCtx) {
      const { currentBlock } = resultCtx;
      if (currentBlock !== codeContext.currentBlock) {
        if (!(currentBlock instanceof C.IfBlock)) {
          throw new Error(`TypeValidationCompilerHandler must return an instance of IfBlock, got ${(currentBlock as any).constructor.name}`)
        }
        return resultCtx;
      }
    }
  }
}
