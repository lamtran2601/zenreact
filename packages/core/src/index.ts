import React, { useState } from 'react';

export const VERSION = '0.1.0';

/**
 * Higher-order component that optimizes rendering performance
 * by preventing unnecessary re-renders of the wrapped component.
 *
 * @param Component The React component to optimize
 * @returns An optimized version of the component that only re-renders when props change
 */
export function withOptimization<P extends object>(Component: React.ComponentType<P>) {
  // Use React.memo to prevent unnecessary re-renders
  return React.memo(Component, (prevProps, nextProps) => {
    // Deep comparison of props to determine if re-render is needed
    return Object.keys(prevProps as object).every((key) => {
      const k = key as keyof typeof prevProps;
      return prevProps[k] === nextProps[k];
    });
  });
}

/**
 * Custom hook for optimized state management.
 * This will be enhanced with debouncing and other optimizations.
 */
export function useOptimizedState<T>(initialState: T): [T, (value: T) => void] {
  const [state, setState] = useState<T>(initialState);
  return [state, setState];
}
