import { MetricsCollector } from './metrics';
import { AlertManager, AlertConfig, AlertThreshold, createThresholds } from './alerts/AlertManager';
import { AggregatedMetrics } from './aggregator';

export interface MonitoringOptions {
  enabled?: boolean;
  sampleRate?: number;
  customMetrics?: boolean;
  development?: boolean;
  bufferSize?: number;
}

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private options: MonitoringOptions;
  private collector: MetricsCollector;
  private alertManager: AlertManager;
  private constructor(options: MonitoringOptions = {}) {
    this.options = {
      enabled: true,
      sampleRate: 1.0,
      customMetrics: true,
      development: process.env.NODE_ENV === 'development',
      bufferSize: 1000,
      ...options,
    };

    this.collector = new MetricsCollector({ bufferSize: this.options.bufferSize });
    this.alertManager = new AlertManager();

    // Set up default thresholds
    this.alertManager.addThreshold(createThresholds.slowRender('*', 100));
    this.alertManager.addThreshold(createThresholds.highMemoryUsage(100));
    this.alertManager.addThreshold(createThresholds.slowNetwork(1000));
    this.alertManager.addThreshold(createThresholds.highErrorRate(10));
  }

  static getInstance(options?: MonitoringOptions): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor(options);
    }
    return PerformanceMonitor.instance;
  }

  static resetInstance(options?: MonitoringOptions): void {
    PerformanceMonitor.instance = new PerformanceMonitor(options);
  }

  // Core tracking methods
  trackRender(componentName: string, duration: number): void {
    if (!this.shouldTrack()) return;
    if (!this.isValidMetricInput(componentName, duration)) return;
    this.collector.trackRender(componentName, duration);
  }

  private isValidMetricInput(name: string, value?: number): boolean {
    return (
      Boolean(name) &&
      name.trim() !== '' &&
      (value === undefined || (Number.isFinite(value) && value >= 0))
    );
  }

  trackInteraction(componentName: string, type: string, duration: number): void {
    if (!this.shouldTrack()) return;
    if (!this.isValidMetricInput(componentName) || !this.isValidMetricInput(type, duration)) return;

    const metricName = `interaction_${type}`;
    if (!this.isValidMetricInput(metricName, duration)) return;

    this.trackCustomMetric(metricName, duration, {
      component: componentName,
      type,
    });
  }

  trackMemory(): { used: number; total: number; limit: number } {
    if (!this.shouldTrack()) return { used: 0, total: 0, limit: 0 };
    return this.collector.trackMemory();
  }

  trackNetwork(options: {
    urlPattern?: RegExp;
    onStats?: (stats: { requests: number; errors: number; averageTime: number }) => void;
  }): () => void {
    return this.collector.trackNetwork(options);
  }

  // Custom metrics
  trackCustomMetric(name: string, value: number, metadata?: Record<string, unknown>): void {
    if (!this.options.customMetrics || !this.shouldTrack()) return;
    if (!this.isValidMetricInput(name, value)) return;
    this.collector.trackCustomMetric(name, value, metadata);
  }

  // Alert configuration
  configureAlert(
    metricName: string,
    config: AlertConfig & {
      onTrigger: (message: string, level: 'warning' | 'error' | 'critical') => void;
      onResolve: () => void;
    }
  ): () => void {
    const threshold: AlertThreshold = {
      id: `alert_${metricName}_${Date.now()}`,
      name: `${metricName} Alert`,
      description: `${metricName} exceeded threshold of ${config.threshold}`,
      type: 'custom',
      severity: config.level as AlertThreshold['severity'],
      condition: (metrics: AggregatedMetrics) => {
        const metric = metrics.custom.byName[metricName];
        return metric && metric.latest > config.threshold;
      },
    };

    this.alertManager.addThreshold(threshold);

    const unsubscribe = this.alertManager.subscribe((alert) => {
      if (alert.thresholdId === threshold.id) {
        config.onTrigger(alert.message, alert.severity as 'warning' | 'error' | 'critical');
      }
    });

    return () => {
      unsubscribe();
      this.alertManager.removeThreshold(threshold.id);
    };
  }

  // Subscription methods
  subscribeToMetric(name: string, callback: (value: number) => void): () => void {
    return this.collector.subscribeToMetric(name, callback);
  }

  // Memory tracking control
  startMemoryTracking(interval: number): void {
    this.collector.startMemoryTracking(interval);
  }

  stopMemoryTracking(): void {
    this.collector.stopMemoryTracking();
  }

  // Data access
  getMetrics(): ReturnType<MetricsCollector['getMetrics']> {
    return this.collector.getMetrics();
  }

  clearMetrics(): void {
    this.collector.clearMetrics();
  }

  enable(): void {
    this.options.enabled = true;
    this.collector.enable();
  }

  disable(): void {
    this.options.enabled = false;
    this.collector.disable();
  }

  private shouldTrack(): boolean {
    return (this.options.enabled ?? true) && Math.random() <= (this.options.sampleRate || 1);
  }
}

export const monitor = PerformanceMonitor.getInstance();

// Type exports
export type { AlertConfig } from './alerts/AlertManager';
export type { CustomMetric } from './metrics';

// Export all hooks
export * from './hooks';
