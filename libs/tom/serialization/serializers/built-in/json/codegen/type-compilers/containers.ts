import { Code as C, TypeSystem } from '@pebula/tom';
import { CompilerCodeBlockContext, CompilerPropertyContext, getSerializerContext } from '../../../../serializer';
import { chainBlocks } from '../../../../serializer/compiler';
import * as SHARED_PCB from '../../../_codegen/property-code-blocks';
import * as PCB from '../property-code-blocks';

declare module '../../../../serializer/compiler/context/compiler-code-block-context' {
  export interface CompilerCodeBlockContextData {
    /**
     * While compiling the items in a union list, we go over different types but the "container" types (array, set, map, objectMap) are special.
     * Container types have items added into them, before hand (array) or after the checks (set, map, objectMap)
     * If the object at hand did not hit for the container (it's for another type in the union list) we need to make sure we don't add it
     * If this is the case, the compiler handler for the container will leave a trigger for us which we can check, if it's there we activate it
     * Each container type will be able to add code that handles this scenario, i.e. add code that removes the items or skip adding it.
     */
    containerInUnion?: {
      type: TypeSystem.ContainerTypes;
      handle(block: C.Block<C.Block<any>>): void;
    }
  }
}

/**
 * Returns a code gen block only when the circular reference block has hit.
 * I.E it will return the if block so you can handle `else()`
 */
function addCodeToCircularReferenceHit(fn: (b: C.IfBlock<any>) => void) {
  return (currentContext: CompilerCodeBlockContext, prop: CompilerPropertyContext) => {
    const returnContext = SHARED_PCB.checkCircularRef(currentContext, prop);
    if (returnContext !== currentContext && returnContext.currentBlock instanceof C.IfBlock) {
      fn(returnContext.currentBlock);
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

            // Adding trigger handler code if we're under a union (see `CompilerCodeBlockContextData.containerInUnion` for more info)
            newBlockContext.setData('containerInUnion', {
              type: 'array',
              handle: block => {
                block.addCodeExpression(`${tempArrName}.splice(${c.indexName}, 1)`);
                block.addCodeExpression(`${c.lengthVarName} -= 1`);
                block.addCodeExpression(`${c.indexName} -= 1`);
                block.addCodeExpression(`continue`);
              },
            });

            const newPropContext = new CompilerPropertyContext(prop.context, prop.ref, prop.propMapSchema.subType)
            const propertyCodeBlocks = [SHARED_PCB.handleCopyRef.deserializer, PCB.nonContainerPreAssignLogic.deserializer];
            if (isSerialize) {
              //  Wrap `checkCircularRef` for array, checking if `checkCircularRef` wrapped the block (there is potential circular ref)
              //  If so, we remove that item from the array and update the loop params.
              propertyCodeBlocks.push(addCodeToCircularReferenceHit(b => {
                b.else()
                  .addCodeExpression(`${tempArrName}.splice(${c.indexName}, 1)`).parent
                  .addCodeExpression(`${c.indexName} -= 1`).parent
                  .addCodeExpression(`${ c.lengthVarName} -= 1`).parent
              }));
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

export function tuple(ctx: CompilerCodeBlockContext, prop: CompilerPropertyContext) {
  const { context, propMapSchema } = prop;
  const isSerialize = context.isSerialize;
  const serializerContext = getSerializerContext(context.serializer);
  const subTypes = propMapSchema.targetPropMeta.subTypes;

  ctx.currentBlock
  .addIfBlock()
    .setCondition(new C.IsArrayExpression(ctx.currentBlock, ctx.sourceAccessor))
    .use(block => {
      block.addAssignment(`${ctx.targetSetter}`, `${ctx.sourceAccessor}.slice()`);
      for (let i = 0, len = subTypes.length; i < len; i++) {
        const subType = subTypes[i];
        const newPropContext = new CompilerPropertyContext(context, prop.ref, propMapSchema.createSubPropertySerializer(subType));
        const typeCompilerHandler = serializerContext.findTypeCompilerHandler(subType.typeDef.type, context.isSerialize);
        const propertyCodeBlocks = [SHARED_PCB.handleCopyRef.deserializer, PCB.nonContainerPreAssignLogic.deserializer];

        if (isSerialize) {
          //  Wrap `checkCircularRef` for array, checking if `checkCircularRef` wrapped the block (there is potential circular ref)
          //  If so, we remove that item from the array and update the loop params.
          propertyCodeBlocks.push(addCodeToCircularReferenceHit(b => {
            b.else().addAssignment(`${ctx.targetSetter}[${i}]`, 'undefined');
          }));
        }

        chainBlocks(
          ctx.clone(block, `${ctx.sourceAccessor}[${i}]`, `${ctx.targetSetter}[${i}]`),
          newPropContext,
          ...propertyCodeBlocks,
          typeCompilerHandler
        );
      }
    });
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

          // Adding trigger handler code if we're under a union (see `CompilerCodeBlockContextData.containerInUnion` for more info)
          newBlockContext.setData('containerInUnion', {
            type: 'set',
            handle: block => {
              block.addCodeExpression(`continue`);
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

          // Adding trigger handler code if we're under a union (see `CompilerCodeBlockContextData.containerInUnion` for more info)
          newBlockContext.setData('containerInUnion', {
            type: 'set',
            handle: block => {
              block.addCodeExpression(`continue`);
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

          // Adding trigger handler code if we're under a union (see `CompilerCodeBlockContextData.containerInUnion` for more info)
          newBlockContext.setData('containerInUnion', {
            type: 'map',
            handle: block => {
              block.addCodeExpression(`continue`);
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

          // Adding trigger handler code if we're under a union (see `CompilerCodeBlockContextData.containerInUnion` for more info)
          newBlockContext.setData('containerInUnion', {
            type: 'map',
            handle: block => {
              block.addCodeExpression(`continue`);
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

        // Adding trigger handler code if we're under a union (see `CompilerCodeBlockContextData.containerInUnion` for more info)
        newBlockContext.setData('containerInUnion', {
          type: 'objectMap',
          handle: block => {
            block.addCodeExpression(`continue`);
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
