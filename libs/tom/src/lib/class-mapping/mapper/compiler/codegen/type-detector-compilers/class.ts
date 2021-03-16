import * as C from '../../../../../js-code-builder';
import { getSchema } from '../../../../../schema';
import { CompilerCodeBlockContext, CompilerPropertyContext, mapperTypeDetectorCompilerRegistry } from '../../compilation';
import { invalidDiscriminatorError } from '../../errors';

export function classTypeDetectorCompiler(ctx: CompilerCodeBlockContext<C.ConditionalBlock<any>>, prop: CompilerPropertyContext) {
  /** We don't need the discriminator here, if the source value is an instance of the source property, it's a match */
  const propClassVar = prop.context.setContextVar(prop.propMapSchema.targetPropMeta.type);
  const block = ctx.currentBlock.setCondition(`${ctx.sourceAccessor} instanceof ${propClassVar}`);
  return ctx.clone(block);

  // const propMeta = prop.propMapSchema.targetPropMeta;
  // const classSchema = getSchema(propMeta.type);
  // const { discriminator } = classSchema;

  // if (discriminator) {
  //   const discriminatorValue = discriminator.typeDef.type === 'literal' ? discriminator.typeDef.typeParams : discriminator.defaultValue?.();
  //   if (discriminatorValue === undefined) {
  //     throw invalidDiscriminatorError(prop.propMapSchema.sourcePropMeta.type, classSchema.type, discriminator.name as string);
  //   }
  //   const block = ctx.currentBlock.setCondition(`${ctx.sourceAccessor}.${discriminator.name as string} === ${JSON.stringify(discriminatorValue)}`);
  //   return ctx.clone(block);
  // } else {
  //   const propClassVar = prop.context.setContextVar(propMeta.type);
  //   const block = ctx.currentBlock.setCondition(`${ctx.sourceAccessor} instanceof ${propClassVar}`);
  //   return ctx.clone(block);
  // }
}

mapperTypeDetectorCompilerRegistry
  .set('class', classTypeDetectorCompiler);
