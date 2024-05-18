import { ServiceBusAdministrationClient } from '@azure/service-bus';

import { SbManagementClientAdapter, SbServerOptions } from '../interfaces';
import { SbQueue, SbTopic, SbSubscription, SbRule } from '../models';

export class SbManagementClientAtomAdapter implements SbManagementClientAdapter {
  private readonly managementClient: ServiceBusAdministrationClient;

  constructor(options: SbServerOptions['management']) {
    this.managementClient = 'connectionString' in options
      ? new ServiceBusAdministrationClient(options.connectionString, options.options)
      : new ServiceBusAdministrationClient(options.namespace, options.credential, options.options);
  }

  async getQueue(queueName: string) {
    return this.managementClient.getQueue(queueName);
  }
  async upsertQueue(queueName: string, queue: SbQueue, isNew: boolean) {
    if(isNew) {
      return this.managementClient.createQueue(queueName, queue);
    }

    return this.getQueue(queueName).then(existingQueue => 
      this.managementClient.updateQueue({...existingQueue, ...queue})
    );
  }
  async deleteQueue(queueName: string) {
    await this.managementClient.deleteQueue(queueName);
  }

  async getTopic(topicName: string) {
    return this.managementClient.getTopic(topicName);
  }
  async upsertTopic(topicName: string, topic: SbTopic, isNew: boolean) {
    if(isNew) {
      return this.managementClient.createTopic(topicName, topic);
    }
    
    return this.managementClient.getTopic(topicName).then(existingTopic =>
        this.managementClient.updateTopic({...existingTopic, ...topic})
    );
  }
  async deleteTopic(topicName: string) {
    await this.managementClient.deleteTopic(topicName);
  }

  async getSubscription(topicName: string, subscriptionName: string) {
    return this.managementClient.getSubscription(topicName, subscriptionName);
  }
  async upsertSubscription(topicName: string, subscriptionName: string, subscription: SbSubscription, isNew: boolean) {
    if(isNew) {
      return this.managementClient.createSubscription(topicName, subscriptionName, subscription);
    }
    
    return this.managementClient.getSubscription(topicName, subscriptionName).then(existingSubscription =>
        this.managementClient.updateSubscription({...existingSubscription, ...subscription})
    );
  }
  async deleteSubscription(topicName: string, subscriptionName: string) {
    await this.managementClient.deleteSubscription(topicName, subscriptionName);
  }

  async getRule(topicName: string, subscriptionName: string, ruleName: string) {
    return this.managementClient.getRule(topicName, subscriptionName, ruleName);
  }
  async upsertRule(topicName: string, subscriptionName: string, ruleName: string, rule: SbRule, isNew: boolean) {
    if(isNew) {
      return this.managementClient.createRule(topicName, subscriptionName, ruleName, rule.filter);
    }
    
    return this.getRule(topicName, subscriptionName, ruleName).then(existingRule =>
        this.managementClient.updateRule(topicName, subscriptionName, {...existingRule, ...rule})
    );
  }
  async deleteRule(topicName: string, subscriptionName: string, ruleName: string) {
    await this.managementClient.deleteRule(topicName, subscriptionName, ruleName);
  }
}
