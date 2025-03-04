# @zenreact/monitoring

Performance monitoring and analytics package for React applications. This package provides comprehensive monitoring capabilities including component render tracking, memory usage monitoring, network request tracking, and real-time visualization.

## Installation

```bash
npm install @zenreact/monitoring
# or
yarn add @zenreact/monitoring
# or
pnpm add @zenreact/monitoring
```

## Quick Start

```tsx
import { MonitoringProvider, usePerformance, Dashboard } from '@zenreact/monitoring';

// Wrap your app with the provider
function App() {
  return (
    <MonitoringProvider>
      <YourApp />
      <Dashboard />
    </MonitoringProvider>
  );
}

// Monitor component performance
function MyComponent() {
  const { trackRender } = usePerformance({
    componentId: 'MyComponent',
    memoryTracking: true,
  });

  useEffect(() => {
    return trackRender(); // Auto-tracks render duration
  });

  return <div>My Component</div>;
}
```

## Features

- 📊 Real-time performance monitoring
- 🔍 Component render tracking
- 📈 Memory usage monitoring
- 🌐 Network request tracking
- 📝 Custom metrics support
- 📱 Real-time visualization with charts
- ⚠️ Configurable alerts system

## Core APIs

### MonitoringProvider

Provides monitoring context to your application:

```tsx
<MonitoringProvider
  options={{
    bufferSize: 1000,
    memoryTracking: true,
    memoryInterval: 5000,
  }}
>
  {children}
</MonitoringProvider>
```

### Hooks

#### usePerformance

```tsx
const { trackRender, getMetrics } = usePerformance({
  componentId: 'MyComponent',
  memoryTracking: true,
  alerts: {
    renderTime: {
      threshold: 16, // ms
      level: 'warning',
    },
  },
});
```

#### useRenderTracking

```tsx
const { renderCount, getMetrics } = useRenderTracking({
  componentId: 'MyComponent',
  onRender: (duration) => console.log(`Render took ${duration}ms`),
});
```

#### useNetworkTracking

```tsx
const { stats, trackRequest } = useNetworkTracking({
  urlPattern: /api\/.*/, // Optional URL pattern to monitor
  alert: {
    threshold: 1000, // Alert on requests taking > 1s
    level: 'error',
  },
});
```

#### useMetricAlert

```tsx
useMetricAlert({
  name: 'custom-metric',
  threshold: 100,
  severity: 'warning',
  onTrigger: (msg, severity) => console.warn(msg),
});
```

### Dashboard Components

#### Dashboard

Main monitoring dashboard with charts and alerts:

```tsx
<Dashboard
  refreshInterval={5000}
  showAlerts={true}
  showCharts={{
    render: true,
    memory: true,
    network: true,
  }}
/>
```

## Migration from @zenreact/core

If you're migrating from @zenreact/core, replace imports:

```diff
- import { monitor } from '@zenreact/core';
+ import { monitor } from '@zenreact/monitoring';
```

## License

MIT
