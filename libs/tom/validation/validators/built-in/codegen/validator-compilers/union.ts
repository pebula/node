import { Code as C, Schema } from '@pebula/tom';
import { Constraint } from '../../../../constraints';
import { missingValidator } from '../../../errors';
import { TypeValidatorCompiler } from '../../../validator';
import { CompilerPropertyContext, createAddErrorCode, runTypeValidationBlock } from '../../../validator/compiler';
import { CompilerCodeBlockContext } from '../../local-context';

export const union = new TypeValidatorCompiler('union')
  .setHandler('type', (ctx, propCtx, typeValidationInfo) => {
    const { sorted, classLikeProperties } = Schema.determineUnionListResolveOrder(propCtx.propMeta);

    const ifBlock = new C.IfBlock(ctx.currentBlock);
    let newBlockContext: CompilerCodeBlockContext<C.ConditionalBlock<C.Block<any>, C.InlineExpression<C.Block<any>>>>;

    for (const subProp of sorted) {
      const subPropCtx = propCtx.createSubPropContext(subProp);
      const validatorCompiler = subPropCtx.findValidatorCompiler(true);
      const typeCtx = propertyValidatorValidationCompiler(ctx.clone(new C.Block(ifBlock)), subPropCtx, validatorCompiler, typeValidationInfo);

      if (typeCtx) {
        newBlockContext = newBlockContext ? newBlockContext.clone(ifBlock.elseIf()) : ctx.clone(ifBlock as C.ConditionalBlock<C.Block<any>>);
        newBlockContext.currentBlock.setCondition(typeCtx.currentBlock.getCondition.toggleNegate());

        for (const validatorMeta of subProp.validators) {
          propertyValidatorValidationCompiler(newBlockContext, subPropCtx, validatorCompiler, validatorMeta);
        }
        validatorCompiler.postValidationHandler?.(newBlockContext, subPropCtx);
      }
    }

    if (newBlockContext) {
      createAddErrorCode(ctx, propCtx, typeValidationInfo, ifBlock.else());
      ctx.currentBlock.add(ifBlock);
    } else {
      createAddErrorCode(ctx, propCtx, typeValidationInfo);
    }

  });

/**
 * Generate code for a single validation on a property
 */
export function propertyValidatorValidationCompiler(ctx: CompilerCodeBlockContext,
                                                    prop: CompilerPropertyContext,
                                                    validatorCompiler: TypeValidatorCompiler,
                                                    validatorMeta: Constraint) {
  const validatorCompilerHandler = validatorCompiler.findHandler(validatorMeta.id);
  if (!validatorCompilerHandler) {
    const { classValidationSchema } = prop.context;
    throw missingValidator(classValidationSchema.validator, classValidationSchema.target, prop.propMeta.name as string, prop.propMeta.typeDef, validatorMeta, 'jit');
  }
  return runTypeValidationBlock(ctx.clone(ctx.currentBlock.addVirtualBlock()), prop, validatorMeta, validatorCompilerHandler);
}
