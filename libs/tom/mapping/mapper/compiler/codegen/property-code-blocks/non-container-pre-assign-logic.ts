import { TypeSystem } from '@pebula/tom';
import { CompilerPropertyContext, CompilerCodeBlockContext } from '../../compilation';

export function nonContainerPreAssignLogic(ctx: CompilerCodeBlockContext, prop: CompilerPropertyContext) {
  const propMeta = prop.propMapSchema.targetPropMeta;

  if (!propMeta) {
    return ctx;
  }

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

  const defaultValue = propMeta.hasDefaultValue && propMeta.defaultValue() !== undefined
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
          const literal = prop.propMapSchema.targetPropMeta.typeDef as TypeSystem.TomTypeInstance<'literal'>;
          ctx.clone(ifBlock).currentBlock.addAssignment(ctx.targetSetter, `${JSON.stringify(literal.typeParams)}`);
        } else {
          ifBlock.addAssignment(ctx.targetSetter, 'undefined');
        }
      })
    .elseIf()
      .setCondition(`${ctx.sourceAccessor} === null`)
      .use( elseBlock => {
        if (defaultValue) {
          elseBlock.addAssignment(ctx.targetSetter, defaultValue);
        } else if (isLiteral && !propMeta.nullable) {
          const literal = prop.propMapSchema.targetPropMeta.typeDef as TypeSystem.TomTypeInstance<'literal'>;
          ctx.clone(elseBlock).currentBlock.addAssignment(ctx.targetSetter, `${JSON.stringify(literal.typeParams)}`);
        } else {
          elseBlock.addAssignment(ctx.targetSetter, 'undefined');
        }
      }).parent
    .else() // chain the else block forward, so actual value assigning is set inside it

  return ctx.clone(block);
}
