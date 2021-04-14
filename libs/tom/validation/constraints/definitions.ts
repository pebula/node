import { Schema } from '@pebula/tom';
import { ConstraintErrorMsgFactory, ConstraintNames, Constraint } from './types';

const store = new Map<ConstraintNames, ConstraintDefinitions<ConstraintNames>>();
const DEFAULT_ERROR_MSG_FACTORY = () => 'Validation error';
const DEFAULT_CONSTRAINT_DEFINITION: ConstraintDefinitions<ConstraintNames> = {
  reflectsNegate: true,
  createErrorMsg: DEFAULT_ERROR_MSG_FACTORY,
};

function normalizeDef<T extends ConstraintDefinitions<ConstraintNames>>(def: T): T {
  if (!def) {
    def = {...DEFAULT_CONSTRAINT_DEFINITION} as any;
  } else {
    if (!def.createErrorMsg) {
      def.createErrorMsg = DEFAULT_ERROR_MSG_FACTORY;
      def.reflectsNegate = true;
    }
  }
  return def;
}

export interface ConstraintDefinitions<P extends ConstraintNames> {

  /**
   * When true, indicates that the constraint will handle the `not` operator internally.
   * If false, the framework will try to negate the expression (runtime & jit).
   *
   * @default undefined (false)
   */
  handlesNegate?: boolean;
  /**
   * When true, indicates that the error message for this constraint handles negate message internally.
   */
  /**
   * When true, indicates that the constraint error message factory will handle the `not` operator internally.
   * If false, the framework will add `[NOT]` to the message
   *
   * @default undefined (false)
   */
  reflectsNegate?: boolean;
  createErrorMsg?: ConstraintErrorMsgFactory<P>;
}

export function setConstraintDef<P extends ConstraintNames>(constraint: P, def: ConstraintDefinitions<P>): void {
  store.set(constraint, normalizeDef(def));
}

export function getConstraintDef<P extends ConstraintNames>(constraint: P): ConstraintDefinitions<P> {
  return store.get(constraint) || DEFAULT_CONSTRAINT_DEFINITION;
}

export function createConstraintErrorMsg<P extends ConstraintNames>(value: any, paths: any[], prop: Schema.TomPropertySchema, constraint: Constraint<P>): string {
  const def = getConstraintDef(constraint.id);
  return (constraint.negate && !def.reflectsNegate ? '[NOT] ' : '') + def.createErrorMsg({ value, paths, prop, constraint });
}

export const ConstraintDef = <P extends ConstraintNames>(def: ConstraintDefinitions<P>) => {
  return ( (target: any, key: P, desc?: any) => {
    setConstraintDef(key, def);
  });
}
