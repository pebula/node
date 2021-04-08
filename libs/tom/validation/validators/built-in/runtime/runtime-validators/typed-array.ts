import { TypeSystem } from '@pebula/tom';
import { TypeRuntimeValidator, Validator } from '../../../validator';

export const typedArrays: TypeRuntimeValidator<Validator, TypeSystem.TypeMap[TypeSystem.TypedBufferTypes]>[] = [];

for (const [k, typedArrayCtor] of TypeSystem.typedBufferTypeDefMap) {
  typedArrays.push(
    new TypeRuntimeValidator<Validator, TypeSystem.TypeMap[TypeSystem.TypedBufferTypes]>(k)
    .setHandler('type', (value, ctx, prop, validatorMeta) => {
      return !(value instanceof typedArrayCtor)
    })
  );
}
