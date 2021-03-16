import { TypeSystem } from '../../../../../schema';
import { MapperTypeConverter, MapperTypeConverterHandler, mapperTypeConverterRegistry } from '../../mapping';

export const typedArrays: {
  [P in TypeSystem.TypedBufferTypes]: MapperTypeConverter<TypeSystem.TypedBufferTypes, InstanceType<TypeSystem.TypedBufferRuntimeTypes>>;
} = {} as any;

const directTypeArrayCopy: MapperTypeConverterHandler<InstanceType<TypeSystem.TypedBufferRuntimeTypes>, TypeSystem.TypeMap[TypeSystem.TypedBufferTypes]> = v => v.slice();

for (const [k, typeArrayCtor] of TypeSystem.typedBufferTypeDefMap) {
  const typedArray = new MapperTypeConverter<TypeSystem.TypedBufferTypes, InstanceType<TypeSystem.TypedBufferRuntimeTypes>>(k)
    .setHandler(k, directTypeArrayCopy)
    .setHandler<string>('string', v => {
      const buf = Buffer.from(v, 'base64');
      return new typeArrayCtor(buf.buffer, buf.byteOffset, buf.length / typeArrayCtor.BYTES_PER_ELEMENT);
    });

  for (const z of TypeSystem.typedBufferTypeDefMap.keys()) {
    if (k !== z) {
      typedArray
        .setHandler<InstanceType<TypeSystem.TypedBufferRuntimeTypes>>(z, buf => {
          return new typeArrayCtor(buf.buffer, buf.byteOffset, buf.length / typeArrayCtor.BYTES_PER_ELEMENT);
        });
    }
  }
  mapperTypeConverterRegistry.set(typedArrays[k] = typedArray);
}
