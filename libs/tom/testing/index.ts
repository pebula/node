// import { describe } from '@jest/globals';
import { Type } from '@pebula/decorate';
import { Serializer } from '@pebula/tom/serialization';
import { ClassMappingSchemaFactoryOptions } from '@pebula/tom/mapping';
import { Validator } from '@pebula/tom/validation';

import { ClassMappingSchema } from '../mapping/mapping-schema';
import { mapRegistry } from '../mapping/registry';
export { clearMap } from '../mapping/define-class-mapping';
export { clearConverter } from '../mapping/converters';
export { clearSerializer } from '../serialization/define-class-serializer'

export function getSchema<S, T>(source: Type<S>, target: Type<T>):  ClassMappingSchema<S, T> | undefined {
  return mapRegistry.get(source, target);
}

export function isJIT(source: Type<any>, target: Type<any>): boolean
export function isJIT(schema: ClassMappingSchema<any, any>): boolean;
export function isJIT(schemaOrType: ClassMappingSchema<any, any> | Type<any>, target?: Type<any>): boolean {
  const schema = typeof schemaOrType === 'function'
    ? getSchema(schemaOrType, target)
    : schemaOrType
  ;
  return schema.options.jitCompiler !== 'disabled';
}

export const tomDescribeSerializerJIT = <S extends Serializer>(description: string, serializer: S, fn: (childSerializer: S) => void) => {
  const serializers = [
    serializer.fork('strictSerializer').setDefault('jitCompiler', 'strict'),
    serializer.fork('disabledSerializer').setDefault('jitCompiler', 'disabled')
  ];

  for (const childSerializer of serializers) {
    require('@jest/globals').describe(`${description} / class-serialization [JIT: ${childSerializer.defaultFactoryOptions.jitCompiler}]`, () => fn(childSerializer));
  }
}

export function tomDescribeMapperJIT(description: string,
                                     jitModes: Array<ClassMappingSchemaFactoryOptions<any, any>['jitCompiler']>,
                                     fn: (optionsFactory: (options?: ClassMappingSchemaFactoryOptions<any, any>) => any) => void);
export function tomDescribeMapperJIT(description: string,
                                     fn: (optionsFactory: (options?: ClassMappingSchemaFactoryOptions<any, any>) => any) => void);
export function tomDescribeMapperJIT(description: string,
                                     jitModes: Array<ClassMappingSchemaFactoryOptions<any, any>['jitCompiler']> | ((optionsFactory: (options?: ClassMappingSchemaFactoryOptions<any, any>) => any) => void),
                                     fn?: (optionsFactory: (options?: ClassMappingSchemaFactoryOptions<any, any>) => any) => void) {
  const jitCompilations: Array<ClassMappingSchemaFactoryOptions<any, any>['jitCompiler']> = Array.isArray(jitModes) ? jitModes : [
    'strict',
    'disabled',
  ];

  fn =  Array.isArray(jitModes) ? fn : jitModes;


  for (const jitCompiler of jitCompilations) {
    const factory = (options: ClassMappingSchemaFactoryOptions<any, any> = {}) => { return { ...options, jitCompiler } };
    require('@jest/globals').describe(`${description} / class-mapping [JIT: ${jitCompiler}]`, () => fn(factory));
  }
}

export const tomDescribeValidationJIT = <S extends Validator>(description: string, validator: S, fn: (childSerializer: S) => void) => {
  const validators = [
    validator.fork('strictValidator').setDefault('jitCompiler', 'strict'),
    validator.fork('disabledValidator').setDefault('jitCompiler', 'disabled')
  ];

  for (const childValidator of validators) {
    require('@jest/globals').describe(`${description} / class-validation [JIT: ${childValidator.defaultFactoryOptions.jitCompiler}]`, () => fn(childValidator));
  }
}
