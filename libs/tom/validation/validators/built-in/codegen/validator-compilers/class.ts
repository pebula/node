import { TypeValidatorCompiler } from '../../../validator';
import { MAPPER, ROOT } from '../../../validator/compiler';

export const classValidatorCompiler = new TypeValidatorCompiler('class')
  .setHandler('type', (ctx, prop, validatorMeta) => {
    return ctx.clone(
      ctx.currentBlock.addIfBlock().setCondition(`!(${ctx.sourceAccessor} instanceof ${prop.schemaParam('type')})`)
    );
  })
  .setPostValidationHandler((ctx, prop) => {
    ctx.currentBlock
      .addCodeExpression(`${MAPPER.CTX_PARAM}.validateSchema(${ctx.sourceAccessor}, ${prop.schemaParam()})`);

    if (prop.context.options.shortCircuit) {
      ctx.currentBlock
        .addIfBlock()
        .setCondition(`!${MAPPER.CTX_PARAM}.result.valid`)
        .addCodeExpression(`return ${MAPPER.CTX_PARAM}.result`);
    }
  });
