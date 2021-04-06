import { TypeSystem } from '@pebula/tom';
import { MapperTypeCompiler, mapperTypeCompilerRegistry } from '../../compilation';

export const typedArrays: { [P in TypeSystem.TypedBufferTypes]: MapperTypeCompiler<P>; } = {} as any;

for (const [k, v] of TypeSystem.typedBufferTypeDefMap) {
  const typeName = v.name;

  const typedArray = new MapperTypeCompiler(k)
    .setHandler(k, (ctx, prop) => { ctx.currentBlock.addAssignment(ctx.targetSetter, `${ctx.sourceAccessor}.slice(0)`) })
    .setHandler('string', (ctx, prop) => {
      ctx.currentBlock
        .addVariable(true).assignValue(`Buffer.from(${ctx.sourceAccessor}, 'base64')`)
          .use( c => {
            c.parent.addAssignment(ctx.targetSetter, `new ${typeName}(${c.name}.buffer, ${c.name}.byteOffset, ${c.name}.length / ${typeName}.BYTES_PER_ELEMENT)`);
          });
    });

  for (const z of TypeSystem.typedBufferTypeDefMap.keys()) {
    if (k !== z) {
      typedArray
        .setHandler(z, (ctx, prop) => {
          ctx.currentBlock.addAssignment(ctx.targetSetter, `new ${typeName}(${ctx.sourceAccessor}.buffer, $${ctx.sourceAccessor}.byteOffset, ${ctx.sourceAccessor}.length / ${typeName}.BYTES_PER_ELEMENT)`);
        });
    }
  }
  mapperTypeCompilerRegistry.set(typedArrays[k] = typedArray as any);
}
