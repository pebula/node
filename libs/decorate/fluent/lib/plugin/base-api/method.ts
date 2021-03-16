import { MethodDecoratorArgs } from '@pebula/decorate';
import { ClassSchema, MethodSchema } from '../../schema';
import { DecorApi } from './base';

export class DecorMethodApi<TSchema extends MethodSchema = MethodSchema,
                            TClassSchema extends ClassSchema = ClassSchema> extends DecorApi<'method', TSchema, TClassSchema> {
  static schemaFactory(args: MethodDecoratorArgs): MethodSchema {
    return new MethodSchema(args.key as string);
  }
}
