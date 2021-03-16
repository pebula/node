import * as C from '../../../js-code-builder';
import type { ClassSerializerOperations } from '../../registry';
import type { SerializerOptions } from './types';
import type { Serializer } from './serializer';
import type { RuntimeConverterHandler, TypeCompilerHandler } from './serializer-context';

export class TypeCompiler<BIn extends C.Block<C.Block<any>> = C.Block<C.Block<any>>, BOut extends C.Block<C.Block<any>> = C.Block<C.Block<any>>> {
  get serializer() { return this.compilers[0] || this.parent?.serializer; }
  set serializer(compiler: TypeCompilerHandler<BIn, BOut>) { this.compilers[0] = compiler; }

  get deserializer() { return this.compilers[1] || this.parent?.deserializer; }
  set deserializer(compiler: TypeCompilerHandler<BIn, BOut>) { this.compilers[1] = compiler; }

  private compilers: [serialize?: TypeCompilerHandler<BIn, BOut>, deserialize?: TypeCompilerHandler<BIn, BOut>] = [,];

  constructor(private readonly parent?: TypeCompiler<BIn, BOut>) { }

  clone(): TypeCompiler<BIn, BOut> {
    return new TypeCompiler(this);
  }

  register(serialize: TypeCompilerHandler<BIn, BOut>, deserialize: TypeCompilerHandler<BIn, BOut> | true): this {
    this.compilers = [serialize, deserialize === true ? serialize : deserialize];
    return this;
  }
}

export class RuntimeConverter<T = any> {

  get serializer() { return this.converters[0] || this.parent?.serializer; }
  set serializer(converter: RuntimeConverterHandler<T, any>) { this.converters[0] = converter; }

  get deserializer() { return this.converters[1] || this.parent?.deserializer; }
  set deserializer(converter: RuntimeConverterHandler<any, T>) { this.converters[1] = converter; }

  /**
   * Like compilers, but for runtime, instead of creating code they transform on the fly
   * This is will be used when in non-strict mode and there is not JIT compiler available
   */
  private converters: [serialize?: RuntimeConverterHandler<T, any>, deserialize?: RuntimeConverterHandler<any, T>] = [,];

  constructor(private readonly parent?: RuntimeConverter<T>) { }

  clone(): RuntimeConverter<T> {
    return new RuntimeConverter(this);
  }

  register(serialize: RuntimeConverterHandler<T, any>, deserialize: RuntimeConverterHandler<any, T> | true): this {
    this.converters = [serialize, deserialize === true ? serialize : deserialize];
    return this;
  }
}

export class BoundSerializer<S extends Serializer, T = any> {
  constructor(private readonly serializer: S, private readonly schema: ClassSerializerOperations<S, T>) { }

  serialize(input: T, options?: SerializerOptions<T>): any {
    return this.schema.serialize.transform(input, options || {});
  }

  deserialize(input: any, options?: SerializerOptions<T>): T {
    return this.schema.deserialize.transform(input, options || {});
  }
}
