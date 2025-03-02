'use strict';

var React = require('react');

/**
 * Simple shallow comparison for values.
 * Basic implementation with focus on common use cases.
 *
 * @param val1 - First value to compare
 * @param val2 - Second value to compare
 * @returns boolean indicating if values are equal
 */
const simpleCompare = (val1, val2) => {
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
function useOptimizedState(initialState) {
    const [state, setState] = React.useState(initialState);
    function setOptimizedState(value) {
        if (!simpleCompare(state, value)) {
            setState(value);
        }
    }
    return [state, setOptimizedState];
}

/**
 * A Higher Order Component that optimizes component re-renders using React.memo
 * with a simple comparison strategy.
 *
 * Features:
 * - Prevents unnecessary re-renders
 * - Uses shallow comparison for props
 * - Preserves component display name
 * - Type-safe implementation
 *
 * @param Component - The React component to optimize
 * @returns A memoized version of the component that only re-renders when props change
 *
 * @example
 * ```tsx
 * // Basic usage
 * interface UserCardProps {
 *   name: string;
 *   email: string;
 * }
 *
 * const UserCard = ({ name, email }: UserCardProps) => (
 *   <div>
 *     <h3>{name}</h3>
 *     <p>{email}</p>
 *   </div>
 * );
 *
 * // Create optimized version
 * const OptimizedUserCard = withOptimization(UserCard);
 *
 * // Usage in parent component
 * function UserList() {
 *   return (
 *     <div>
 *       {users.map(user => (
 *         <OptimizedUserCard
 *           key={user.id}
 *           name={user.name}
 *           email={user.email}
 *         />
 *       ))}
 *     </div>
 *   );
 * }
 *
 * // With conditional rendering
 * interface ToggleCardProps {
 *   isVisible: boolean;
 *   content: string;
 * }
 *
 * const ToggleCard = ({ isVisible, content }: ToggleCardProps) => (
 *   isVisible ? <div>{content}</div> : null
 * );
 *
 * // Only re-renders when isVisible or content actually change
 * const OptimizedToggleCard = withOptimization(ToggleCard);
 * ```
 */
const withOptimization = (Component) => {
    // Create a wrapped component that preserves the original props type
    const WrappedComponent = (props) => {
        return React.createElement(Component, props);
    };
    // Set display name for development tools
    WrappedComponent.displayName = `ZenReact_Wrapped(${Component.displayName || Component.name || 'Component'})`;
    const MemoizedComponent = React.memo(WrappedComponent, simpleCompare);
    // Set display name for the memoized component
    MemoizedComponent.displayName = `ZenReact(${Component.displayName || Component.name || 'Component'})`;
    return MemoizedComponent;
};

exports.simpleCompare = simpleCompare;
exports.useOptimizedState = useOptimizedState;
exports.withOptimization = withOptimization;
//# sourceMappingURL=index.js.map
