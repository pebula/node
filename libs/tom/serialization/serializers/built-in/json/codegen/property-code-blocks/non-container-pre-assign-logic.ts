import { TypeCompiler, CompilerCodeBlockContext, CompilerPropertyContext } from '../../../../serializer';
import { literalDeserialize } from '../type-compilers';

function _nonContainerPreAssignLogic(ctx: CompilerCodeBlockContext, prop: CompilerPropertyContext) {
  const propMeta = prop.propMapSchema.targetPropMeta;

  // We don't apply reference logic on containers
  if (propMeta.isContainer) {
    return ctx;
  }

  // direct mapping or fixed value does not go through undefined/null checks
  switch (prop.propMapSchema.valueAccessorType) {
    case 'fixedValue':
    case 'map':
      return ctx;
  }

  const defaultValue = propMeta.defaultValue?.() !== undefined
    ? prop.schemaParam('targetPropMeta', 'defaultValue')
    : propMeta.nullable ? 'null' : undefined;

  const isLiteral = propMeta.typeDef.type === 'literal';

  const block = ctx.currentBlock
    .addIfBlock()
      .setCondition(`${ctx.sourceAccessor} === undefined`)
      .use( ifBlock => {
        if (defaultValue) {
          ifBlock.addAssignment(ctx.targetSetter, defaultValue);
        } else if (isLiteral && !propMeta.optional) {
          literalDeserialize(ctx.clone(ifBlock), prop);
        }
      })
    .elseIf()
      .setCondition(`${ctx.sourceAccessor} === null`)
      .use( elseBlock => {
        if (defaultValue) {
          elseBlock.addAssignment(ctx.targetSetter, defaultValue);
        } else if (isLiteral && !propMeta.nullable) {
          literalDeserialize(ctx.clone(elseBlock), prop);
        }
      }).parent
    .else() // chain the else block forward, so actual value assigning is set inside it

  return ctx.clone(block);
}

/**
 * Implements logic applied before assigning the value.
 * This includes undefined/null checks, default value assignment and optional/nullable actions
 *
 * If the property is a container it will not apply logic and will return the block without any code modifications.
 */
export const nonContainerPreAssignLogic = new TypeCompiler().register(_nonContainerPreAssignLogic, _nonContainerPreAssignLogic);

