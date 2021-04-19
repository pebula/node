import { Type, DecoratorInitializer, iterateClassHierarchy } from '@pebula/decorate';
import { MetadataInfo, decoratorStore } from './suite-definition-container';
import {
  RunInfo, createRun,
  LifeCycleMethodInfo, createLifeCycleMethods, LifeCycleMethod,
} from './definitions';

export interface RunDefinitions {
  target: Type<any>,
  run: RunInfo | undefined;
  lifeCycle: LifeCycleMethodInfo;
}

export function createRunDefinitions(target: Type<any>, metadata: Map<DecoratorInitializer<any>, MetadataInfo[]>): RunDefinitions {
  for (const baseTarget of iterateClassHierarchy(target, { emitSelf: false })) {
    decoratorStore.extendDecoratorMetadata(baseTarget, target);
  }

  const run = createRun(metadata);
  const runDefinitions: RunDefinitions = {
    target,
    run,
    lifeCycle: createLifeCycleMethods(metadata, 'all'),
  };

  return runDefinitions;
}
