import { TypeSystem } from '@pebula/tom';
import { MapperTypeConverter, MapperTypeConverterHandler, mapperTypeConverterRegistry } from '../../mapping';
import { directAssign } from './utils';

const literalHandler: MapperTypeConverterHandler = (v, ctx, tProp, sProp) => {
  const literal = tProp.typeDef as TypeSystem.TomTypeInstance<'literal'>;
  if (v === literal.typeParams) {
    return v;
  }
};

export const literal = new MapperTypeConverter<'literal', TypeSystem.TomTypesInstanceDataMap['literal']>('literal')
  .setHandler('literal', directAssign)
  .setHandler('boolean', literalHandler)
  .setHandler('number', literalHandler)
  .setHandler('string', literalHandler);

mapperTypeConverterRegistry.set(literal);

