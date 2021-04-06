import { Type } from '@pebula/decorate';
import { serializerTargetToString } from '../../../utils';
import { Serializer } from '../serializer';

export function jitCompilerStrict(serializer: Serializer, target: Type<any>, prop: string) {
  const error = new Error(`Class serializer JIT compilation failed because there is no mapping running in "strict" compilation mode. ${serializerTargetToString(serializer, target, prop)}`);
  error.name = 'JitCompilerStrict';
  return error;
}
