import { ServiceBusAdministrationClientOptions, ServiceBusClientOptions } from '@azure/service-bus';
import { Injectable } from '@nestjs/common';
import {
  SbManagementDefaultsAdapter,
  SbRuleEntityProvision,
  SbTopicSubscriptionEntityProvision,
  SbRule,
  SbSASCredentials,
  SbTokenCredentials,
} from '@pebula/nesbus';

@Injectable()
export class ConfigService {

  sbClientOptions(): ServiceBusClientOptions | undefined {
    return;
  }

  sbManagementOptions(): ServiceBusAdministrationClientOptions | undefined {
    return;
  }

  sbConnection(): SbSASCredentials | SbTokenCredentials {
    if (process.env.SERVICEBUS_CONNECTION_STRING)
      return { connectionString: process.env.SERVICEBUS_CONNECTION_STRING };

    if (process.env.SERVICEBUS_HOSTNAME)
      return { namespace: process.env.SERVICEBUS_HOSTNAME };

    throw new Error("Invalid TEST configuration, please set one of the following environment variables:\n\n    - SERVICEBUS_CONNECTION_STRING \n\n    - SERVICEBUS_HOSTNAME (for local develoment, identity based authentication)\n");
  }

  sbDefaultsAdapter(): SbManagementDefaultsAdapter {
    function createReceiversRule(subscriptionName: string): SbRule {
      // tslint:disable-next-line: max-line-length
      const sqlExpression = `(NOT EXISTS(Recievers) OR Recievers = '[${subscriptionName}]' OR Recievers LIKE '[${subscriptionName},%' OR Recievers LIKE '%,${subscriptionName},%' OR Recievers LIKE '%,${subscriptionName}]')`;
      return { filter: { sqlExpression } };
    }
    const defaults: SbManagementDefaultsAdapter = {
      entities: {
        queue: {
          deadLetteringOnMessageExpiration: true,
          maxSizeInMegabytes: 1024,
          defaultMessageTimeToLive : 'P14D',
          lockDuration: 'PT5M',
        },
        topic: {
          defaultMessageTimeToLive : 'P14D',
          maxSizeInMegabytes: 1024,
        },
        subscription: {
          deadLetteringOnMessageExpiration: true,
          defaultMessageTimeToLive : 'P14D',
          lockDuration: 'PT5M',
        },
      },
      onNewSubscriptionRules(topicName: string,
                             subscriptionName: string,
                             providedRules: SbRuleEntityProvision[],
                             subscriptionProvision: SbTopicSubscriptionEntityProvision): SbRuleEntityProvision[] {
        return [
          ...providedRules,
          {
            type: subscriptionProvision.type,
            ruleName: `${subscriptionName}_Filter`,
            params: createReceiversRule(subscriptionName),
          },
        ];
      },
    };
  
    return defaults;
  }

}