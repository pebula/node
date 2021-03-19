import { SbManagementClientAdapterFactory, SbManagementClientAdapter } from '../src/lib/interfaces';
import { registerAdapter } from '../src/lib/management';
import { SbManagementClientArmOptions, SbManagementClientArmAdapter } from './management-client-arm-adapter';

declare module '../src/lib/interfaces/management' {
  export interface SbManagementClientOptions {
    arm: SbManagementClientArmOptions;
  }
}

const MUST_HAVE_CREDENTIALS_KEYS = [
  'resourceGroupName',
  'namespace',
  'subscriptionId',
];

export function registerArmAdapter() {
  const factory: SbManagementClientAdapterFactory = {
    supported(options: SbManagementClientArmOptions): boolean {
      const { credentials } = options;
      if (credentials && MUST_HAVE_CREDENTIALS_KEYS.every( k => !!credentials[k] )) {
        return !!credentials.credentials;
      }
      return false;
    },
    create(options: SbManagementClientArmOptions): SbManagementClientAdapter {
      return new SbManagementClientArmAdapter(options);
    },
  };
  registerAdapter(factory);
}

export { SbManagementClientArmOptions } from './management-client-arm-adapter';
