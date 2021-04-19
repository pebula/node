import {
  ClassifierRecord,
  DecoratedDomain,
  Decorator,
  DecoratorInitializer,
  DecoratorOptions,
  TargetClassifier,
  Type,
} from '@pebula/decorate';
import { SuiteMetadataArgs, CaseMetadataArgs } from '../decorators';
import { SuiteDefinitions } from './suite-definition';
import { RunDefinitions } from './run-definition';

export type AllMetadataArgs = SuiteMetadataArgs | CaseMetadataArgs;
export interface MetadataInfo<T extends AllMetadataArgs = AllMetadataArgs> extends ClassifierRecord<T> {
}

export class SuiteDefinitionContainer extends TargetClassifier<MetadataInfo> {
  static create(target: Type<any>, parent: DecoratedDomain<SuiteDefinitionContainer>) {
    return new SuiteDefinitionContainer(target, parent);
  }

  private suiteDefinitions: SuiteDefinitions;
  private runDefinitions: RunDefinitions;

  getSuiteDefs() {
    if (!this.suiteDefinitions) {
      this.suiteDefinitions = require('./suite-definition').createSuiteDefinitions(this.target, this.metadata); //createSuiteDefinitions(this.target ,this.metadata);
    }
    return this.suiteDefinitions;
  }

  getRunDefs() {
    if (!this.runDefinitions) {
      this.runDefinitions = require('./run-definition').createRunDefinitions(this.target, this.metadata); //createSuiteDefinitions(this.target ,this.metadata);
    }
    return this.runDefinitions;
  }

  protected createRecord(decor: Decorator | DecoratorInitializer<AllMetadataArgs>,
                         record: ClassifierRecord<AllMetadataArgs>,
                         options?: DecoratorOptions): MetadataInfo {
    this.runDefinitions = this.suiteDefinitions = undefined;
    const classifier = super.createRecord(decor, record, options);
    return classifier;
  }
}

export const decoratorStore = new DecoratedDomain(SuiteDefinitionContainer);
