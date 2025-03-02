import React, { useState } from 'react';
import { defaultCompare } from './utils/compare';

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

// Store performance metrics
const metrics: Record<string, OptimizationStats> = {};

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

  metrics[componentId] = {
    totalRenders: 0,
    preventedRenders: 0,
    lastRenderTime: 0,
  };

  function WrappedComponent(props: P) {
    if (track) {
      const startTime = performance.now();
      metrics[componentId].totalRenders++;
      metrics[componentId].lastRenderTime = performance.now() - startTime;

      console.debug(
        `[ZenReact] ${componentId}:`,
        `Renders: ${metrics[componentId].totalRenders}`,
        `Prevented: ${metrics[componentId].preventedRenders}`,
        `Last: ${metrics[componentId].lastRenderTime.toFixed(2)}ms`
      );
    }
    return React.createElement(Component, props);
  }

  const MemoizedComponent = React.memo(WrappedComponent, (prev, next) => {
    // Running compare first for accurate metrics
    const arePropsEqual = compare(prev, next);

    // Track before returning
    if (track && arePropsEqual) {
      metrics[componentId].preventedRenders++;
    }

    // Return true to prevent re-render (when props are equal)
    return arePropsEqual;
  });

  MemoizedComponent.displayName = `ZenReact(${name})`;

  return MemoizedComponent;
}

/**
 * Get performance stats for a component by ID
 */
export function getOptimizationStats(componentId: string): OptimizationStats | undefined {
  return metrics[componentId];
}

/**
 * Custom hook for optimized state management.
 * This will be enhanced with debouncing and other optimizations.
 */
export function useOptimizedState<T>(initialState: T): [T, (value: T) => void] {
  const [state, setState] = useState<T>(initialState);
  return [state, setState];
}
