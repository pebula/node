import { Type } from '@pebula/decorate';
import { Schema, Nominal, InferTypeOf } from '@pebula/tom';
import { mapRegistry } from '../../registry';
import { PropertyMappingSchema, PropertyMapBuilder, PropertyMapBuilderHandler } from '../property-mapping-schema';
import { propertyNotMappedError, mapperSealedError, invalidPropertyMapDefinitions } from './errors';
import { ClassMappingSchemaFactoryOptions } from './types';
import { ClassMappingSchema } from './class-mapping-schema';
import { jitCompilerStrict } from '../../mapper/compiler/errors';

export type NominalKeys = keyof (ReturnType<typeof Nominal>['prototype']);
type DEFINING_METHODS = 'forMember' | 'forMembers' | 'forAllOtherMembers' | 'extends';
type NON_DEFINING_METHODS = 'seal';

export type SealableSchemaFactory<S, T, TData = any, TOriginal extends T = T> = Omit<ClassMappingSchemaFactory<S, Omit<T, keyof T>, TData, TOriginal>, DEFINING_METHODS>;
export type UnSealableSchemaFactory<S, T, TData = any, TOriginal extends T = T> = Omit<ClassMappingSchemaFactory<S, T, TData, TOriginal>, NON_DEFINING_METHODS>;

export const DEFAULT_TYPE_MAP_SCHEMA_FACTORY_OPTIONS: Required<ClassMappingSchemaFactoryOptions<any, any>> = {
  expectImmediateSeal: false,
  jitCompiler: 'enabled',
};

export class ClassMappingSchemaFactory<S, T, TData = any, TOriginal extends T = T> {
  private extending: Array<[Type<any>, Type<any>, boolean]> = [];
  private mappings = new Map<keyof T, [sourcePropOrHandler: keyof S | PropertyMapBuilderHandler<S, any, any>, maybeSourceType?: Type<any> | true]>();
  private allOtherMembersHandler: PropertyMapBuilderHandler<S, T, keyof T>;
  private verifyDataHandler?: ClassMappingSchema<S, T, TData>['verifyData'];
  protected options: ClassMappingSchemaFactoryOptions<S, T>;

  private sealed = false;

  constructor(protected sourceType: Type<S>,
              protected targetType: Type<T>,
              options?: ClassMappingSchemaFactoryOptions<S, T>) {
    this.options = { ...DEFAULT_TYPE_MAP_SCHEMA_FACTORY_OPTIONS, ...(options || {}) };

    if (this.options.expectImmediateSeal) {
      setTimeout(() => {
        if (!this.sealed) {
          console.warn('Unsealed schema detected.'); // tslint:disable-line: no-console
        }
      }, 0);
    }
  }

  /**
   * Create a new factory instance that it's type reflects it was automatically populated for all members.
   * Note that evaluation is lazy, only when calling `seal()` so this is just reflected in the type (design time).
   * At runtime, the members are automatically populated based on the schema metadata (Schema.TomClassSchema and TomePropertySchema).
   *
   * Use this to auto-map a class to itself and get the factory so you can modify it by removing/modifying some of the members.
   */
  static autoDefineSelf<T>(target: Type<T>,
                           options?: ClassMappingSchemaFactoryOptions<T, T>): SealableSchemaFactory<T, T, any, T> {
    const factory = new ClassMappingSchemaFactory(target, target, options);
    factory.seal = () => {
      if (typeof factory.allOtherMembersHandler !== 'function') {
        const schema = Schema.getSchema(target);
        if (schema) {
          for (const p of schema.getProperties()) {
            if (!factory.mappings.has(p.name)) {
              factory.mappings.set(p.name, [p.name]);
            }
          }
        }
      }
      ClassMappingSchemaFactory.prototype.seal.call(factory);
    }
    return factory as any;
  }

  verifyData(handler: ClassMappingSchema<S, T, TData>['verifyData']): this {
    this.verifyDataHandler = handler;
    return this;
  }

  /**
   * Extend schema mappings from an existing map.
   * The map must exist when calling `seal()`
   * @param exSourceType The source type to extend
   * @param exTargetType  The target type to extend
   * @param extVerifyData When set to true will also run the verify data method (if exists) on the parent (@defaultValue false)
   */
  extends<ExSource, ExTarget>(exSourceType: Type<ExSource>,
                              exTargetType: Type<ExTarget>,
                              extVerifyData = false): Exclude<keyof T, keyof ExTarget> extends never
                                                        ? SealableSchemaFactory<S, Omit<T, keyof ExTarget>, TData, TOriginal>
                                                        : UnSealableSchemaFactory<S, Omit<T, keyof ExTarget>, TData, TOriginal> {
    this.extending.push([exSourceType, exTargetType, extVerifyData]);
    return this as any;
  }

  resetMembers<TKey extends Exclude<keyof TOriginal, keyof T>>(...targetProps: TKey[]): (keyof T & TKey) extends never
                                                                                          ? UnSealableSchemaFactory<S, T & Pick<TOriginal, TKey>, TData, TOriginal>
                                                                                          : SealableSchemaFactory<S, T & Pick<TOriginal, TKey>, TData, TOriginal> {
    // this is rarely used to reset a member of the current level, more used to remove from extending maps...
    for (const prop of targetProps) {
      this.mappings.delete(prop as any);
    }
    return this as any;
  }

  /**
   * Create property mapping using an handler that accepts a configuration object.
   * The handler is invoked immediately (before `forMember` returns).
   * The configuration object provides multiple ways to map the target property.
   *
   * @param targetProp The property name to map to on the target
   * @param handler A function that accepts the configuration objects and interacts with it to setup the mapping.
   */
  forMember<TKey extends keyof T>(targetProp: TKey,
                                  handler: PropertyMapBuilderHandler<S, T, TKey>): Exclude<keyof T, TKey | NominalKeys> extends never
                                                                                     ? SealableSchemaFactory<S, Omit<T, TKey>, TData, TOriginal>
                                                                                     : UnSealableSchemaFactory<S, Omit<T, TKey>, TData, TOriginal>;

  /**
   * Map from the property `sourceProp` on the source to the property `targetProp` on the target where the type on the source does not match the type on the target.
   *
   * The library does not know the type on the source so ou must provide it via `sourceType`.
   * If the property on the source is decorated with `@Prop` you do not need to provide the type, you can instead set `true`.
   * Note that when `true` is set but the property is not decorated with `@Prop` it will throw.
   *
   * For custom types, make sure a type map schema is already defined between the types of both properties.
   * If a type map schema does not exist the library will try to map it by treating the source as plain object.
   * If `jitCompiler` mode is set to `strict` it will throw when creating the type map schema (`seal()`).
   *
   * @param targetProp The property name to map to on the target
   * @param sourceProp The property name to map from on the source
   * @param sourceType The type of the property on the source or `true` if the property on the source is decorated with `@Prop`
   */
  forMember<TKey extends keyof T, SKey extends keyof S>(targetProp: TKey,
                                                        sourceProp: InferTypeOf<S[SKey]> extends InferTypeOf<T[TKey]> ? never : SKey,
                                                        sourceType: Type<InferTypeOf<S[SKey]>> | true): Exclude<keyof T, TKey | NominalKeys> extends never
                                                                                                          ? SealableSchemaFactory<S, Omit<T, TKey>, TData, TOriginal>
                                                                                                          : UnSealableSchemaFactory<S, Omit<T, TKey>, TData, TOriginal>;

  /**
   * Map to the property `targetProp` on the target from the property `sourceProp` on the source where the type on the source and target match.
   * The library will resolve the type by first looking for it on the source property, when exists (decorated with `@Prop`). If not it will get it from the target.
   *
   * Note that typescript will allow setting the properties as long as the source type "extends" the target type.
   * Since typescript's type system is structural, if the type on the source has the same structure as the type on the target they will match!
   * For example, 2 different types with no fields/members will match!
   * This is why the library first search's the source for decorated information, make sure you follow it.
   * @param targetProp The property name to map to on the target
   * @param sourceProp The property name to map from on the source
   */
  forMember<TKey extends keyof T, SKey extends keyof S>(targetProp: TKey,
                                                        sourceProp: S[SKey] extends T[TKey] ? SKey : never): Exclude<keyof T, TKey | NominalKeys> extends never
                                                                                                               ? SealableSchemaFactory<S, Omit<T, TKey>, TData, TOriginal>
                                                                                                               : UnSealableSchemaFactory<S, Omit<T, TKey>, TData, TOriginal>;
  forMember<TKey extends keyof T>(targetProp: TKey,
                                  sourcePropOrHandler: keyof S | PropertyMapBuilderHandler<S, any, any>,
                                  maybeSourceType?: Type<any> | true) {
    this.mappings.set(targetProp, [sourcePropOrHandler, maybeSourceType]);
    return this as any;
  }

  forMembers<TKey extends keyof T>(handler: PropertyMapBuilderHandler<S, T, keyof T>,
                                   ...targetProps: TKey[]): Exclude<keyof T, TKey> extends never
                                                              ? SealableSchemaFactory<S, Omit<T, TKey>, TData, TOriginal>
                                                              : UnSealableSchemaFactory<S, Omit<T, TKey>, TData, TOriginal> {
    for (const targetProp of targetProps) {
      this.forMember(targetProp, handler);
    }
    return this as any;
  }

  /**
   * Create property mapping for all remaining properties on the target using an handler that accepts a configuration object.
   * The handler is invoked immediately (before `forMember` returns).
   * The configuration object provides multiple ways to map the target property.
   *
   * That handler is invoked once and the result is shared between all remaining property map's.
   *
   * > This will most probably create runtime mappers instead of JIT compiled mappers,
   * If `jitCompiler` is set to `strict` it will also result in an error thrown when the type map is built (`seal()`)
   * @param handler A function that accepts the configuration objects and interacts with it to setup the mapping.
   */
  forAllOtherMembers(handler: PropertyMapBuilderHandler<S, T, keyof T>): SealableSchemaFactory<S, Omit<T, keyof T>, TData, TOriginal> {
    this.allOtherMembersHandler = handler;
    return this as any;
  }

  seal(): void {
    if (this.sealed) {
      throw mapperSealedError(this.sourceType, this.targetType);
    }
    this.sealed = true;

    const isJitCompilerStrict = this.options.jitCompiler === 'strict';
    const targetPropSchema = Schema.getSchema(this.targetType);

    const mappings = this.mergeExtendingSchemas();
    const properties = targetPropSchema?.getPropertiesAsT();
    if (properties) {
      for (const key of Object.keys(properties) as Array<keyof T>) {
        if (!this.mappings.has(key) && !mappings.has(key)) {
          // complete all missing properties that we're not set in forMember or throw if no catch all...
          if (!this.allOtherMembersHandler) {
            throw propertyNotMappedError(this.sourceType, this.targetType, key as string);
          }
          this.mappings.set(key, [this.allOtherMembersHandler]);
        }
      }
    } // Note that we make sure we define all members in the store so future extending children will also get them.

    // Now add/override the current mapping on top of any ancestor mappings
    for (const [key, prop] of this.mappings.entries()) {
      mappings.set(key, createPropertyMappingSchema(isJitCompilerStrict, this.sourceType, this.targetType, targetPropSchema, key, ...prop));
    }

    this.createSchema(mappings);
  }

  /**
   * Create, register and compiler the schema from the mappings and additional parameters in the context.
   */
  protected createSchema(mappings: Map<keyof T, PropertyMappingSchema<S, T>>): ClassMappingSchema<S, T> {
    const classMappingSchema = new ClassMappingSchema(
      this.sourceType,
      this.targetType,
      Array.from(mappings.values()),
      this.options,
      this.verifyDataHandler
    );
    mapRegistry.register(this.sourceType, this.targetType, classMappingSchema);
    return classMappingSchema;
  }

  private mergeExtendingSchemas() {
    // create a merged schema from all extending maps with last set last win for duplicates.
    const extMappings = new Map<keyof T, PropertyMappingSchema<S, T>>();
    const extVerifyDataHandlers: Array<ClassMappingSchema<S, T>['verifyData']> = [];
    for (const [exSource, exTarget, exVerifyHandler] of this.extending) {
      if (!mapRegistry.has(exSource, exTarget)) {
        throw new Error(`Could not find extending for source ${exSource.name} & target ${exTarget.name}.`);
      }
      const exSchema = mapRegistry.get(exSource, exTarget);
      for (const m of exSchema.properties) {
        extMappings.set(m.targetKey as any, m as any);
      }

      if (exVerifyHandler && !!exSchema.verifyData) {
        extVerifyDataHandlers.push(exSchema.verifyData);
      }
    }

    // Take all verify handlers from extending schemas and merge them into a single verify data handler
    if (extVerifyDataHandlers.length > 0) {
      if (this.verifyDataHandler) {
        extVerifyDataHandlers.push(this.verifyDataHandler);
      }
      this.verifyDataHandler = (data: TData, source: S) => {
        for (const verifyData of extVerifyDataHandlers) {
          const verifyResult = verifyData(data, source);
          if (verifyResult !== true) {
            return verifyResult;
          }
        }
        return true;
      };
    }

    return extMappings;
  }
}

function createPropertyMappingSchema<S, T, TKey extends keyof T>(isJitCompilerStrict: boolean,
                                                                 sourceType: Type<S>,
                                                                 targetType: Type<T>,
                                                                 targetPropSchema: Schema.TomClassSchema<T> | undefined,
                                                                 targetProp: TKey,
                                                                 sourcePropOrHandler: keyof S | PropertyMapBuilderHandler<S, any, any>,
                                                                 maybeSourceType?: Type<any> | true) {
    // if strict and no decoration on property, throw!
    if (isJitCompilerStrict && !targetPropSchema?.getProperty(targetProp)?.decorated) {
      throw jitCompilerStrict(sourceType, targetType, targetProp as string);
    }

    // If a custom mapper was provided, use it
    if (typeof sourcePropOrHandler === 'function') {
      return PropertyMapBuilder.resolve(sourceType, targetType, targetProp, sourcePropOrHandler);
    } else {
      if (maybeSourceType === true && !targetPropSchema?.getProperty(targetProp)?.decorated) {
        throw invalidPropertyMapDefinitions(sourceType, targetType, sourcePropOrHandler as string, targetProp as string);
      }
      // User provided direct property key on the source, we have 3 scenarios:
      //   (1) User also provided type
      //   (2) User also provided hint that there is a nested child mapping schema for this property mapping (true), we throw if not.
      //   (3) No additional info, which means these are identical types, we will take it from the source, if not, take it from the target
      // In both 2 & 3 we first get the type from the source
      let sourceMemberType: Type<S[keyof S]>;
      if (maybeSourceType && maybeSourceType !== true) { // (1)
        sourceMemberType = maybeSourceType;
      } else {
        const sourcePropSchema = Schema.getSchema(sourceType)?.getProperty(sourcePropOrHandler);
        sourceMemberType = sourcePropSchema?.type;
        if (!sourceMemberType) {
          if (!maybeSourceType) { // (3)
            if (isJitCompilerStrict) {
              // Only throw if not decorated, if was decorated this is probably due to union or other custom type which does not resolve directly
              if (!sourcePropSchema?.decorated) {
                throw jitCompilerStrict(sourceType, targetType, targetProp as string);
              }
            } else {
              sourceMemberType = Schema.getSchema(targetType)?.getProperty(targetProp)?.type;
            }
          } else if (!sourcePropSchema?.decorated) { // (2)
            throw invalidPropertyMapDefinitions(sourceType, targetType, sourcePropOrHandler as string, targetProp as string);
          }
        }
      }

      return PropertyMapBuilder.resolve(
        sourceType,
        targetType,
        targetProp,
        c => { c.mapToProperty(sourcePropOrHandler, sourceMemberType); }
      );
    }
  }
