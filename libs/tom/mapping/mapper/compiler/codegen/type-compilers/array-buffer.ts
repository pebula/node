import { MapperTypeCompiler, mapperTypeCompilerRegistry } from '../../compilation';

export const arrayBuffer = new MapperTypeCompiler('arrayBuffer')
  .setHandler('arrayBuffer', (ctx, prop) => { ctx.currentBlock.addAssignment(ctx.targetSetter, `${ctx.sourceAccessor}.slice(0)`) })
  .setHandler('string', (ctx, prop) => {
    ctx.currentBlock
      .addVariable(true).assignValue(`Buffer.from(${ctx.sourceAccessor}, 'base64')`)
        .use( c => {
          c.parent.addAssignment(ctx.targetSetter, `${c.name}.buffer.slice(${c.name}.byteOffset, ${c.name}.byteOffset + ${c.name}.byteLength)`);
        });
  });

mapperTypeCompilerRegistry.set(arrayBuffer);
