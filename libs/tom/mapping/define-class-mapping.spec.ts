import { mapRegistry } from './registry';
import { defineClassMapping, clearMap } from './define-class-mapping';

describe('map-schema', () => {

  describe('clearMap', () => {
    it('should return false if clear map is called for a non-existing mapping', () => {
      class C1 {}
      class C2 {}
      expect(clearMap(C1, C2)).toBe(false);
    });

    it('should clear an existing map', () => {
      class C1 {}
      class C2 {}
      defineClassMapping(C1, C2).seal();
      expect(mapRegistry.has(C1, C2)).toBe(true);
      expect(clearMap(C1, C2)).toBe(true);
      expect(mapRegistry.has(C1, C2)).toBe(false);
    });
  });

  describe('defineClassMapping', () => {
    it('should create a map', () => {
      class C1 {}
      class C2 {}
      defineClassMapping(C1, C2).seal();
      expect(mapRegistry.has(C1, C2)).toBe(true);
    });

    it('should not create a map if not sealed', () => {
      class C1 {}
      class C2 {}
      const m = defineClassMapping(C1, C2);
      expect(mapRegistry.has(C1, C2)).toBe(false);
    });

    it('should throw when trying to seal a sealed mapper', () => {
      class C1 {}
      class C2 {}
      const mapper = defineClassMapping(C1, C2);
      mapper.seal();
      expect(() =>  mapper.seal()).toThrow();
    });

    it('should not warn if mapping is not sealed and expectImmediateSeal is not set', (cb) => {
      expect.assertions(2);
      jest.spyOn(console, 'warn');

      class C1 {}
      class C2 {}
      defineClassMapping(C1, C2);
      expect(mapRegistry.has(C1, C2)).toBe(false);
      setTimeout(() => {
        expect(console.warn).not.toHaveBeenCalled();
        cb();
      }, 10);
    });

    it('should warn if mapping is not sealed and expectImmediateSeal is set', (cb) => {
      jest.spyOn(console, 'warn');

      class C1 {}
      class C2 {}
      defineClassMapping(C1, C2, { expectImmediateSeal: true });
      expect(mapRegistry.has(C1, C2)).toBe(false);
      setTimeout(() => {
        expect(console.warn).toHaveBeenCalledWith('Unsealed schema detected.');
        cb();
      }, 10);
    });
  });

});
