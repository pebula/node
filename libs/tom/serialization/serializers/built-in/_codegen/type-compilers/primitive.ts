import { stringify } from '@pebula/decorate';
import { CompilerCodeBlockContext, CompilerPropertyContext } from '../../../serializer';

export function passthrough(ctx: CompilerCodeBlockContext, prop: CompilerPropertyContext) {
  ctx.currentBlock.addAssignment(ctx.targetSetter, ctx.sourceAccessor);
}

export function exclude(ctx: CompilerCodeBlockContext, prop: CompilerPropertyContext) {
  const schema = prop.context.classSerializerSchema;
  ctx.currentBlock.addCodeExpression(`// Type converter excluded ${schema.operation} in "${stringify(schema.target)}.${prop.propMapSchema.prop as string}" for type ${prop.propMapSchema.targetPropMeta.typeDef.type}`);
}

