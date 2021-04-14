import { Schema } from '@pebula/tom';

type KeysMatching<T, V> = {[K in keyof T]-?: T[K] extends V ? K : never}[keyof T];

export type ConstraintInput<TArgs extends Array<any>> = TArgs;

export interface RegisteredConstraints {
  type: ConstraintInput<never>;
  typeTuple: ConstraintInput<[number]>;
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

export type Constraint<T extends ConstraintNames = ConstraintNames> = { id: T; negate?: boolean } & (T extends NoArgsConstraintNames ? {} : { args: RegisteredConstraints[T] });

export type ConstraintErrorMsgFactory<P extends ConstraintNames> = (info: { value: any, paths: any[], prop: Schema.TomPropertySchema, constraint: Constraint<P> }) => string;
