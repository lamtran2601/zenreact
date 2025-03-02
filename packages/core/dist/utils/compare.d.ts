import { CompareFunction, IsPlainObject } from '../types';
/**
 * Simple shallow comparison for values.
 * Basic implementation with focus on common use cases.
 *
 * @param val1 - First value to compare
 * @param val2 - Second value to compare
 * @returns boolean indicating if values are equal
 */
export declare const simpleCompare: CompareFunction;
/**
 * Type guard for checking if a value is a plain object
 *
 * @param value - Value to check
 * @returns boolean indicating if value is a plain object
 */
export declare const isPlainObject: IsPlainObject;
