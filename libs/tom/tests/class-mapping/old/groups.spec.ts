import { P, defineClassMapping, mapTypes } from '@pebula/tom';
import { clearMap, tomDescribeMapperJIT } from '@pebula/tom/testing';

tomDescribeMapperJIT('@pebula/tom', optionsFactory => {
  describe('Group Security', () => {
    it('should transform primitive types', () => {
      class C1 {
        @P.groups('admin') adminOnly: string;
        @P.groups('customer') customerOnly: string;
        @P.groups('admin', 'customer') authorized: string;
        @P everyone: string;
      }

      class C2 extends C1 { }

      defineClassMapping(C1, C2, optionsFactory())
        .forMember('adminOnly', 'adminOnly')
        .forMember('customerOnly', 'customerOnly')
        .forMember('authorized', 'authorized')
        .forMember('everyone', 'everyone')
        .seal();

      const test = new C1;
      test.adminOnly = 'A';
      test.customerOnly = 'B';
      test.authorized = 'C';
      test.everyone = 'D';

      const noGroups = mapTypes(test, C2);
      expect(noGroups).toEqual(test);

      const groups = mapTypes(test, C2, { groups: ['admin'] });
      expect(groups).not.toEqual(test);
      expect(groups.adminOnly).toEqual(test.adminOnly);
      expect(groups.authorized).toEqual(test.authorized);
      expect(groups.everyone).toEqual(test.everyone);
      expect(groups.customerOnly).toBeUndefined();

      const groupsNotExisting = mapTypes(test, C2, { groups: ['bla'] });
      expect(groupsNotExisting).not.toEqual(test);
      expect(groups.everyone).toEqual(test.everyone);
      expect(groupsNotExisting.authorized).toBeUndefined();
      expect(groupsNotExisting.customerOnly).toBeUndefined();
      expect(groupsNotExisting.adminOnly).toBeUndefined();

      clearMap(C1, C2);
    });
  });
});
