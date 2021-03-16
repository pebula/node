
import { CompilerCodeBlockContext, CompilerPropertyContext } from '../../../../serializer';
import { JsonSerializer } from '../../json';
import { ARRAY_BUFFER_KEY } from '../utils';

export function typedArraySerialize(ctx: CompilerCodeBlockContext, prop: CompilerPropertyContext<JsonSerializer>) {
  const b = ctx.sourceAccessor;
  ctx.currentBlock
    .addAssignment(ctx.targetSetter, `{ ${ARRAY_BUFFER_KEY}: Buffer.from(${b}.buffer, ${b}.byteOffset, ${b}.byteLength).toString('base64') }`);
}

export function typedArrayDeserialize(ctx: CompilerCodeBlockContext, prop: CompilerPropertyContext<JsonSerializer>) {
  const sBufferKey = JSON.stringify(ARRAY_BUFFER_KEY);
  const type = prop.propMapSchema.targetPropMeta.type
  const typeName = type.name;
  const buf = `${ctx.sourceAccessor}[${sBufferKey}]`;
  ctx.currentBlock
    .addIfBlock()
      .setCondition(`typeof ${ctx.sourceAccessor} === 'object' && ${sBufferKey} in ${ctx.sourceAccessor} && typeof ${buf} === 'string'`)
        .addVariable(true).assignValue(`Buffer.from(${buf}, 'base64')`)
        .use( c => {
          c.parent.addAssignment(ctx.targetSetter, `new ${typeName}(${c.name}.buffer, ${c.name}.byteOffset, ${c.name}.length / ${typeName}.BYTES_PER_ELEMENT)`);
        }).parent
}
