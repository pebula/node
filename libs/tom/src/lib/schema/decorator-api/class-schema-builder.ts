import { Type } from '@pebula/decorate';
import { store } from './decorators';
import { TomPropertySchemaConfig } from './property';

export class ClassSchemaBuilder<T, TOriginal = T> {
  constructor(public readonly type: Type<T>) { }

  static create<T>(type: Type<T>) { return new ClassSchemaBuilder(type); }

  extends<P>(cls: Type<P>) {
    const baseSchema = store.get(cls);
    if (baseSchema) {
      for (const p of baseSchema.getProperties()) {
        this.define(p.key as any, p);
      }
    }
    return this as any as Exclude<keyof T, keyof P> extends never
      ? ClassSchemaBuilder<Omit<T, keyof P>, T>
      : Omit<ClassSchemaBuilder<Omit<T, keyof P>, T>, 'verify'>
    ;
  }

  remove<P extends Exclude<keyof TOriginal, keyof T>>(name: P) {
    store.get(this.type)?.removePropertySchema(name as string);
    return this as any as ClassSchemaBuilder<T & Pick<TOriginal, P>, TOriginal>;
  }

  define<P extends keyof T>(key: P, schema: Omit<TomPropertySchemaConfig, 'key'>) {
    store.get(this.type, true).addPropertySchema({ ...schema, key: key as string });
    return this as any as Exclude<keyof T, P> extends never
      ? ClassSchemaBuilder<Omit<T, P>, T>
      : Omit<ClassSchemaBuilder<Omit<T, P>, T>, 'verify'>
    ;
  }

  ignore<P extends keyof T>(...keysToIgnore: P[]) {
    return this as any as Exclude<keyof T, P> extends never
      ? { verify(): void } & ClassSchemaBuilder<Omit<T, P>, T>
      : Omit<ClassSchemaBuilder<Omit<T, P>, T>, 'verify'>
    ;
  }

  verify(): void { } // tslint:disable-line: no-empty
}
