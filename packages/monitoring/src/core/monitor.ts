import { MetricsCollector } from './metrics';
import { DEFAULT_OPTIONS } from './constants';
import type { MonitoringOptions } from '../types';
import type { AlertManager } from './alerts';

/**
 * Main performance monitoring interface
 * Provides a singleton instance for consistent monitoring across the application
 */
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private options: Required<MonitoringOptions>;
  private collector: MetricsCollector;
  private alertManager?: AlertManager;

  private constructor(options: MonitoringOptions = {}) {
    this.options = {
      ...DEFAULT_OPTIONS,
      ...options,
    };

    this.collector = new MetricsCollector({
      bufferSize: this.options.bufferSize,
    });

    // Alert manager is lazily instantiated when needed
    if (options.alerts) {
      import('./alerts').then(({ AlertManager }) => {
        this.alertManager = new AlertManager();
        this.setupDefaultAlerts();
      });
    }
  }

  static getInstance(options?: MonitoringOptions): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor(options);
    }
    return PerformanceMonitor.instance;
  }

  static resetInstance(options?: MonitoringOptions): void {
    if (PerformanceMonitor.instance) {
      PerformanceMonitor.instance.dispose();
    }
    PerformanceMonitor.instance = new PerformanceMonitor(options);
  }

  // Core tracking methods
  trackRender(componentName: string, duration: number): void {
    if (!this.shouldTrack()) return;
    this.collector.trackRender(componentName, duration);
  }

  trackInteraction(componentName: string, type: string, duration: number): void {
    if (!this.shouldTrack()) return;

    const metricName = `interaction_${type}`;
    this.trackCustomMetric(metricName, duration, {
      component: componentName,
      type,
    });
  }

  trackMemory(): ReturnType<MetricsCollector['trackMemory']> {
    if (!this.shouldTrack()) return { used: 0, total: 0, limit: 0 };
    return this.collector.trackMemory();
  }

  trackNetwork(
    options: Parameters<MetricsCollector['trackNetwork']>[0]
  ): ReturnType<MetricsCollector['trackNetwork']> {
    return this.collector.trackNetwork(options);
  }

  // Custom metrics
  trackCustomMetric(name: string, value: number, metadata?: Record<string, unknown>): void {
    if (!this.options.customMetrics || !this.shouldTrack()) return;
    this.collector.trackCustomMetric(name, value, metadata);
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

  // Control methods
  enable(): void {
    this.options.enabled = true;
    this.collector.enable();
  }

  disable(): void {
    this.options.enabled = false;
    this.collector.disable();
  }

  // Alert configuration (lazy loaded)
  async configureAlert(metricName: string, config: any): Promise<() => void> {
    if (!this.alertManager) {
      const { AlertManager } = await import('./alerts');
      this.alertManager = new AlertManager();
      this.setupDefaultAlerts();
    }
    return this.alertManager.configureAlert(metricName, config);
  }

  private shouldTrack(): boolean {
    return (this.options.enabled ?? true) && Math.random() <= (this.options.sampleRate || 1);
  }

  private setupDefaultAlerts(): void {
    if (!this.alertManager) return;

    // Set up default alert thresholds
    this.alertManager.setupDefaultThresholds();
  }

  private dispose(): void {
    this.collector.disable();
    this.stopMemoryTracking();
    // Clean up any other resources
  }
}

// Export singleton instance
export const monitor = PerformanceMonitor.getInstance();

// Export types
export type { MonitoringOptions };
