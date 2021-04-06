import { Code as C, Schema } from '@pebula/tom';
import { PropertySerializerSchema } from '../../../../../serializer-schema';
import { CompilerCodeBlockContext, CompilerPropertyContext, getSerializerContext, SerializerContext, TypeCompilerHandler } from '../../../../serializer';
import { chainBlocks } from '../../../../serializer/compiler';

export function union(ctx: CompilerCodeBlockContext, prop: CompilerPropertyContext) {
  if (!prop.propMapSchema.targetPropMeta.isUnion) {
    throw new Error('Invalid union type');
  }

  const { context, propMapSchema } = prop;
  const serializerContext = getSerializerContext(context.serializer);
  const unionList = prepareUnionTypeList(serializerContext, propMapSchema.targetPropMeta, context.isSerialize);

  const ifBlock = new C.IfBlock(ctx.currentBlock); // We will find out if we use this code or not via `newBlockContext`
  let newBlockContext: CompilerCodeBlockContext<C.ConditionalBlock<C.Block<any>, C.InlineExpression<C.Block<any>>>>;
  for (const { detector, subType } of unionList) {
    newBlockContext = newBlockContext ? newBlockContext.clone(ifBlock.elseIf()) : ctx.clone(ifBlock as C.ConditionalBlock<C.Block<any>>);
    const newPropContext = new CompilerPropertyContext(context, prop.ref, createSubPropertySerializer(propMapSchema, subType));
    const typeDetectorContext = chainBlocks(newBlockContext, newPropContext, detector);
    const typeCompilerHandler = serializerContext.findTypeCompilerHandler(subType.typeDef.type, context.isSerialize);
    chainBlocks(
      typeDetectorContext,
      newPropContext,
      typeCompilerHandler
    );
  }

  if (newBlockContext) {
    const containerData = ctx.getData('parent')?.getData('container');
    if (containerData) {
      const blockElse = ifBlock.else();
      for (const exp of containerData.skipCurrentItemCode()) {
        blockElse.addCodeExpression(exp);
      }
    }

    ctx.currentBlock.add(ifBlock);
  }
}

function prepareUnionTypeList(context: SerializerContext,
                              unionType: Schema.TomPropertySchema,
                              isSerialize: boolean): { subType: Schema.TomPropertySchema, detector: TypeCompilerHandler}[] {
  const { sorted, classLikeProperties } = Schema.determineUnionListResolveOrder(unionType);
  const result: Array<{ subType: Schema.TomPropertySchema, detector: TypeCompilerHandler}> = [];

  for (const subType of sorted) {
    let detector = context.findTypeDetectorCompilerHandler(subType.typeDef.type, isSerialize);
    if (classLikeProperties.length === 1 && classLikeProperties[0] === subType) {
      detector = context.findTypeDetectorCompilerHandler('objectMap', isSerialize);
    }
    result.push({ subType, detector });
  }

  return result;
}

function createSubPropertySerializer(unionType: PropertySerializerSchema<any>, propSchema: Schema.TomPropertySchema): PropertySerializerSchema<any> {
  const subType = new PropertySerializerSchema({}, unionType.prop, unionType.target);
  subType.copyByRef = unionType.copyByRef;
  Object.defineProperty(subType, 'targetPropMeta', { value: propSchema });
  return subType;
}
