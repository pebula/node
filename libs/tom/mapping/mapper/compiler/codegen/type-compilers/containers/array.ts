import { Code as C } from '@pebula/tom';
import {
  chainBlocks,
  CompilerPropertyContext,
  CompilerCodeBlockContext,
  MapperTypeCompiler,
  mapperTypeCompilerRegistry,
} from '../../../compilation';
import { checkCircularRef, handleCopyRef } from '../../property-code-blocks';
import { generatePropertyMap } from '../../prop-codegen';

function arrayCompiler(ctx: CompilerCodeBlockContext<C.IfBlock<C.Block<C.Block<any>>, C.InlineExpression<C.Block<C.Block<any>>>>>,
                       prop: CompilerPropertyContext) {
  let tempArrName: string;
  ctx.currentBlock
    .addVariable().assignValue(`${ctx.targetSetter} = ${ctx.sourceAccessor}`).use( v => tempArrName = v.name).parent
    .addForIndexBlock()
      .setArrayExpression(tempArrName)
      .use( c => {
        const newBlockContext = ctx.clone(c, `${tempArrName}[${c.indexName}]`, `${tempArrName}[${c.indexName}]`);

        // Adding trigger handler code if we're under a union (see `CompilerCodeBlockContextData.containerInUnion` for more info)
        newBlockContext.setData('containerInUnion', {
          type: 'array',
          handle: block => {
            block.addCodeExpression(`${tempArrName}.splice(${c.indexName}, 1)`);
            block.addCodeExpression(`${c.lengthVarName} -= 1`);
            block.addCodeExpression(`${c.indexName} -= 1`);
            block.addCodeExpression(`continue`);
          },
        });

        const propertyCodeBlocks = [handleCopyRef, checkCircularRef];

        chainBlocks(
          newBlockContext,
          prop.subType, // CompilerPropertyContext
          (ctx, prop) => generatePropertyMap(ctx, prop, propertyCodeBlocks),
        );
      })
}

export const array = new MapperTypeCompiler('array')
  .setHandler('array', (ctx, prop) => {
    const block = ctx.currentBlock.addIfBlock().setCondition(new C.IsArrayExpression(ctx.currentBlock, ctx.sourceAccessor));
    arrayCompiler(ctx.clone(block, `${ctx.sourceAccessor}.slice()`), prop);
  })
  .setHandler('set', (ctx, prop) => {
    const block = ctx.currentBlock.addIfBlock().setCondition(`${ctx.sourceAccessor} instanceof Set`);
    arrayCompiler(ctx.clone(block, `Array.from(${ctx.sourceAccessor})`), prop);
  })
  .setHandler('objectMap', (ctx, prop) => {
    const block = ctx.currentBlock.addIfBlock().setCondition(`${ctx.sourceAccessor} instanceof Object`);
    arrayCompiler(ctx.clone(block, `Object.values(${ctx.sourceAccessor})`), prop);
  })
  .setHandler('map', (ctx, prop) => {
    const block = ctx.currentBlock.addIfBlock().setCondition(`${ctx.sourceAccessor} instanceof Map`);
    arrayCompiler(ctx.clone(block, `Array.from(${ctx.sourceAccessor}.values())`), prop);
  })
  .setHandler('tuple', (ctx, prop) => {
    const { propMapSchema } = prop;
    const tSubType = propMapSchema.targetPropMeta.subType;
    const sSubTypes = propMapSchema.sourcePropMeta.subTypes;

    const block = ctx.currentBlock.addIfBlock().setCondition(new C.IsArrayExpression(ctx.currentBlock, ctx.sourceAccessor));
    const arrName = block.addVariable(true).assignValue(`${ctx.sourceAccessor}.slice()`).name;
    block.addAssignment(ctx.targetSetter, `[]`);

    for (let i = 0, len = sSubTypes.length; i < len; i++) {
      const childPropMapSchema = prop.propMapSchema.createChild(tSubType, sSubTypes[i]);
      const newPropContext = new CompilerPropertyContext(
        prop.context,
        prop.ref,
        childPropMapSchema,
        prop.context.setContextVar(childPropMapSchema)
      );

      const propertyCodeBlocks = [handleCopyRef, checkCircularRef];

      chainBlocks(
        ctx.clone(ctx.currentBlock, `${arrName}[${i}]`, `${ctx.targetSetter}[${i}]`),
        newPropContext,
        (ctx, prop) => generatePropertyMap(ctx, prop, propertyCodeBlocks),
      );
    }
  });

mapperTypeCompilerRegistry.set(array);
