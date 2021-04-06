import { TypeValidatorCompiler } from '../../../validator';
import { createAddErrorCode } from '../add-error';

export const number = new TypeValidatorCompiler('number')
  .setHandler('type', (ctx, prop, validatorMeta) => {
    ctx.currentBlock.addIfBlock()
      .setCondition(`typeof ${ctx.sourceAccessor} !== 'number'`)
      .addCodeExpression(createAddErrorCode(ctx, prop, validatorMeta))
  })
  .setHandler('min', (ctx, prop, validatorMeta) => {
    ctx.currentBlock.addIfBlock()
      .setCondition(`${ctx.sourceAccessor} < ${validatorMeta.args}`)
      .addCodeExpression(createAddErrorCode(ctx, prop, validatorMeta))
  })
  .setHandler('max', (ctx, prop, validatorMeta) => {
    ctx.currentBlock.addIfBlock()
      .setCondition(`${ctx.sourceAccessor} > ${validatorMeta.args}`)
      .addCodeExpression(createAddErrorCode(ctx, prop, validatorMeta))
  });

