import { TypeValidatorCompiler } from '../../../validator';
import { ALPHA_REGEX, ALPHA_NUMERIC_REGEX } from '../../utils';

export const boolean = new TypeValidatorCompiler('boolean')
  .setHandler('type', (ctx, prop, constraintData) => {
    return ctx.clone(
      ctx.currentBlock.addIfBlock().setCondition(`typeof ${ctx.sourceAccessor} !== 'boolean'`)
    );
  });

export const number = new TypeValidatorCompiler('number')
  .setHandler('type', (ctx, prop, constraintData) => {
    return ctx.clone(
      ctx.currentBlock.addIfBlock().setCondition(`typeof ${ctx.sourceAccessor} !== 'number' || isNaN(${ctx.sourceAccessor}) || !isFinite(${ctx.sourceAccessor})`)
    );
  })
  .setHandler('min', (ctx, prop, constraintData) => {
    return ctx.clone(
      ctx.currentBlock.addIfBlock().setCondition(`${ctx.sourceAccessor} < ${constraintData.args[0]}`)
    );
  })
  .setHandler('max', (ctx, prop, constraintData) => {
    return ctx.clone(
      ctx.currentBlock.addIfBlock().setCondition(`${ctx.sourceAccessor} > ${constraintData.args[0]}`)
    );
  })
  .setHandler('equal', (ctx, prop, constraintData) => {
    return ctx.clone(
      ctx.currentBlock.addIfBlock().setCondition(`${ctx.sourceAccessor} !== ${constraintData.args[0]}`)
    );
  })
  .setHandler('integer', (ctx) => {
    return ctx.clone(
      ctx.currentBlock.addIfBlock().setCondition(`${ctx.sourceAccessor} % 1 !== 0`)
    );
  })
  .setHandler('positive', (ctx) => {
    return ctx.clone(
      ctx.currentBlock.addIfBlock().setCondition(`${ctx.sourceAccessor} <= 0`)
    );
  })
  .setHandler('negative', (ctx) => {
    return ctx.clone(
      ctx.currentBlock.addIfBlock().setCondition(`${ctx.sourceAccessor} >= 0`)
    );
  });

export const bigint = number.clone('bigInt')
  .setHandler('type', (ctx) => {
    return ctx.clone(
      ctx.currentBlock.addIfBlock().setCondition(`typeof ${ctx.sourceAccessor} !== 'bigint'`)
    );
  })
  .removeHandler('integer');

export const string = new TypeValidatorCompiler('string')
  .setHandler('type', (ctx) => {
    return ctx.clone(
      ctx.currentBlock.addIfBlock().setCondition(`typeof ${ctx.sourceAccessor} !== 'string'`)
    );
  })
  // length based
  .setHandler('length', (ctx, prop, constraintData) => {
    return ctx.clone(
      ctx.currentBlock.addIfBlock().setCondition(`${ctx.sourceAccessor}.length !== ${constraintData.args[0]}`)
    );
  })
  .setHandler('minLength', (ctx, prop, constraintData) => {
    return ctx.clone(
      ctx.currentBlock.addIfBlock().setCondition(`${ctx.sourceAccessor}.length < ${constraintData.args[0]}`)
    );
  })
  .setHandler('maxLength', (ctx, prop, constraintData) => {
    return ctx.clone(
      ctx.currentBlock.addIfBlock().setCondition(`${ctx.sourceAccessor}.length > ${constraintData.args[0]}`)
    );
  })
  .setHandler('empty', (ctx) => {
    return ctx.clone(
      ctx.currentBlock.addIfBlock().setCondition(`${ctx.sourceAccessor}.length !== 0`)
    );
  })
  // string
  .setHandler('pattern', (ctx, prop, constraintData) => {
    return ctx.clone(
      ctx.currentBlock.addIfBlock().setCondition(`${constraintData.args[0].toString()}.test(${ctx.sourceAccessor})`, true)
    );
  })
  .setHandler('contains', (ctx, prop, constraintData) => {
    return ctx.clone(
      ctx.currentBlock.addIfBlock().setCondition(`${ctx.sourceAccessor}.indexOf(${JSON.stringify(constraintData.args[0])}) === -1`)
    );
  })
  .setHandler('alpha', (ctx, prop, constraintData) => {
    const varName = prop.context.setContextVar(ALPHA_REGEX);
    return ctx.clone(
      ctx.currentBlock.addIfBlock().setCondition(`${varName}.test(${ctx.sourceAccessor})`, true)
    );
  })
  .setHandler('alphaNumeric', (ctx, prop, constraintData) => {
    const varName = prop.context.setContextVar(ALPHA_NUMERIC_REGEX);
    return ctx.clone(
      ctx.currentBlock.addIfBlock().setCondition(`${varName}.test(${ctx.sourceAccessor})`, true)
    );
  });


export const date = new TypeValidatorCompiler('date')
  .setHandler('type', (ctx) => {
    return ctx.clone(
      ctx.currentBlock.addIfBlock().setCondition(`!(${ctx.sourceAccessor} instanceof Date) || isNaN(${ctx.sourceAccessor}.getTime())`)
    );
  });
