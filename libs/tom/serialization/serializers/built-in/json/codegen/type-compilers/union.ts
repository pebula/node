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

  // We create an ifBlock but we still don't "commit" it to the current block, we only add it if the for loop hits, i.e. there are items in the union list
  const ifBlock = new C.IfBlock(ctx.currentBlock);
  let newBlockContext: CompilerCodeBlockContext<C.ConditionalBlock<C.Block<any>, C.InlineExpression<C.Block<any>>>>;
  for (const { detector, subType } of unionList) {
    newBlockContext = newBlockContext ? newBlockContext.clone(ifBlock.elseIf()) : ctx.clone(ifBlock as C.ConditionalBlock<C.Block<any>>);
    const newPropContext = new CompilerPropertyContext(context, prop.ref, propMapSchema.createSubPropertySerializer(subType));
    const typeDetectorContext = chainBlocks(newBlockContext, newPropContext, detector);
    const typeCompilerHandler = serializerContext.findTypeCompilerHandler(subType.typeDef.type, context.isSerialize);
    chainBlocks(
      typeDetectorContext,
      newPropContext,
      typeCompilerHandler
    );
  }

  // Now, if we had items, let finalize and "commit"
  if (newBlockContext) {
    // Triggering container code post handling for container types (see `CompilerCodeBlockContextData.containerInUnion` for more info)
    ctx.parent
      ?.getData('containerInUnion')
      ?.handle(ifBlock.else());

    // "commit" code
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
