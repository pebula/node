import { Type, stringify } from '@pebula/decorate';
import type { Enum } from '../../schema/type-system/enum';

export function schemaEnumAndTypeMismatch(classType: Type<any> | Function, propType: Type<any> | Function, enumType: Enum, propertyName: string) {
  const error = new Error(`Invalid property schema configuration in ${stringify(classType)}.${propertyName}, 'type' & 'enum' are declared on the same schema, please set one of them.`);
  error.name = 'SchemaEnumAndTypeMismatch';
  return error;
}
