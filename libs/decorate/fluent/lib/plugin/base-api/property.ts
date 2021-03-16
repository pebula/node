import { PropertyDecoratorArgs } from '@pebula/decorate';
import { ClassSchema, PropertySchema } from '../../schema';
import { DecorApi } from './base';

export class DecorPropertyApi<TSchema extends PropertySchema = PropertySchema,
                              TClassSchema extends ClassSchema = ClassSchema> extends DecorApi<'property', TSchema, TClassSchema> {
  static schemaFactory(args: PropertyDecoratorArgs): PropertySchema {
    return new PropertySchema(args.key as string);
  }
}
