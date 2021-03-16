import { P, passthroughSerializer } from '@pebula/tom';
import { clearSerializer, tomDescribeSerializerJIT } from '@pebula/tom/testing';

tomDescribeSerializerJIT('@pebula/tom', passthroughSerializer, childSerializer => {

  afterEach(() => {
    clearSerializer(childSerializer);
  });

  describe('Group Security - ClassSerializer', () => {
    it('should transform primitive types', () => {
      class C1 {
        @P.groups('admin') adminOnly: string;
        @P.groups('customer') customerOnly: string;
        @P.groups('admin', 'customer') authorized: string;
        @P everyone: string;
      }

      const cSerializer = childSerializer.create(C1);

      const test = new C1;
      test.adminOnly = 'A';
      test.customerOnly = 'B';
      test.authorized = 'C';
      test.everyone = 'D';

      let pojo = cSerializer.serialize(test);
      let dTest: C1;
      expect(pojo).toEqual(test);
      dTest = cSerializer.deserialize(pojo);
      expect(pojo).toEqual(test);

      const config = { groups: ['admin'] };
      pojo = cSerializer.serialize(test, config);
      expect(pojo).not.toEqual(test);
      expect(pojo.adminOnly).toEqual(test.adminOnly);
      expect(pojo.authorized).toEqual(test.authorized);
      expect(pojo.everyone).toEqual(test.everyone);
      expect(pojo.customerOnly).toBeUndefined();
      pojo = cSerializer.serialize(test,  config);
      dTest = cSerializer.deserialize(pojo, config);
      expect(dTest.adminOnly).toEqual(test.adminOnly);
      expect(dTest.authorized).toEqual(test.authorized);
      expect(dTest.everyone).toEqual(test.everyone);
      expect(dTest.customerOnly).toBeUndefined();

      config.groups = ['bla'];
      pojo = cSerializer.serialize(test, config);
      expect(pojo).not.toEqual(test);
      expect(pojo.everyone).toEqual(test.everyone);
      expect(pojo.authorized).toBeUndefined();
      expect(pojo.customerOnly).toBeUndefined();
      expect(pojo.adminOnly).toBeUndefined();
      pojo = cSerializer.serialize(test, config);
      dTest = cSerializer.deserialize(pojo, config);
      expect(dTest.everyone).toEqual(test.everyone);
      expect(dTest.adminOnly).toBeUndefined();
      expect(dTest.authorized).toBeUndefined();
      expect(dTest.customerOnly).toBeUndefined();

      clearSerializer(childSerializer);
    });
  });
});
