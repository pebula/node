import { LazyInit, Type } from '@pebula/decorate';
import { TypeMapOptions } from '../../../options';
import { getSchema, TomClassSchema } from '../../../schema';
import { transformSchema, tomMapperCompiler, ClassMappingContext } from '../../mapper';
import { PropertyMappingSchema } from '../property-mapping-schema';
import { ClassMappingSchemaFactoryOptions } from './types';


export function runtimeMapper<S, T, F = any>(this: ClassMappingSchema<S, T, F>, input: S, options: TypeMapOptions<S, T, F>, ctx?: ClassMappingContext<S, T>): T  {
  const output = options.target || new this.target();
  return transformSchema(this, input, output, ctx || new ClassMappingContext(input, output, options));
}

export class ClassMappingSchema<S, T, TData = any> {

  readonly targetClassSchema: TomClassSchema<T>;
  readonly sourceClassSchema: TomClassSchema<S>;

  get sourceRecognized(): boolean { return !!this.sourceClassSchema; }
  get targetRecognized(): boolean { return !!this.targetClassSchema; }

  @LazyInit(function(this: ClassMappingSchema<S, T>): (input: S, options: TypeMapOptions<S, T, TData>) => T {
    return this.options.jitCompiler === 'disabled'
      ? runtimeMapper
      : tomMapperCompiler(this)
    ;
  })
  readonly transform: (input: S, options: TypeMapOptions<S, T, TData>, ctx?: ClassMappingContext<S, T>) => T;

  constructor(public readonly source: Type<S>,
              public readonly target: Type<T>,
              public readonly properties: PropertyMappingSchema<S, T>[],
              public readonly options: ClassMappingSchemaFactoryOptions<S, T>,
              public readonly verifyData?: (data: TData, source: S) => boolean | string) {

    this.sourceClassSchema = getSchema(source);
    this.targetClassSchema = getSchema(target);
  }

}
