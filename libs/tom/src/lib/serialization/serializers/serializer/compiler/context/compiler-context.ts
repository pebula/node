import * as C from '../../../../../js-code-builder';
import { isPrimitive } from '../../../../../utils';
import { ClassSerializerSchema, PropertySerializerSchema } from '../../../../serializer-schema';
import { Serializer } from '../../serializer';
import { ROOT } from '../param-names';
import { FnContext } from '../types';
import { GLOBAL } from '../global';
import { CompilerPropertyContext } from './compiler-property-context';

export class CompilerContext<State = any, S extends Serializer = Serializer, T = any> {
  readonly fnContext: FnContext;
  readonly program: C.Program;
  currentBlock: C.Block<C.Block<any>>;

  readonly generator: Generator<CompilerPropertyContext<State, S, T>>

  private propMapSchemas: Array<PropertySerializerSchema<T>>;
  private readonly state: Map<keyof State, any>;

  readonly isSerialize: boolean;
  readonly isDeserialize: boolean;

  get options() { return this.classSerializerSchema.options; }
  get serializer() { return this.classSerializerSchema.serializer; }

  private contextVarRef = 0;
  private readonly reversedFnContext = new Map<unknown, string>();

  private constructor(public readonly classSerializerSchema: ClassSerializerSchema<S, T>, initialState?: State) {
    this.isSerialize = classSerializerSchema.operation === 'serialize';
    this.isDeserialize = !this.isSerialize;

    this.fnContext = new Map<string, unknown>()
      .set(ROOT.GLOBAL_PARAM, GLOBAL)
      .set(ROOT.CLASS_SERIALIZER_SCHEMAS_PARAM, classSerializerSchema)
      .set(ROOT.PROP_SERIALIZER_SCHEMAS_PARAM, this.propMapSchemas = []);

    this.state = new Map<keyof State, any>(Object.entries(initialState || {}) as any);
    this.program = this.currentBlock = new C.Program();
    this.generator =  CompilerContext.iterateProperties(this);
  }

  static create<State = any, S extends Serializer = Serializer, T = any>(classSerializerSchema: ClassSerializerSchema<S, T>, initialState?: State): CompilerContext<State, S, T> {
    return new CompilerContext<State, S, T>(classSerializerSchema, initialState);
  }

  private static *iterateProperties<State = any, S extends Serializer = Serializer, T = any>(context: CompilerContext<State, S, T>): Generator<CompilerPropertyContext<State, S, T>> {
    for (const propMapSchema of context.classSerializerSchema.properties) {
      if (!propMapSchema.ignore) {
        const ref = context.propMapSchemas.push(propMapSchema) - 1;
        yield new CompilerPropertyContext<State, S, T>(context, ref, propMapSchema);
      }
    }
  }

  setState<P extends keyof State>(key: P, value: State[P]) {
    this.state.set(key, value);
  }

  getState<P extends keyof State>(key: P): State[P] | undefined {
    return this.state.get(key);
  }

  setContextVar(value: any): string {
    if (this.reversedFnContext.has(value)) {
      return this.reversedFnContext.get(value);
    } else {
      const varName = `ɵ${this.contextVarRef++}`;
      this.reversedFnContext.set(value, varName);
      this.fnContext.set(varName, value);
      return varName;
    }
  }
}
