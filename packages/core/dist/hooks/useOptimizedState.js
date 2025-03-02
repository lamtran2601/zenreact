import { useState } from 'react';
import { simpleCompare } from '../utils/compare';
/**
 * A React hook that provides optimized state management with minimal comparison logic.
 * Only triggers re-renders when the new state is different from the current state
 * using a simple comparison strategy.
 *
 * Features:
 * - Prevents unnecessary re-renders
 * - Handles primitive values, arrays, and objects
 * - Uses simple shallow comparison
 *
 * @param initialState - The initial state value
 * @returns A tuple containing the current state and a setter function
 *
 * @example
 * ```tsx
 * // Basic usage with primitive values
 * function Counter() {
 *   const [count, setCount] = useOptimizedState(0);
 *   return <button onClick={() => setCount(count + 1)}>{count}</button>;
 * }
 *
 * // Usage with objects
 * function UserProfile() {
 *   const [user, setUser] = useOptimizedState({ name: '', age: 0 });
 *
 *   const updateName = (name: string) => {
 *     setUser({ ...user, name }); // Only re-renders if name actually changes
 *   };
 *
 *   return <input value={user.name} onChange={e => updateName(e.target.value)} />;
 * }
 *
 * // Usage with arrays
 * function TodoList() {
 *   const [todos, setTodos] = useOptimizedState<string[]>([]);
 *
 *   const addTodo = (todo: string) => {
 *     setTodos([...todos, todo]); // Will re-render as array reference changes
 *   };
 *
 *   return (
 *     <ul>
 *       {todos.map(todo => <li key={todo}>{todo}</li>)}
 *     </ul>
 *   );
 * }
 * ```
 */
export function useOptimizedState(initialState) {
    const [state, setState] = useState(initialState);
    function setOptimizedState(value) {
        if (!simpleCompare(state, value)) {
            setState(value);
        }
    }
    return [state, setOptimizedState];
}
//# sourceMappingURL=useOptimizedState.js.map