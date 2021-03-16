import * as C from '../../../../../../js-code-builder';
import {
  chainBlocks, CompilerPropertyContext, CompilerCodeBlockContext,
  MapperTypeCompiler, mapperTypeCompilerRegistry
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
        newBlockContext.setData('container', {
          type: 'set',
          skipCurrentItemCode: () => {
            return [
              `continue`,
            ];
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
  });

mapperTypeCompilerRegistry.set(set);
