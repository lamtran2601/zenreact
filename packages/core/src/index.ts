import React, { useState } from 'react';

export const VERSION = '0.1.0';

export interface OptimizationOptions<P extends object> {
  /**
   * Custom comparison function for props
   */
  compare?: (prev: P, next: P) => boolean;
  /**
   * Enable performance tracking
   */
  track?: boolean;
  /**
   * Custom name for debugging
   */
  name?: string;
}

export interface OptimizationStats {
  totalRenders: number;
  preventedRenders: number;
  lastRenderTime: number;
}

/**
 * Type guard to check if a value is a plain object
 */
function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Deep comparison of objects with improved type safety
 */
function defaultCompare<T extends object>(obj1: T, obj2: T): boolean {
  // Handle reference equality
  if (obj1 === obj2) return true;

  // Handle arrays
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (obj1.length !== obj2.length) return false;
    return obj1.every(
      (val, idx) =>
        val === obj2[idx] ||
        (isPlainObject(val) &&
          isPlainObject(obj2[idx]) &&
          defaultCompare(val as object, obj2[idx] as object))
    );
  }

  // Handle plain objects
  if (isPlainObject(obj1) && isPlainObject(obj2)) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    return keys1.every((key) => {
      const val1 = obj1[key];
      const val2 = obj2[key];

      return (
        val1 === val2 || (isPlainObject(val1) && isPlainObject(val2) && defaultCompare(val1, val2))
      );
    });
  }

  return false;
}

// Store performance metrics
const metrics = new Map<string, OptimizationStats>();

/**
 * Higher-order component that optimizes rendering performance
 * by preventing unnecessary re-renders of the wrapped component.
 *
 * @param Component The React component to optimize
 * @param options Configuration options for optimization
 * @returns An optimized version of the component that only re-renders when props change
 */
export function withOptimization<P extends object>(
  Component: React.ComponentType<P>,
  {
    compare = defaultCompare,
    track = false,
    name = Component.displayName || Component.name || 'Component',
  }: OptimizationOptions<P> = {}
) {
  const componentId = `${name}_${Math.random().toString(36).slice(2)}`;

  metrics.set(componentId, {
    totalRenders: 0,
    preventedRenders: 0,
    lastRenderTime: 0,
  });

  const MemoizedComponent = React.memo(Component, (prev, next) => {
    const stats = metrics.get(componentId);
    if (!stats) return true;

    const startTime = performance.now();
    const shouldUpdate = compare(prev, next);

    if (track) {
      stats.totalRenders++;
      if (shouldUpdate) {
        stats.preventedRenders++;
      }
      stats.lastRenderTime = performance.now() - startTime;

      console.debug(
        `[ZenReact] ${name}:`,
        `Renders: ${stats.totalRenders},`,
        `Prevented: ${stats.preventedRenders},`,
        `Last: ${stats.lastRenderTime.toFixed(2)}ms`
      );
    }

    return shouldUpdate;
  });

  MemoizedComponent.displayName = `ZenReact(${name})`;

  return MemoizedComponent;
}

/**
 * Get performance stats for a component by ID
 */
export function getOptimizationStats(componentId: string): OptimizationStats | undefined {
  return metrics.get(componentId);
}

/**
 * Custom hook for optimized state management.
 * This will be enhanced with debouncing and other optimizations.
 */
export function useOptimizedState<T>(initialState: T): [T, (value: T) => void] {
  const [state, setState] = useState<T>(initialState);
  return [state, setState];
}
