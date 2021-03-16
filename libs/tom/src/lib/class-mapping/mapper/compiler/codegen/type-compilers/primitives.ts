import { TypeSystem } from '../../../../../schema';
import { MapperTypeCompiler, lazySetGlobal, mapperTypeCompilerRegistry } from '../../compilation';
import { BIG_INT_REGEX, directAssign } from './utils';

const bigIntRegex = lazySetGlobal(() => BIG_INT_REGEX);

const NUMBER_FROM_BOOLEAN = new Map<number, boolean>([
  [0, false],
  [1, true],
]);

const STRING_FROM_BOOLEAN = new Map<string, boolean>([
  ['', false],
  ['0', false],
  ['false', false],
  ['1', true],
  ['true', true],
]);

const BOOLEAN_FROM_NUMBER = new Map<boolean, number[]>([
  [false, [0]],
  [true, [1]],
]);

const BOOLEAN_FROM_STRING = new Map<boolean, string[]>([
  [false, ['false', '', '0']],
  [true, ['true', '1']],
]);

export const boolean = new MapperTypeCompiler('boolean')
  .setHandler('boolean', directAssign)
  .setHandler('number', ctx => {
    const switchBlock = ctx.currentBlock.addSwitchBlock(ctx.sourceAccessor);
    for (const [num, bool] of NUMBER_FROM_BOOLEAN) {
      switchBlock.addCase(JSON.stringify(num)).addAssignment(ctx.targetSetter, JSON.stringify(bool));
    }
  })
  .setHandler('string', ctx => {
    const switchBlock = ctx.currentBlock.addSwitchBlock(ctx.sourceAccessor);
    for (const [bool, str] of BOOLEAN_FROM_STRING) {
      switchBlock.addCase(...str.map( s => JSON.stringify(s))).addAssignment(ctx.targetSetter, JSON.stringify(bool));
    }
  })
  .setHandler('literal', (ctx, prop) => {
    const literal = prop.propMapSchema.sourcePropMeta.typeDef as TypeSystem.TomTypeInstance<'literal'>;
    switch (typeof literal.typeParams) {
      case 'boolean':
        ctx.currentBlock
        .addIfBlock()
          .setCondition(`${ctx.sourceAccessor} === ${JSON.stringify(literal.typeParams)}`)
            .addAssignment(ctx.targetSetter, JSON.stringify(literal.typeParams));
        break;
      case 'number':
        if (NUMBER_FROM_BOOLEAN.has(literal.typeParams)) {
          ctx.currentBlock
          .addIfBlock()
            .setCondition(`${ctx.sourceAccessor} === ${JSON.stringify(literal.typeParams)}`)
              .addAssignment(ctx.targetSetter, JSON.stringify(NUMBER_FROM_BOOLEAN.get(literal.typeParams)));
        }
        break;
      case 'string':
        if (STRING_FROM_BOOLEAN.has(literal.typeParams)) {
          ctx.currentBlock
          .addIfBlock()
            .setCondition(`${ctx.sourceAccessor} === ${JSON.stringify(literal.typeParams)}`)
              .addAssignment(ctx.targetSetter, JSON.stringify(STRING_FROM_BOOLEAN.get(literal.typeParams)));
        }
        break;
    }
  });

export const number = new MapperTypeCompiler('number')
  .setHandler('number', directAssign)
  .setHandler('boolean', ctx => {
    const switchBlock = ctx.currentBlock.addSwitchBlock(ctx.sourceAccessor);
    for (const [bool, num] of BOOLEAN_FROM_NUMBER) {
      switchBlock.addCase(JSON.stringify(bool)).addAssignment(ctx.targetSetter, JSON.stringify(num[0]));
    }
  })
  .setHandler('string', ctx => { ctx.currentBlock.addAssignment(ctx.targetSetter, `+${ctx.sourceAccessor}`); })
  .setHandler('date', ctx => { ctx.currentBlock.addAssignment(ctx.targetSetter, `${ctx.sourceAccessor}.valueOf()`); })
  .setHandler('bigInt', ctx => { ctx.currentBlock.addAssignment(ctx.targetSetter, `Number(${ctx.sourceAccessor})`); })
  .setHandler('literal', (ctx, prop) => {
    const literal = prop.propMapSchema.sourcePropMeta.typeDef as TypeSystem.TomTypeInstance<'literal'>;
    switch (typeof literal.typeParams) {
      case 'number':
        ctx.currentBlock
        .addIfBlock()
          .setCondition(`${ctx.sourceAccessor} === ${JSON.stringify(literal.typeParams)}`)
            .addAssignment(ctx.targetSetter, JSON.stringify(literal.typeParams));
        break;
      case 'boolean':
        if (BOOLEAN_FROM_NUMBER.has(literal.typeParams)) {
          ctx.currentBlock
          .addIfBlock()
            .setCondition(`${ctx.sourceAccessor} === ${JSON.stringify(literal.typeParams)}`)
              .addAssignment(ctx.targetSetter, JSON.stringify(BOOLEAN_FROM_NUMBER.get(literal.typeParams)[0]));
        }
        break;
      case 'string':
        const num = +literal.typeParams;
        if (!Number.isNaN(num)) {
          ctx.currentBlock
          .addIfBlock()
            .setCondition(`${ctx.sourceAccessor} === ${JSON.stringify(literal.typeParams)}`)
              .addAssignment(ctx.targetSetter, JSON.stringify(num));
        }
        break;
    }
  });

export const string = new MapperTypeCompiler('string')
  .setHandler('string', directAssign)
  .setHandler('boolean', ctx => {
    const switchBlock = ctx.currentBlock.addSwitchBlock(ctx.sourceAccessor);
    for (const [bool, str] of BOOLEAN_FROM_STRING) {
      switchBlock.addCase(JSON.stringify(bool)).addAssignment(ctx.targetSetter, JSON.stringify(str[0]));
    }
  })
  .setHandler('number', ctx => { ctx.currentBlock.addAssignment(ctx.targetSetter, '`${' + ctx.sourceAccessor + '}`'); })
  .setHandler('date', ctx => { ctx.currentBlock.addAssignment(ctx.targetSetter, `${ctx.sourceAccessor}.toJSON()`); })
  .setHandler('bigInt', ctx => { ctx.currentBlock.addAssignment(ctx.targetSetter, '`${' + ctx.sourceAccessor + '}n`'); })
  .setHandler('literal', (ctx, prop) => {
    const literal = prop.propMapSchema.sourcePropMeta.typeDef as TypeSystem.TomTypeInstance<'literal'>;
    switch (typeof literal.typeParams) {
      case 'string':
        ctx.currentBlock
        .addIfBlock()
          .setCondition(`${ctx.sourceAccessor} === ${JSON.stringify(literal.typeParams)}`)
            .addAssignment(ctx.targetSetter, JSON.stringify(literal.typeParams));
        break;
      case 'number':
        ctx.currentBlock
        .addIfBlock()
          .setCondition(`${ctx.sourceAccessor} === ${JSON.stringify(literal.typeParams)}`)
            .addAssignment(ctx.targetSetter, JSON.stringify(literal.typeParams.toString()));
        break;
      case 'boolean':
        if (BOOLEAN_FROM_STRING.has(literal.typeParams)) {
          ctx.currentBlock
          .addIfBlock()
            .setCondition(`${ctx.sourceAccessor} === ${JSON.stringify(literal.typeParams)}`)
              .addAssignment(ctx.targetSetter, JSON.stringify(BOOLEAN_FROM_STRING.get(literal.typeParams)[0]));
        }
        break;
    }
  });

export const date = new MapperTypeCompiler('date')
  .setHandler('date', directAssign)
  .setHandler('number', ctx => { ctx.currentBlock.addAssignment(ctx.targetSetter, `new Date(${ctx.sourceAccessor})`); })
  .setHandler('string', ctx => { ctx.currentBlock.addAssignment(ctx.targetSetter, `new Date(${ctx.sourceAccessor})`); });

export const bigInt = new MapperTypeCompiler('bigInt')
  .setHandler('bigInt', directAssign)
  .setHandler('number', ctx => { ctx.currentBlock.addAssignment(ctx.targetSetter, `BigInt(${ctx.sourceAccessor})`); })
  .setHandler('string', ctx => {
    let matchParam: string;
    ctx.currentBlock
      .addVariable(true).assignValue(`${ctx.sourceAccessor}.match(${bigIntRegex.globalParamName})`).use(c => matchParam = c.name ).parent
      .addIfBlock()
        .setCondition(`!!${matchParam}`)
          .addAssignment(ctx.targetSetter, `BigInt(${matchParam}[1])`);
  });

mapperTypeCompilerRegistry
    .set(boolean)
    .set(number)
    .set(string)
    .set(date)
    .set(bigInt);
