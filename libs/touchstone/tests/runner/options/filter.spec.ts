import { filterSuite, filterCase } from '../../../src/lib/runner/options/filter';

describe('@pebula/touchstone', () => {
    it('should filter suite names', () => {
      expect(filterSuite('abc', 'abc')).toBe(true);
      expect(filterSuite('abc', 'abc1')).toBe(false);

      expect(filterSuite('abc', ['abc', 'cba'])).toBe(true);
      expect(filterSuite('abc', ['abc1', 'cba'])).toBe(false);

      expect(filterSuite('abc', () => true)).toBe(true);
      expect(filterSuite('abc', () => false)).toBe(false);
      expect(filterSuite('abc', (n) => n === 'abc')).toBe(true);

      expect(filterSuite('abc123abC', /^[a-z].+\d\d\d[a-z][a-z][A-Z]$/)).toBe(true);
      expect(filterSuite('Abc123abC', /^[a-z].+\d\d\d[a-z][a-z][A-Z]$/)).toBe(false);
      expect(filterSuite('abc123abC', [/^[a-z].+\d\d\d[a-z][a-z][A-Z]$/, /\d\d\d$/])).toBe(true);
      expect(filterSuite('abc123abC', [/^[A-Z].+\d\d\d[a-z][a-z][A-Z]$/, /\d\d\d$/])).toBe(false);
    });

    it('should filter case names', () => {
      expect(filterCase('abc', 'suite99', 'abc')).toBe(true);
      expect(filterCase('abc', 'suite99', 'abc1')).toBe(false);

      expect(filterCase('abc', 'suite99', ['abc', 'cba'])).toBe(true);
      expect(filterCase('abc', 'suite99', ['abc1', 'cba'])).toBe(false);

      expect(filterCase('abc', 'suite99', () => true)).toBe(true);
      expect(filterCase('abc', 'suite99', () => false)).toBe(false);
      expect(filterCase('abc', 'suite99', (c, s) => c === 'abc' && s === 'suite99')).toBe(true);

      expect(filterCase('abc123abC', 'suite99', /^[a-z].+\d\d\d[a-z][a-z][A-Z]$/)).toBe(true);
      expect(filterCase('Abc123abC', 'suite99', /^[a-z].+\d\d\d[a-z][a-z][A-Z]$/)).toBe(false);
      expect(filterCase('abc123abC', 'suite99', [/^[a-z].+\d\d\d[a-z][a-z][A-Z]$/, /\d\d\d$/])).toBe(true);
      expect(filterCase('abc123abC', 'suite99', [/^[A-Z].+\d\d\d[a-z][a-z][A-Z]$/, /\d\d\d$/])).toBe(false);
    });
});
