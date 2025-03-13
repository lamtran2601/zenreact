---
title: React Optimization Basics
description: Learn how to optimize React applications with zero configuration using ZenReact
date: 2025-03-06
author: Zen React Team
---

# React Optimization Basics

React optimization doesn't have to be complex. ZenReact provides zero-configuration performance optimization that "just works" while maintaining clean, readable code.

## Why Optimization Matters

React applications can face performance challenges:

- Unnecessary re-renders
- Slow state updates
- Memory leaks
- Poor bundle size

Traditional solutions require complex configuration and deep React knowledge. ZenReact solves these automatically.

## Core Features

### withOptimization HOC

```jsx
import { withOptimization } from '@zenreact/core';

// Before: Complex manual optimization
const MemoizedComponent = React.memo(MyComponent, (prev, next) => deepEqual(prev, next));

// After: Automatic optimization
const OptimizedComponent = withOptimization(MyComponent);
```

The `withOptimization` HOC:

- Prevents unnecessary re-renders
- Handles prop comparison automatically
- Adds zero bundle size overhead
- Works with any React component

### Smart Detection

ZenReact automatically:

- Identifies re-render patterns
- Batches related updates
- Optimizes memory usage
- Adjusts based on runtime metrics

### Performance Monitoring

Built-in monitoring provides:

- Real-time performance metrics
- Automatic optimization adjustments
- Development-mode insights
- Zero production overhead

## Best Practices

### When to Optimize

Apply optimization when components:

- Re-render frequently
- Handle complex data
- Manage user interactions
- Display large lists/tables

```jsx
// Do: Optimize data-heavy components
const ProductTable = withOptimization(({ products }) => (
  <table>
    {products.map((product) => (
      <tr key={product.id}>{/* Product rows */}</tr>
    ))}
  </table>
));

// Don't: Optimize simple static components
const Footer = () => <footer>© 2025 My App</footer>;
```

### Component Patterns

Follow these patterns for best results:

1. **Props Management**

```jsx
// Good: Flat props structure
const UserCard = withOptimization(({ name, email }) => (
  <div>
    {name} - {email}
  </div>
));

// Avoid: Nested prop objects
const UserCard = ({ user: { name, email } }) => (
  <div>
    {name} - {email}
  </div>
);
```

2. **Event Handlers**

```jsx
// Good: Using optimized state
const Counter = withOptimization(() => {
  const [count, setCount] = useOptimizedState(0);
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
});
```

3. **List Rendering**

```jsx
// Good: Optimized list component
const ItemList = withOptimization(({ items }) => (
  <ul>
    {items.map((item) => (
      <li key={item.id}>{item.name}</li>
    ))}
  </ul>
));
```

## Monitoring & Metrics

### Key Performance Indicators

ZenReact monitors:

- Re-render frequency
- Component update time
- Memory consumption
- Runtime optimization effectiveness

### Debugging

Enable debug mode for detailed insights:

```jsx
const MyComponent = withOptimization(BaseComponent, {
  debug: true,
  name: 'MyComponent',
});
```

This provides:

- Re-render logs
- Update timing
- Optimization decisions
- Memory usage stats

## Migration Guide

1. Install ZenReact:

```bash
npm install @zenreact/core
```

2. Identify optimization targets:

- Components with frequent updates
- Performance bottlenecks
- Complex data handling

3. Apply optimization:

```jsx
import { withOptimization } from '@zenreact/core';

// Convert existing components
const OptimizedComponent = withOptimization(ExistingComponent);

// New components
const NewComponent = withOptimization(({ data }) => (
  // Component logic
));
```

4. Monitor results:

- Check browser performance tools
- Review ZenReact debug output
- Measure user experience metrics

## Common Patterns

### Data Grid Optimization

```jsx
const OptimizedGrid = withOptimization(({ data, columns }) => (
  <div className="grid">
    {data.map((row) => (
      <Row key={row.id} data={row} columns={columns} />
    ))}
  </div>
));

const Row = withOptimization(({ data, columns }) => (
  <div className="row">
    {columns.map((col) => (
      <Cell key={col.id} value={data[col.id]} />
    ))}
  </div>
));
```

### Form Handling

```jsx
const OptimizedForm = withOptimization(({ onSubmit }) => {
  const [values, setValues] = useOptimizedState({});

  return (
    <form onSubmit={() => onSubmit(values)}>
      <input
        onChange={(e) =>
          setValues({
            ...values,
            name: e.target.value,
          })
        }
      />
    </form>
  );
});
```

### Real-time Updates

```jsx
const LiveData = withOptimization(({ stream }) => {
  const [data, setData] = useOptimizedState([]);

  useEffect(() => {
    stream.subscribe((newData) => {
      setData(newData); // Automatically optimized
    });
  }, [stream]);

  return <DataView data={data} />;
});
```

## Summary

ZenReact provides:

- Zero-configuration optimization
- Automatic performance improvements
- Built-in monitoring
- Simple migration path

Start optimizing your React applications today with `withOptimization` and `useOptimizedState`.
