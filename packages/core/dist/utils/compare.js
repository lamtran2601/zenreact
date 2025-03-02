/**
 * Simple shallow comparison for values.
 * Basic implementation with focus on common use cases.
 *
 * @param val1 - First value to compare
 * @param val2 - Second value to compare
 * @returns boolean indicating if values are equal
 */
export const simpleCompare = (val1, val2) => {
    // Handle exact equality (including null/undefined)
    if (val1 === val2)
        return true;
    // Handle null/undefined mismatches
    if (val1 == null || val2 == null)
        return false;
    // Handle non-objects (numbers, strings, etc)
    if (typeof val1 !== 'object' || typeof val2 !== 'object')
        return false;
    // Handle arrays with simple comparison
    if (Array.isArray(val1) && Array.isArray(val2)) {
        return val1.length === val2.length && val1.every((item, i) => item === val2[i]);
    }
    // Simple shallow object comparison
    const obj1 = val1;
    const obj2 = val2;
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    return keys1.length === keys2.length && keys1.every((key) => obj1[key] === obj2[key]);
};
/**
 * Type guard for checking if a value is a plain object
 *
 * @param value - Value to check
 * @returns boolean indicating if value is a plain object
 */
export const isPlainObject = (value) => {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
};
//# sourceMappingURL=compare.js.map