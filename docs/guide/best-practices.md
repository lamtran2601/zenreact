---
title: Best Practices
description: Learn the best practices for optimizing React applications with ZenReact
head:
  - - meta
    - name: description
      content: Discover proven optimization strategies and best practices for using ZenReact in your React applications.
---

# Best Practices Guide

This guide covers recommended patterns and practices when using ZenReact to optimize your React applications.

## Component Optimization

### When to Use withOptimization

Use `withOptimization` when your component:

- Receives complex props that are expensive to compare
- Re-renders frequently due to parent updates
- Performs expensive computations or renders
- Is used in a list or grid with many items

```jsx
// Good: Complex data props
const UserProfile = withOptimization(({ user, permissions, settings }) => {
  // Component logic...
});

// Good: Expensive rendering
const DataGrid = withOptimization(({ rows, columns }) => {
  // Complex grid rendering...
});

// Not necessary: Simple props
const Button = ({ onClick, children }) => <button onClick={onClick}>{children}</button>;
```

### Component Structure

- Keep components focused and single-purpose
- Split large components into smaller, optimized pieces
- Use composition to build complex UIs

```jsx
// Better: Split into focused components
const UserCard = withOptimization(({ user }) => (
  <div>
    <UserAvatar user={user} />
    <UserInfo user={user} />
    <UserActions user={user} />
  </div>
));

// Instead of one large component
const UserCard = ({ user, permissions, settings, actions }) => {
  // Too many responsibilities...
};
```

## State Management

### Effective Use of useOptimizedState

`useOptimizedState` works best for:

- Form inputs with frequent updates
- Search inputs that trigger API calls
- Real-time data updates
- Animation states

```jsx
// Good: Search with API calls
function SearchComponent() {
  const [query, setQuery] = useOptimizedState('');

  useEffect(() => {
    // Auto-debounced API calls
    searchAPI(query);
  }, [query]);

  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
}

// Good: Real-time updates
function LiveData() {
  const [data, setData] = useOptimizedState([]);

  // Updates are automatically batched
  useEffect(() => {
    socket.on('update', setData);
  }, []);

  return <DataView data={data} />;
}
```

### State Structure

- Keep state minimal and focused
- Split complex state into manageable pieces
- Use appropriate data structures for your use case

```jsx
// Better: Split focused state
const [searchQuery, setSearchQuery] = useOptimizedState('');
const [filters, setFilters] = useOptimizedState({});
const [sortOrder, setSortOrder] = useOptimizedState('asc');

// Instead of one large state object
const [tableState, setTableState] = useState({
  search: '',
  filters: {},
  sort: 'asc',
  // ...more properties
});
```

## Performance Monitoring

### Using @zenreact/monitor

Monitor your application's performance to identify optimization opportunities:

```jsx
import { setupMonitor } from '@zenreact/monitor';

// Setup monitoring in development
if (process.env.NODE_ENV === 'development') {
  setupMonitor({
    logLevel: 'verbose',
    trackComponents: true,
    trackStateUpdates: true,
  });
}
```

### Key Metrics to Watch

- Component render times
- Re-render frequency
- State update patterns
- Props change patterns

## Testing

### Testing Optimized Components

When testing components using ZenReact optimizations:

```jsx
// Test optimization behavior
it('should prevent unnecessary re-renders', () => {
  const { rerender } = render(<OptimizedComponent data={data} />);

  // First render
  expect(screen.getByText('content')).toBeInTheDocument();

  // Re-render with same data
  rerender(<OptimizedComponent data={data} />);

  // Check that internal content hasn't been re-rendered
  expect(screen.getByText('content')).toBeInTheDocument();
});
```

## Code Splitting

### Using @zenreact/bundle

Optimize your bundle size:

```jsx
import { lazy } from '@zenreact/bundle';

// Automatically optimized code splitting
const HeavyComponent = lazy(() => import('./HeavyComponent'), {
  preload: true,
  fallback: <LoadingSpinner />,
});
```

## Server-Side Optimization

### Using @zenreact/server

Optimize server-rendered React applications:

```jsx
import { optimizeServer } from '@zenreact/server';

// Setup server optimization
optimizeServer({
  caching: true,
  compression: true,
  preloadComponents: ['CriticalComponent'],
});
```

## Common Issues

### Debugging Re-Render Issues

If you notice unnecessary re-renders:

1. Check component props with React DevTools
2. Verify prop equality comparisons
3. Use the monitoring tools to track render patterns
4. Consider splitting components further

### Memory Management

To prevent memory leaks:

1. Clean up effects properly
2. Unsubscribe from subscriptions
3. Clear intervals and timeouts
4. Dispose of heavy resources

```jsx
useEffect(() => {
  const subscription = subscribe();
  return () => {
    // Proper cleanup
    subscription.unsubscribe();
  };
}, []);
```

## Additional Tips

- Start with the simplest optimization and measure its impact
- Use the monitoring tools to guide optimization efforts
- Focus on user-facing performance first
- Test optimizations across different devices and network conditions
