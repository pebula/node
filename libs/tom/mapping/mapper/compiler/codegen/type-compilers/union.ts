import { Code as C, Schema, TypeSystem } from '@pebula/tom';
import {
  chainBlocks,
  CompilerCodeBlockContext,
  CompilerPropertyContext,
  MapperTypeCompiler,
  mapperTypeCompilerRegistry,
  mapperTypeDetectorCompilerRegistry,
} from '../../compilation';
import { generatePropertyMap } from '../prop-codegen';
import { literalIfMerger } from '../property-code-blocks';

function *traverseUnion<S, T>(sProp: Schema.TomPropertySchema<S>, tProp: Schema.TomPropertySchema<T>) {
  const { sorted, classLikeProperties } = Schema.determineUnionListResolveOrder(tProp);
  const sourceUnionSubTypes = sProp.isUnion
    ? sProp.unionSubTypes.slice()
    : [sProp]
  ;

  const classLike = classLikeProperties.length === 1 ? classLikeProperties[0] : undefined;
  const objectMapTypeDetector = classLike ? mapperTypeDetectorCompilerRegistry.get('objectMap') : undefined;

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
          sSubType,
          tSubType,
          detector: classLike === tSubType ? objectMapTypeDetector : mapperTypeDetectorCompilerRegistry.get(tSubType.typeDef.type),
        };

      }
    }
  }
}

function unionCompiler(ctx: CompilerCodeBlockContext, prop: CompilerPropertyContext, swap = false) {
  const [sourcePropMeta, targetPropMeta] = swap ? [prop.propMapSchema.targetPropMeta, prop.propMapSchema.sourcePropMeta] : [prop.propMapSchema.sourcePropMeta, prop.propMapSchema.targetPropMeta];
  if (!targetPropMeta?.isUnion) {
    throw new Error('Invalid union type');
  }

  // We create an ifBlock but we still don't "commit" it to the current block, we only add it if the for loop hits, i.e. there are items in the union list
  const ifBlock = new C.IfBlock(ctx.currentBlock);
  let newBlockContext: CompilerCodeBlockContext<C.ConditionalBlock<C.Block<any>, C.InlineExpression<C.Block<any>>>>;

  for (const { sSubType, tSubType, detector } of traverseUnion(sourcePropMeta, targetPropMeta)) {
    const childPropMapSchema = prop.propMapSchema.createChild(tSubType, sSubType);
    const newPropContext = new CompilerPropertyContext(
      prop.context,
      prop.ref,
      childPropMapSchema,
      prop.context.setContextVar(childPropMapSchema)
    );

    newBlockContext = newBlockContext ? newBlockContext.clone(ifBlock.elseIf()) : ctx.clone(ifBlock as C.ConditionalBlock<C.Block<any>>);
    const typeDetectorContext = chainBlocks(newBlockContext, newPropContext, detector);

    chainBlocks(
      typeDetectorContext,
      newPropContext,
      (ctx, prop) => literalIfMerger(generatePropertyMap(ctx, prop, []), prop),
    );
  }

  // Now, if we had items, let finalize and "commit"
  if (newBlockContext) {
    // Triggering container code post handling for container types (see `CompilerCodeBlockContextData.containerInUnion` for more info)
    ctx.getData('containerInUnion')
      ?.handle(ifBlock.else());

    // "commit" code
    ctx.currentBlock.add(ifBlock);
  }
}

export const union = new MapperTypeCompiler('union')
  .setDefaultHandler(unionCompiler)
  .setSourceWildcardHandler((ctx, prop) => unionCompiler(ctx, prop, true));

mapperTypeCompilerRegistry.set(union);
