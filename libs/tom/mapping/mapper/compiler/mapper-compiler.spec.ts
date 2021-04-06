import { P } from '@pebula/tom';
import { defineClassMapping, clearMap } from '../../define-class-mapping';
import { jitCompilerStrict } from './errors';
import { mapRegistry } from '../../registry/map-registry';

class A1 {}
class A2 {}

class B1 {
  @P a: A1;
  aUnmapped: A1;
}
class B2 {
  @P a: A2;
  aUnmapped: A2;
}

const CREATE_MAP_OPTIONS = { jitCompiler: 'strict' as const };

const clearLocalMaps = () => {
  clearMap(A1, A2);
  clearMap(B1, B2);
}
describe('mapper-compiler', () => {

  beforeEach(() => {
    clearLocalMaps();
  });

  it('should be able to create map with jitCompiler strict', () => {
    expect(() => {
      defineClassMapping(A1, A2, CREATE_MAP_OPTIONS).seal();
      defineClassMapping(B1, B2, CREATE_MAP_OPTIONS).forMember('a', 'a').forAllOtherMembers(c => c.ignore()).seal();
      mapRegistry.get(B1, B2).transform(new B1(), {});
    }).not.toThrow();
  });

  it('should throw when jitCompiler is strict and schema is missing', () => {
    expect(() => {
      clearLocalMaps();
      defineClassMapping(A1, A2, CREATE_MAP_OPTIONS).seal();
      defineClassMapping(B1, B2, CREATE_MAP_OPTIONS).forMember('a', 'aUnmapped').forAllOtherMembers(c => c.ignore()).seal();
      mapRegistry.get(B1, B2).transform(new B1(), {});
    }).toThrow(jitCompilerStrict(B1, B2, 'a'));

    expect(() => {
      clearLocalMaps();
      defineClassMapping(A1, A2, CREATE_MAP_OPTIONS).seal();
      defineClassMapping(B1, B2, CREATE_MAP_OPTIONS).forMember('aUnmapped', 'a').forAllOtherMembers(c => c.ignore()).seal();
      mapRegistry.get(B1, B2).transform(new B1(), {});
    }).toThrow(jitCompilerStrict(B1, B2, 'aUnmapped'));

    expect(() => {
      clearLocalMaps();
      defineClassMapping(A1, A2, CREATE_MAP_OPTIONS).seal();
      defineClassMapping(B1, B2, CREATE_MAP_OPTIONS).forMember('aUnmapped', 'aUnmapped').forAllOtherMembers(c => c.ignore()).seal();
      mapRegistry.get(B1, B2).transform(new B1(), {});
    }).toThrow(jitCompilerStrict(B1, B2, 'aUnmapped'));

    expect(() => {
      clearLocalMaps();
      defineClassMapping(A1, A2, CREATE_MAP_OPTIONS).seal();
      defineClassMapping(B1, B2, CREATE_MAP_OPTIONS)
        .forMember('a', 'a')
        .forMember('aUnmapped', 'aUnmapped')
        .seal();
      mapRegistry.get(B1, B2).transform(new B1(), {});
    }).toThrow(jitCompilerStrict(B1, B2, 'aUnmapped'));

  });
});
