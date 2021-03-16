import * as C from '../../../../../js-code-builder';
import { PropertyMappingSchema, ClassMappingSchema } from '../../../../mapping-schema';
import { ROOT } from '../param-names';
import { GLOBAL } from '../global';
import { CompilerPropertyContext } from './compiler-property-context';
import { CompilerContextState } from './compiler-context-state';

export type FnContext = Map<string, unknown>;

export class CompilerContext<State = CompilerContextState, S = any, T = any> {
  readonly fnContext: FnContext;
  readonly program: C.Program;
  currentBlock: C.Block<C.Block<any>>;

  readonly generator: Generator<CompilerPropertyContext<State, S, T>>

  // TODO: Lazy
  get isJitCompilerStrict() { return this.typeMapSchema.options.jitCompiler === 'strict';}

  private propMapSchemas: Array<PropertyMappingSchema<S, T>>;
  private readonly state: Map<keyof State, any>;

  private contextVarRef = 0;
  private readonly reversedFnContext = new Map<unknown, string>();

  private constructor(public readonly typeMapSchema: ClassMappingSchema<S, T>, initialState?: State) {
    this.fnContext = new Map<string, unknown>()
      .set(ROOT.GLOBAL_PARAM, GLOBAL)
      .set(ROOT.TYPE_MAP_SCHEMAS_PARAM, typeMapSchema)
      .set(ROOT.PROP_MAP_SCHEMAS_PARAM, this.propMapSchemas = []);

    this.state = new Map<keyof State, any>(Object.entries(initialState || {}) as any);
    this.program = this.currentBlock = new C.Program();
    this.generator =  CompilerContext.iterateProperties(this);
  }

  static create<State = any, S = any, T = any>(typeMapSchema: ClassMappingSchema<S, T>, initialState?: State): CompilerContext<State, S, T> {
    return new CompilerContext<State, S, T>(typeMapSchema, initialState);
  }

  private static *iterateProperties<State = any, S = any, T = any>(context: CompilerContext<State, S, T>): Generator<CompilerPropertyContext<State, S, T>> {
    for (const propMapSchema of context.typeMapSchema.properties) {
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
