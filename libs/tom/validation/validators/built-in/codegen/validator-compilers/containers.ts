import { Code as C, Schema } from '@pebula/tom';
import { TypeValidatorCompiler } from '../../../validator';
import { CompilerCodeBlockContext, MAPPER, propertyValidatorCompiler } from '../../../validator/compiler';
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
        .use(c => {
          c.addAssignment(`${MAPPER.CTX_PARAM}.currentIndexOrKey`, c.indexName);
          generationIterableValidationCode(ctx.clone(c.addVirtualBlock(), `${ctx.sourceAccessor}[${c.indexName}]`), prop);
        }).parent
      .addAssignment(`${MAPPER.CTX_PARAM}.currentIndexOrKey`, 'undefined');
  });

export const tuple = array.clone('tuple')
  .setHandler('type', (ctx, prop, validatorMeta) => {
    return ctx.clone(
      ctx.currentBlock.addIfBlock().setCondition(`!Array.isArray(${ctx.sourceAccessor}) || ${ctx.sourceAccessor}.length < ${Schema.getTupleMinItems(prop.propMeta)}`)
    );
  })
  .setPostValidationHandler((ctx, prop) => {
    const subCtx = ctx.clone(ctx.currentBlock.addVirtualBlock());
    const subTypes = prop.propMeta.subTypes;
    for (let i = 0, len = subTypes.length; i < len; i++) {
      const subPropCtx = prop.createSubPropContext(subTypes[i]);
      propertyValidatorCompiler(
        subCtx.clone(subCtx.currentBlock, `${ctx.sourceAccessor}[${i}]`),
        subPropCtx,
        prop.context.validatorContext.propertyBlockCompilers.map( c => c.handler ).filter( c => !!c),
      );
    }
  });

export const set = new TypeValidatorCompiler('set')
  .setHandler('type', (ctx) => {
    return ctx.clone(
      ctx.currentBlock.addIfBlock().setCondition(`!(${ctx.sourceAccessor} instanceof Set)`)
    );
  })
  .setHandler('length', (ctx, prop, validatorMeta) => {
    return ctx.clone(
      ctx.currentBlock.addIfBlock().setCondition(`${ctx.sourceAccessor}.size !== ${validatorMeta.args[0]}`)
    );
  })
  .setHandler('minLength', (ctx, prop, validatorMeta) => {
    return ctx.clone(
      ctx.currentBlock.addIfBlock().setCondition(`${ctx.sourceAccessor}.size < ${validatorMeta.args[0]}`)
    );
  })
  .setHandler('maxLength', (ctx, prop, validatorMeta) => {
    return ctx.clone(
      ctx.currentBlock.addIfBlock().setCondition(`${ctx.sourceAccessor}.size > ${validatorMeta.args[0]}`)
    );
  })
  .setHandler('empty', (ctx) => {
    return ctx.clone(
      ctx.currentBlock.addIfBlock().setCondition(`${ctx.sourceAccessor}.size !== 0`)
    );
  })
  .setPostValidationHandler((ctx, prop) => {
    ctx.currentBlock
      .addAssignment(`${MAPPER.CTX_PARAM}.currentIndexOrKey`, '-1').parent
      .addForOfBlock()
        .setIterableExpression(ctx.sourceAccessor)
        .use(c => {
          c.addCodeExpression(`${MAPPER.CTX_PARAM}.currentIndexOrKey += 1`);
          generationIterableValidationCode(ctx.clone(c.addVirtualBlock(), c.varName), prop);
        }).parent
      .addAssignment(`${MAPPER.CTX_PARAM}.currentIndexOrKey`, 'undefined');
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
        .use(c => {
          c.addAssignment(`${MAPPER.CTX_PARAM}.currentIndexOrKey`, c.varName[0]);
          generationIterableValidationCode(ctx.clone(c.addVirtualBlock(), c.varName[1]), prop)
        }).parent
      .addAssignment(`${MAPPER.CTX_PARAM}.currentIndexOrKey`, 'undefined');
  });

export const objectMap = new TypeValidatorCompiler('objectMap')
  .setHandler('type', (ctx) => {
    return ctx.clone(
      ctx.currentBlock.addIfBlock().setCondition(`typeof ${ctx.sourceAccessor} !== 'object' || ${new C.IsArrayExpression(ctx.currentBlock, ctx.sourceAccessor).toString()}`)
    );
  })
  .setHandler('length', (ctx, prop, validatorMeta) => {
    return ctx.clone(
      ctx.currentBlock.addIfBlock().setCondition(`Object.keys(${ctx.sourceAccessor}).length !== ${validatorMeta.args[0]}`)
    );
  })
  .setHandler('minLength', (ctx, prop, validatorMeta) => {
    return ctx.clone(
      ctx.currentBlock.addIfBlock().setCondition(`Object.keys(${ctx.sourceAccessor}).length < ${validatorMeta.args[0]}`)
    );
  })
  .setHandler('maxLength', (ctx, prop, validatorMeta) => {
    return ctx.clone(
      ctx.currentBlock.addIfBlock().setCondition(`Object.keys(${ctx.sourceAccessor}).length > ${validatorMeta.args[0]}`)
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
        .use(c => {
          c.addAssignment(`${MAPPER.CTX_PARAM}.currentIndexOrKey`, c.varName[0]);
          generationIterableValidationCode(ctx.clone(c.addVirtualBlock(), c.varName[1]), prop);
        }).parent
      .addAssignment(`${MAPPER.CTX_PARAM}.currentIndexOrKey`, 'undefined');
  });
