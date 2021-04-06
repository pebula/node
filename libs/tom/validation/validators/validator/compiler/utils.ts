import { MAPPER } from './param-names';
import { CompilerPropertyContext } from './context';

/**
 * Returns source code that will retrieve the value from the source object base on the property map schema
 * Returns undefined when property mapping schema is invalid (should not happen!)
 */
export function getValueFromSourceCode(prop: CompilerPropertyContext): string | undefined {
  return `${MAPPER.INPUT_PARAM}.${prop.propMeta.name as string}`;
}
