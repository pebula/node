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

function mapCompiler(ctx: CompilerCodeBlockContext<C.IfBlock<C.Block<C.Block<any>>, C.InlineExpression<C.Block<C.Block<any>>>>>,
                     prop: CompilerPropertyContext,
                     listCounterName?: string) {
  let tempMapName: string;
  let tempItemName: string;
  ctx.currentBlock
    .addVariable().assignValue(`${ctx.targetSetter} = new Map()`).use( v => tempMapName = v.name).parent
    .addVariable(false).use( v => tempItemName = v.name).parent
    .addForOfBlock()
    .setSingleParam()
    .setIterableExpression(ctx.sourceAccessor)
      .use( c => {
        let keyName = listCounterName || `${c.varName}[0]`;
        let valueName = !!listCounterName ? c.varName : `${c.varName}[1]`;

        const newBlockContext = ctx.clone(c, `${valueName}`, `${tempItemName}`);
        newBlockContext.setData('container', {
          type: 'map',
          skipCurrentItemCode: () => {
            return [
              `continue`,
            ];
          }
        });

        const propertyCodeBlocks = [handleCopyRef, checkCircularRef];

        const b = chainBlocks(
          newBlockContext,
          prop.subType,
          (ctx, prop) => generatePropertyMap(ctx, prop, propertyCodeBlocks),
        ).currentBlock;

        c.addCodeExpression(`${tempMapName}.set(${keyName}, ${tempItemName})`);
        if (!!listCounterName) {
          b.addAssignment(listCounterName, `${listCounterName} + 1`)
        }

      })
      .parent
    // .else()
    //   .addAssignment(`${ctx.targetSetter}`, `new Map()`);
}

export const map = new MapperTypeCompiler('map')
  .setHandler('map', (ctx, prop) => {
    const block = ctx.currentBlock.addIfBlock().setCondition(`${ctx.sourceAccessor} instanceof Map`);
    mapCompiler(ctx.clone(block, `${ctx.sourceAccessor}`), prop);
  })
  .setHandler('array', (ctx, prop) => {
    let listCounterName: string;
    const block = ctx.currentBlock
      .addIfBlock()
      .setCondition(new C.IsArrayExpression(ctx.currentBlock, ctx.sourceAccessor))
      .addVariable(false).assignValue('0').use( v => listCounterName = v.name).parent;
    mapCompiler(ctx.clone(block), prop, listCounterName);
  })
  .setHandler('set', (ctx, prop) => {
    let listCounterName: string;
    const block = ctx.currentBlock.addIfBlock()
      .setCondition(`${ctx.sourceAccessor} instanceof Set`)
      .addVariable(false).assignValue('0').use( v => listCounterName = v.name).parent;

    mapCompiler(ctx.clone(block), prop, listCounterName);
  })
  .setHandler('objectMap', (ctx, prop) => {
    const block = ctx.currentBlock.addIfBlock().setCondition(`${ctx.sourceAccessor} instanceof Object`);
    mapCompiler(ctx.clone(block, `Object.entries(${ctx.sourceAccessor})`), prop);
  });


mapperTypeCompilerRegistry.set(map);
