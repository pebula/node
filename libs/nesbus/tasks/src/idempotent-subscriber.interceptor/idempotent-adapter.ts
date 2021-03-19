import { SbContext } from '@pebula/nesbus';

export abstract class IdempotentAdapter {
  abstract isIdempotent(ctx: SbContext): Promise<boolean>;
  abstract create(ctx: SbContext): Promise<any>;
  abstract find(ctx: SbContext): Promise<any>;
}
