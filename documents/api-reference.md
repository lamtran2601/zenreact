# ZenReact API Reference

## Core Package

### High-Order Component

#### `withOptimization<P>(Component: React.ComponentType<P>)`

A higher-order component that optimizes rendering performance by preventing unnecessary re-renders using shallow comparison.

**Example:**

```tsx
const OptimizedComponent = withOptimization(MyComponent);
```

### Hooks

#### `useOptimizedState<T>(initialState: T): [T, (value: T) => void]`

A custom hook for optimized state management that prevents unnecessary updates using shallow comparison.

**Example:**

```tsx
function Counter() {
  const [count, setCount] = useOptimizedState(0);

  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

### Utilities

#### `simpleCompare<T>(val1: T, val2: T): boolean`

A type-safe shallow comparison function that efficiently handles common data types.

- Handles primitives (number, string, boolean)
- Performs shallow object comparison
- Basic array comparison
- Safe with null/undefined
- No circular reference checking needed due to shallow comparison

**Example:**

```typescript
// Compare primitives
simpleCompare(1, 1); // true
simpleCompare('test', 'test'); // true

// Compare objects (shallow)
simpleCompare({ a: 1 }, { a: 1 }); // true
simpleCompare({ a: 1 }, { a: 2 }); // false

// Compare arrays (shallow)
simpleCompare([1, 2, 3], [1, 2, 3]); // true
```

#### `isPlainObject(value: unknown): value is Record<string, unknown>`

A type guard function that checks if a value is a plain object.

```typescript
isPlainObject({}); // true
isPlainObject([]); // false
isPlainObject(null); // false
```

## Best Practices

1. **Component Optimization**

   - Use `withOptimization` for components that:
     - Receive frequent prop updates
     - Have expensive render logic
     - Are deep in the component tree

2. **State Management**

   - Use `useOptimizedState` when you need:
     - To prevent unnecessary re-renders
     - Simple state comparison logic
     - Type-safe state updates

3. **Performance Considerations**
   - The library uses shallow comparison for better performance
   - For deep object comparisons, consider implementing custom comparison logic
   - Keep component props and state shallow when possible

## Type Definitions

Complete type definitions are available for TypeScript projects. The library is built with strict type checking and provides full type inference.
