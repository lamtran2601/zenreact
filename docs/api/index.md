---
title: API Reference
description: Complete API documentation for ZenReact optimization framework
---

# API Reference

## Core APIs

### withOptimization

```tsx
function withOptimization<P extends object>(
  Component: React.ComponentType<P>
): React.ComponentType<P>;
```

A higher-order component that automatically optimizes React component rendering.

#### Example

```jsx
import { withOptimization } from '@zenreact/core';

function MyComponent({ data }) {
  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
    </div>
  );
}

export default withOptimization(MyComponent);
```

### useOptimizedState

```tsx
function useOptimizedState<T>(
  initialState: T | (() => T)
): [T, (value: T | ((prev: T) => T)) => void];
```

A React hook that provides optimized state management with automatic performance improvements.

#### Example

```jsx
import { useOptimizedState } from '@zenreact/core';

function SearchBox() {
  const [search, setSearch] = useOptimizedState('');

  return (
    <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." />
  );
}
```

## Additional Resources

- [Quick Start Guide](/guide/quick-start)
- [Best Practices](/guide/best-practices)
- [Example Projects](/examples/)
