import { ReceiveMode, Sender } from '@azure/service-bus';
import { Controller, Injectable } from '@nestjs/common';
import { Queue, Ctx, SbContext, QueueEmitter, SbErrorHandler, SbErrorEvent, SbMessageErrorEvent } from '@pebula/nesbus';

import { SbResourceManager } from '../../src/lib/resource-manager/resource-manager';
import * as E from '../../src/lib/errors/index';
import { createSbClientOptions, TestModuleFactory, SUBSCRIBERS, EMITTERS } from '../__env';

class TestErrorHandler extends SbErrorHandler {
  lastError: SbErrorEvent[] = [];
  lastMessageError: SbMessageErrorEvent[] = [];

  async onError(event: SbErrorEvent) {
    this.lastError.push(event);
  }

  async onMessageError(event: SbMessageErrorEvent) {
    this.lastMessageError.push(event);
  }

  reset() {
    this.lastError = [];
    this.lastMessageError = [];
  }
}

describe('@pebula/nesbus', () => {

  it('should throw invalidOrMissingConfiguration', () => {
    const createClient = () => SbResourceManager.get().createClient({ name: 'UNIT_TEST' });
    expect(createClient).toThrow(E.invalidOrMissingConfiguration(
      'SbClientOptions.client',
      'Connection credentials are missing and no matching server found for the identity',
    ));
  });

  it('throw resourceAlreadyExists', () => {
    const createClient = () => SbResourceManager.get().createClient(createSbClientOptions('UNIT_TEST'));
    createClient();
    expect(createClient).toThrow(E.resourceAlreadyExists('client', 'UNIT_TEST'));
  });

  it('invalid handler type', async () => {
    @Controller()
    class ServiceBusController {

      @Queue(SUBSCRIBERS.TEST_QUEUE_3)
      testQueue3 = {} as any;
    }

    expect.assertions(1);

    try {
      await TestModuleFactory.create()
        .addServiceBusModule([{ provide: SbErrorHandler, useClass: TestErrorHandler }], [createSbClientOptions('InvalidHeaderType')])
        .addMetadata({
          controllers: [
            ServiceBusController,
          ],
        })
        .compile()
        .init(4001);
    } catch (err) {
      expect(err.message).toBe(E.invalidSubscriberDecoration('testQueue3', <any> {
        type: 'queue',
        metaOptions: SUBSCRIBERS.TEST_QUEUE_3,
      }).message);
    }

  });

  it('missingSubscriberResource', async () => {
    @Controller()
    class ServiceBusController {

      @Queue<MethodDecorator>({...SUBSCRIBERS.TEST_QUEUE_3, name: 'NOT_EXIST', serverId: 'NOT_THERE', testEnvSetup: { entity: 'queue', setup: false, teardown: false }})
      async testQueue1(@Ctx() context: SbContext) {
      }
    }

    expect.assertions(1);
    try {
      const app = await TestModuleFactory.create()
        .addServiceBusModule([{ provide: SbErrorHandler, useClass: TestErrorHandler }], [createSbClientOptions('MissingSubscriberResource')])
        .addMetadata({
          controllers: [
            ServiceBusController,
          ],
        })
        .compile()
        .init(4001);
      await app.close();
    } catch (err) {
      expect(err.message).toBe(E.missingSubscriberResource({
        type: 'queue',
        metaOptions: {
          name: 'NOT_EXIST',
          serverId: 'NOT_THERE',
          receiveMode: ReceiveMode.peekLock,

        }
      } as any).message);
    }
  });

  it('missingEmitterResource', async () => {
    @Injectable()
    class ServiceBusEmitClient {
      @QueueEmitter({ ...EMITTERS.TEST_QUEUE_1,  name: 'NOT_EXIST', clientId: 'NOT_THERE' })
      testQueue1: Sender;
    }

    expect.assertions(1);
    try {
      const app = await TestModuleFactory.create()
        .addServiceBusModule([{ provide: SbErrorHandler, useClass: TestErrorHandler }], [createSbClientOptions('MissingEmitterResource')])
        .addMetadata({
          providers: [
            ServiceBusEmitClient
          ]
        })
        .compile()
        .init(4001);
      await app.close();
    } catch (err) {
      expect(err.message).toBe(E.missingEmitterResource({
        type: 'queue',
        metaOptions: {
          name: 'NOT_EXIST',
          clientId: 'NOT_THERE',
        }
      } as any).message);
    }
  });
});
