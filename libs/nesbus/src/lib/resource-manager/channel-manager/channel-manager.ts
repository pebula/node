import { ServiceBusSender, ServiceBusReceiver, ServiceBusClient, ServiceBusSessionReceiverOptions, ServiceBusSessionReceiver, ServiceBusReceiverOptions } from '@azure/service-bus';

import { SbResourceGroup } from '../resource-group';
import { SbChannelManagerContainerStore } from './channel-manager-container-store';
import { SbQueueMetadataOptions, SbSubscriptionMetadataOptions } from '../../interfaces';

export class SbChannelManager {
  private rxClient: ServiceBusClient;
  private txClient: ServiceBusClient;
  private containers = new SbChannelManagerContainerStore();

  constructor(public readonly resourceGroup: SbResourceGroup) { }

  async destroy() {
    await this.containers.destroy();
    if (this.rxClient) {
      await this.rxClient.close();
    }
    if (this.txClient && this.txClient !== this.rxClient) {
      await this.txClient.close();
    }
  }

  resourceUpdate(): void {
    const { server, client } = this.resourceGroup;

    this.rxClient = server ? server.client : client.client;
    this.txClient = client ? client.client : server.client;
    this.containers.updateClients(this.rxClient, this.txClient);
  }

  getQueryReceiver(name: string): ServiceBusReceiver | ServiceBusSessionReceiver | undefined {
    const queueContainer = this.containers.findQueue(name);
    if (queueContainer) {
      return queueContainer.receiver;
    }
  }

  async getCreateQueueReceiver(options: SbQueueMetadataOptions): Promise<ServiceBusReceiver | ServiceBusSessionReceiver> {
    return this.containers.findQueue(options.name, true).getCreateReceiver(options);
  }

  getQueueSender(name: string): ServiceBusSender | undefined {
    const queueContainer = this.containers.findQueue(name);
    if (queueContainer) {
      return queueContainer.sender;
    }
  }

  getCreateQueueSender(name: string): ServiceBusSender {
    return this.containers.findQueue(name, true).getCreateSender();
  }

  getTopicSender(name: string): ServiceBusSender | undefined {
    const topicContainer = this.containers.findTopic(name);
    if (topicContainer) {
      return topicContainer.sender;
    }
  }

  getCreateTopic(topicName: string): ServiceBusSender {
    return this.containers.findTopic(topicName, true).getCreateSender();
  }

  getSubscription(topicName: string, subscriptionName: string): ServiceBusReceiver | ServiceBusSessionReceiver | undefined {
    const topicContainer = this.containers.findTopic(topicName);
    if (topicContainer) {
      return topicContainer.getReceiver(subscriptionName);
    }
  }

  getCreateSubscription(options: SbSubscriptionMetadataOptions):  Promise<ServiceBusReceiver | ServiceBusSessionReceiver> {
    return this.containers.findTopic(options.topicName, true).getCreateReceiver(options);
  }

}
