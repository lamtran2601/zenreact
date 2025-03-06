import { useState, useCallback } from 'react';

/**
 * A performance-optimized version of useState that prevents unnecessary rerenders
 * by comparing the new state value with the current state before updating.
 *
 * @param initialState - The initial state value
 * @returns A tuple containing the current state and a function to update it
 * @example
 * ```tsx
 * function Counter() {
 *   const [count, setCount] = useOptimizedState(0);
 *   return (
 *     <button onClick={() => setCount(count + 1)}>
 *       Count: {count}
 *     </button>
 *   );
 * }
 * ```
 */
export function useOptimizedState<T>(initialState: T) {
  const [state, setState] = useState<T>(initialState);

  const optimizedSetState = useCallback(
    (newState: T) => {
      if (!Object.is(state, newState)) {
        setState(newState);
      }
    },
    [state]
  );

  return [state, optimizedSetState] as const;
}
