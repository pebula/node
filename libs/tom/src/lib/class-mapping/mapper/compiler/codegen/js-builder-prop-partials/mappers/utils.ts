import * as C from '../../../../../../js-code-builder';
import { isPrimitive } from '../../../../../../utils';
import { MAPPER, CompilerPropertyContext, CompilerCodeBlockContext } from '../../../compilation';

/**
 * Returns the code that references the target property.
 * E.G If the target object is "t" and the property is at variable "p" it will return "t[p]" which can be used to compose an assignment instruction ("t[p] = s[key];")
 */
export function targetPropSetRef(propContext: CompilerPropertyContext) {
  return `${MAPPER.OUTPUT_PARAM}.${propContext.propMapSchema.targetKey as string}`;
}

/**
 * Returns source code that will retrieve the value from the source object base on the property map schema
 * Returns undefined when property mapping schema is invalid (should not happen!)
 */
export function getValueFromSourceCode(propContext: CompilerPropertyContext): string | undefined {
  switch (propContext.propMapSchema.valueAccessorType) {
    case 'path':
      return `${MAPPER.INPUT_PARAM}.${propContext.propMapSchema.resolveSourcePath}`;
    case 'fixedValue':
      const mapToValue = propContext.propMapSchema.value;
      return isPrimitive(mapToValue) ? JSON.stringify(mapToValue) : `${propContext.schemaParam('value')}`;
    case 'map':
      return `${propContext.schemaParam('map')}(${MAPPER.CTX_PARAM})`;
  }
}

export function getForListIteration(ctx: CompilerCodeBlockContext, propContext: CompilerPropertyContext, valueCodeGen?: (varName: string) => string) {
  const tMeta = LIST_LIKE_OP_METADATA.get(propContext.propMapSchema.targetPropMeta.reflectedType);
  ctx.currentBlock
    .addVariable(true, `_$col${propContext.ref}`, `${ctx.targetSetter} = ${tMeta.init}`).parent
    .addForOfBlock()
      .setSingleParam()
      .setIterableExpression(generateListLikeIteratorGetter(ctx, propContext))
      .use( c => c.addFnCallExpression(`_$col${propContext.ref}.${tMeta.method}`, valueCodeGen ? valueCodeGen(c.varName) : c.varName) );
}

export function getForMapIteration(ctx: CompilerCodeBlockContext, propContext: CompilerPropertyContext, valueCodeGen?: (varName: string) => string) {
  ctx.currentBlock
    .addVariable(true, `_$col${propContext.ref}`, `${ctx.targetSetter} = new Map()`).parent
    .addForOfBlock()
      .setArraySpreadParam(2)
      .setIterableExpression(generateKeyValueLikeIteratorGetter(ctx, propContext))
      .use( c => {
        const [key, value] = c.varName;
        c.addFnCallExpression(`_$col${propContext.ref}.set`, key, valueCodeGen ? valueCodeGen(value) : value);
      });

}

const LIST_LIKE_OP_METADATA = new Map<any, { init: string; method: string }>([
  [Array, { init: '[]', method: 'push' }],
  [Set, { init: 'new Set()', method: 'add' }],
]);

function generateListLikeIteratorGetter(ctx: CompilerCodeBlockContext, propContext: CompilerPropertyContext) {
  return propContext.analyseContainerType('source') === 'map'
    ? generateKeyValueLikeIteratorGetter(ctx, propContext, 'values')
    : new C.Statement(ctx.currentBlock, ctx.sourceAccessor)
  ;
}

function generateKeyValueLikeIteratorGetter(ctx: CompilerCodeBlockContext,
                                            propContext: CompilerPropertyContext,
                                            which: 'entries' | 'values' | 'keys' = 'entries') {
  const fnCall = new C.FunctionCall(ctx.currentBlock);
  return propContext.propMapSchema.sourcePropMeta?.reflectedType === Map
    ? fnCall.setFunctionName(`${ctx.sourceAccessor}.${which}`)
    : fnCall.setFunctionName(`Object.${which}`).setParams(ctx.sourceAccessor)
  ;
}
