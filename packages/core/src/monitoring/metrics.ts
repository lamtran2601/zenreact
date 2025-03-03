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

  constructor(options: { bufferSize?: number } = {}) {
    this.buffer = new MetricsBuffer(options.bufferSize || 1000);
    this.isEnabled = true;
  }

  // Core collection methods
  trackRender(componentId: string): () => void {
    const startTime = performance.now();
    return () => {
      if (!this.isEnabled) return;

      const duration = performance.now() - startTime;
      this.buffer.push({
        id: `render_${componentId}_${Date.now()}`,
        timestamp: Date.now(),
        type: 'render',
        value: duration,
        metadata: { componentId },
      } as RenderMetric);
    };
  }

  trackMemory(): void {
    if (!this.isEnabled) return;

    // Note: In browser environment we'd use performance.memory
    // For now we track basic memory stats
    const memory = {
      heapUsed: typeof process !== 'undefined' ? process.memoryUsage().heapUsed : 0,
      heapTotal: typeof process !== 'undefined' ? process.memoryUsage().heapTotal : 0,
    };

    this.buffer.push({
      id: `memory_${Date.now()}`,
      timestamp: Date.now(),
      type: 'memory',
      value: memory.heapUsed,
      metadata: memory,
    } as MemoryMetric);
  }

  trackNetwork(url: string): { complete: (status: number) => void } {
    const startTime = performance.now();
    return {
      complete: (status: number) => {
        if (!this.isEnabled) return;

        const duration = performance.now() - startTime;
        this.buffer.push({
          id: `network_${url}_${Date.now()}`,
          type: 'network',
          timestamp: Date.now(),
          value: duration,
          metadata: { url, status },
        } as NetworkMetric);
      },
    };
  }

  // Custom metrics support
  addCustomMetric(metric: CustomMetric): void {
    if (!this.isEnabled) return;
    this.buffer.push(metric);
  }

  // Control methods
  enable(): void {
    this.isEnabled = true;
  }

  disable(): void {
    this.isEnabled = false;
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
