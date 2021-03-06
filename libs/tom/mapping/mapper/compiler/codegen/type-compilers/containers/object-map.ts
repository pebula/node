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

function objectMapCompiler(ctx: CompilerCodeBlockContext<C.IfBlock<C.Block<C.Block<any>>, C.InlineExpression<C.Block<C.Block<any>>>>>,
                           prop: CompilerPropertyContext,
                           listCounterName?: string) {
  let tempObjName: string;
  let tempItemName: string;
  ctx.currentBlock
    .addVariable().assignValue(`${ctx.targetSetter} = {}`).use( v => tempObjName = v.name).parent
    .addVariable(false).use( v => tempItemName = v.name).parent
    .addForOfBlock()
    .setSingleParam()
    .setIterableExpression(ctx.sourceAccessor)
      .use( c => {
        let keyName = listCounterName || `${c.varName}[0]`;
        let valueName = !!listCounterName ? c.varName : `${c.varName}[1]`;

        const newBlockContext = ctx.clone(c, `${valueName}`, `${tempItemName}`);

        // Adding trigger handler code if we're under a union (see `CompilerCodeBlockContextData.containerInUnion` for more info)
        newBlockContext.setData('containerInUnion', {
          type: 'objectMap',
          handle: block => {
            block.addCodeExpression(`continue`);
          }
        });

        const propertyCodeBlocks = [handleCopyRef, checkCircularRef];

        const b = chainBlocks(
          newBlockContext,
          prop.subType,
          (ctx, prop) => generatePropertyMap(ctx, prop, propertyCodeBlocks),
        ).currentBlock;

        c.addAssignment(`${tempObjName}[${keyName}]`, tempItemName);

        if (!!listCounterName) {
          b.addAssignment(listCounterName, `${listCounterName} + 1`)
        }
      })
      .parent
    // .else()
    //   .addAssignment(`${ctx.targetSetter}`, `{}`);
}

export const objectMap = new MapperTypeCompiler('objectMap')
  .setHandler('objectMap', (ctx, prop) => {
    const block = ctx.currentBlock.addIfBlock().setCondition(`${ctx.sourceAccessor} instanceof Object`);
    objectMapCompiler(ctx.clone(block, `Object.entries(${ctx.sourceAccessor})`), prop);
  })
  .setHandler('array', (ctx, prop) => {
    let listCounterName: string;
    const block = ctx.currentBlock
      .addIfBlock()
      .setCondition(new C.IsArrayExpression(ctx.currentBlock, ctx.sourceAccessor))
      .addVariable(false).assignValue('0').use( v => listCounterName = v.name).parent;
    objectMapCompiler(ctx.clone(block), prop, listCounterName);
  })
  .setHandler('set', (ctx, prop) => {
    let listCounterName: string;
    const block = ctx.currentBlock.addIfBlock()
      .setCondition(`${ctx.sourceAccessor} instanceof Set`)
      .addVariable(false).assignValue('0').use( v => listCounterName = v.name).parent;

    objectMapCompiler(ctx.clone(block), prop, listCounterName);
  })
  .setHandler('map', (ctx, prop) => {
    const block = ctx.currentBlock.addIfBlock().setCondition(`${ctx.sourceAccessor} instanceof Map`);
    objectMapCompiler(ctx.clone(block, `${ctx.sourceAccessor}`), prop);
  })
  .setHandler('tuple', (ctx, prop) => {
    const { propMapSchema } = prop;
    const tSubType = propMapSchema.targetPropMeta.subType;
    const sSubTypes = propMapSchema.sourcePropMeta.subTypes;

    const block = ctx.currentBlock.addIfBlock()
      .setCondition(new C.IsArrayExpression(ctx.currentBlock, ctx.sourceAccessor));
    const arrName = block.addVariable(true).assignValue(`${ctx.sourceAccessor}.slice()`).name;
    const tempItemVar = block.addVariable(false).name;
    block.addAssignment(ctx.targetSetter, `{}`);

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

      block.addCodeExpression(`${ctx.targetSetter}[${i}] = ${tempItemVar}`);
    }
  });


mapperTypeCompilerRegistry.set(objectMap);
