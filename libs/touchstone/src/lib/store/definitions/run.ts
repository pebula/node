import { DecoratorInitializer, Type } from '@pebula/decorate';
import { TouchStone, TouchStoneMetadataArgs, TouchStoneRun } from '../../decorators';
import { MetadataInfo } from '../suite-definition-container';

export interface RunInfo {
  cls: Type<TouchStoneRun>;
  metadata: TouchStoneMetadataArgs;
}

export function createRun(metadata: Map<DecoratorInitializer<any>, MetadataInfo[]>): RunInfo | undefined {
  if (metadata.has(TouchStone)) {
    const rawInfo = metadata.get(TouchStone)[0];
    return {
      cls: rawInfo.decoratorArgs.target as Type<any>,
      metadata: rawInfo.metadata,
    };
  }
}
