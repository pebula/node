import { Code as C, TypeSystem } from '@pebula/tom';
import { CompilerCodeBlockContext, CompilerPropertyContext, mapperTypeDetectorCompilerRegistry } from '../../compilation';

for (const [k, typedArrayCtor] of TypeSystem.typedBufferTypeDefMap) {
  mapperTypeDetectorCompilerRegistry.set(k, (ctx: CompilerCodeBlockContext<C.ConditionalBlock<any>>, prop: CompilerPropertyContext) => {
    const block = ctx.currentBlock.setCondition(`${ctx.sourceAccessor} instanceof ${typedArrayCtor.name}`);
    return ctx.clone(block);
  });
}
