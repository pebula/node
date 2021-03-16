import { EnumClass } from './enum';

describe('@pebula/tom', () => {
  describe('schema / type-system', () => {
    describe('enum', () => {

      it('should cache and create only only EnumClassType per enum', () => {
        enum Test {
          a,
        }
        const EnumType = EnumClass(Test);
        expect(EnumClass(Test)).toBe(EnumType);
        expect(EnumClass(Test)).toBe(EnumClass(Test));
        expect(EnumType.type).toBe(Test);
        expect(EnumType.type).toBe(EnumClass(Test).type);
      });

      it('should create be able to analyze enum with no labels/values', () => {
        enum Test { }

        const TestType = EnumClass(Test);
        expect(TestType.constraint).toBe(Object);
        expect(TestType.records.length).toBe(0);
      });


      it('should create records for numeric enums', () => {
        enum Test {
          a,
          b,
          c,
          d = 1024
        }

        const TestType = EnumClass(Test);
        expect(TestType.constraint).toBe(Number);
        expect(TestType.records.length).toBe(4);
        for (const r of TestType.records) {
          expect(r.dual).toBe(true);
          expect(r.label).toMatch(/a|b|c|d/);
          expect(typeof r.value).toBe('number');
        }
        expect(TestType.records[0].value).toBe(0);
        expect(TestType.records[1].value).toBe(1);
        expect(TestType.records[2].value).toBe(2);
        expect(TestType.records[3].value).toBe(1024);
      });

      it('should create records for alpha enums', () => {
        enum Test {
          a = 'A',
          b = 'B',
          c = 'C',
        }

        const TestType = EnumClass(Test);
        expect(TestType.constraint).toBe(String);
        expect(TestType.records.length).toBe(3);
        for (const r of TestType.records) {
          expect(r.dual).toBe(false);
          expect(r.label).toMatch(/a|b|c/);
          expect(typeof r.value).toBe('string');
          expect(r.value).toBe(r.label.toUpperCase());
        }
      });

      it('should create records for alpha-numeric enums', () => {
        enum Test {
          c = 'C',
          a = 'A',
          d = 3,
          b = 1,
        }

        const TestType = EnumClass(Test);
        expect(TestType.constraint).toBe(Object);
        expect(TestType.records.length).toBe(4);
        for (const r of TestType.records) {
          expect(r.label).toMatch(/a|b|c|d/);
        }

        let [a, b, c, d] = TestType.records.slice().sort( (r1, r2) => r1.label > r2.label  ? 1 : -1);
        expect(a.dual).toBe(false);
        expect(a.value).toBe('A');
        expect(b.dual).toBe(true);
        expect(b.value).toBe(1);
        expect(c.dual).toBe(false);
        expect(c.value).toBe('C');
        expect(d.dual).toBe(true);
        expect(d.value).toBe(3);
      });
    });
  });
});
