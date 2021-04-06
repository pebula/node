import { Schema } from '@pebula/tom';
import { ClassSerializerContext, getSerializerContext, SerializerContext, RuntimeConverterHandler } from '../../../../serializer';
import { transform } from '../../runtime';

export function union(v: any, context: ClassSerializerContext<any>, prop: Schema.TomPropertySchema) {
  const serializerContext = getSerializerContext(context.schema.serializer);

  const unionList = prepareUnionTypeList(serializerContext, prop, context.isSerialize);
  for (const { detector, subType } of unionList) {
    if (detector?.(v, context, subType)) {
      return transform(context, v, subType);
    }
  }
}

function prepareUnionTypeList(context: SerializerContext,
                              unionType: Schema.TomPropertySchema<any>,
                              isSerialize: boolean): { subType: Schema.TomPropertySchema, detector: RuntimeConverterHandler}[] {
  const { sorted, classLikeProperties } = Schema.determineUnionListResolveOrder(unionType);
  const result: Array<{ subType: Schema.TomPropertySchema, detector: RuntimeConverterHandler}> = [];

  for (const subType of sorted) {
    let detector = context.findRuntimeTypeDetectorHandler(subType.typeDef.type, isSerialize);
    if (classLikeProperties.length === 1 && classLikeProperties[0] === subType) {
      detector = context.findRuntimeTypeDetectorHandler('objectMap', isSerialize);
    }
    result.push({ subType, detector });
  }

  return result;
}
