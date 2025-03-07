---
title: Component Optimization Patterns in Modern React
description: A comprehensive guide to advanced patterns and techniques for optimizing React components, including render optimization, hooks patterns, and performance strategies.
date: 2025-03-07
author: Zen React Team
readingTime: 22
image: /assets/react-patterns.png
series: optimization
tags:
  - React
  - Optimization
  - Patterns
  - Components
  - Performance
  - Best Practices
---

# Component Optimization Patterns in Modern React

As React applications grow in complexity, implementing the right component patterns becomes crucial for maintaining optimal performance. This guide explores advanced patterns for component optimization.

## Core Optimization Patterns

### 1. Smart Component Composition

```jsx
// Instead of prop drilling
function GrandParent({ data }) {
  return <Parent data={data} />;
}

function Parent({ data }) {
  return <Child data={data} />;
}

// Use component composition
function GrandParent({ data }) {
  const processedData = useMemo(() => processData(data), [data]);

  return (
    <DataContext.Provider value={processedData}>
      <Parent />
    </DataContext.Provider>
  );
}

function Parent() {
  return <Child />;
}

function Child() {
  const data = useContext(DataContext);
  return <div>{data.value}</div>;
}
```

### 2. Component Splitting Pattern

```jsx
// Before: Monolithic component
function ComplexDashboard({ data, filters, sorting }) {
  return (
    <div>
      <FilterPanel filters={filters} />
      <DataGrid data={data} sorting={sorting} />
      <Analytics data={data} />
    </div>
  );
}

// After: Split components with focused updates
function Dashboard({ data, filters, sorting }) {
  const memoizedFilters = useMemo(() => <FilterPanel filters={filters} />, [filters]);
  const memoizedGrid = useMemo(() => <DataGrid data={data} sorting={sorting} />, [data, sorting]);
  const memoizedAnalytics = useMemo(() => <Analytics data={data} />, [data]);

  return (
    <div>
      {memoizedFilters}
      {memoizedGrid}
      {memoizedAnalytics}
    </div>
  );
}
```

## Advanced Hook Patterns

### 1. Derived State Pattern

```jsx
function useDerivedState(value, transform) {
  const [derivedValue, setDerivedValue] = useState(() => transform(value));

  useEffect(() => {
    setDerivedValue(transform(value));
  }, [value, transform]);

  return derivedValue;
}

function OptimizedList({ items }) {
  const processedItems = useDerivedState(
    items,
    useCallback((items) => {
      return items.map(processItem).filter(filterItem);
    }, [])
  );

  return (
    <ul>
      {processedItems.map((item) => (
        <ListItem key={item.id} data={item} />
      ))}
    </ul>
  );
}
```

### 2. Event Handler Pattern

```jsx
function useEventCallback(handler) {
  const handlerRef = useRef(handler);

  useLayoutEffect(() => {
    handlerRef.current = handler;
  });

  return useCallback((...args) => {
    const fn = handlerRef.current;
    return fn(...args);
  }, []);
}

function OptimizedForm() {
  const [values, setValues] = useState({});

  const handleSubmit = useEventCallback(() => {
    submitForm(values);
  });

  return <form onSubmit={handleSubmit}>{/* Form fields */}</form>;
}
```

## State Management Patterns

### 1. State Splitting Pattern

```jsx
function useOptimizedState(initialState) {
  const [frequent, setFrequent] = useState(initialState.frequent);
  const [infrequent, setInfrequent] = useState(initialState.infrequent);

  const optimizedUpdate = useCallback((type, value) => {
    if (type === 'frequent') {
      setFrequent(value);
    } else {
      setInfrequent(value);
    }
  }, []);

  return { frequent, infrequent, optimizedUpdate };
}

function OptimizedComponent() {
  const { frequent, infrequent, optimizedUpdate } = useOptimizedState({
    frequent: { count: 0 },
    infrequent: { settings: {} },
  });

  return (
    <div>
      <FrequentUpdates data={frequent} onUpdate={optimizedUpdate} />
      <InfrequentUpdates data={infrequent} onUpdate={optimizedUpdate} />
    </div>
  );
}
```

### 2. Batch Update Pattern

```jsx
function useBatchUpdates(initialState) {
  const [state, setState] = useState(initialState);
  const batchQueue = useRef([]);

  const flushBatch = useCallback(() => {
    if (batchQueue.current.length === 0) return;

    setState((prevState) => {
      return batchQueue.current.reduce(
        (acc, update) => ({
          ...acc,
          ...update,
        }),
        prevState
      );
    });

    batchQueue.current = [];
  }, []);

  const queueUpdate = useCallback(
    (update) => {
      batchQueue.current.push(update);
      requestAnimationFrame(flushBatch);
    },
    [flushBatch]
  );

  return [state, queueUpdate];
}
```

## Render Optimization Patterns

### 1. Conditional Rendering Pattern

```jsx
function useDeferred(value, timeout = 0) {
  const [deferredValue, setDeferredValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDeferredValue(value);
    }, timeout);

    return () => clearTimeout(timeoutId);
  }, [value, timeout]);

  return deferredValue;
}

function OptimizedList({ items }) {
  const deferredItems = useDeferred(items, 100);

  return (
    <div>
      {items.length > 1000 ? (
        <VirtualizedList items={deferredItems} />
      ) : (
        <SimpleList items={deferredItems} />
      )}
    </div>
  );
}
```

### 2. Progressive Loading Pattern

```jsx
const LazyComponent = lazy(() => import('./HeavyComponent'));

function ProgressiveLoader({ children, fallback }) {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return shouldLoad ? children : fallback;
}
```

## Implementation Best Practices

1. **Component Design**

   - Keep components focused
   - Implement proper prop types
   - Use composition effectively
   - Split complex logic

2. **State Management**

   - Minimize state updates
   - Use appropriate patterns
   - Implement proper batching
   - Optimize context usage

3. **Render Control**
   - Implement smart memoization
   - Control re-render triggers
   - Use proper keys
   - Optimize lists

## Performance Monitoring

```jsx
const withPerformanceTracking = (WrappedComponent, options = {}) => {
  return function PerformanceTrackedComponent(props) {
    useEffect(() => {
      const start = performance.now();

      return () => {
        const duration = performance.now() - start;
        if (duration > options.threshold) {
          console.warn(`${WrappedComponent.name} took ${duration}ms to render`);
        }
      };
    });

    return <WrappedComponent {...props} />;
  };
};
```

## Conclusion

Implementing the right component optimization patterns is crucial for building performant React applications. These patterns provide a foundation for creating efficient, maintainable components that scale well with your application's growth.

Key takeaways:

- Choose patterns based on specific use cases
- Implement optimizations progressively
- Monitor performance impact
- Balance complexity with benefits

## Additional Resources

- [React Patterns Documentation](https://reactpatterns.com/)
- [Performance Optimization Guide](https://reactjs.org/docs/optimizing-performance.html)
- [Hooks Pattern Library](https://usehooks.com/)
- [React Design Patterns](https://www.patterns.dev/react)
