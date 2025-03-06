import React from 'react';

interface WithOptimizationOptions {
  name?: string;
  debug?: boolean;
}

/**
 * A Higher Order Component that optimizes React components by preventing unnecessary rerenders.
 *
 * @param Component - The component to optimize
 * @param options - Optional configuration for the optimization
 * @returns The optimized component wrapped with React.memo
 * @example
 * ```tsx
 * const MyOptimizedComponent = withOptimization(MyComponent);
 * ```
 */
export function withOptimization<P extends object>(
  Component: React.ComponentType<P>,
  options: WithOptimizationOptions = {}
): React.MemoExoticComponent<React.ComponentType<P>> {
  const componentName = options.name || Component.displayName || Component.name || 'Component';

  const OptimizedComponent = React.memo(Component);
  OptimizedComponent.displayName = `withOptimization(${componentName})`;

  return OptimizedComponent;
}
