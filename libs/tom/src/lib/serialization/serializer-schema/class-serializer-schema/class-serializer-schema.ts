import { Type } from '@pebula/decorate';
import { getSchema, TomClassSchema } from '../../../schema';
import { getSerializerContext, Serializer, SerializerOptions, ClassSerializerContext } from '../../serializers';
import { compileClassSerializer } from '../../serializers/serializer/compiler/serializer-compiler';
import { PropertySerializerSchema } from '../property-serializer-schema';
import { SerializerOp } from '../../types';

export type SerializeTransformFn<TOp extends SerializerOp, T = any> = (this: ClassSerializerSchema<Serializer, T, TOp>,
                                                                       input: TOp extends 'serialize' ? T : object,
                                                                       options: SerializerOptions<T>,
                                                                       ctx?: ClassSerializerContext<T>,
                                                                       lockSync?: any[]) => TOp extends 'serialize' ? object : T;

export class ClassSerializerSchema<S extends Serializer, T, TOp extends SerializerOp = SerializerOp, TData = any> {

  readonly classSchema: TomClassSchema<T>;

  private _transform: SerializeTransformFn<TOp, T>;

  constructor(public readonly serializer: S,
              public readonly target: Type<T>,
              public readonly properties: PropertySerializerSchema<T>[],
              public readonly operation: TOp,
              public readonly options: S extends Serializer<infer U> ? U : never) {
    this.classSchema = getSchema(target);
  }

  transform(input: TOp extends 'serialize' ? T : object,
            options: SerializerOptions<T, TData>,
            ctx?: ClassSerializerContext<T>,
            lockSync?: any[]): TOp extends 'serialize' ? object : T {
    if (!this._transform) {
      this._transform = this.options.jitCompiler === 'disabled'
        ? getSerializerContext(this.serializer).runtimeTransform[this.operation] as SerializeTransformFn<TOp>
        : compileClassSerializer(this)
      ;
    }
    return this._transform(input, options, ctx, lockSync);
  }
}
