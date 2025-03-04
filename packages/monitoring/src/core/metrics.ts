import { MetricsBuffer } from './buffer';
import {
  Metric,
  RenderMetric,
  MemoryMetric,
  NetworkMetric,
  CustomMetric,
  CollectedMetrics,
  MetricCallback,
  NetworkStats,
  MemoryStats,
  NetworkTrackingOptions,
} from './types';
import { DEFAULT_OPTIONS, MEMORY_SAMPLING } from './constants';

/**
 * Core metrics collection implementation
 */
export class MetricsCollector {
  private buffer: MetricsBuffer;
  private isEnabled: boolean;
  private subscribers: Map<string, Set<MetricCallback>>;
  private memoryInterval: number | null;

  constructor(options: { bufferSize?: number } = {}) {
    this.buffer = new MetricsBuffer(options.bufferSize || DEFAULT_OPTIONS.bufferSize);
    this.isEnabled = true;
    this.subscribers = new Map();
    this.memoryInterval = null;
  }

  // Core collection methods
  private isValidInput(name: string, value?: number): boolean {
    if (!name || typeof name !== 'string' || name.trim() === '') return false;
    if (value !== undefined && (typeof value !== 'number' || value < 0 || !Number.isFinite(value)))
      return false;
    return true;
  }

  trackRender(componentId: string, duration?: number): () => void {
    if (!this.isEnabled) return () => {};
    if (!this.isValidInput(componentId)) return () => {};

    // Direct duration tracking
    if (typeof duration === 'number') {
      if (!this.isValidInput(componentId, duration)) return () => {};
      const metric: RenderMetric = {
        id: `render_${componentId}_${Date.now()}`,
        timestamp: Date.now(),
        type: 'render',
        value: duration,
        metadata: { componentId },
      };

      this.buffer.push(metric);
      this.notifySubscribers('render', duration);
      return () => {};
    }

    // Callback pattern for real-time tracking
    const startTime = performance.now();
    return () => {
      if (!this.isEnabled) return;

      const duration = performance.now() - startTime;
      if (!this.isValidInput(componentId, duration)) return;

      const metric: RenderMetric = {
        id: `render_${componentId}_${Date.now()}`,
        timestamp: Date.now(),
        type: 'render',
        value: duration,
        metadata: { componentId },
      };

      this.buffer.push(metric);
      this.notifySubscribers('render', duration);
    };
  }

  trackMemory(): MemoryStats {
    if (!this.isEnabled) return { used: 0, total: 0, limit: 0 };

    const memory = {
      heapUsed: typeof process !== 'undefined' ? process.memoryUsage().heapUsed : 0,
      heapTotal: typeof process !== 'undefined' ? process.memoryUsage().heapTotal : 0,
    };

    const metric: MemoryMetric = {
      id: `memory_${Date.now()}`,
      timestamp: Date.now(),
      type: 'memory',
      value: memory.heapUsed,
      metadata: memory,
    };

    this.buffer.push(metric);
    this.notifySubscribers('memory', memory.heapUsed);

    return {
      used: memory.heapUsed,
      total: memory.heapTotal,
      limit: memory.heapTotal, // For browser env this would be performance.memory.jsHeapSizeLimit
    };
  }

  startMemoryTracking(interval: number = MEMORY_SAMPLING.DEFAULT_INTERVAL): void {
    if (this.memoryInterval !== null) {
      this.stopMemoryTracking();
    }

    interval = Math.min(
      Math.max(interval, MEMORY_SAMPLING.MIN_INTERVAL),
      MEMORY_SAMPLING.MAX_INTERVAL
    );

    this.memoryInterval = window.setInterval(() => {
      this.trackMemory();
    }, interval);
  }

  stopMemoryTracking(): void {
    if (this.memoryInterval !== null) {
      clearInterval(this.memoryInterval);
      this.memoryInterval = null;
    }
  }

  trackNetwork(options: NetworkTrackingOptions = {}): () => void {
    const stats = {
      requests: 0,
      errors: 0,
      totalTime: 0,
    };

    const handler = (metric: NetworkMetric) => {
      if (options.urlPattern && !options.urlPattern.test(metric.metadata.url)) {
        return;
      }

      stats.requests++;
      if (metric.metadata.status && metric.metadata.status >= 400) {
        stats.errors++;
      }
      stats.totalTime += metric.value;

      options.onStats?.({
        requests: stats.requests,
        errors: stats.errors,
        averageTime: stats.totalTime / stats.requests,
      });
    };

    // Subscribe to network metrics
    this.subscribeToMetric('network', () => {
      const metrics = this.getMetrics().network;
      const latest = metrics[metrics.length - 1];
      if (latest) handler(latest);
    });

    return () => {
      this.unsubscribeFromMetric('network');
    };
  }

  trackCustomMetric(name: string, value: number, metadata?: Record<string, unknown>): void {
    if (!this.isEnabled) return;
    if (!this.isValidInput(name, value)) return;

    const metric: CustomMetric = {
      id: `custom_${name}_${Date.now()}`,
      timestamp: Date.now(),
      type: 'custom',
      value,
      metadata: {
        name,
        tags: metadata?.tag ? { tag: String(metadata.tag) } : {},
        ...Object.fromEntries(Object.entries(metadata || {}).filter(([key]) => key !== 'tag')),
      },
    };

    this.buffer.push(metric);
    this.notifySubscribers(name, value);
  }

  trackNetworkRequest(url: string, duration: number, status?: number): void {
    if (!this.isEnabled) return;

    const metric: NetworkMetric = {
      id: `network_${Date.now()}`,
      timestamp: Date.now(),
      type: 'network',
      value: duration,
      metadata: {
        url,
        status,
      },
    };

    this.buffer.push(metric);
    this.notifySubscribers('network', duration);
  }

  // Subscription methods
  subscribeToMetric(name: string, callback: MetricCallback): () => void {
    if (!this.subscribers.has(name)) {
      this.subscribers.set(name, new Set());
    }

    this.subscribers.get(name)!.add(callback);
    return () => this.unsubscribeFromMetric(name, callback);
  }

  unsubscribeFromMetric(name: string, callback?: MetricCallback): void {
    if (!this.subscribers.has(name)) return;

    if (callback) {
      this.subscribers.get(name)!.delete(callback);
    } else {
      this.subscribers.delete(name);
    }
  }

  private notifySubscribers(name: string, value: number): void {
    if (!this.subscribers.has(name)) return;

    this.subscribers.get(name)!.forEach((callback) => {
      try {
        callback(value);
      } catch (error) {
        console.error(`Error in metric subscriber for ${name}:`, error);
      }
    });
  }

  // Control methods
  enable(): void {
    this.isEnabled = true;
  }

  disable(): void {
    this.isEnabled = false;
    this.stopMemoryTracking();
  }

  // Data access methods
  getMetrics(): CollectedMetrics {
    const metrics = this.buffer.getData();
    return {
      renders: metrics.filter((m): m is RenderMetric => m.type === 'render'),
      memory: metrics.filter((m): m is MemoryMetric => m.type === 'memory'),
      network: metrics.filter((m): m is NetworkMetric => m.type === 'network'),
      custom: metrics.filter((m): m is CustomMetric => m.type === 'custom'),
    };
  }

  clearMetrics(): void {
    this.buffer.clear();
  }
}
