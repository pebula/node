import { DecoratorInitializer, MethodDecoratorArgs } from '@pebula/decorate';
import { Case, CaseMetadataArgs } from '../../decorators/case';
import { MetadataInfo } from '../suite-definition-container';
import { isAsyncMethod } from '../utils';

export interface CaseInfo {
  proto: object;
  key: string | symbol;
  method: (...args: any) => any;
  metadata: CaseMetadataArgs;
  isPromise: boolean;
}

function createCaseInfo(rawInfo: MetadataInfo<CaseMetadataArgs>): CaseInfo {
  const { target, key, descriptor } = (rawInfo.decoratorArgs as MethodDecoratorArgs);
  return {
    proto: target,
    key: key as string,
    method: descriptor.value,
    metadata: rawInfo.metadata,
    isPromise: isAsyncMethod(target, key as string),
  };
}

export function createCases(metadata: Map<DecoratorInitializer<any>, MetadataInfo[]>) {
  const rawCases: Array<MetadataInfo<CaseMetadataArgs>> = metadata.get(Case) || [];
  const cases = new Map<string, CaseInfo>()

  for (const c of rawCases) {
    cases.set(c.metadata.name, createCaseInfo(c));
  }

  return cases;
}
