import { Code as C, TypeSystem } from '@pebula/tom';
import { SchemaValidationFn, PropertyValidationFn } from '../../schema';
import type { Validator } from './validator';
import type { CompilerContext } from './compiler/context';
import { ValidatorCompiler, TypeValidatorCompiler, TypeRuntimeValidator } from './validator-components';

export type FnInitCompilerHandler<S extends Validator, T = any> = (block: C.Block<C.Block<any>>, context: CompilerContext<any, S, T>) => void

export class ValidatorContext<V extends Validator = Validator> {
  fnInitCompiler?: FnInitCompilerHandler<V, any>
  fnDisposeCompiler?: FnInitCompilerHandler<V, any>

  /** Property code block, used before the assignment expression to support logical flow, preparation and other things required. */
  readonly propertyBlockCompilers: ValidatorCompiler[];
  readonly validatorCompilers: Map<TypeSystem.TypeDef, TypeValidatorCompiler>;
  readonly runtimeValidators: Map<TypeSystem.TypeDef, TypeRuntimeValidator<V>>;

  readonly runtimeRootValidators: { schema: SchemaValidationFn; property: PropertyValidationFn; };

  constructor(public readonly validator: Validator, parent?: ValidatorContext<V>) {
    validator[VALIDATOR_CONTEXT] = this;
    this.propertyBlockCompilers = parent?.propertyBlockCompilers.map( p => p.clone() ) ?? [];
    this.validatorCompilers = new Map<TypeSystem.TypeDef, TypeValidatorCompiler>(Array.from(parent?.validatorCompilers.entries() ?? []).map(([t, c]) => [t, c.clone()]));
    this.runtimeValidators = new Map<TypeSystem.TypeDef, TypeRuntimeValidator<V>>(Array.from(parent?.runtimeValidators.entries() ?? []).map(([t, c]) => [t, c.clone()]));
    this.runtimeRootValidators = !!(parent?.runtimeRootValidators) ? { ...parent.runtimeRootValidators } : { } as any;
    this.fnInitCompiler = parent?.fnInitCompiler;
    this.fnDisposeCompiler = parent?.fnDisposeCompiler;
  }

  findValidatorCompiler(type: TypeSystem.TypeDef) {
    return this.validatorCompilers.get(type);
  }

  findRuntimeValidator(type: TypeSystem.TypeDef) {
    return this.runtimeValidators.get(type);
  }

}

const VALIDATOR_CONTEXT = Symbol('ValidatorContext');

export function getValidatorContext<S extends Validator>(validator: S): ValidatorContext<S> {
  return validator[VALIDATOR_CONTEXT];
}
