# ZenReact Monitoring System

## Features

### 1. Real-Time Dashboard

The dashboard provides real-time visualization of:

- Component render times with per-component breakdown
- Memory usage trends
- Network performance metrics
- Request status codes and slow endpoints

### 2. Alert System

Configurable alert system with:

- Predefined thresholds for common issues
- Custom threshold support
- Multiple severity levels (info, warning, error)
- Alert history with automatic cleanup
- Real-time notifications

Example usage:

```typescript
import { AlertManager, createThresholds } from './alerts/AlertManager';

const alertManager = new AlertManager({ maxAlertHistory: 50 });

// Add thresholds
alertManager.addThreshold(
  createThresholds.highMemoryUsage(100) // Alert when memory > 100MB
);

alertManager.addThreshold(
  createThresholds.slowNetwork(1000) // Alert when requests > 1s
);

// Subscribe to alerts
const unsubscribe = alertManager.subscribe((alert) => {
  console.log(`[${alert.severity}] ${alert.message}`);
});
```

### 3. Metric Persistence

Metrics are automatically persisted to:

- Preserve history between sessions
- Track long-term trends
- Configure retention period
- Automatic cleanup of old data

## Usage

### Basic Setup

```typescript
import { MetricsDashboard } from '@zenreact/core';

function App() {
  return (
    <MetricsDashboard
      endpoint="ws://your-metrics-server:3001"
      updateInterval={1000}
      historyDuration={60 * 60 * 1000} // 1 hour
    />
  );
}
```

### Custom Alert Thresholds

```typescript
import { createThresholds } from '@zenreact/core';

// Create custom threshold
const customThreshold = {
  id: 'custom_alert',
  name: 'Custom Alert',
  description: 'Custom alert condition',
  type: 'render',
  severity: 'warning',
  condition: (metrics) => {
    // Custom logic here
    return metrics.renders.averageDuration > 100;
  },
};

alertManager.addThreshold(customThreshold);
```

## Configuration

### Dashboard Props

- `endpoint`: WebSocket endpoint for real-time metrics
- `updateInterval`: How often to update metrics (ms)
- `historyDuration`: How long to keep metric history

### Alert Manager Options

- `maxAlertHistory`: Maximum number of alerts to keep in history
- Customizable thresholds and severity levels
- Configurable alert conditions

## Best Practices

1. Set appropriate thresholds based on your application's requirements
2. Monitor memory usage to prevent leaks
3. Track slow components and optimize render times
4. Keep alert messages clear and actionable
5. Regularly review and clean up old metrics
