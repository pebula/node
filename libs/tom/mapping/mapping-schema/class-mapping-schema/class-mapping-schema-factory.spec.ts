import { P } from '@pebula/tom';
import { mapRegistry } from '../../registry';
import { invalidPropertyMapDefinitions, mapperSealedError } from './errors';
import { ClassMappingSchemaFactory } from './class-mapping-schema-factory';
import { runtimeMapper } from './class-mapping-schema';

class C1 {}
class C2 {}

describe('map-schema', () => {

  beforeEach(() => {
    mapRegistry.delete(C1, C2);
  });

  describe('ClassMappingSchemaFactory', () => {
    it('should be able to seal', () => {
      new ClassMappingSchemaFactory(C1, C2).seal();
      expect(mapRegistry.has(C1, C2)).toBe(true);
    });

    it('should not register type map if not sealed', () => {
      new ClassMappingSchemaFactory(C1, C2);
      expect(mapRegistry.has(C1, C2)).toBe(false);
    });

    it('should throw when trying to seal an already sealed mapper', () => {
      const mapper = new ClassMappingSchemaFactory(C1, C2);
      mapper.seal();
      expect(() => mapper.seal()).toThrow(mapperSealedError(C1, C2));
    });

    it('should throw when when property map type has a mismatch', () => {
      class A1 {
        a: string;
      }
      class A2 {
        @P a: A1;
      }

      expect(() => {
        new ClassMappingSchemaFactory(A1, A2).forMember('a', 'a', true).seal();
      }).toThrow(invalidPropertyMapDefinitions(A1, A2, 'a', 'a'));
      mapRegistry.delete(A1, A2);
    });

    it('should use jit methods when jitCompiler is enabled', () => {
      new ClassMappingSchemaFactory(C1, C2, { jitCompiler: 'enabled' }).seal();
      const schema = mapRegistry.get(C1, C2);
      expect(schema.transform).not.toBe(runtimeMapper);
    });

    it('should use jit methods when jitCompiler is strict', () => {
      new ClassMappingSchemaFactory(C1, C2, { jitCompiler: 'strict' }).seal();
      const schema = mapRegistry.get(C1, C2);
      expect(schema.transform).not.toBe(runtimeMapper);
    });


    it('should use runtime methods when jitCompiler is disabled', () => {
      new ClassMappingSchemaFactory(C1, C2, { jitCompiler: 'disabled' }).seal();
      const schema = mapRegistry.get(C1, C2);
      expect(schema.transform).toBe(runtimeMapper);
    });

    it('should not warn if mapping is not sealed and expectImmediateSeal is not set', (cb) => {
      expect.assertions(2);
      spyOn(console, 'warn');

      new ClassMappingSchemaFactory(C1, C2);
      expect(mapRegistry.has(C1, C2)).toBe(false);
      setTimeout(() => {
        // tslint:disable-next-line: no-console
        expect(console.warn).not.toHaveBeenCalled();
        cb();
      }, 10);
    });

    it('should warn if mapping is not sealed and expectImmediateSeal is not set', async (cb) => {
      spyOn(console, 'warn');

      new ClassMappingSchemaFactory(C1, C2, { expectImmediateSeal: true });
      expect(mapRegistry.has(C1, C2)).toBe(false);
      setTimeout(() => {
        // tslint:disable-next-line: no-console
        expect(console.warn).toHaveBeenCalledWith('Unsealed schema detected.');
        cb();
      }, 10);
    });
  });

});
