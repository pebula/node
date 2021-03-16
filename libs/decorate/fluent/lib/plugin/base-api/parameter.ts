import { ParameterDecoratorArgs } from '@pebula/decorate';
import { ClassSchema, ParameterSchema } from '../../schema';
import { DecorApi } from './base';

export class DecorParameterApi<TSchema extends ParameterSchema = ParameterSchema,
                               TClassSchema extends ClassSchema = ClassSchema> extends DecorApi<'parameter', TSchema, TClassSchema> {
  static schemaFactory(args: ParameterDecoratorArgs): ParameterSchema {
    return new ParameterSchema(args.key as string, args.index);
  }
}
