import { TomPropertySchema, TypeSystem } from '../../../../../schema';
import { ClassMappingContext } from '../../../class-mapping-schema-context';
import { mapperRuntimeTypeDetectorRegistry } from '../../mapping';

export function literal(v: string | number, context: ClassMappingContext<any, any>, tProp: TomPropertySchema, sProp: TomPropertySchema) {
  const literal = tProp.typeDef as TypeSystem.TomTypeInstance<'literal'>;
  return v === literal.typeParams;
}

mapperRuntimeTypeDetectorRegistry.set('literal', literal);
