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

function tupleCompiler(ctx: CompilerCodeBlockContext<C.IfBlock<C.Block<C.Block<any>>, C.InlineExpression<C.Block<C.Block<any>>>>>,
                       prop: CompilerPropertyContext,
                       tupleSource = false) {

  const { propMapSchema } = prop;
  const tSubTypes = propMapSchema.targetPropMeta.subTypes;
  const sSubTypes = tupleSource ? propMapSchema.sourcePropMeta.subTypes : [propMapSchema.sourcePropMeta.subType];
  const getSubType = tupleSource ? (i: number) => sSubTypes[i] : (i: number) => sSubTypes[0] ;

  const block = ctx.currentBlock;
  const arrName = block.addVariable(true).assignValue(ctx.sourceAccessor).name;
  block.addAssignment(ctx.targetSetter, `[]`);

  const len = tupleSource
    ? Math.min(tSubTypes.length, sSubTypes.length)
    : tSubTypes.length
  ;
  for (let i = 0; i < len; i++) {
    const childPropMapSchema = prop.propMapSchema.createChild(tSubTypes[i], getSubType(i));
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
}

export const tuple = new MapperTypeCompiler('tuple')
  .setHandler('tuple', (ctx, prop) => {
    const block = ctx.currentBlock.addIfBlock().setCondition(new C.IsArrayExpression(ctx.currentBlock, ctx.sourceAccessor));
    tupleCompiler(ctx.clone(block, `${ctx.sourceAccessor}.slice()`), prop, true);
  })
  .setHandler('array', (ctx, prop) => {
    const block = ctx.currentBlock.addIfBlock().setCondition(new C.IsArrayExpression(ctx.currentBlock, ctx.sourceAccessor));
    tupleCompiler(ctx.clone(block, `${ctx.sourceAccessor}.slice()`), prop);
  })
  .setHandler('set', (ctx, prop) => {
    const block = ctx.currentBlock.addIfBlock().setCondition(`${ctx.sourceAccessor} instanceof Set`);
    tupleCompiler(ctx.clone(block, `Array.from(${ctx.sourceAccessor})`), prop);
  })
  .setHandler('objectMap', (ctx, prop) => {
    const block = ctx.currentBlock.addIfBlock().setCondition(`${ctx.sourceAccessor} instanceof Object`);
    tupleCompiler(ctx.clone(block, `Object.values(${ctx.sourceAccessor})`), prop);
  })
  .setHandler('map', (ctx, prop) => {
    const block = ctx.currentBlock.addIfBlock().setCondition(`${ctx.sourceAccessor} instanceof Map`);
    tupleCompiler(ctx.clone(block, `Array.from(${ctx.sourceAccessor}.values())`), prop);
  });

mapperTypeCompilerRegistry.set(tuple);
