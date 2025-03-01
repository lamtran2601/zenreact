# ZenReact User Guide

## Quick Start

### 1. Installation

```bash
# Install core package
npm install @zenreact/core

# Install optional packages as needed
npm install @zenreact/monitor  # For performance monitoring
npm install @zenreact/bundle   # For bundle optimization
npm install @zenreact/server   # For server-side features
```

### 2. Basic Usage

#### Optimizing Components

```jsx
import { withOptimization } from "@zenreact/core";

// Your regular React component
function UserProfile({ user, posts }) {
  return (
    <div>
      <h1>{user.name}</h1>
      <PostList posts={posts} />
    </div>
  );
}

// Wrap with optimization
export default withOptimization(UserProfile, {
  memoizeProps: true,
  deepCompare: false,
});
```

#### Using Optimized State

```jsx
import { useOptimizedState } from "@zenreact/core";

function SearchComponent() {
  const [query, setQuery] = useOptimizedState("", {
    debounce: 300, // Debounce updates by 300ms
    persist: true, // Persist across page reloads
    throttle: 1000, // Limit updates to once per second
  });

  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
```

## Common Use Cases

### 1. Performance Monitoring

```jsx
import { PerformanceProvider, usePerformance } from "@zenreact/monitor";

// Wrap your app with the provider
function App() {
  return (
    <PerformanceProvider>
      <YourApp />
    </PerformanceProvider>
  );
}

// Monitor performance in any component
function Dashboard() {
  const { metrics, startTracking, stopTracking } = usePerformance();

  return (
    <div>
      <h2>Performance Metrics</h2>
      <pre>{JSON.stringify(metrics, null, 2)}</pre>
    </div>
  );
}
```

### 2. Bundle Optimization

```jsx
import { useCodeSplitting } from "@zenreact/bundle";

function App() {
  const components = useCodeSplitting(
    {
      Dashboard: () => import("./pages/Dashboard"),
      Settings: () => import("./pages/Settings"),
      Profile: () => import("./pages/Profile"),
    },
    {
      preload: true,
      concurrent: true,
    }
  );

  return (
    <Router>
      <Route path="/dashboard" component={components.Dashboard} />
      <Route path="/settings" component={components.Settings} />
      <Route path="/profile" component={components.Profile} />
    </Router>
  );
}
```

### 3. Server-Side Optimization

```jsx
import { withEdgeOptimization, useSSR } from "@zenreact/server";

function ProductPage({ id }) {
  const [data, loading] = useSSR(() => fetch(`/api/products/${id}`), {
    streaming: true,
    cache: true,
    revalidate: 60, // Revalidate every minute
  });

  if (loading) return <Loading />;

  return <ProductDetail data={data} />;
}

// Optimize for edge computing
export default withEdgeOptimization(ProductPage, {
  regions: ["us-east", "eu-west"],
  cache: true,
});
```

## Best Practices

### 1. Component Optimization

DO:

```jsx
// Optimize heavy components
const HeavyChart = withOptimization(Chart, {
  deepCompare: true,
  updateThreshold: 16,
});

// Use optimized state for frequent updates
const [value, setValue] = useOptimizedState(0, {
  throttle: 16, // 60fps
});
```

DON'T:

```jsx
// Don't optimize simple components
const SimpleText = withOptimization(Text); // Unnecessary

// Don't use deep comparison for simple props
const SimpleList = withOptimization(List, {
  deepCompare: true, // Overkill for simple data
});
```

### 2. Performance Monitoring

DO:

```jsx
// Monitor specific components
function Dashboard() {
  const { metrics } = usePerformance('Dashboard');
  // Use metrics for optimization
}

// Set up alerts for performance issues
<PerformanceProvider
  alerts={{
    renderTime: 16, // Alert if render takes > 16ms
    memoryUsage: 50 // Alert if memory usage > 50MB
  }}
>
```

DON'T:

```jsx
// Don't monitor every tiny component
function Tooltip() {
  const { metrics } = usePerformance(); // Unnecessary overhead
}
```

### 3. Code Splitting

DO:

```jsx
// Split by route
const routes = useCodeSplitting({
  Home: () => import('./Home'),
  Dashboard: () => import('./Dashboard')
});

// Preload on hover
<Link
  to="/dashboard"
  onMouseEnter={() => routes.Dashboard.preload()}
>
```

DON'T:

```jsx
// Don't split tiny components
const Button = useCodeSplitting({
  SmallButton: () => import("./Button"), // Too small to split
});
```

## Troubleshooting

### Common Issues

1. **Unnecessary Re-renders**

   ```jsx
   // Check if optimization is working
   withOptimization(Component, {
     debugRenders: true, // Logs render reasons
   });
   ```

2. **Performance Issues**

   ```jsx
   // Monitor specific metrics
   const { getMetrics } = usePerformance();
   console.log(getMetrics("renderTime"));
   ```

3. **Bundle Size Problems**
   ```jsx
   // Analyze bundle composition
   import { analyzeBuild } from "@zenreact/bundle";
   analyzeBuild().then(console.log);
   ```

## CLI Tools

```bash
# Analyze performance
zenreact analyze

# Generate optimization report
zenreact report

# Monitor real-time metrics
zenreact monitor

# Initialize optimization config
zenreact init
```

## IDE Integration

1. Install the ZenReact VSCode extension
2. Get real-time optimization suggestions
3. Use quick-fix actions for performance issues
4. Monitor performance metrics in the editor

## Support Resources

1. [Documentation](https://zenreact.dev/docs)
2. [GitHub Issues](https://github.com/zenreact/zenreact/issues)
3. [Discord Community](https://discord.gg/zenreact)
4. [Stack Overflow](https://stackoverflow.com/questions/tagged/zenreact)

This guide covers the basic usage patterns for ZenReact. For more detailed documentation and advanced features, visit the official documentation.
