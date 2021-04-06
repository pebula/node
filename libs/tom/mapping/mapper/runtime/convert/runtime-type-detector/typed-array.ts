import { TypeSystem } from '@pebula/tom';
import { mapperRuntimeTypeDetectorRegistry } from '../../mapping';

for (const [k, typedArrayCtor] of TypeSystem.typedBufferTypeDefMap) {
  mapperRuntimeTypeDetectorRegistry.set(k, v => v instanceof typedArrayCtor);
}
