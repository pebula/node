import { SbClientOptions } from '../../../src/lib/interfaces/options';
export function createSbClientOptions(name: string, connectionString?: string): SbClientOptions {
  return {
    name,
    client: {
      credentials: {
        connectionString: connectionString || process.env.SERVICEBUS_CONNECTION_STRING
      }
    }
  }
}
