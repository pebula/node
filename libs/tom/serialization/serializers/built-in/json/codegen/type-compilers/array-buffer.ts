
import { CompilerCodeBlockContext, CompilerPropertyContext } from '../../../../serializer';
import { JsonSerializer } from '../../json';
import { ARRAY_BUFFER_KEY } from '../utils';

export function arrayBufferSerialize(ctx: CompilerCodeBlockContext, prop: CompilerPropertyContext<JsonSerializer>) {
  ctx.currentBlock
    .addAssignment(ctx.targetSetter, `{ ${ARRAY_BUFFER_KEY}: Buffer.from(${ctx.sourceAccessor}).toString('base64') }`);
}

export function arrayBufferDeserialize(ctx: CompilerCodeBlockContext, prop: CompilerPropertyContext<JsonSerializer>) {
  const sBufferKey = JSON.stringify(ARRAY_BUFFER_KEY);
  ctx.currentBlock
    .addIfBlock()
      .setCondition(`typeof ${ctx.sourceAccessor} === 'object' && ${sBufferKey} in ${ctx.sourceAccessor} && typeof ${ctx.sourceAccessor}[${sBufferKey}] === 'string'`)
        .addVariable(true).assignValue(`Buffer.from(${ctx.sourceAccessor}[${sBufferKey}], 'base64')`)
        .use( c => {
          c.parent.addAssignment(ctx.targetSetter, `${c.name}.buffer.slice(${c.name}.byteOffset, ${c.name}.byteOffset + ${c.name}.byteLength)`);
        }).parent
    // .else()
    //   .addAssignment(ctx.targetSetter, `new ArrayBuffer()`);
}
