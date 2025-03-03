// Types
export interface Metric {
  id: string;
  timestamp: number;
  type: 'render' | 'memory' | 'network' | 'custom';
  value: number;
  metadata?: Record<string, unknown>;
}

export interface RenderMetric extends Metric {
  type: 'render';
  metadata: {
    componentId: string;
  };
}

export interface MemoryMetric extends Metric {
  type: 'memory';
  metadata: {
    heapUsed: number;
    heapTotal: number;
  };
}

export interface NetworkMetric extends Metric {
  type: 'network';
  metadata: {
    url: string;
    status?: number;
  };
}

export interface CustomMetric extends Metric {
  type: 'custom';
  metadata: {
    name: string;
    tags: Record<string, string>;
  };
}

export interface CollectedMetrics {
  renders: RenderMetric[];
  memory: MemoryMetric[];
  network: NetworkMetric[];
  custom: CustomMetric[];
}

type MetricCallback = (value: number) => void;

// Buffer implementation
export class MetricsBuffer {
  private data: Metric[];
  private maxSize: number;

  constructor(size: number) {
    this.data = [];
    this.maxSize = size;
  }

  push(metric: Metric): void {
    if (this.data.length >= this.maxSize) {
      this.data.shift(); // Remove oldest metric if buffer is full
    }
    this.data.push(metric);
  }

  clear(): void {
    this.data = [];
  }

  getData(): Metric[] {
    return [...this.data];
  }
}

// Main collector implementation
export class MetricsCollector {
  private buffer: MetricsBuffer;
  private isEnabled: boolean;
  private subscribers: Map<string, Set<MetricCallback>>;
  private memoryInterval: number | null;

  constructor(options: { bufferSize?: number } = {}) {
    this.buffer = new MetricsBuffer(options.bufferSize || 1000);
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
      const metric = {
        id: `render_${componentId}_${Date.now()}`,
        timestamp: Date.now(),
        type: 'render',
        value: duration,
        metadata: { componentId },
      } as RenderMetric;

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

      const metric = {
        id: `render_${componentId}_${Date.now()}`,
        timestamp: Date.now(),
        type: 'render',
        value: duration,
        metadata: { componentId },
      } as RenderMetric;

      this.buffer.push(metric);
      this.notifySubscribers('render', duration);
    };
  }

  trackMemory(): { used: number; total: number; limit: number } {
    if (!this.isEnabled) return { used: 0, total: 0, limit: 0 };

    // Note: In browser environment we'd use performance.memory
    const memory = {
      heapUsed: typeof process !== 'undefined' ? process.memoryUsage().heapUsed : 0,
      heapTotal: typeof process !== 'undefined' ? process.memoryUsage().heapTotal : 0,
    };

    const metric = {
      id: `memory_${Date.now()}`,
      timestamp: Date.now(),
      type: 'memory',
      value: memory.heapUsed,
      metadata: memory,
    } as MemoryMetric;

    this.buffer.push(metric);
    this.notifySubscribers('memory', memory.heapUsed);

    return {
      used: memory.heapUsed,
      total: memory.heapTotal,
      limit: memory.heapTotal, // For browser env this would be performance.memory.jsHeapSizeLimit
    };
  }

  startMemoryTracking(interval: number): void {
    if (this.memoryInterval !== null) {
      clearInterval(this.memoryInterval);
    }

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

  trackNetwork(
    options: {
      urlPattern?: RegExp;
      onStats?: (stats: { requests: number; errors: number; averageTime: number }) => void;
    } = {}
  ): () => void {
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

  // Custom metrics support
  trackCustomMetric(name: string, value: number, metadata?: Record<string, unknown>): void {
    if (!this.isEnabled) return;
    if (!this.isValidInput(name, value)) return;

    const metric = {
      id: `custom_${name}_${Date.now()}`,
      timestamp: Date.now(),
      type: 'custom',
      value,
      metadata: {
        name,
        tags: metadata?.tag ? { tag: metadata.tag } : {},
        ...Object.fromEntries(Object.entries(metadata || {}).filter(([key]) => key !== 'tag')),
      },
    } as CustomMetric;

    this.buffer.push(metric);
    this.notifySubscribers(name, value);
  }

  // Network tracking method
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
