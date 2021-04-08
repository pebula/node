import { Code as C } from '@pebula/tom';
import { TypeValidatorCompiler, ValidatorContext } from '../../../validator';
import { CompilerCodeBlockContext, propertyValidatorCompiler } from '../../../validator/compiler';
import { CompilerPropertyContext } from '../../local-context';
import { string } from './primitive';

function generationIterableValidationCode(ctx: CompilerCodeBlockContext,
                                          prop: CompilerPropertyContext) {
  propertyValidatorCompiler(
    ctx,
    prop.subType,
    prop.context.validatorContext.propertyBlockCompilers.map( c => c.handler ).filter( c => !!c),
  );
}

export const array = new TypeValidatorCompiler('array')
  .setHandler('type', (ctx) => {
    return ctx.clone(
      ctx.currentBlock.addIfBlock().setCondition(new C.IsArrayExpression(ctx.currentBlock, ctx.sourceAccessor).toggleNegate(true))
    );
  })
  .copyFrom(string, 'length', 'minLength', 'maxLength', 'empty')
  .setPostValidationHandler((ctx, prop) => {
    ctx.currentBlock
      .addForIndexBlock()
      .setArrayExpression(ctx.sourceAccessor)
      .use( c => generationIterableValidationCode(ctx.clone(c.addVirtualBlock(), `${ctx.sourceAccessor}[${c.indexName}]`), prop) );
  });

export const set = new TypeValidatorCompiler('set')
  .setHandler('type', (ctx) => {
    return ctx.clone(
      ctx.currentBlock.addIfBlock().setCondition(`!(${ctx.sourceAccessor} instanceof Set)`)
    );
  })
  .setHandler('length', (ctx, prop, validatorMeta) => {
    return ctx.clone(
      ctx.currentBlock.addIfBlock().setCondition(`${ctx.sourceAccessor}.size !== ${validatorMeta.args}`)
    );
  })
  .setHandler('minLength', (ctx, prop, validatorMeta) => {
    return ctx.clone(
      ctx.currentBlock.addIfBlock().setCondition(`${ctx.sourceAccessor}.size < ${validatorMeta.args}`)
    );
  })
  .setHandler('maxLength', (ctx, prop, validatorMeta) => {
    return ctx.clone(
      ctx.currentBlock.addIfBlock().setCondition(`${ctx.sourceAccessor}.size > ${validatorMeta.args}`)
    );
  })
  .setHandler('empty', (ctx) => {
    return ctx.clone(
      ctx.currentBlock.addIfBlock().setCondition(`${ctx.sourceAccessor}.size !== 0`)
    );
  })
  .setPostValidationHandler((ctx, prop) => {
    ctx.currentBlock
      .addForOfBlock()
      .setIterableExpression(ctx.sourceAccessor)
      .use( c => generationIterableValidationCode(ctx.clone(c.addVirtualBlock(), c.varName), prop) );
  });

  export const map = set.clone('map')
    .setHandler('type', (ctx, prop, validatorMeta) => {
      return ctx.clone(
        ctx.currentBlock.addIfBlock().setCondition(`!(${ctx.sourceAccessor} instanceof Map)`)
      );
    })
    .setPostValidationHandler((ctx, prop) => {
      ctx.currentBlock
        .addForOfBlock()
        .setIterableExpression(ctx.sourceAccessor)
        .setArraySpreadParam(2)
        .use( c => generationIterableValidationCode(ctx.clone(c.addVirtualBlock(), c.varName[1]), prop) );
    });

  export const objectMap = new TypeValidatorCompiler('objectMap')
    .setHandler('type', (ctx) => {
      return ctx.clone(
        ctx.currentBlock.addIfBlock().setCondition(`typeof ${ctx.sourceAccessor} !== 'object' || ${new C.IsArrayExpression(ctx.currentBlock, ctx.sourceAccessor).toString()}`)
      );
    })
    .setHandler('length', (ctx, prop, validatorMeta) => {
      return ctx.clone(
        ctx.currentBlock.addIfBlock().setCondition(`Object.keys(${ctx.sourceAccessor}).length !== ${validatorMeta.args}`)
      );
    })
    .setHandler('minLength', (ctx, prop, validatorMeta) => {
      return ctx.clone(
        ctx.currentBlock.addIfBlock().setCondition(`Object.keys(${ctx.sourceAccessor}).length < ${validatorMeta.args}`)
      );
    })
    .setHandler('maxLength', (ctx, prop, validatorMeta) => {
      return ctx.clone(
        ctx.currentBlock.addIfBlock().setCondition(`Object.keys(${ctx.sourceAccessor}).length > ${validatorMeta.args}`)
      );
    })
    .setHandler('empty', (ctx) => {
      return ctx.clone(
        ctx.currentBlock.addIfBlock().setCondition(`Object.keys(${ctx.sourceAccessor}).length !== 0`)
      );
    })
    .setPostValidationHandler((ctx, prop) => {
      ctx.currentBlock
        .addForOfBlock()
        .setIterableExpression(`Object.entries(${ctx.sourceAccessor})`)
        .setArraySpreadParam(2)
        .use( c => generationIterableValidationCode(ctx.clone(c.addVirtualBlock(), c.varName[1]), prop) );
    });
