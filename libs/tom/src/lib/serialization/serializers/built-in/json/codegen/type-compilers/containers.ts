import * as C from '../../../../../../js-code-builder';
import { TypeSystem } from '../../../../../../schema';
import { CompilerCodeBlockContext, CompilerPropertyContext, getSerializerContext } from '../../../../serializer';
import { chainBlocks } from '../../../../serializer/compiler';
import * as SHARED_PCB from '../../../_codegen/property-code-blocks';
import * as PCB from '../property-code-blocks';

declare module '../../../../serializer/compiler/context/compiler-code-block-context' {
  export interface CompilerCodeBlockContextData {
    container?: {
      type: TypeSystem.ContainerTypes;
      skipCurrentItemCode(): string[];
    }
  }
}

/**
 * Wrap `checkCircularRef` for array, checking if `checkCircularRef` wrapped the block (there is potential circular ref)
 * If so, we remove that item from the array and update the loop params.
 */
function arrayCircularRefFactory(arrName: string, indexName: string, lenName: string) {
  return (currentContext: CompilerCodeBlockContext, prop: CompilerPropertyContext) => {
    const returnContext = SHARED_PCB.checkCircularRef(currentContext, prop);
    if (returnContext !== currentContext && returnContext.currentBlock instanceof C.IfBlock) {
      returnContext.currentBlock
        .else()
        .addCodeExpression(`${arrName}.splice(${indexName}, 1)`).parent
        .addCodeExpression(`${indexName} -= 1`).parent
        .addCodeExpression(`${lenName} -= 1`).parent
    }
    return returnContext;
  }
}

export function array(ctx: CompilerCodeBlockContext, prop: CompilerPropertyContext) {
  let tempArrName: string;
  ctx.currentBlock
    .addIfBlock()
      .setCondition(new C.IsArrayExpression(ctx.currentBlock, ctx.sourceAccessor))
        .addVariable().assignValue(`${ctx.targetSetter} = ${ctx.sourceAccessor}.slice()`).use( v => tempArrName = v.name).parent
        .addForIndexBlock()
          .setArrayExpression(tempArrName)
          .use( c => {
            const serializerContext = getSerializerContext(prop.context.serializer);
            const typeDef = prop.propMapSchema.targetPropMeta.typeDef.typeParams[0];
            const isSerialize = prop.context.isSerialize;
            const typeCompilerHandler = serializerContext.findTypeCompilerHandler(typeDef.type, isSerialize);

            const newBlockContext = ctx.clone(c, `${tempArrName}[${c.indexName}]`, `${tempArrName}[${c.indexName}]`);
            newBlockContext.setData('container', {
              type: 'array',
              skipCurrentItemCode: () => {
                return [
                  `${tempArrName}.splice(${c.indexName}, 1)`,
                  `${c.lengthVarName} -= 1`,
                  `${c.indexName} -= 1`,
                  `continue`,
                ];
              }
            });

            const newPropContext = new CompilerPropertyContext(prop.context, prop.ref, prop.propMapSchema.subType)
            const propertyCodeBlocks = [SHARED_PCB.handleCopyRef.deserializer, PCB.nonContainerPreAssignLogic.deserializer];
            if (isSerialize) {
              propertyCodeBlocks.push(arrayCircularRefFactory(tempArrName, c.indexName, c.lengthVarName));
            }
            chainBlocks(
              newBlockContext,
              newPropContext,
              ...propertyCodeBlocks,
              typeCompilerHandler
            );
          })
      .parent
    .else()
      .addAssignment(`${ctx.targetSetter}`, `[]`);
}

export function set(ctx: CompilerCodeBlockContext, prop: CompilerPropertyContext) {
  const isSerialize = prop.context.isSerialize;
  if (isSerialize) {
    const v = ctx.currentBlock.addVariable().assignValue(`${ctx.targetSetter} = []`);
    ctx.currentBlock
      .addForOfBlock()
        .setSingleParam()
        .setIterableExpression(ctx.sourceAccessor)
        .use( c => {
          const serializerContext = getSerializerContext(prop.context.serializer);
          const typeDef = prop.propMapSchema.targetPropMeta.typeDef.typeParams[0];
          const typeCompilerHandler = serializerContext.findTypeCompilerHandler(typeDef.type, true);
          const propertyCodeBlocks =[SHARED_PCB.handleCopyRef.serializer, PCB.nonContainerPreAssignLogic.serializer, SHARED_PCB.checkCircularRef];

          const newBlockContext = ctx.clone(c, c.varName, `${v.name}[${v.name}.length]`);
          newBlockContext.setData('container', {
            type: 'set',
            skipCurrentItemCode: () => {
              return [
                `continue`,
              ];
            }
          });

          const newPropContext = new CompilerPropertyContext(prop.context, prop.ref, prop.propMapSchema.subType)
          chainBlocks(
            newBlockContext,
            newPropContext,
            ...propertyCodeBlocks,
            typeCompilerHandler
          );
        });
  } else {
    let tempArrName: string;
    let tempItemName: string;
    ctx.currentBlock
      .addIfBlock()
      .setCondition(new C.IsArrayExpression(ctx.currentBlock, ctx.sourceAccessor))
      .addVariable().assignValue(`${ctx.targetSetter} = new Set()`).use( v => tempArrName = v.name).parent
      .addVariable(false).use( v => tempItemName = v.name).parent
      .addForIndexBlock()
        .setArrayExpression(ctx.sourceAccessor)
        .use( c => {
          const serializerContext = getSerializerContext(prop.context.serializer);
          const typeDef = prop.propMapSchema.targetPropMeta.typeDef.typeParams[0];
          const typeCompilerHandler = serializerContext.findTypeCompilerHandler(typeDef.type, false);

          const propertyCodeBlocks = [SHARED_PCB.handleCopyRef.deserializer, PCB.nonContainerPreAssignLogic.deserializer];

          const newBlockContext = ctx.clone(c, `${ctx.sourceAccessor}[${c.indexName}]`, tempItemName);
          newBlockContext.setData('container', {
            type: 'set',
            skipCurrentItemCode: () => {
              return [
                `continue`,
              ];
            }
          });

          const newPropContext = new CompilerPropertyContext(prop.context, prop.ref, prop.propMapSchema.subType)
          chainBlocks(
            newBlockContext,
            newPropContext,
            ...propertyCodeBlocks,
            typeCompilerHandler
          );

          c.addCodeExpression(`${tempArrName}.add(${tempItemName})`);
        })
        .parent
      .else()
        .addAssignment(`${ctx.targetSetter}`, `new Set()`);
  }
}

export function map(ctx: CompilerCodeBlockContext, prop: CompilerPropertyContext) {
  const isSerialize = prop.context.isSerialize;
  if (isSerialize) {
    const v = ctx.currentBlock.addVariable().assignValue(`${ctx.targetSetter} = {}`);
    ctx.currentBlock
      .addForOfBlock()
        .setArraySpreadParam(2)
        .setIterableExpression(ctx.sourceAccessor)
        .use( c => {
          const serializerContext = getSerializerContext(prop.context.serializer);
          const typeDef = prop.propMapSchema.targetPropMeta.typeDef.typeParams[0];
          const typeCompilerHandler = serializerContext.findTypeCompilerHandler(typeDef.type, true);
          const propertyCodeBlocks = [SHARED_PCB.handleCopyRef.serializer, PCB.nonContainerPreAssignLogic.serializer, SHARED_PCB.checkCircularRef];

          const [keyName, valueName] = c.varName;
          const newBlockContext = ctx.clone(c, valueName, `${v.name}[${keyName}]`);
          newBlockContext.setData('container', {
            type: 'map',
            skipCurrentItemCode: () => {
              return [
                `continue`,
              ];
            }
          });

          const newPropContext = new CompilerPropertyContext(prop.context, prop.ref, prop.propMapSchema.subType)
          chainBlocks(
            newBlockContext,
            newPropContext,
            ...propertyCodeBlocks,
            typeCompilerHandler
          );
        });
  } else {
    let tempArrName: string;
    let tempItemName: string;
    ctx.currentBlock
      .addVariable().assignValue(`${ctx.targetSetter} = new Map()`).use( v => tempArrName = v.name).parent
      .addVariable(false).use( v => tempItemName = v.name).parent
      .addForOfBlock()
        .setArraySpreadParam(2)
        .setIterableExpression(`Object.entries(${ctx.sourceAccessor})`)
        .use( c => {
          const serializerContext = getSerializerContext(prop.context.serializer);
          const typeDef = prop.propMapSchema.targetPropMeta.typeDef.typeParams[0];
          const typeCompilerHandler = serializerContext.findTypeCompilerHandler(typeDef.type, false);

          const propertyCodeBlocks =[SHARED_PCB.handleCopyRef.deserializer, PCB.nonContainerPreAssignLogic.deserializer];

          const [keyName, valueName] = c.varName;
          const newBlockContext = ctx.clone(c, valueName, tempItemName);
          newBlockContext.setData('container', {
            type: 'map',
            skipCurrentItemCode: () => {
              return [
                `continue`,
              ];
            }
          });

          const newPropContext = new CompilerPropertyContext(prop.context, prop.ref, prop.propMapSchema.subType)
          chainBlocks(
            newBlockContext,
            newPropContext,
            ...propertyCodeBlocks,
            typeCompilerHandler
          );

          c.addCodeExpression(`${tempArrName}.set(${keyName}, ${tempItemName})`);
        })
        .parent
  }
}

export function objectMap(ctx: CompilerCodeBlockContext, prop: CompilerPropertyContext) {
  const isSerialize = prop.context.isSerialize;
  let tempArrName: string;
  ctx.currentBlock
    .addVariable().assignValue(`${ctx.targetSetter} = {}`).use( v => tempArrName = v.name).parent
    .addForOfBlock()
      .setArraySpreadParam(2)
      .setIterableExpression(`Object.entries(${ctx.sourceAccessor})`)
      .use( c => {
        const serializerContext = getSerializerContext(prop.context.serializer);
        const typeDef = prop.propMapSchema.targetPropMeta.typeDef.typeParams[0];
        const typeCompilerHandler = serializerContext.findTypeCompilerHandler(typeDef.type, isSerialize);

        const propertyCodeBlocks =[SHARED_PCB.handleCopyRef, PCB.nonContainerPreAssignLogic].map( c => isSerialize ? c.serializer : c.deserializer).filter( c => !!c);
        if (isSerialize) {
          propertyCodeBlocks.push(SHARED_PCB.checkCircularRef);
        }
        const [keyName, valueName] = c.varName;
        const newBlockContext = ctx.clone(c, valueName, `${tempArrName}[${keyName}]`);
        newBlockContext.setData('container', {
          type: 'map',
          skipCurrentItemCode: () => {
            return [
              `continue`,
            ];
          }
        });

        const newPropContext = new CompilerPropertyContext(prop.context, prop.ref, prop.propMapSchema.subType)
        chainBlocks(
          newBlockContext,
          newPropContext,
          ...propertyCodeBlocks,
          typeCompilerHandler
        );
      });
}
