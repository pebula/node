import { SbManagementClientAdapterFactory, SbManagementClientAdapter, SbServerOptions } from '../interfaces';
import { registerAdapter } from '../management';
import { SbManagementClientAtomAdapter } from './management-client-atom-adapter';

export function register() {
  const factory: SbManagementClientAdapterFactory = {
    supported(): boolean {
      return true;
    },
    create(options: SbServerOptions['management']): SbManagementClientAdapter {
      return new SbManagementClientAtomAdapter(options);
    },
  };
  registerAdapter(factory);
}
