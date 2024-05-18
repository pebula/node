// tslint:disable: max-classes-per-file
import { ServiceBusClient, ServiceBusReceiver, ServiceBusSessionReceiver, ServiceBusSender } from '@azure/service-bus';
import { SbQueueMetadataOptions, SbSubscriptionMetadataOptions } from '../../interfaces';

class TopicSubscriptionClientContainer {
  readonly receiver: ServiceBusReceiver | ServiceBusSessionReceiver;
  
  public static async create(topic: TopicClientContainer, options: SbSubscriptionMetadataOptions) {
    const { name, receiveMode, sessionOptions, handlerOptions } = options;
    const receiver = sessionOptions
      ? await topic.rxClient.acceptNextSession(topic.name, name, { ...sessionOptions, receiveMode })
      : topic.rxClient.createReceiver(topic.name, name, { ...(handlerOptions || {}), receiveMode });

    return new TopicSubscriptionClientContainer(name, receiver);
  }

  constructor(public readonly name: string, receiver: ServiceBusReceiver | ServiceBusSessionReceiver) {
    this.receiver = receiver;
  }

  async destroy() {
    await this.receiver.close();
  }
}

export class QueueClientContainer {
  sender?: ServiceBusSender;
  receiver?: ServiceBusReceiver | ServiceBusSessionReceiver;

  constructor(public readonly name: string,
              public readonly rxClient: ServiceBusClient,
              public readonly txClient: ServiceBusClient) {
  }

  async getCreateReceiver(options: SbQueueMetadataOptions) {
    if (!this.receiver) {
      const { receiveMode, sessionOptions, handlerOptions } = options;
      this.receiver = sessionOptions
        ? await this.rxClient.acceptNextSession(this.name, { ...sessionOptions, receiveMode })
        : this.receiver = this.rxClient.createReceiver(this.name, { ...(handlerOptions || {}), receiveMode });
    }
    return this.receiver;
  }

  getCreateSender() {
    if (!this.sender) {
      this.sender = this.txClient.createSender(this.name);
    }
    return this.sender;
  }

  async destroy() {
    if (this.sender) {
      await this.sender.close();
    }
    if (this.receiver) {
      await this.receiver.close();
    }
  }
}

export class TopicClientContainer {
  readonly subscriptions = new Map<string, TopicSubscriptionClientContainer>();
  sender?: ServiceBusSender;

  constructor(public readonly name: string,
              public readonly rxClient: ServiceBusClient,
              public readonly txClient: ServiceBusClient) { }

  getCreateSender() {
    if (!this.sender) {
      this.sender = this.txClient.createSender(this.name);
    }
    return this.sender;
  }

  getReceiver(subscriptionName: string): ServiceBusReceiver | ServiceBusSessionReceiver | undefined {
    const subscriber = this.subscriptions.get(subscriptionName);
    if (subscriber) {
      return subscriber.receiver;
    }
  }

  async getCreateReceiver(options: SbSubscriptionMetadataOptions) {
    if (!this.subscriptions.has(options.name)) {
      this.subscriptions.set(options.name, await TopicSubscriptionClientContainer.create(this, options));
    }
    return this.subscriptions.get(options.name).receiver;
  }

  async destroy() {
    if (this.sender) {
      await this.sender.close();
    }
    const subscriptions = Array.from(this.subscriptions.values());
    this.subscriptions.clear();

    for (const client of subscriptions) {
      await client.destroy();
    }
  }
}
