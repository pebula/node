import {
  ClassifierRecord,
  DecoratedDomain,
  Decorator,
  DecoratorInitializer,
  DecoratorOptions,
  MethodDecoratorArgs,
  MixinFw,
  PropertyDecoratorArgs,
  TargetClassifier,
  Type,
} from '@pebula/decorate';
import { BaseFluentApi } from '../base-api';
import { DECOR_API_TYPE } from '../types';
import { PluginType } from './decorators';
import { invalidDecoratedPluginTarget } from './errors';
import { fromApiClassToDecoratedType } from './utils';

export interface PluginClassifierRecord extends ClassifierRecord<any> {
  decoratorArgs: PropertyDecoratorArgs | MethodDecoratorArgs;
  type: PluginType;
}

export class PluginTargetClassifier extends TargetClassifier<BaseFluentApi, PluginClassifierRecord> {

  private apiPlugins = new Map<DECOR_API_TYPE, Map<string, PluginClassifierRecord>>();

  static create<T extends BaseFluentApi>(target: Type<T>, parent: DecoratedDomain<PluginTargetClassifier>) {
    return new PluginTargetClassifier(target, parent);
  }

  getPlugins(api: DECOR_API_TYPE): Map<string, PluginClassifierRecord> | undefined {
    return this.apiPlugins.get(api);
  }

  protected createRecord(decor: Decorator | DecoratorInitializer<DECOR_API_TYPE>,
                         record: ClassifierRecord<DECOR_API_TYPE>,
                         options?: DecoratorOptions): PluginClassifierRecord {
    const classifier = super.createRecord(decor, record, options);
    classifier.type = options.classifierData.type;

    if (options.allowedScopes?.[0] === 'class' && options.allowedScopes.length === 1 && options.name === 'LazyPluginExtension') {
      const lazyTargetType = classifier.metadata as Type<any>;
      MixinFw.mixIntoClass(lazyTargetType, [classifier.decoratorArgs.classType]);
      TargetClassifier.extendDecoratorMetadata(this, this.parent.getTarget(lazyTargetType));
      return classifier;
    }

    const type = fromApiClassToDecoratedType(record.decoratorArgs.classType);
    if (!type) {
      throw invalidDecoratedPluginTarget(record.decoratorArgs.classType, options.name);
    } else if (type === 'mixin') {
      return classifier;
    }
    let plugins = this.apiPlugins.get(type);
    if (!plugins) {
      this.apiPlugins.set(type, plugins = new Map());
    }
    plugins.set(classifier.decoratorArgs.key as string, classifier);

    return classifier;
  }
}


