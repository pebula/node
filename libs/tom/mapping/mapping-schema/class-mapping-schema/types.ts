export interface ClassMappingSchemaFactoryOptions<S, T, TData = any> {

  /**
   * Define the strategy to use for the JIT compiler.
   *
   * - disabled: JIT does not work, mapping is done at runtime using key iteration.
   * - enabled: JIT is used where available, if not available runtime mapping is used (default)
   * - strict: JIT is used at all times, if not available an exception is thrown
   *
   * JIT mode is available when both types (source and target) are known to the library.
   * For each mapped property, metadata must be known (on either end) which is done using the `@P` decorator.
   * If metadata is not know, JIT is disabled for this mapped property.
   *
   * On strict mode the library will throw an error when creating the mapping (not when actually mapping) which is usually at startup.
   * On enabled mode, all mapped properties without metadata will dynamically detect the type and map it.
   *
   * Mapping dynamically is much slower then using JIT since we need to identify the type and we also iterate over child types.
   * Child properties with custom classes must also have metadata but also a mapping created for them.
   *
   * # Background
   *
   * The most naive approach to map an object from type A to type B is to manually write a assignment
   * line of code for each property in B that assign the matching property in A.
   *
   * ```js
   * function mapAtoB(objA, objB) {
   *   objB.name = objA.name;
   *   objB.age = objB.age;
   * }
   * ```
   *
   * This is the manual way and it is by far the one which performs best!
   * However, it is verbose and most be repeated for every mapping we need.
   *
   * We can improve this by iterating over all keys of A and assign the values for each key in A
   * to the matching properties on B.
   *
   * This will simplify our code, reduce it scientifically but will come at a great performance cost.
   *
   * Of course, this is over simplified, in real life we need to deal with nested mappings,
   * complex routes (where we don't only map A.x to B.x) and more...
   *
   * To bridge between the approaches the library supports both modes
   * where the first (manual) mode is supported through a JIT engine that creates the functions for us which we use later for mapping.
   *
   * > This option has a deep impact on the performance.
   * @default enabled (DEFAULT_TYPE_MAP_SCHEMA_FACTORY_OPTIONS.jitCompiler)
   */
  jitCompiler?: 'disabled' | 'enabled' | 'strict';

  expectImmediateSeal?: boolean;
}
