import { FluentMethodPlugin, ApiMixin, Mixin } from '@pebula/decorate/fluent';
import * as T from '../../type-system';
import { isBuildSchemaApi } from './build-schema';

function isTypeSystemSchema(type: any): type is TypeSystemSchema {
  return Mixin.classHasMixin(type.constructor, TypeSystemSchema);
}

export class TypeSystemSchema {
  type: T.TomTypeInstance;
  subSchemas?: this[];
}

export abstract class TypeSystemApi extends ApiMixin.MixinBase<TypeSystemSchema> {
  @FluentMethodPlugin()
  as(typeDef: T.SingleTypes | T.BufferTypes | T.BufferRuntimeTypes | T.NativeRuntimeTypes | T.CustomClassType | TypeSystemSchema): this {
    this.$$context.schema.type = this.resolveToTypeDef(typeDef);
    return this;
  }

  @FluentMethodPlugin()
  enum(enumType: T.EnumType): this {
    this.$$context.schema.type = T.createTomTypeInstance('enum', enumType);
    return this;
  }

  @FluentMethodPlugin()
  literal(value: string | number | true | false): this {
    this.$$context.schema.type = T.createTomTypeInstance('literal', value);
    return this;
  }

  @FluentMethodPlugin()
  union(...types: Array<T.SingleTypes | T.BufferTypes | T.BufferRuntimeTypes | T.NativeRuntimeTypes | T.CustomClassType | T.TomTypeInstance | TypeSystemSchema | this>): this {
    const typeParams: T.TomTypeInstance[] = [];
    const subSchemas: TypeSystemSchema[] = [];

    types = types.slice();
    while (types.length > 0) {
      const type = types.pop();
      if (isBuildSchemaApi(type)) {
        types.push(type.buildSchema());
      } else if (T.isTomTypeInstance(type) && type.type === 'union') {
        types.push(...(type as T.TomTypeInstance<'union'>).typeParams);
      } else if (isTypeSystemSchema(type) && type.type.type === 'union') {
        typeParams.push(...(type.type as T.TomTypeInstance<'union'>).typeParams);
        subSchemas.push(...type.subSchemas);
      } else {
        typeParams.push(this.resolveToTypeDef(type)); // TODO: check for duplicates
        subSchemas.push(isTypeSystemSchema(type) ? type as any : undefined);  // TODO: check for duplicates
      }
    }

    this.$$context.schema.type = T.createTomTypeInstance('union', typeParams);
    this.$$context.schema.subSchemas = subSchemas;
    return this;
  }

  @FluentMethodPlugin()
  asArray(type: T.SingleTypes | T.BufferTypes | T.BufferRuntimeTypes | T.NativeRuntimeTypes | T.CustomClassType | T.TomTypeInstance | TypeSystemSchema | this): this {
    if (isBuildSchemaApi(type)) {
      type = type.buildSchema();
    }
    this.$$context.schema.type = T.createTomTypeInstance('array', [ this.resolveToTypeDef(type) ]);
    if (isTypeSystemSchema(type)) {
      this.$$context.schema.subSchemas = [type as any];
    }
    return this;
  }

  @FluentMethodPlugin()
  asSet(type: T.SingleTypes | T.NativeRuntimeTypes | T.BufferTypes | T.BufferRuntimeTypes | T.TomTypeInstance | T.CustomClassType | TypeSystemSchema | this): this {
    if (isBuildSchemaApi(type)) {
      type = type.buildSchema();
    }
    this.$$context.schema.type = T.createTomTypeInstance('set', [ this.resolveToTypeDef(type) ]);
    if (isTypeSystemSchema(type)) {
      this.$$context.schema.subSchemas = [type as any];
    }
    return this;
  }

  @FluentMethodPlugin()
  asMap(valueType: T.SingleTypes | T.BufferTypes | T.BufferRuntimeTypes | T.NativeRuntimeTypes | T.CustomClassType | T.TomTypeInstance | TypeSystemSchema | this, keyType?: T.CustomClassType | TypeSystemSchema): this {
    if (isBuildSchemaApi(valueType)) {
      valueType = valueType.buildSchema();
    }
    this.$$context.schema.type = T.createTomTypeInstance('map', [this.resolveToTypeDef(valueType), this.resolveToTypeDef(keyType) || T.createTomTypeInstance('any')]);
    if (isTypeSystemSchema(valueType)) {
      this.$$context.schema.subSchemas = [valueType as any];
    }
    return this;
  }

  @FluentMethodPlugin()
  asObjectMap(valueType: T.SingleTypes | T.BufferTypes | T.BufferRuntimeTypes | T.NativeRuntimeTypes | T.CustomClassType | T.TomTypeInstance | TypeSystemSchema | this, keyType?: 'string' | 'number' | 'any'): this {
    if (isBuildSchemaApi(valueType)) {
      valueType = valueType.buildSchema();
    }
    this.$$context.schema.type = T.createTomTypeInstance('objectMap', [this.resolveToTypeDef(valueType), T.createTomTypeInstance(keyType) ]);
    if (isTypeSystemSchema(valueType)) {
      this.$$context.schema.subSchemas = [valueType as any];
    }
    return this;
  }

  private resolveToTypeDef(typeDef: typeof Object | T.SingleTypes |  T.BufferTypes | T.BufferRuntimeTypes | T.NativeRuntimeTypes | T.CustomClassType | T.TomTypeInstance | TypeSystemSchema | this): T.TomTypeInstance | undefined {
    const resolved = T.resolveType(typeDef as any);
    if (resolved) {
      return resolved;
    } else if (typeDef) {
      if (T.isTomTypeInstance(typeDef)) {
        return T.createTomTypeInstance(typeDef.type, typeDef.typeParams);
      } else  if (Mixin.classHasMixin(typeDef.constructor, TypeSystemSchema)) {
        return (typeDef as TypeSystemSchema).type;
      }
    }
  }
}
