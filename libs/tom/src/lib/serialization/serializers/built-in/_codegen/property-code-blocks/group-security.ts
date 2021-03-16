import { TypeCompiler, CompilerCodeBlockContext, CompilerPropertyContext } from '../../../serializer';
import { MAPPER } from '../../../serializer/compiler';

const groupsParamFn = `_$securityGroupsCheck`;

function _groupValidator(codeContext: CompilerCodeBlockContext, propContext: CompilerPropertyContext) {
  const groups = propContext.propMapSchema.targetPropMeta.groups;
  if (!groups) {
    return codeContext;
  }

  const currentBlock = codeContext.currentBlock;

  if (!propContext.context.getState('groupSecurityRendered')) {
    propContext.context.setState('groupSecurityRendered', true);

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

  const groupsParam = propContext.context.setContextVar(groups);

  return codeContext.clone(
    currentBlock
      .addIfBlock()
        .setCondition(`${groupsParamFn}(${groupsParam}) === true`)
  );

}

/**
 * Inserts JS Builder generated code that validates that the mapping is allowed for the provided group.
 * Code is not added if the `PropertyMappingSchema` does not have groups defined.
 */
export const groupValidator = new TypeCompiler().register(_groupValidator, _groupValidator);
