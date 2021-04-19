import { DecoratorInitializer, Type } from '@pebula/decorate';
import { Suite, SuiteMetadataArgs } from '../../decorators/suite';
import { MetadataInfo } from '../suite-definition-container';

export interface SuiteInfo {
  cls: Type<any>;
  metadata: SuiteMetadataArgs;
}

export function createSuite(metadata: Map<DecoratorInitializer<any>, MetadataInfo[]>): SuiteInfo | undefined {
  if (metadata.has(Suite)) {
    const rawInfo = metadata.get(Suite)[0];
    return {
      cls: rawInfo.decoratorArgs.target as Type<any>,
      metadata: rawInfo.metadata,
    };
  }
}
