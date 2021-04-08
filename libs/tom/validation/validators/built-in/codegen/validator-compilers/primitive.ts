import { TypeValidatorCompiler } from '../../../validator';

export const boolean = new TypeValidatorCompiler('boolean')
  .setHandler('type', (ctx, prop, validatorMeta) => {
    return ctx.clone(
      ctx.currentBlock.addIfBlock().setCondition(`typeof ${ctx.sourceAccessor} !== 'boolean'`)
    );
  });

export const number = new TypeValidatorCompiler('number')
  .setHandler('type', (ctx, prop, validatorMeta) => {
    return ctx.clone(
      ctx.currentBlock.addIfBlock().setCondition(`typeof ${ctx.sourceAccessor} !== 'number' || isNaN(${ctx.sourceAccessor}) || !isFinite(${ctx.sourceAccessor})`)
    );
  })
  .setHandler('min', (ctx, prop, validatorMeta) => {
    return ctx.clone(
      ctx.currentBlock.addIfBlock().setCondition(`${ctx.sourceAccessor} < ${validatorMeta.args}`)
    );
  })
  .setHandler('max', (ctx, prop, validatorMeta) => {
    return ctx.clone(
      ctx.currentBlock.addIfBlock().setCondition(`${ctx.sourceAccessor} > ${validatorMeta.args}`)
    );
  })
  .setHandler('equal', (ctx, prop, validatorMeta) => {
    return ctx.clone(
      ctx.currentBlock.addIfBlock().setCondition(`${ctx.sourceAccessor} !== ${validatorMeta.args}`)
    );
  })
  .setHandler('notEqual', (ctx, prop, validatorMeta) => {
    return ctx.clone(
      ctx.currentBlock.addIfBlock().setCondition(`${ctx.sourceAccessor} === ${validatorMeta.args}`)
    );
  })
  .setHandler('integer', (ctx, prop, validatorMeta) => {
    return ctx.clone(
      ctx.currentBlock.addIfBlock().setCondition(`${ctx.sourceAccessor} % 1 !== 0`)
    );
  })
  .setHandler('positive', (ctx, prop, validatorMeta) => {
    return ctx.clone(
      ctx.currentBlock.addIfBlock().setCondition(`${ctx.sourceAccessor} <= 0`)
    );
  })
  .setHandler('negative', (ctx, prop, validatorMeta) => {
    return ctx.clone(
      ctx.currentBlock.addIfBlock().setCondition(`${ctx.sourceAccessor} >= 0`)
    );
  });

export const bigint = number.clone('bigInt')
  .setHandler('type', (ctx, prop, validatorMeta) => {
    return ctx.clone(
      ctx.currentBlock.addIfBlock().setCondition(`typeof ${ctx.sourceAccessor} !== 'bigint'`)
    );
  })
  .removeHandler('integer');

export const string = new TypeValidatorCompiler('string')
  .setHandler('type', (ctx, prop, validatorMeta) => {
    return ctx.clone(
      ctx.currentBlock.addIfBlock().setCondition(`typeof ${ctx.sourceAccessor} !== 'string'`)
    );
  })
  .setHandler('length', (ctx, prop, validatorMeta) => {
    return ctx.clone(
      ctx.currentBlock.addIfBlock().setCondition(`${ctx.sourceAccessor}.length !== ${validatorMeta.args}`)
    );
  })
  .setHandler('minLength', (ctx, prop, validatorMeta) => {
    return ctx.clone(
      ctx.currentBlock.addIfBlock().setCondition(`${ctx.sourceAccessor}.length < ${validatorMeta.args}`)
    );
  })
  .setHandler('maxLength', (ctx, prop, validatorMeta) => {
    return ctx.clone(
      ctx.currentBlock.addIfBlock().setCondition(`${ctx.sourceAccessor}.length > ${validatorMeta.args}`)
    );
  })
  .setHandler('empty', (ctx, prop, validatorMeta) => {
    return ctx.clone(
      ctx.currentBlock.addIfBlock().setCondition(`${ctx.sourceAccessor}.length !== 0`)
    );
  });

export const date = new TypeValidatorCompiler('date')
  .setHandler('type', (ctx, prop, validatorMeta) => {
    return ctx.clone(
      ctx.currentBlock.addIfBlock().setCondition(`!(${ctx.sourceAccessor} instanceof Date) || isNaN(${ctx.sourceAccessor}.getTime())`)
    );
  });
