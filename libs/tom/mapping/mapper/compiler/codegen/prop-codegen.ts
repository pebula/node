import { Utils } from '@pebula/tom';
import { tryFindConverter } from '../../../converters';
import { jitCompilerStrict, unsupportedMappingSource } from '../errors';
import { chainBlocks, CompilerPropertyContext, CompilerCodeBlockContext, mapperTypeCompilerRegistry } from '../compilation';
import {
  nestedTypePropertyMapper,
  directPropertyMapper,
} from './js-builder-prop-partials';
import {
  filterIfKeyExists,
  groupValidator,
  filterIfHasCondition,
  checkCircularRef,
  handleCopyRef,
  nonContainerPreAssignLogic,
} from './property-code-blocks';
import { dynamicPropertyMapper } from './type-compilers';

const BASE_CHAIN = [ filterIfKeyExists, groupValidator, filterIfHasCondition, handleCopyRef, nonContainerPreAssignLogic, checkCircularRef ];

function createJitCompilerStrictError(prop: CompilerPropertyContext) {
  const { typeMapSchema } = prop.context;
  return jitCompilerStrict(typeMapSchema.source, typeMapSchema.target, prop.propMapSchema.targetKey as string);
}

export function generatePropertyMap(context: CompilerCodeBlockContext, prop: CompilerPropertyContext, chain = BASE_CHAIN) {
  const { targetPropMeta } = prop.propMapSchema;

  if (!targetPropMeta && prop.context.isJitCompilerStrict) {
    throw createJitCompilerStrictError(prop);
  }

  return chainBlocks(context, prop, ...chain, (ctx, prop) => {
    const { targetPropMeta } = prop.propMapSchema;

    if (targetPropMeta) {
      const compiler = mapperTypeCompilerRegistry.get(targetPropMeta.typeDef.type);
      if (compiler) {
        const sourcePropMeta = prop.propMapSchema.sourcePropMeta || targetPropMeta;
        const handler = compiler.findHandler(sourcePropMeta);
        if (handler) {
          return handler(ctx, prop);
        } else {
          const sourceWildcardHandler = mapperTypeCompilerRegistry.get(sourcePropMeta.typeDef.type)?.sourceWildcardHandler;
          if (sourceWildcardHandler) {
            return sourceWildcardHandler(ctx, prop);
          }
        }
        const { typeMapSchema } = prop.context;
        throw unsupportedMappingSource(this.type, sourcePropMeta.typeDef.type, typeMapSchema.source, typeMapSchema.target, prop.propMapSchema.targetKey as string);
      } else {
        const { resolvedSourceType } = prop.propMapSchema;
        if (Utils.isPrimitiveType(resolvedSourceType) || tryFindConverter(prop.propMapSchema.targetPropMeta, resolvedSourceType)?.converter) {
          return directPropertyMapper(ctx, prop);
        } else {
          const schema = prop.tryFindClassMappingSchema();
          if (schema) {
            return nestedTypePropertyMapper(ctx, prop);
          } else if (prop.context.isJitCompilerStrict) {
            throw createJitCompilerStrictError(prop);
          }
        }
      }
    }
    return dynamicPropertyMapper(ctx, prop);
  });
}
