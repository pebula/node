import { TypeValidatorCompiler } from '../../../validator';
import { MAPPER, ROOT } from '../../../validator/compiler';

export const classValidatorCompiler = new TypeValidatorCompiler('class')
  .setHandler('type', (ctx, prop, validatorMeta) => {
    return ctx.clone(
      ctx.currentBlock.addIfBlock().setCondition(`!(${ctx.sourceAccessor} instanceof ${prop.schemaParam('type')})`)
    );
  })
  .setPostValidationHandler((ctx, prop) => {
    const schema = prop.context.classValidationSchema.validator.create(prop.propMeta.type);
    const nestedSchemaVar = prop.context.setContextVar(schema);

    const childCtxVar = ctx.currentBlock.addVariable(true).assignValue(`${MAPPER.CTX_PARAM}.createChild(${ctx.sourceAccessor}, ${nestedSchemaVar})`).name;
    ctx.currentBlock
      .addCodeExpression(`${childCtxVar}.classParentProp = ${prop.schemaParam()}`).parent
      .addCodeExpression(`${nestedSchemaVar}.validate(${ctx.sourceAccessor}, ${childCtxVar})`);

    if (prop.context.options.shortCircuit) {
      ctx.currentBlock
        .addIfBlock()
        .setCondition(`!${MAPPER.CTX_PARAM}.result.valid`)
        .addCodeExpression(`return ${MAPPER.CTX_PARAM}.result`);
    }
  });
