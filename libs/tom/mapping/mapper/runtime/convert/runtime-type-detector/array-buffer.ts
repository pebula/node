import { mapperRuntimeTypeDetectorRegistry } from '../../mapping';

mapperRuntimeTypeDetectorRegistry.set('arrayBuffer', v => v instanceof ArrayBuffer);
