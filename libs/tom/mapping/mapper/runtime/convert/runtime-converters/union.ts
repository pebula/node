import { TypeSystem, Schema } from '@pebula/tom';
import { MapperTypeConverter, mapperTypeConverterRegistry } from '../../mapping';
import { mapperRuntimeTypeDetectorRegistry } from '../../mapping';
import { transform } from '../../transform';

function *traverseUnion<S, T>(tProp: Schema.TomPropertySchema<T>, sProp: Schema.TomPropertySchema<S>) {
  const { sorted, classLikeProperties } = Schema.determineUnionListResolveOrder(tProp);
  const sourceUnionSubTypes = sProp.isUnion
    ? sProp.unionSubTypes.slice()
    : [sProp]
  ;

  const classLike = classLikeProperties.length === 1 ? classLikeProperties[0] : undefined;
  const objectMapTypeDetector = classLike ? mapperRuntimeTypeDetectorRegistry.get('objectMap') : undefined;

  let sourceUnionLen = sourceUnionSubTypes.length;
  while (sorted.length > 0 && sourceUnionLen > 0) {
    const tSubType = sorted.shift();
    for (let i = 0; i < sourceUnionLen; i ++) {
      const sSubType = sourceUnionSubTypes[i];
      if (TypeSystem.isTomTypeEquals(tSubType.typeDef, sSubType.typeDef)) {
        if (sSubType.typeDef.type === 'literal') {
          sourceUnionSubTypes.splice(i, 1);
          sourceUnionLen -= 1;
          i = sourceUnionLen;
        }

        yield {
          tSubType,
          sSubType,
          detector: classLike === tSubType ? objectMapTypeDetector : mapperRuntimeTypeDetectorRegistry.get(tSubType.typeDef.type),
        };
      }
    }
  }
}

export const union = new MapperTypeConverter<'union'>('union')
  .setDefaultHandler((v, ctx, tProp, sProp) => {
    if (!tProp?.isUnion) {
      throw new Error('Invalid union type');
    }

    for (const { tSubType, sSubType, detector } of traverseUnion(tProp, sProp)) {
      if (detector?.(v, ctx, tSubType, sSubType)) {
        return transform(ctx, v, tSubType, sSubType);
      }
    }
  })
  .setSourceWildcardHandler((v, ctx, tProp, sProp) => {
    if (!sProp?.isUnion) {
      throw new Error('Invalid union type');
    }

    for (const { tSubType, sSubType, detector } of traverseUnion(sProp, tProp)) {
      if (detector?.(v, ctx, tSubType, sSubType)) {
        return transform(ctx, v, tSubType, sSubType);
      }
    }
  });


mapperTypeConverterRegistry.set(union);
