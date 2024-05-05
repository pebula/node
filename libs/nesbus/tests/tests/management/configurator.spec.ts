import { SbServerOptions } from '../../../src';

import { ConfigService, createLogger, createManagement } from '../../__env';
import { createManagementClientAdapter } from '../../../src/lib/management/adapters';
import { SbConfigurator } from '../../../src/lib/management/configurator';

describe('@pebula/nesbus', () => {
  describe('SbConfigurator', () => {
    let counter = 1;
    let configurator: SbConfigurator;

    const createTmpName = () => {
      const tmp = `TEST_QUEUE_${Date.now()}-${counter++}`;
      return tmp;
    }

    jest.setTimeout(10000 * 30);

    beforeAll(() => {

      const config = new ConfigService();

      const serverOptions: SbServerOptions = {
        client: null,
        management: createManagement(config.sbConnection().management, config),
        logger: createLogger('EnvSetup'),
      };

      serverOptions.logger.log('Starting service bus environment testing setup.');
      const managementClient = createManagementClientAdapter(serverOptions.management);
      configurator = new SbConfigurator(managementClient, serverOptions);
    });

    describe('queue', () => {
      it('should verify queue', async () => {
        const result = await configurator.verifyQueue(createTmpName(), 'verify');
        expect(result).toBeFalsy();
      });

      it('should create queue if not exist and verifyCreate', async () => {
        const queueName = createTmpName();
        let result = await configurator.verifyQueue(queueName, 'verify');
        expect(result).toBeFalsy();

        result = await configurator.verifyQueue(queueName, 'verifyCreate');
        expect(result).toBeTruthy();

        await configurator.deleteQueue(queueName);
      });

      it('should delete queue', async () => {
        const queueName = createTmpName();

        let result = await configurator.verifyQueue(queueName, 'verifyCreate');
        expect(result).toBeTruthy();

        await configurator.deleteQueue(queueName);

        result = await configurator.verifyQueue(queueName, 'verify');
        expect(result).toBeFalsy();
      });
    })

    describe('topic', () => {
      it('should verify topic', async () => {
        const result = await configurator.verifyTopic(createTmpName(), 'verify');
        expect(result).toBeFalsy();
      });

      it('should create topic if not exist and verifyCreate', async () => {
        const queueName = createTmpName();
        let result = await configurator.verifyTopic(queueName, 'verify');
        expect(result).toBeFalsy();

        result = await configurator.verifyTopic(queueName, 'verifyCreate');
        expect(result).toBeTruthy();

        await configurator.deleteTopic(queueName);
      });

      it('should delete topic', async () => {
        const queueName = createTmpName();

        let result = await configurator.verifyTopic(queueName, 'verifyCreate');
        expect(result).toBeTruthy();

        let count = 0;
        const deleteTopic = async (wait = 0) => {
          const _deleteTopic = async (): Promise<boolean> => {
            await configurator.deleteTopic(queueName);
            if (await configurator.verifyTopic(queueName, 'verify')) {
              count += 1;
              return count > 5
                ? true
                : await deleteTopic(1000)
              ;
            }
            return false;
          };
          if (wait > 0) {
            return new Promise<boolean>((res, rej) => {
              setTimeout(() => {
                _deleteTopic()
                  .then(res)
                  .catch( err => {
                    if (err.code === 'MessageEntityNotFoundError') {
                      res(false);
                    } else {
                      rej(err);
                    }
                  });
              }, wait);
            });
          } else {
            return await _deleteTopic();
          }
        };

        expect(await deleteTopic()).toBeFalsy();

      });
    })

    describe('subscription', () => {
      it('should verify subscription', async () => {
        expect(await configurator.verifySubscription(createTmpName(), createTmpName(), 'verify')).toBeFalsy();

        const topicName = createTmpName();
        expect(await configurator.verifyTopic(topicName, 'verifyCreate')).toBeTruthy();
        expect(await configurator.verifySubscription(topicName, createTmpName(), 'verify')).toBeFalsy();
        await configurator.deleteTopic(topicName);
      });

      it('should create subscription if not exist and verifyCreate', async () => {
        const topicName = createTmpName();
        expect(await configurator.verifyTopic(topicName, 'verifyCreate')).toBeTruthy();

        const subscriptionName = createTmpName();
        let result = await configurator.verifySubscription(topicName, subscriptionName, 'verify')
        expect(result).toBeFalsy();

        result = await configurator.verifySubscription(topicName, subscriptionName, 'verifyCreate')
        expect(result).toBeTruthy();

        await configurator.deleteSubscription(topicName, subscriptionName);
        await configurator.deleteTopic(topicName);
      });

      it('should delete subscription', async () => {
        const topicName = createTmpName();
        expect(await configurator.verifyTopic(topicName, 'verifyCreate')).toBeTruthy();

        const subscriptionName = createTmpName();
        expect(await configurator.verifySubscription(topicName, subscriptionName, 'verifyCreate')).toBeTruthy();

        let count = 0;
        const deleteSubscription = async (wait = 0) => {
          const _deleteSubscription = async (): Promise<boolean> => {
            await configurator.deleteSubscription(topicName, subscriptionName);
            if (await configurator.verifySubscription(topicName, subscriptionName, 'verify')) {
              count += 1;
              return count > 5
                ? true
                : await deleteSubscription(1000)
              ;
            }
            return false;
          };
          if (wait > 0) {
            return new Promise<boolean>((res, rej) => {
              setTimeout(() => {
                _deleteSubscription()
                  .then(res)
                  .catch( err => {
                    if (err.code === 'MessageEntityNotFoundError') {
                      res(false);
                    } else {
                      rej(err);
                    }
                  });
              }, wait);
            });
          } else {
            return await _deleteSubscription();
          }
        };

        expect(await deleteSubscription()).toBeFalsy();
        await configurator.deleteTopic(topicName);
      });
    })
  });
});
