import { Type } from '@pebula/decorate';
import { Constraint } from '../../../constraints';
import { validatorTargetToString } from '../../utils';
import { Validator } from '../validator';

export function jitCompilerStrict(validator: Validator, target: Type<any>, prop: string) {
  const error = new Error(`Class serializer JIT compilation failed because there is no mapping running in "strict" compilation mode. ${validatorTargetToString(validator, target, prop)}`);
  error.name = 'JitCompilerStrict';
  return error;
}
