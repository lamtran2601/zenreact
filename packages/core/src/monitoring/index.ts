export interface Metric {
  name: string;
  value: number;
  timestamp: number;
  component?: string;
  metadata?: Record<string, unknown>;
}

export interface MonitoringOptions {
  enabled?: boolean;
  sampleRate?: number;
  customMetrics?: boolean;
  development?: boolean;
}

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private options: MonitoringOptions;
  private metrics: Metric[] = [];

  private constructor(options: MonitoringOptions = {}) {
    this.options = {
      enabled: true,
      sampleRate: 1.0,
      customMetrics: true,
      development: process.env.NODE_ENV === 'development',
      ...options,
    };
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

  trackRender(componentName: string, duration: number): void {
    if (!this.shouldTrack()) return;

    this.addMetric({
      name: 'component_render',
      value: duration,
      component: componentName,
      timestamp: Date.now(),
    });
  }

  trackInteraction(componentName: string, type: string, duration: number): void {
    if (!this.shouldTrack()) return;

    this.addMetric({
      name: 'interaction',
      value: duration,
      component: componentName,
      metadata: { type },
      timestamp: Date.now(),
    });
  }

  addCustomMetric(name: string, value: number, metadata?: Record<string, unknown>): void {
    if (!this.options.customMetrics || !this.shouldTrack()) return;

    this.addMetric({
      name,
      value,
      timestamp: Date.now(),
      metadata: metadata || {},
    });
  }

  getMetrics(): Metric[] {
    return [...this.metrics];
  }

  clearMetrics(): void {
    this.metrics = [];
  }

  private shouldTrack(): boolean {
    return (this.options.enabled ?? true) && Math.random() <= (this.options.sampleRate || 1);
  }

  private isValidMetric(metric: Metric): boolean {
    // Validate required fields
    if (!metric.name || typeof metric.name !== 'string') return false;

    // Validate value is a reasonable number (between 0 and 1 hour in milliseconds)
    const MAX_REASONABLE_DURATION = 3600000; // 1 hour in milliseconds
    if (
      typeof metric.value !== 'number' ||
      !Number.isFinite(metric.value) ||
      metric.value < 0 ||
      metric.value > MAX_REASONABLE_DURATION
    )
      return false;

    // Validate specific metric types
    if (metric.name === 'component_render') {
      if (!metric.component) return false;
    }

    if (metric.name === 'interaction') {
      if (!metric.component || !metric.metadata?.type) return false;
    }

    return true;
  }

  private addMetric(metric: Metric): void {
    if (this.isValidMetric(metric)) {
      this.metrics.push(metric);
    }
  }
}

export const monitor = PerformanceMonitor.getInstance();
