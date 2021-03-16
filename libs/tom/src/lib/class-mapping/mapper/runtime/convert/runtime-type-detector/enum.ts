import { TomPropertySchema, TypeSystem } from '../../../../../schema';
import { ClassMappingContext } from '../../../class-mapping-schema-context';
import { mapperRuntimeTypeDetectorRegistry } from '../../mapping';

export function enumRuntimeTypeDetector(v: any, context: ClassMappingContext<any, any>, tProp: TomPropertySchema, sProp: TomPropertySchema) {
  switch (typeof v) {
    case 'number':
    case 'string':
      return (tProp.type as TypeSystem.EnumClassType).records.some( r => r.value === v );
  }
  return false;
}

mapperRuntimeTypeDetectorRegistry.set('enum', enumRuntimeTypeDetector);
