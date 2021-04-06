import { stringify, Type } from '@pebula/decorate';

export function propertyNotMappedError(source: Type<any>, target: Type<any>, propertyName: string) {
  const error = new Error(`Property "${propertyName}" is not mapped for source "${stringify(source)}" and target "${stringify(target)}".`);
  error.name = 'PropertyNotMapped';
  return error;
}

export function mapperSealedError(source: Type<any>, target: Type<any>) {
  const error = new Error(`Can not seal an already sealed mapper. [source: ${stringify(source)}, target: ${stringify(target)}]`);
  error.name = 'MapperSealed';
  return error;
}

export function invalidPropertyMapDefinitions(source: Type<any>, target: Type<any>, sourceKey: string, targetKey: string) {
  const error = new Error(`Could not set property map from "${stringify(source)}.${sourceKey}" to "${stringify(target)}.${targetKey}", no metadata for "${stringify(source)}.${sourceKey}" (Did you decorate it with "@P" ?).`);
  error.name = 'InvalidPropertyMapDefinitions';
  return error;
}
