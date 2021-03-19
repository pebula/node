import { SbContext } from '../sb-context';

export abstract class InterceptorsConsumer {
  abstract intercept(context: SbContext, next: () => Promise<unknown>): Promise<unknown>;
}
