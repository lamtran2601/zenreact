// Core exports
export { MetricsCollector } from './core/metrics';
export { AlertManager } from './core/alerts';
export * from './core/types';
export * from './core/constants';

// React integration
export { MonitoringProvider, useMonitoring } from './react/provider';
export { usePerformance } from './react/hooks/usePerformance';
export { useRenderTracking } from './react/hooks/useRenderTracking';
export { useNetworkTracking } from './react/hooks/useNetworkTracking';
export { useMetricAlert } from './react/hooks/useMetricAlert';

// Dashboard components
export { Dashboard } from './dashboard/components/Dashboard';
export { MetricsChart } from './dashboard/components/MetricsChart';
export { AlertsList } from './dashboard/components/AlertsList';
