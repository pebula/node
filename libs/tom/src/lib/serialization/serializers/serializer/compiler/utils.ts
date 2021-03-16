import { isPrimitive } from '../../../../utils';
import { MAPPER } from './param-names';
import { CompilerPropertyContext } from './context';

/**
 * Returns the code that references the target property.
 * E.G If the target object is "t" and the property is at variable "p" it will return "t[p]" which can be used to compose an assignment instruction ("t[p] = s[key];")
 */
export function targetPropSetRef(prop: CompilerPropertyContext) {
  return prop.context.isSerialize && prop.propMapSchema.valueAccessorType === 'path'
    ? `${MAPPER.OUTPUT_PARAM}.${prop.propMapSchema.resolveSourcePath}`
    : `${MAPPER.OUTPUT_PARAM}.${prop.propMapSchema.prop as string}`
  ;
}

/**
 * Returns source code that will retrieve the value from the source object base on the property map schema
 * Returns undefined when property mapping schema is invalid (should not happen!)
 */
export function getValueFromSourceCode(prop: CompilerPropertyContext): string | undefined {
  switch (prop.propMapSchema.valueAccessorType) {
    case 'path':
      return prop.context.isSerialize
        ? `${MAPPER.INPUT_PARAM}.${prop.propMapSchema.prop as string}`
        : `${MAPPER.INPUT_PARAM}.${prop.propMapSchema.resolveSourcePath}`
      ;
    case 'fixedValue':
      const mapToValue = prop.propMapSchema.value;
      return isPrimitive(mapToValue) ? JSON.stringify(mapToValue) : `${prop.schemaParam('value')}`;
    case 'map':
      return `${prop.schemaParam('map')}(${MAPPER.CTX_PARAM})`;
  }
}
