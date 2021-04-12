import { Schema } from '@pebula/tom';

type KeysMatching<T, V> = {[K in keyof T]-?: T[K] extends V ? K : never}[keyof T];

export type ConstraintInput<TArgs extends Array<any>> = TArgs;

export interface RegisteredConstraints {
  type: ConstraintInput<never>;
  required: ConstraintInput<never>;
}

export type ConstraintNames = keyof RegisteredConstraints;
export type NoArgsConstraintNames = KeysMatching<RegisteredConstraints, ConstraintInput<never>>;
export type WithArgsConstraintNames = Exclude<ConstraintNames, NoArgsConstraintNames>;

export type RegisteredConstraintsFromConstraintsApi<T> = {
  [P in keyof T]: T[P] extends (...args: infer U) => any
    ? ConstraintInput<U>
    : ConstraintInput<never>
  ;
}

export type Constraint<T extends ConstraintNames = ConstraintNames> = { id: T } & (T extends NoArgsConstraintNames ? {} : { args: RegisteredConstraints[T] });

export type ConstraintErrorMsgFactory<P extends ConstraintNames> = (info: { value: any, paths: any[], prop: Schema.TomPropertySchema, validatorMeta: Constraint<P> }) => string;

const store = new Map<ConstraintNames, ConstraintErrorMsgFactory<ConstraintNames>>();

export function setConstraintErrorMsgFactory<P extends ConstraintNames>(constraint: P, fn: ConstraintErrorMsgFactory<P>) {
  store.set(constraint, fn);
  return setConstraintErrorMsgFactory;
}

export const ConstraintErrorMsg = <P extends ConstraintNames>(fn: ConstraintErrorMsgFactory<P>) => {
  return ( (target: any, key: P, desc?: any) => {
    setConstraintErrorMsgFactory(key, fn);
  });
}

export function createConstraintErrorMsg<P extends ConstraintNames>(value: any, paths: any[], prop: Schema.TomPropertySchema, validatorMeta: Constraint<P>): string {
  const msgFactory = store.get(validatorMeta.id) || (() => 'Validation error');
  return msgFactory({ value, paths, prop, validatorMeta: validatorMeta as Constraint });
}
