/**
 * Type guard to check if a value is a plain object
 */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false;
  }

  // Check if it's a plain object (created by {} or Object.create(null))
  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Deep comparison of objects with improved type safety
 */
export function defaultCompare<T extends object>(obj1: T, obj2: T): boolean {
  // Handle reference equality
  if (obj1 === obj2) return true;

  // Handle arrays
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (obj1 === obj2) return true; // Same reference
    if (obj1.length !== obj2.length) return false; // Different lengths
    return obj1.every((_, index) => {
      const item1 = obj1[index];
      const item2 = obj2[index];
      if (
        typeof item1 === 'object' &&
        item1 !== null &&
        typeof item2 === 'object' &&
        item2 !== null
      ) {
        return defaultCompare(item1, item2);
      }
      return item1 === item2;
    });
  }

  // Handle non-plain objects (Date, RegExp, etc)
  if (!isPlainObject(obj1) || !isPlainObject(obj2)) {
    return false;
  }
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (obj1 === obj2) return true; // Same reference
    if (obj1.length !== obj2.length) return false; // Different lengths
    return obj1.every((_, index) => {
      const item1 = obj1[index];
      const item2 = obj2[index];
      if (
        typeof item1 === 'object' &&
        item1 !== null &&
        typeof item2 === 'object' &&
        item2 !== null
      ) {
        return defaultCompare(item1, item2);
      }
      return item1 === item2;
    });
  }

  // Get all keys from both objects
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // Compare number of keys
  if (keys1.length !== keys2.length) return false;

  // Ensure all keys in obj1 exist in obj2 with same values
  return keys1.every((key) => {
    if (!Object.prototype.hasOwnProperty.call(obj2, key)) return false;

    const val1 = obj1[key];
    const val2 = obj2[key];

    // Handle undefined values
    if (val1 === undefined && val2 === undefined) return true;
    if (val1 === undefined || val2 === undefined) return false;

    // Recursively compare objects
    if (typeof val1 === 'object' && val1 !== null && typeof val2 === 'object' && val2 !== null) {
      return defaultCompare(val1, val2);
    }

    return val1 === val2;
  });
}
