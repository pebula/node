import { Schema, TypeSystem } from '@pebula/tom';
import { ClassMappingContext } from '../../../class-mapping-schema-context';
import { mapperRuntimeTypeDetectorRegistry } from '../../mapping';

export function literal(v: string | number, context: ClassMappingContext<any, any>, tProp: Schema.TomPropertySchema, sProp: Schema.TomPropertySchema) {
  const literal = tProp.typeDef as TypeSystem.TomTypeInstance<'literal'>;
  return v === literal.typeParams;
}

mapperRuntimeTypeDetectorRegistry.set('literal', literal);
