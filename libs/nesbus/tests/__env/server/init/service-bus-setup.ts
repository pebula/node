import { Provider } from '@nestjs/common/interfaces';
import { DefaultAzureCredential } from '@azure/identity'

import { ServiceBusModule, SbServerOptions, SbModuleRegisterOptions } from '@pebula/nesbus';
import { NoopLogger } from '../../../../src/lib/noop-logger';

import { ConfigService } from '../services';
import { SbClientOptions } from '@pebula/nesbus/src/lib/interfaces';

export function createLogger(name: string) {
  // return new Logger(name);
  return {
    log: msg => console.log(`[${name}]: ${msg}`),
    error: msg => console.error(`[${name}]: ${msg}`),
    warn: msg => console.warn(`[${name}]: ${msg}`),
    debug: msg => console.log(`[${name}]: ${msg}`),
    verbose: msg => console.log(`[${name}]: ${msg}`),
  };
}

export function createClient(config: ConfigService): SbServerOptions['client'] {
  const creds = config.sbConnection();
  const options = config.sbClientOptions();

  if ('connectionString' in creds) {
    return { connectionString: creds.connectionString, options };
  } else {
    return  {
      namespace: creds.namespace,
      credential: creds.credential || new DefaultAzureCredential(),
      options,
    };
  }
}

export function createManagement(config: ConfigService): SbServerOptions['management'] {
  const creds = config.sbConnection();
  const options = config.sbManagementOptions();
  const defaults = config.sbDefaultsAdapter();
  if ('connectionString' in creds) {
    return { connectionString: creds.connectionString, options, defaults };
  } else {
    return  {
      namespace: creds.namespace,
      credential: creds.credential || new DefaultAzureCredential(),
      options,
      defaults,
    };
  }
}

export function createServerOptions(config: ConfigService) {
  const sbServerOptions: SbServerOptions = {
    client: createClient(config),
    management: createManagement(config),
    registerHandlers: 'sequence',
    logger: NoopLogger.shared, // createLogger('SbServer: default'),
  };
  return [ sbServerOptions ];
}

export function createServiceBusModule(providers: Provider[], clientOptions?: SbClientOptions[]) {
  if (!clientOptions)
    clientOptions = [];
  if (clientOptions.length === 0) 
    clientOptions.push({
      logger: NoopLogger.shared, // createLogger('SbClient: default'),
    });

  return ServiceBusModule.register({
    servers: {
      useFactory: createServerOptions,
      inject: [ConfigService],
    },
    clients: clientOptions,
    providers,
  });
}
