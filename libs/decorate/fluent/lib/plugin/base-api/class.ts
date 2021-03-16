import { ClassDecoratorArgs, Type } from '@pebula/decorate';
import { ClassSchema } from '../../schema';
import { DecorApi } from './base';

export class DecorClassApi<TSchema extends ClassSchema = ClassSchema> extends DecorApi<'class', TSchema, TSchema> {
  static schemaFactory(args: ClassDecoratorArgs | Type<any>, isAnonymous?: boolean): ClassSchema {
    return new ClassSchema(args instanceof ClassDecoratorArgs ? args.target : args, isAnonymous);
  }
}
