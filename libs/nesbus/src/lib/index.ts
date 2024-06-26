import './atom-adapter';
import { register } from './atom-adapter';

export { SbContext, SbContextArgs } from './sb-context';

export {
  SbSASCredentials,
  SbTokenCredentials,

  SbModuleRegisterOptions,
  SbServerOptions,
  SbManagementDefaultsAdapter,

  // Emitter Metadata
  SbEmitterMetadataOptions,
  SbQueueEmitterMetadataOptions,
  SbTopicMetadataOptions,
  SbEmitterRef, SbEmitterImp,

  // Subscriber Metadata
  SbSubscriberMetadataOptions,
  SbQueueMetadataOptions,
  SbSubscriptionMetadataOptions,

  SbInterceptor,

  SbEntityProvisionOption,
  SbQueueEntityProvision,
  SbTopicEntityProvision,
  SbTopicSubscriptionEntityProvision,
  SbRuleEntityProvision,

  MetaOrMetaFactory,
  SbMessageEmitter,
} from './interfaces';

export {
  SbQueue,
  SbTopic,
  SbSubscription,
  SbRule,
  SbCorrelationFilter,
  SbSqlFilter,
} from './models';

export {
  Queue, Subscription, SbIntercept,
  QueueEmitter, Topic,
} from './decorators';

export { createSbServer } from './create-sb-server';
export { ServiceBusModule } from './service-bus.module';

export { Ctx, Payload } from '@nestjs/microservices';

export { SbErrorHandler, SbErrorEvent, SbMessageErrorEvent } from './error-handling';

register();
