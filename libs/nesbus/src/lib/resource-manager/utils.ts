import { ServiceBusClient } from '@azure/service-bus';
import * as errors from '../errors';
import { SbServer } from '../server';
import { SbServerOptions, SbClientOptions, SbEmitterRef } from '../interfaces';
import { SbConfigurator, createManagementClientAdapter } from '../management';

export function createServiceBusClient(clientOptions: SbServerOptions['client']): ServiceBusClient {
  if ('connectionString' in clientOptions)
    return new ServiceBusClient(clientOptions.connectionString, clientOptions.options)

  if (clientOptions.namespace && clientOptions.credential)
    return new ServiceBusClient(clientOptions.namespace, clientOptions.credential, clientOptions.options);

  throw new Error('Invalid credentials.');
}

export function createServerConnector(config: SbServerOptions) {
  if (!config.client)
    throw errors.invalidOrMissingConfiguration('SbServerOptions.client', 'Connection credentials are mandatory.');

  return {
    client: createServiceBusClient(config.client),
    configurator: config.management
      ? new SbConfigurator(createManagementClientAdapter(config.management), config)
      : undefined
  };
}

export function createClientConnector(config: SbClientOptions, server?: SbServer) {
  if (!server && !config.client) {
    throw errors.invalidOrMissingConfiguration(
      'SbClientOptions.client',
      'Connection credentials are missing and no matching server found for the identity',
    );
  }

  const result: { client: ServiceBusClient, configurator?: SbConfigurator } = {
    client: config.client ? createServiceBusClient(config.client) : server.client,
  };

  if (config.management) {
    const managementClient = createManagementClientAdapter(config.management);
    result.configurator = new SbConfigurator(managementClient, config);
  } else if (server) {
    result.configurator = server.configurator;
  }

  return result;
}

export function isSbEmitterRef(obj: any): obj is SbEmitterRef {
  if ('name' in obj && !('send' in obj)) {
    return true;
  }
}
