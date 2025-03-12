/**
 * @pattern PerformanceMonitoring
 * @rule MonitoringIntegration
 * Utility for monitoring component performance metrics
 */

// Performance metrics types
export interface PerformanceMetric {
  componentName: string;
  metricType: 'render' | 'interaction' | 'load' | 'network';
  duration: number;
  timestamp: number;
  metadata?: Record<string, any>;
}

// Storage for metrics
const metrics: PerformanceMetric[] = [];
const METRICS_LIMIT = 1000; // Limit stored metrics to prevent memory issues

// Configuration
let isEnabled = process.env.NODE_ENV !== 'test'; // Disabled in test environment
let shouldSampleMetrics = true; // Enable sampling to reduce overhead
const samplingRate = 0.2; // Only record 20% of metrics

/**
 * @pattern MetricCollection
 * @rule NonIntrusiveMonitoring
 * Record a performance metric with optional sampling
 */
export function recordMetric(metric: Omit<PerformanceMetric, 'timestamp'>): void {
  if (!isEnabled) return;
  
  // Apply sampling to reduce overhead
  if (shouldSampleMetrics && Math.random() > samplingRate) return;
  
  const fullMetric: PerformanceMetric = {
    ...metric,
    timestamp: Date.now(),
  };
  
  metrics.push(fullMetric);
  
  // Prevent unlimited growth
  if (metrics.length > METRICS_LIMIT) {
    metrics.shift();
  }
  
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.debug(`[Performance] ${metric.componentName} - ${metric.metricType}: ${metric.duration}ms`);
  }
}

/**
 * @pattern MetricReporting
 * @rule BackgroundReporting
 * Send metrics to monitoring endpoint in batches
 */
export function reportMetrics(): void {
  if (!isEnabled || metrics.length === 0) return;
  
  // In a real implementation, this would send to a backend service
  // For now, we'll just log to console
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Performance] Reporting ${metrics.length} metrics`);
  }
  
  // In production, we would send metrics to a backend
  if (process.env.NODE_ENV === 'production') {
    // Example implementation:
    // fetch('/api/performance-metrics', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ metrics }),
    // });
  }
}

// Report metrics periodically or on page unload
let reportingInterval: number | null = null;

/**
 * @pattern MonitoringLifecycle
 * @rule ResourceEfficient
 * Initialize performance monitoring with proper cleanup
 */
export function initializeMonitoring(): () => void {
  if (!isEnabled) return () => {};
  
  // Setup periodic reporting
  reportingInterval = window.setInterval(() => {
    reportMetrics();
  }, 60000); // Report every minute
  
  // Report on page unload
  const handleUnload = () => reportMetrics();
  window.addEventListener('beforeunload', handleUnload);
  
  // Return cleanup function
  return () => {
    if (reportingInterval) {
      clearInterval(reportingInterval);
      reportingInterval = null;
    }
    window.removeEventListener('beforeunload', handleUnload);
  };
}

/**
 * @pattern MonitoringConfiguration
 * @rule AdaptiveMonitoring
 * Configure monitoring behavior
 */
export function configureMonitoring(options: {
  enabled?: boolean;
  sampling?: boolean;
}): void {
  if (options.enabled !== undefined) {
    isEnabled = options.enabled;
  }
  
  if (options.sampling !== undefined) {
    shouldSampleMetrics = options.sampling;
  }
}

/**
 * @pattern PerformanceData
 * @rule DataAccess
 * Get current performance metrics for analysis
 */
export function getMetrics(): PerformanceMetric[] {
  return [...metrics];
} 