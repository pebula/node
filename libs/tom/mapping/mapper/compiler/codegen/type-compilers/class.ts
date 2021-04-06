import { Code as C } from '@pebula/tom';
import { ClassMappingSchemaFactory } from '../../../../mapping-schema';
import { MAPPER, MapperTypeCompiler, mapperTypeCompilerRegistry } from '../../compilation';
import { jitCompilerStrict } from '../../errors';
import { dynamicPropertyMapper } from './utils';

export const classCompiler = new MapperTypeCompiler('class')
  .setHandler('class', (ctx, prop) => {
    let schema = prop.tryFindClassMappingSchema();
    if (!schema && prop.propMapSchema.targetPropMeta.reflectedType === prop.propMapSchema.sourcePropMeta?.reflectedType) {
      ClassMappingSchemaFactory.autoDefineSelf(prop.propMapSchema.targetPropMeta.type).seal();
      schema = prop.tryFindClassMappingSchema();
    }
    if (schema) {
      const currentBlock = ctx.currentBlock;

      const childSchema = prop.context.setContextVar(schema);

      const fnCall = new C.FunctionCall(currentBlock)
        .setFunctionName(`${childSchema}.transform`)
        .addParams(ctx.sourceAccessor, MAPPER.OPTIONS_PARAM, MAPPER.CTX_PARAM, MAPPER.LOCK_SYNC);

      currentBlock.addAssignment(ctx.targetSetter, fnCall);

    } else if (prop.context.isJitCompilerStrict) {
      const { typeMapSchema } = prop.context;
      throw jitCompilerStrict(typeMapSchema.source, typeMapSchema.target, prop.propMapSchema.targetKey as string);
    } else {
      return dynamicPropertyMapper(ctx, prop);
    }
  });

mapperTypeCompilerRegistry.set(classCompiler);
