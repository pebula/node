import { SbServerOptions, SbSubscriberMetadataOptions, SbEmitterMetadataOptions, SbSubscriptionMetadataOptions } from '../../../../src';
import { SbConfigurator } from '../../../../src/lib/management/configurator';
import { createManagementClientAdapter } from '../../../../src/lib/management/adapters';
import { ConfigService } from '../../server/services/config-service';
import { createManagement, createLogger } from '../../server/init/service-bus-setup';
import { EMITTERS, SUBSCRIBERS } from '../../server/service-bus-test-entities';

export async function run() {
  const config = new ConfigService();

  const serverOptions: SbServerOptions = {
    client: null,
    management: createManagement(config),
    logger: createLogger('EnvSetup'),
  };

  serverOptions.logger.log('Starting service bus environment testing setup.');
  const managementClient = createManagementClientAdapter(serverOptions.management);
  const configurator = new SbConfigurator(managementClient, serverOptions);

  const entities = [...Object.values(EMITTERS), ...Object.values(SUBSCRIBERS)] as Array<SbSubscriberMetadataOptions | SbEmitterMetadataOptions>;
  const phase1: Array<Promise<any>> = [];
  const phase2: Array<() => Promise<any>> = [];
  for (const c of entities) {
    if (c.testEnvSetup && c.testEnvSetup.setup) {
      switch (c.testEnvSetup.entity) {
        case 'queue':
          phase1.push(configurator.verifyQueue(c.name, 'verifyCreate'));
          break;
        case 'topic':
          phase1.push(configurator.verifyTopic(c.name, 'verifyCreate'));
          break;
        case 'subscription':
          phase2.push(() => configurator.verifySubscription((c as SbSubscriptionMetadataOptions).topicName, c.name, 'verifyCreate'));
          break;
      }
    }
  }

  if (phase1.length) {
    serverOptions.logger.log('Verifying Topics & Queues');
    await Promise.all(phase1);
  }

  if (phase2.length) {
    serverOptions.logger.log('Verifying Subscriptions');
    await Promise.all(phase2.map(f => f()));
  }
}

