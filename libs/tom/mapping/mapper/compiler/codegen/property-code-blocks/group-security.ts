import { MAPPER, CompilerPropertyContext, CompilerCodeBlockContext } from '../../compilation';

const groupsParamFn = `_$securityGroupsCheck`;

/**
 * Inserts JS Builder generated code that validates that the mapping is allowed for the provided group.
 * Code is not added if the `PropertyMappingSchema` does not have groups defined.
 */
export function groupValidator(ctx: CompilerCodeBlockContext, prop: CompilerPropertyContext) {
  const groups = prop.propMapSchema.targetPropMeta?.groups;
  if (!groups) {
    return ctx;
  }

  const currentBlock = ctx.currentBlock;

  if (!prop.context.getState('groupSecurityRendered')) {
    prop.context.setState('groupSecurityRendered', true);

    const groupList = currentBlock.addVariable(true).assignValue(`${MAPPER.OPTIONS_PARAM}.groups`);
    currentBlock
      .addFnBlock(groupsParamFn, 'currGroups')
        .addIfBlock()
          .setCondition(`!${groupList.name}`)
            .addReturnDeclaration('true').parent
        .else()
          .addIfBlock()
            .setCondition(`${groupList.name}.length === 0`)
              .addReturnDeclaration('false').parent
            .else()
              .addForOfBlock('allowedGroup', 'currGroups')
                .addIfBlock()
                  .setCondition(`${groupList.name}.indexOf(allowedGroup) !== -1`)
                    .addReturnDeclaration('true').parent
                .parent // end If
              .parent // end of ForOfBlock
            .parent // end Else block
          .parent // end If
        .parent // End else
      .parent // End If === Function Block
        .addReturnDeclaration('false').parent
  }

  const groupsParam = prop.context.setContextVar(groups);

  return ctx.clone(
    currentBlock
      .addIfBlock()
        .setCondition(`${groupsParamFn}(${groupsParam}) === true`)
  );
}
