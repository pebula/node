import * as C from '../../../../../../js-code-builder';
import { CompilerCodeBlockContext, CompilerPropertyContext } from '../../../../serializer';
import { MAPPER, jitCompilerStrict, setToGlobal } from '../../../../serializer/compiler';
import { transform } from '../../runtime';

export function classCompiler(ctx: CompilerCodeBlockContext, prop: CompilerPropertyContext) {
  let schema = prop.tryFindClassMappingSchema();
  if (!schema) {
    prop.context.serializer
      .define(prop.propMapSchema.targetPropMeta.type, prop.context.classSerializerSchema.operation).seal()
    schema = prop.tryFindClassMappingSchema();
  }
  if (schema) {
    const currentBlock = ctx.currentBlock;
    const childSchema = prop.context.setContextVar(schema);

    const fnCall = new C.FunctionCall(currentBlock)
      .setFunctionName(`${childSchema}.transform`)
      .addParams(ctx.sourceAccessor, MAPPER.OPTIONS_PARAM, MAPPER.CTX_PARAM, MAPPER.LOCK_SYNC);

    currentBlock.addAssignment(ctx.targetSetter, fnCall);

  } else if (prop.context.options.jitCompiler === 'strict') {
    const { classSerializerSchema } = prop.context;
    throw jitCompilerStrict(classSerializerSchema.serializer, classSerializerSchema.target, prop.propMapSchema.prop as string);
  } else {
    return dynamicPropertyMapper(ctx, prop);
  }
}

const DYNAMIC_TRANSFORM_METHOD_PARAM = setToGlobal(transform);

function dynamicPropertyMapper(ctx: CompilerCodeBlockContext, prop: CompilerPropertyContext): CompilerCodeBlockContext {
  const currentBlock = ctx.currentBlock;

  const fnCall = new C.FunctionCall(currentBlock)
    .setFunctionName(DYNAMIC_TRANSFORM_METHOD_PARAM)
    .addParams(
      MAPPER.CTX_PARAM,
      ctx.sourceAccessor,
      prop.schemaParam('targetPropMeta')
    );

  currentBlock.addAssignment(ctx.targetSetter, fnCall);

  if (!prop.context.getState('serializeContextLocation')) {
    prop.context.setState('serializeContextLocation', prop.context.currentBlock);
  }

  return ctx;
}
