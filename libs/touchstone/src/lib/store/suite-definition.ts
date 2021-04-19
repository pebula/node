import { Type, DecoratorInitializer, iterateClassHierarchy } from '@pebula/decorate';
import { MetadataInfo, decoratorStore } from './suite-definition-container';
import {
  SuiteInfo, createSuite,
  CaseInfo, createCases,
  LifeCycleMethodInfo, createLifeCycleMethods,
} from './definitions';

export interface SuiteDefinitions {
  target: Type<any>,
  suite: SuiteInfo | undefined;
  cases: Map<string, CaseInfo>;
  lifeCycle: LifeCycleMethodInfo;
}

export function createSuiteDefinitions(target: Type<any>, metadata: Map<DecoratorInitializer, MetadataInfo[]>): SuiteDefinitions {
  for (const baseTarget of iterateClassHierarchy(target, { emitSelf: false })) {
    decoratorStore.extendDecoratorMetadata(baseTarget, target);
  }

  const suite = createSuite(metadata);
  const suiteDefinitions: SuiteDefinitions = {
    target,
    suite,
    cases: createCases(metadata),
    lifeCycle: createLifeCycleMethods(metadata, 'all'),
  };

  return suiteDefinitions;
}
