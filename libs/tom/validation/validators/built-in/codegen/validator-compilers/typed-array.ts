import { TypeSystem } from '@pebula/tom';
import { TypeValidatorCompiler } from '../../../validator';

export const typedArrays: TypeValidatorCompiler[] = [];

for (const [k, typedArrayCtor] of TypeSystem.typedBufferTypeDefMap) {
  typedArrays.push(
    new TypeValidatorCompiler(k)
      .setHandler('type', (ctx, prop, validatorMeta) => {
        return ctx.clone(
          ctx.currentBlock.addIfBlock().setCondition(`!(${ctx.sourceAccessor} instanceof ${typedArrayCtor.name})`)
        );
      })
  );
}
