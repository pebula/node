import { Type } from '../../../src';

export class DecorMemberSchema<T = any> {

  reflectedType?: Type<any>;

  constructor(public readonly key: string) {

  }
}
