import { ComponentType } from 'react';

/**
 * Function signature for the optimized state setter
 */
export type OptimizedStateSetter<T> = (value: T) => void;

/**
 * Return type for useOptimizedState hook
 */
export type OptimizedStateHookResult<T> = [T, OptimizedStateSetter<T>];

/**
 * Type for the withOptimization HOC
 */
export type WithOptimization = <P extends object>(Component: ComponentType<P>) => ComponentType<P>;

/**
 * Type for the simple comparison function
 */
export type CompareFunction = <T>(val1: T, val2: T) => boolean;

/**
 * Type guard for plain objects
 */
export type IsPlainObject = (value: unknown) => value is Record<string, unknown>;
