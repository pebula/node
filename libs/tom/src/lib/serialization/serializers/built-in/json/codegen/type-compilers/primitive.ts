import * as C from '../../../../../../js-code-builder';
import { setToGlobal } from '../../../../serializer/compiler';
import { CompilerCodeBlockContext, CompilerPropertyContext } from '../../../../serializer';
import { BIG_INT_REGEX } from '../utils';

const bigIntRegex = {
  regex: '',
  get name(): string {
    return this.regex || (this.regex = setToGlobal(BIG_INT_REGEX));
  }
}

export function booleanDeserialize(ctx: CompilerCodeBlockContext, prop: CompilerPropertyContext) {
  ctx.currentBlock
    .addIfBlock()
      .setCondition(`typeof ${ctx.sourceAccessor} === 'boolean'`)
      .addAssignment(ctx.targetSetter, ctx.sourceAccessor).parent
    .else()
      .addCodeExpression(`if (${ctx.sourceAccessor} === 'true' || ${ctx.sourceAccessor} === '1' || ${ctx.sourceAccessor} === 1) ${ctx.targetSetter} = true;`).parent
      .addCodeExpression(`if (${ctx.sourceAccessor} === 'false' || ${ctx.sourceAccessor} === '0' || ${ctx.sourceAccessor} === 0) ${ctx.targetSetter} = false;`).parent
    .parent // end else Block
    .parent // end if block
}

export function numberDeserialize(ctx: CompilerCodeBlockContext, prop: CompilerPropertyContext) {
  const ternaryExpression = new C.TernaryExpression(ctx.currentBlock)
    .setCondition(`typeof ${ctx.sourceAccessor} === 'number'`)
    .true(ctx.sourceAccessor)
    .false(`+${ctx.sourceAccessor}`)
  ctx.currentBlock.addAssignment(ctx.targetSetter, ternaryExpression);
}

export function stringDeserialize(ctx: CompilerCodeBlockContext, prop: CompilerPropertyContext) {
  const ternaryExpression = new C.TernaryExpression(ctx.currentBlock)
    .setCondition(`typeof ${ctx.sourceAccessor} === 'string'`)
    .true(ctx.sourceAccessor)
    .false('`${' + ctx.sourceAccessor + '}`')
  ctx.currentBlock.addAssignment(ctx.targetSetter, ternaryExpression);
}


export function dateSerialize(ctx: CompilerCodeBlockContext, prop: CompilerPropertyContext) {
  ctx.currentBlock.addAssignment(ctx.targetSetter, `${ctx.sourceAccessor}.toJSON()`);
}

export function dateDeserialize(ctx: CompilerCodeBlockContext, prop: CompilerPropertyContext) {
  ctx.currentBlock.addAssignment(ctx.targetSetter, `new Date(${ctx.sourceAccessor})`);
}


export function bigIntSerialize(ctx: CompilerCodeBlockContext, prop: CompilerPropertyContext) {
  ctx.currentBlock.addAssignment(ctx.targetSetter, '`${' + ctx.sourceAccessor + '}n`');
}

export function bigIntDeserialize(ctx: CompilerCodeBlockContext, prop: CompilerPropertyContext) {
  let matchParam: string;
  ctx.currentBlock
    .addIfBlock()
      .setCondition(`typeof ${ctx.sourceAccessor} === 'number'`)
        .addAssignment(ctx.targetSetter, `BigInt(${ctx.sourceAccessor})`).parent
    .elseIf()
      .setCondition(`typeof ${ctx.sourceAccessor} === 'string'`)
        .addVariable(true).assignValue(`${ctx.sourceAccessor}.match(${bigIntRegex.name})`).use(c => matchParam = c.name ).parent
        .addIfBlock()
          .setCondition(`!!${matchParam}`)
            .addAssignment(ctx.targetSetter, `BigInt(${matchParam}[1])`);
}
