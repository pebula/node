import { TomPropertySchema } from '../../../../../../schema';
import { schemaRegistry } from '../../../../../registry';
import { ClassSerializerContext } from '../../../../serializer';
import { serializeSchema } from '../../../_runtime';
import { transform } from '../../runtime';

export function classConverter(v: any, context: ClassSerializerContext<any>, prop: TomPropertySchema) {
  let schema = schemaRegistry.getOperation(context.schema.serializer, prop.type, context.operation);
  if (!schema) {
    context.schema.serializer.define(prop.type, context.operation).seal();
    schema = schemaRegistry.getOperation(context.schema.serializer, prop.type, context.operation);
  }
  const newValue = context.isSerialize ? { } : new prop.type();
  return serializeSchema(schema, v, newValue, context.createChild(v, newValue), transform);
}
