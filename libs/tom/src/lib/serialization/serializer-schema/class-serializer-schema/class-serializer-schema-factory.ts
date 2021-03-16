import { Type } from '@pebula/decorate';
import { Nominal } from '../../../types';
import { getSchema, TomPropertySchema } from '../../../schema';
import { schemaRegistry } from '../../registry';
import { SerializerOp } from '../../types';
import { Serializer } from '../../serializers';
import { PropertySerializerBuilderHandler, PropertySerializerBuilder, PropertySerializerSchema } from '../property-serializer-schema';
import { mapperSealedError, missingPropertySchema } from './errors';
import { ClassSerializerSchema } from './class-serializer-schema';
import { SerializerFactoryOptions } from './types';

export type NominalKeys = keyof (ReturnType<typeof Nominal>['prototype']);
type DEFINING_METHODS = 'forMember' | 'forMembers' | 'forAllOtherMembers' | 'extends';
type NON_DEFINING_METHODS = 'seal';

export const DEFAULT_FACTORY_OPTIONS: Required<SerializerFactoryOptions> = {
  jitCompiler: 'enabled',
};

const ignoreHandler: PropertySerializerBuilderHandler<any, any> = c => c.ignore();
const mapToSelfPropertyHandler: PropertySerializerBuilderHandler<any, any> = c => c.mapToProperty(c.targetProp);

// export type SerializerFactory<S extends Serializer, T, TData = any, TOriginal extends T = T> = Omit<ClassSerializerSchemaFactory<S, Omit<T, keyof T>, TData, TOriginal>, DEFINING_METHODS>;

export type SealableSchemaFactory<S extends Serializer, T, TData = any, TOriginal extends T = T, TOp extends SerializerOp = SerializerOp> = Omit<ClassSerializerSchemaFactory<S, Omit<T, keyof T>, TData, TOriginal, TOp>, DEFINING_METHODS>;
export type UnSealableSchemaFactory<S extends Serializer, T, TData = any, TOriginal extends T = T, TOp extends SerializerOp = SerializerOp> = Omit<ClassSerializerSchemaFactory<S, T, TData, TOriginal, TOp>, NON_DEFINING_METHODS>;

export class ClassSerializerSchemaFactory<S extends Serializer, T, TData = any, TOriginal extends T = T, TOp extends SerializerOp = SerializerOp> {
  private extending = new Set<[Type<any>, SerializerOp?]>();
  private mappings = new Map<keyof T, PropertySerializerBuilderHandler<T, keyof T>>();
  private allOtherMembersHandler: PropertySerializerBuilderHandler<T, keyof T>;
  protected options: S extends Serializer<infer U> ? U : never;

  private sealed = false;
  private forceOp?: SerializerOp;

  constructor(protected readonly serializer: S,
              protected readonly target: Type<T>,
              options?: S['defaultFactoryOptions']) {
    this.options = { ...DEFAULT_FACTORY_OPTIONS, ...(options || {}) } as any;
  }

  /**
   * Create a new factory instance that it's type reflects it was automatically populated for all members.
   * Note that evaluation is lazy, only when calling `seal()` so this is just reflected in the type (design time).
   * At runtime, the members are automatically populated based on the schema metadata (TomClassSchema and TomePropertySchema).
   */
  static autoDefine<S extends Serializer, T, TOp extends SerializerOp>(serializer: S,
                                                                       target: Type<T>,
                                                                       options?: S['defaultFactoryOptions'],
                                                                       forceOp?: TOp): SealableSchemaFactory<S, T, any, T, TOp> {
    const factory = new ClassSerializerSchemaFactory(serializer, target, options);
    if (forceOp) {
      factory.forceOp = forceOp;
    }
    return factory as any;
  }

  /**
   * Extend from a base class with existing serializer
   * This is a lazy operation, serializer must exist once calling `seal()`
   * @param base The base type to extend
   * @param operation The serializations schema operation, if not set will use the current one
   */
  extends<Base>(base: Type<Base>, operation?: SerializerOp): Exclude<keyof T, keyof Base> extends never
                                                              ? SealableSchemaFactory<S, Omit<T, keyof Base>, TData, TOriginal, TOp>
                                                              : UnSealableSchemaFactory<S, Omit<T, keyof Base>, TData, TOriginal, TOp> {
    this.extending.add([base, operation]);
    return this as any;
  }

  /** Remove a current member definition allowing to override it. */
  resetMembers<TKey extends Exclude<keyof TOriginal, keyof T>>(...targetProps: TKey[]): (keyof T & TKey) extends never
                                                                                          ? UnSealableSchemaFactory<S, T & Pick<TOriginal, TKey>, TData, TOriginal, TOp>
                                                                                          : SealableSchemaFactory<S, T & Pick<TOriginal, TKey>, TData, TOriginal, TOp> {
    // this is rarely used to reset a member of the current level, more used to remove from extending maps...
    for (const prop of targetProps) {
      this.mappings.delete(prop as any);
    }
    return this as any;
  }

  forMember<TKey extends keyof T>(prop: TKey,
                                  handler?: PropertySerializerBuilderHandler<TOriginal, keyof TOriginal>): Exclude<keyof T, TKey | NominalKeys> extends never
                                                                                                             ? SealableSchemaFactory<S, Omit<T, TKey>, TData, TOriginal, TOp>
                                                                                                             : UnSealableSchemaFactory<S, Omit<T, TKey>, TData, TOriginal, TOp> {
    this.mappings.set(prop, handler || mapToSelfPropertyHandler);
    return this as any;
  }

  forMembers<TKey extends keyof T>(handler: PropertySerializerBuilderHandler<TOriginal, keyof TOriginal>,
                                   ...targetProps: TKey[]): Exclude<keyof T, TKey> extends never
                                                              ? SealableSchemaFactory<S, Omit<T, TKey>, TData, TOriginal, TOp>
                                                              : UnSealableSchemaFactory<S, Omit<T, TKey>, TData, TOriginal, TOp> {
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
  forAllOtherMembers(handler: PropertySerializerBuilderHandler<TOriginal, keyof TOriginal>): SealableSchemaFactory<S, Omit<T, keyof T>, TData, TOriginal, TOp> {
    this.allOtherMembersHandler = handler;
    return this as any;
  }

  /**
   * Seal the definition making it ready for serialization.
   * Use `serializer.get(type)` to get the serializer/type binding that represent this factory configuration.
   *
   * This seal() method has 2 variation:
   *
   * (1) Multi - There is no existing serializer OR deserializer so both will be created and sealed (deserializer will fork the serializer).
   * (2) Single - A serializer OR deserializer is already sealed so calling seal() will close the last definition for this type serialization binding.
   *
   * Note that there is an additional `seal(op)` overload. If you can use it (op is assignable) it means we are in 1 (Multi) otherwise (op is "never") we are in 2 (Single).
   */
  seal(): void;
  /**
   * Seal the definition making it ready for serialization.
   * Use `serializer.get(type)` to get the serializer/type binding that represent this factory configuration.
   *
   * This will seal a SINGLE serialization direction, either serialize OR deserialize based on the `operation` input.
   * An object is returned allowing to define and seal the opposite serialization operation, or ignore it and allow only one serialization direction.
   *
   * If `operation` is "serialize", the returned object contains 2 properties:
   *
   * - forkDeserialize    - A method the returns another seal() ready factory, now for the `deserializer`. The factory is forked from the `serializer`, containing custom changes in the `serializer` factory.
   * - defineDeserialize  - A method the returns another seal() ready factory, now for the `deserializer`. The factory is populated from schema metadata and not bound to the `serializer`.
   *
   * If `operation` is "deserialize", the returned object contains 2 properties:
   *
   * - forkSerialize    - A method the returns another seal() ready factory, now for the `serializer`. The factory is forked from the `deserializer`, containing custom changes in the `deserializer` factory.
   * - defineSerialize  - A method the returns another seal() ready factory, now for the `serializer`. The factory is populated from schema metadata and not bound to the `deserializer`.
   *
   * DON'T FORGET TO CALL SEAL ON THE FORKED/DEFINED OPERATION
   *
   * @param operation The serialization operation to seal, either `serialize` or `deserialize`
   */
  seal<Op extends TOp>(operation: Op): Record<Op extends 'serialize' ? ('forkDeserialize' | 'defineDeserialize') : ('forkSerialize' | 'defineSerialize'), () => SealableSchemaFactory<S, T, TData, TOriginal, never>>;
  seal(operation?: TOp): any | void {
    const op = this.forceOp || operation || 'serialize';
    if (this.sealed) {
      throw mapperSealedError(this.serializer, this.target);
    }
    this.sealed = true;

    const schema = getSchema(this.target);
    const mappings = this.mergeExtendingSchemas(op);
    const properties = schema?.getPropertiesAsT();
    if (properties) {
      const allOtherMembersHandler: PropertySerializerBuilderHandler<T, keyof T> = this.allOtherMembersHandler || mapToSelfPropertyHandler;

      for (const [key, prop] of Object.entries(properties) as Array<[keyof T, TomPropertySchema]>) {
        if (!this.mappings.has(key) && !mappings.has(key)) {
          this.mappings.set(key, prop.exclude ? ignoreHandler : allOtherMembersHandler);
        }
      }
    } // Note that we make sure we define all members in the store so future extending children will also get them.

    // Now add/override the current mapping on top of any ancestor mappings
    for (const [key, handler] of this.mappings.entries()) {
      if (!schema?.hasProperty(key as string)) {
        throw missingPropertySchema(this.serializer, this.target, key as string);
      }
      mappings.set(key, PropertySerializerBuilder.resolve(this.target, key, handler));
    }

    this.createSchema(mappings, op);

    if (this.forceOp) {
      return;
    } else {
      const define = (fork?: boolean) => {
        const factory = new ClassSerializerSchemaFactory<S, T, TData, TOriginal>(this.serializer, this.target, this.options);
        factory.forceOp = op === 'serialize' ? 'deserialize' : 'serialize';
        fork && factory.extending.add([this.target, op]);
        return factory;
      };
      if (!operation) {
        define(true).seal();
      } else {
        return operation === 'serialize'
          ? { defineDeserialize: define, forkDeserialize: () => define(true) }
          : { defineSerialize: define, forkSerialize: () => define(true) }
        ;
      }
    }
  }

  /**
   * Create, register and compiler the schema from the mappings and additional parameters in the context.
   */
  protected createSchema(mappings: Map<keyof T, PropertySerializerSchema<T>>, operation: SerializerOp): ClassSerializerSchema<S, T> {
    const classMappingSchema = new ClassSerializerSchema(
      this.serializer,
      this.target,
      Array.from(mappings.values()),
      operation,
      this.options,
    );
    schemaRegistry.register(classMappingSchema);
    return classMappingSchema;
  }

  private mergeExtendingSchemas(operation: SerializerOp) {
    // create a merged schema from all extending maps with last set last win for duplicates.
    const extMappings = new Map<keyof T, PropertySerializerSchema<T>>();
    for (const [base, op] of this.extending) {
      const exSchema = schemaRegistry.getOperation(this.serializer, base, op || operation);
      if (!exSchema) {
        throw new Error(`Could not find extending for serializer ${this.serializer.name} & target ${base.name} with operation ${op || operation}.`);
      }
      for (const m of exSchema.properties) {
        extMappings.set(m.prop as any, m as any);
      }
    }

    return extMappings;
  }
}
