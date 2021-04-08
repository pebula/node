import { Code as C, Schema } from '@pebula/tom';
import { ClassValidationSchema } from '../../../../schema/class-validation-schema';
import { Validator } from '../../validator';
import { ValidatorContext, getValidatorContext } from '../../validator-context';
import { ROOT } from '../param-names';
import { FnContext } from '../types';
import { GLOBAL } from '../global';
import { CompilerPropertyContext } from './compiler-property-context';

export class CompilerContext<State = any, S extends Validator = Validator, T = any> {
  readonly fnContext: FnContext;
  readonly program: C.Program;
  currentBlock: C.Block<C.Block<any>>;

  readonly generator: Generator<CompilerPropertyContext<State, S, T>>

  private propSchemas: Array<Schema.TomPropertySchema<T>>;
  private readonly state: Map<keyof State, any>;

  readonly isSerialize: boolean;
  readonly isDeserialize: boolean;

  readonly options: ClassValidationSchema<S, T>['options'];
  readonly validator: S;
  readonly validatorContext: ValidatorContext;

  private contextVarRef = 0;
  private readonly reversedFnContext = new Map<unknown, string>();

  private constructor(public readonly classValidationSchema: ClassValidationSchema<S, T>, initialState?: State) {
    this.options = classValidationSchema.options;
    this.validator = classValidationSchema.validator;
    this.validatorContext = getValidatorContext(this.validator);

    this.fnContext = new Map<string, unknown>()
      .set(ROOT.GLOBAL_PARAM, GLOBAL)
      .set(ROOT.CLASS_VALIDATION_SCHEMAS_PARAM, classValidationSchema)
      .set(ROOT.PROP_VALIDATION_SCHEMAS_PARAM, this.propSchemas = []);

    this.state = new Map<keyof State, any>(Object.entries(initialState || {}) as any);
    this.program = this.currentBlock = new C.Program();
    this.generator =  CompilerContext.iterateProperties(this);
  }

  static create<State = any, S extends Validator = Validator, T = any>(classValidationSchema: ClassValidationSchema<S, T>, initialState?: State): CompilerContext<State, S, T> {
    return new CompilerContext<State, S, T>(classValidationSchema, initialState);
  }

  private static *iterateProperties<State = any, S extends Validator = Validator, T = any>(context: CompilerContext<State, S, T>): Generator<CompilerPropertyContext<State, S, T>> {
    for (const propSchema of context.classValidationSchema.classSchema.getProperties()) {
      const ref = context.propSchemas.push(propSchema) - 1;
      yield new CompilerPropertyContext<State, S, T>(context, propSchema, `${ROOT.PROP_VALIDATION_SCHEMAS_PARAM}[${ref}]`);
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
