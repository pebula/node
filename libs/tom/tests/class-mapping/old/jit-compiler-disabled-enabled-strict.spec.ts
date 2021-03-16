import { mapTypes, defineClassMapping, P, Types, C } from '@pebula/tom';
import { jitCompilerStrict } from '../../../src/lib/class-mapping/mapper/compiler/errors';
import { invalidPropertyMapDefinitions } from '../../../src/lib/class-mapping/mapping-schema/class-mapping-schema/errors';

const OPTIONS_STRICT = { jitCompiler: 'strict' as const };
const OPTIONS_DISABLED = { jitCompiler: 'disabled' as const };
const OPTIONS_ENABLED = { jitCompiler: 'enabled' as const };

describe('@pebula/tom', () => {

  describe('jitCompiler: strict', () => {
    it('should not allow undecorated properties to be mapped', () => {
      @C class A { name: string; }
      class B { @P name: string; }
      let factory = defineClassMapping(A, B, OPTIONS_STRICT).forMember('name', 'name');
      expect(() => factory.seal()).toThrow(jitCompilerStrict(A, B, 'name'));

      factory = defineClassMapping(B, A, OPTIONS_STRICT).forMember('name', 'name');
      expect(() => factory.seal()).toThrow(jitCompilerStrict(B, A, 'name'));
    });

    it('should map if all properties are decorated', () => {
      @C class A { @P name: string; }
      class B { @P name: string; }
      defineClassMapping(A, B, OPTIONS_STRICT).forMember('name', 'name').seal();
      const a = new A();
      a.name = 'test';
      const b = mapTypes(a, B);
      expect(b).toBeInstanceOf(B);
      expect(a).toEqual(b);
    });
  });

  describe('jitCompiler: enabled', () => {
    it('should allow undecorated properties to be mapped', () => {
      class A { @P name: string; }
      @C class B { name: number }

      // Since B.name is not decorated, in "enabled", without any additional setup, it will assign B.name the type of A.name.
      // This is blocked at design time by TS (hence the any below) but might still get missed on classes with identical structure.
      let factory = defineClassMapping(A, B, OPTIONS_ENABLED).forMember('name', 'name' as any);
      expect(() => factory.seal()).not.toThrow();
      const a = new A();
      a.name = 'test';
      const b = mapTypes(a, B);
      expect(b).toBeInstanceOf(B);
      expect(a).toEqual(b);
      expect(b.name).toEqual('test');

      let factory2 = defineClassMapping(B, A, OPTIONS_ENABLED).forMember('name', 'name' as any);
      expect(() => factory2.seal()).not.toThrow();
      const b1 = new B();
      b1.name = 15;
      const a1 = mapTypes(b1, A);
      expect(b1).toBeInstanceOf(B);
      expect(a1).toEqual(b1);
      expect(a1.name).toEqual(15);
    });

    it('should not allow undecorated properties to be mapped if explicitly declared to have mappings but none found.', () => {
      class A { @P name: string; }
      @C class B { name: number }

      // To make TS happy we can add "true" and it is more "strict" in enabled/disabled mode since it requires both end to have a type defined
      // But it means it must have a type definition in both ends!
      let factory = defineClassMapping(A, B, OPTIONS_ENABLED).forMember('name', 'name', true);
      expect(() => factory.seal()).toThrow(invalidPropertyMapDefinitions(A, B, 'name', 'name'));

      let factory2 = defineClassMapping(B, A, OPTIONS_ENABLED).forMember('name', 'name', true);
      expect(() => factory2.seal()).toThrow(invalidPropertyMapDefinitions(B, A, 'name', 'name'));
    });

  });

});
