import { isPlainObject, defaultCompare } from '../../utils/compare';

describe('isPlainObject', () => {
  it('identifies plain objects correctly', () => {
    expect(isPlainObject({})).toBe(true);
    expect(isPlainObject({ a: 1 })).toBe(true);
    expect(isPlainObject(Object.create(null))).toBe(true);
  });

  it('rejects non-plain objects', () => {
    expect(isPlainObject([])).toBe(false);
    expect(isPlainObject(null)).toBe(false);
    expect(isPlainObject(undefined)).toBe(false);
    expect(isPlainObject(42)).toBe(false);
    expect(isPlainObject('string')).toBe(false);
    expect(isPlainObject(new Date())).toBe(false);
    expect(isPlainObject(/regex/)).toBe(false);
    expect(
      isPlainObject(() => {
        return;
      })
    ).toBe(false);
  });

  it('rejects class instances', () => {
    class TestClass {}
    expect(isPlainObject(new TestClass())).toBe(false);
  });
});

describe('defaultCompare', () => {
  describe('Reference equality', () => {
    it('handles same reference objects', () => {
      const obj = { a: 1 };
      expect(defaultCompare(obj, obj)).toBe(true);
    });

    it('compares different objects with same content', () => {
      expect(defaultCompare({ a: 1 }, { a: 1 })).toBe(true);
      expect(defaultCompare({ a: 1 }, { a: 2 })).toBe(false);
    });
  });

  describe('Array comparisons', () => {
    it('handles empty arrays', () => {
      expect(defaultCompare([], [])).toBe(true);
    });

    it('compares arrays with primitives', () => {
      expect(defaultCompare([1, 2, 3], [1, 2, 3])).toBe(true);
      expect(defaultCompare([1, 2, 3], [1, 2, 4])).toBe(false);
    });

    it('handles arrays of different lengths', () => {
      expect(defaultCompare([1, 2], [1, 2, 3])).toBe(false);
    });

    it('compares arrays with objects', () => {
      expect(defaultCompare([{ a: 1 }], [{ a: 1 }])).toBe(true);
    });
  });

  describe('Object comparisons', () => {
    it('handles empty objects', () => {
      expect(defaultCompare({}, {})).toBe(true);
    });

    it('compares flat objects with primitive values', () => {
      expect(defaultCompare({ a: 1, b: 'test' }, { a: 1, b: 'test' })).toBe(true);
      expect(defaultCompare({ a: 1, b: 'test' }, { a: 1, b: 'different' })).toBe(false);
    });

    it('handles objects with different key orders', () => {
      expect(defaultCompare({ a: 1, b: 2 }, { b: 2, a: 1 })).toBe(true);
    });

    it('handles objects with undefined values', () => {
      expect(defaultCompare({ a: undefined }, { a: undefined })).toBe(true);
      expect(defaultCompare({ a: undefined }, { b: undefined })).toBe(false);
    });

    it('handles objects with null values', () => {
      expect(defaultCompare({ a: null }, { a: null })).toBe(true);
      expect(defaultCompare({ a: null }, { a: undefined })).toBe(false);
    });
  });

  describe('Nested structures', () => {
    it('compares nested objects', () => {
      expect(defaultCompare({ a: { b: { c: 1 } } }, { a: { b: { c: 1 } } })).toBe(true);
      expect(defaultCompare({ a: { b: { c: 1 } } }, { a: { b: { c: 2 } } })).toBe(false);
    });

    it('handles objects with nested arrays', () => {
      expect(defaultCompare({ arr: [1, 2] }, { arr: [1, 2] })).toBe(true);
      expect(defaultCompare({ arr: [1, 2] }, { arr: [1, 3] })).toBe(false);
    });

    it('handles deep recursive structures', () => {
      const obj1 = { a: { b: { c: { d: 1 } } } };
      const obj2 = { a: { b: { c: { d: 1 } } } };
      expect(defaultCompare(obj1, obj2)).toBe(true);
    });
  });

  describe('Edge cases', () => {
    it('handles date objects', () => {
      const date1 = new Date('2024-01-01');
      const date2 = new Date('2024-01-01');
      expect(defaultCompare(date1, date2)).toBe(false); // false because they're different objects
    });

    it('handles regex objects', () => {
      const regex1 = /test/;
      const regex2 = /test/;
      expect(defaultCompare(regex1, regex2)).toBe(false); // false because they're different objects
    });

    it('handles objects with many properties', () => {
      const obj1 = Object.fromEntries(Array.from({ length: 100 }, (_, i) => [`key${i}`, i]));
      const obj2 = Object.fromEntries(Array.from({ length: 100 }, (_, i) => [`key${i}`, i]));
      expect(defaultCompare(obj1, obj2)).toBe(true);
    });
  });
});
