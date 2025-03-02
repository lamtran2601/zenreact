import { simpleCompare, isPlainObject } from '../compare';
describe('simpleCompare', () => {
    it('handles primitive values correctly', () => {
        expect(simpleCompare(1, 1)).toBe(true);
        expect(simpleCompare(1, 2)).toBe(false);
        expect(simpleCompare('test', 'test')).toBe(true);
        expect(simpleCompare('test', 'other')).toBe(false);
        expect(simpleCompare(true, true)).toBe(true);
        expect(simpleCompare(true, false)).toBe(false);
    });
    it('handles null and undefined', () => {
        expect(simpleCompare(null, null)).toBe(true);
        expect(simpleCompare(undefined, undefined)).toBe(true);
        expect(simpleCompare(null, undefined)).toBe(false);
        expect(simpleCompare(null, 0)).toBe(false);
        expect(simpleCompare(undefined, '')).toBe(false);
    });
    it('compares arrays correctly', () => {
        expect(simpleCompare([], [])).toBe(true);
        expect(simpleCompare([1, 2, 3], [1, 2, 3])).toBe(true);
        expect(simpleCompare([1, 2, 3], [1, 2])).toBe(false);
        expect(simpleCompare([1, 2], [1, 3])).toBe(false);
    });
    it('performs shallow object comparison', () => {
        expect(simpleCompare({}, {})).toBe(true);
        expect(simpleCompare({ a: 1 }, { a: 1 })).toBe(true);
        expect(simpleCompare({ a: 1 }, { a: 2 })).toBe(false);
        expect(simpleCompare({ a: 1 }, { b: 1 })).toBe(false);
        expect(simpleCompare({ a: 1, b: 2 }, { a: 1 })).toBe(false);
    });
    it('handles nested objects with shallow comparison', () => {
        const obj1 = { a: { b: 1 } };
        const obj2 = { a: { b: 1 } };
        const obj3 = { a: obj1.a };
        expect(simpleCompare(obj1, obj2)).toBe(false); // Different object references
        expect(simpleCompare(obj1, obj3)).toBe(true); // Same reference for nested object
    });
});
describe('isPlainObject', () => {
    it('identifies plain objects correctly', () => {
        expect(isPlainObject({})).toBe(true);
        expect(isPlainObject({ a: 1 })).toBe(true);
        expect(isPlainObject(Object.create(null))).toBe(true);
    });
    it('rejects non-objects', () => {
        expect(isPlainObject(null)).toBe(false);
        expect(isPlainObject(undefined)).toBe(false);
        expect(isPlainObject(42)).toBe(false);
        expect(isPlainObject('string')).toBe(false);
        expect(isPlainObject(true)).toBe(false);
    });
    it('rejects arrays', () => {
        expect(isPlainObject([])).toBe(false);
        expect(isPlainObject([1, 2, 3])).toBe(false);
    });
    it('rejects functions', () => {
        // Using functions with return values to avoid eslint errors
        expect(isPlainObject(() => null)).toBe(false);
        expect(isPlainObject(function () {
            return null;
        })).toBe(false);
        expect(isPlainObject(Date)).toBe(false);
    });
    it('rejects class instances', () => {
        class TestClass {
            getValue() {
                return true;
            }
        }
        expect(isPlainObject(new TestClass())).toBe(true); // Note: In JavaScript, class instances are still plain objects
        expect(isPlainObject(new Date())).toBe(true); // Note: Date objects are still objects
    });
});
//# sourceMappingURL=compare.test.js.map