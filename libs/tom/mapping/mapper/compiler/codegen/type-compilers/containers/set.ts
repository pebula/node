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

function setCompiler(ctx: CompilerCodeBlockContext<C.IfBlock<C.Block<C.Block<any>>, C.InlineExpression<C.Block<C.Block<any>>>>>,
                    prop: CompilerPropertyContext) {

  let tempSetName: string;
  let tempItemName: string;
  ctx.currentBlock
    .addVariable().assignValue(`${ctx.targetSetter} = new Set()`).use( v => tempSetName = v.name).parent
    .addVariable(false).use( v => tempItemName = v.name).parent
    .addForOfBlock()
    .setSingleParam()
    .setIterableExpression(ctx.sourceAccessor)
      .use( c => {
        const newBlockContext = ctx.clone(c, c.varName, `${tempItemName}`);

        // Adding trigger handler code if we're under a union (see `CompilerCodeBlockContextData.containerInUnion` for more info)
        newBlockContext.setData('containerInUnion', {
          type: 'set',
          handle: block => {
            block.addCodeExpression(`continue`);
          }
        });

        const propertyCodeBlocks = [handleCopyRef, checkCircularRef];

        chainBlocks(
          newBlockContext,
          prop.subType,
          (ctx, prop) => generatePropertyMap(ctx, prop, propertyCodeBlocks),
        );

        c.addCodeExpression(`${tempSetName}.add(${tempItemName})`);
      })
      .parent
    // .else()
    //   .addAssignment(`${ctx.targetSetter}`, `new Set()`);
}

export const set = new MapperTypeCompiler('set')
  .setHandler('set', (ctx, prop) => {
    const block = ctx.currentBlock.addIfBlock().setCondition(`${ctx.sourceAccessor} instanceof Set`);
    setCompiler(ctx.clone(block, `${ctx.sourceAccessor}`), prop);
  })
  .setHandler('array', (ctx, prop) => {
    const block = ctx.currentBlock.addIfBlock().setCondition(new C.IsArrayExpression(ctx.currentBlock, ctx.sourceAccessor));
    setCompiler(ctx.clone(block, `${ctx.sourceAccessor}`), prop);
  })
  .setHandler('objectMap', (ctx, prop) => {
    const block = ctx.currentBlock.addIfBlock().setCondition(`${ctx.sourceAccessor} instanceof Object`);
    setCompiler(ctx.clone(block, `Object.values(${ctx.sourceAccessor})`), prop);
  })
  .setHandler('map', (ctx, prop) => {
    const block = ctx.currentBlock.addIfBlock().setCondition(`${ctx.sourceAccessor} instanceof Map`);
    setCompiler(ctx.clone(block, `Array.from(${ctx.sourceAccessor}.values())`), prop);
  })
  .setHandler('tuple', (ctx, prop) => {
    const { propMapSchema } = prop;
    const tSubType = propMapSchema.targetPropMeta.subType;
    const sSubTypes = propMapSchema.sourcePropMeta.subTypes;

    const block = ctx.currentBlock.addIfBlock().setCondition(new C.IsArrayExpression(ctx.currentBlock, ctx.sourceAccessor));
    const arrName = block.addVariable(true).assignValue(`${ctx.sourceAccessor}.slice()`).name;
    const tempItemVar = block.addVariable(false).name;
    block.addAssignment(ctx.targetSetter, `new Set()`);

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
        ctx.clone(ctx.currentBlock, `${arrName}[${i}]`, `${tempItemVar}`),
        newPropContext,
        (ctx, prop) => generatePropertyMap(ctx, prop, propertyCodeBlocks),
      );

      block.addCodeExpression(`${ctx.targetSetter}.add(${tempItemVar})`);
    }
  });

mapperTypeCompilerRegistry.set(set);
