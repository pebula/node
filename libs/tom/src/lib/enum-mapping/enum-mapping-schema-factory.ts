import { TypeSystem } from '../schema';
import { enumMappingRegistry } from './enum-mapping-registry';
import { enumMapperSealedError } from './errors';

type DEFINING_METHODS = 'forMember' | 'forMembers' | 'forAllOtherMembers' | 'extends';
type NON_DEFINING_METHODS = 'seal';

export type SealableSchemaFactory<S extends TypeSystem.Enum, T extends TypeSystem.Enum, SOriginal extends S = S> = Omit<EnumMappingSchemaFactory<Omit<S, keyof S>, T, SOriginal>, DEFINING_METHODS>;
export type UnSealableSchemaFactory<S extends TypeSystem.Enum, T extends TypeSystem.Enum, SOriginal extends S = S> = Omit<EnumMappingSchemaFactory<S, T, SOriginal>, NON_DEFINING_METHODS>;

export class EnumMappingSchemaFactory<S extends TypeSystem.Enum, T extends TypeSystem.Enum, SOriginal extends S = S> {

  private sealed = false;
  private mappings = new Map<SOriginal[keyof SOriginal], T[keyof T]>();

  constructor(protected sourceEnum: S extends SOriginal ? S : never, protected targetEnum: T) { }

  forMember<SKey extends keyof S>(sourceProp: SKey, targetProp: keyof T): Exclude<keyof S, SKey> extends never
                                                                            ? SealableSchemaFactory<Omit<S, SKey>, T, SOriginal>
                                                                            : UnSealableSchemaFactory<Omit<S, SKey>, T, SOriginal> {
    this.mappings.set(this.sourceEnum[sourceProp], this.targetEnum[targetProp]);
    return this as any;
  }

  seal(): void {
    if (this.sealed) {
      throw enumMapperSealedError();
    }
    this.sealed = true;
    enumMappingRegistry.register(this.sourceEnum, this.targetEnum, this.mappings);
  }
}
