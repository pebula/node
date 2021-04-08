import { TypeValidatorCompiler } from '../../../validator';

export const arrayBuffer = new TypeValidatorCompiler('arrayBuffer')
  .setHandler('type', (ctx, prop, validatorMeta) => {
    return ctx.clone(
      ctx.currentBlock.addIfBlock().setCondition(`!(${ctx.sourceAccessor} instanceof ArrayBuffer)`)
    );
  });
