import {
  RenderMetric,
  MemoryMetric,
  NetworkMetric,
  CollectedMetrics,
  CustomMetric,
} from './metrics';
import { AggregatedMetrics, MetricsAggregator } from './aggregator';
import React from 'react';

interface MetricsBuffer extends CollectedMetrics {
  renders: RenderMetric[];
  memory: MemoryMetric[];
  network: NetworkMetric[];
  custom: CustomMetric[];
}

export interface RealTimeMetricsOptions {
  endpoint: string;
  updateInterval?: number; // How often to emit updates (ms)
  bufferSize?: number; // How many metrics to buffer before aggregating
  retryInterval?: number; // How long to wait before reconnecting (ms)
}

interface MetricsUpdate {
  type: 'render' | 'memory' | 'network' | 'custom';
  metric: RenderMetric | MemoryMetric | NetworkMetric | CustomMetric;
  timestamp: number;
}

export class RealTimeMetricsMonitor {
  private ws: WebSocket | null = null;
  private buffer: MetricsBuffer = {
    renders: [],
    memory: [],
    network: [],
    custom: [],
  };
  private listeners: Set<(metrics: AggregatedMetrics) => void> = new Set();
  private updateTimeout: NodeJS.Timeout | null = null;
  private readonly options: Required<RealTimeMetricsOptions>;

  constructor(options: RealTimeMetricsOptions) {
    this.options = {
      updateInterval: 1000, // Default to 1 second updates
      bufferSize: 100, // Default buffer size
      retryInterval: 5000, // Default to 5 second retry
      ...options,
    };
  }

  /**
   * Start monitoring and streaming metrics
   */
  public start(): void {
    this.connect();
  }

  /**
   * Stop monitoring and cleanup
   */
  public stop(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    if (this.updateTimeout) {
      clearTimeout(this.updateTimeout);
      this.updateTimeout = null;
    }
    this.listeners.clear();
  }

  /**
   * Subscribe to real-time metric updates
   */
  public subscribe(callback: (metrics: AggregatedMetrics) => void): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  private retryCount = 0;
  private maxRetryCount = 5;

  /**
   * Send a metric update to the server
   */
  public sendMetric(
    type: 'render' | 'memory' | 'network' | 'custom',
    metric: RenderMetric | MemoryMetric | NetworkMetric | CustomMetric
  ): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      console.warn('WebSocket not connected, metric update discarded');
      return;
    }

    const update: MetricsUpdate = {
      type,
      metric,
      timestamp: Date.now(),
    };

    this.ws.send(JSON.stringify(update));
  }

  /**
   * Track a network request
   */
  public trackNetworkRequest(url: string, duration: number, status?: number): void {
    const metric: NetworkMetric = {
      id: `network_${url}_${Date.now()}`,
      timestamp: Date.now(),
      type: 'network',
      value: duration,
      metadata: { url, status },
    };
    this.sendMetric('network', metric);
  }

  /**
   * Track a component render
   */
  public trackRender(componentId: string, duration: number): void {
    const metric: RenderMetric = {
      id: `render_${componentId}_${Date.now()}`,
      timestamp: Date.now(),
      type: 'render',
      value: duration,
      metadata: { componentId },
    };
    this.sendMetric('render', metric);
  }

  /**
   * Track memory usage
   */
  public trackMemory(heapUsed: number, heapTotal: number): void {
    const metric: MemoryMetric = {
      id: `memory_${Date.now()}`,
      timestamp: Date.now(),
      type: 'memory',
      value: heapUsed,
      metadata: { heapUsed, heapTotal },
    };
    this.sendMetric('memory', metric);
  }

  /**
   * Track a custom metric
   */
  public trackCustomMetric(name: string, value: number, tags: Record<string, string> = {}): void {
    const metric: CustomMetric = {
      id: `custom_${name}_${Date.now()}`,
      timestamp: Date.now(),
      type: 'custom',
      value: value,
      metadata: { name, tags },
    };
    this.sendMetric('custom', metric);
  }

  private connect(): void {
    try {
      this.ws = new WebSocket(this.options.endpoint);

      this.ws.onmessage = (event) => {
        const update = JSON.parse(event.data) as MetricsUpdate;
        this.handleUpdate(update);
      };

      this.ws.onopen = () => {
        console.log('WebSocket connected');
        this.retryCount = 0; // Reset retry count on successful connection
        // Start update loop
        this.scheduleUpdate();
      };

      this.ws.onclose = () => {
        // Implement exponential backoff
        const backoffDelay = Math.min(
          1000 * Math.pow(2, this.retryCount),
          this.options.retryInterval
        );

        if (this.retryCount < this.maxRetryCount) {
          console.log(`Attempting to reconnect in ${backoffDelay}ms...`);
          this.retryCount++;
          setTimeout(() => this.connect(), backoffDelay);
        } else {
          console.error('Max retry attempts reached, giving up reconnection');
        }
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.ws?.close();
      };
    } catch (error) {
      console.error('Failed to connect:', error);
      // Attempt to reconnect with exponential backoff
      const backoffDelay = Math.min(
        1000 * Math.pow(2, this.retryCount),
        this.options.retryInterval
      );

      if (this.retryCount < this.maxRetryCount) {
        console.log(`Attempting to reconnect in ${backoffDelay}ms...`);
        this.retryCount++;
        setTimeout(() => this.connect(), backoffDelay);
      } else {
        console.error('Max retry attempts reached, giving up reconnection');
      }
    }
  }
  private handleUpdate(update: MetricsUpdate): void {
    // Add metric to appropriate buffer
    switch (update.type) {
      case 'render':
        this.buffer.renders.push(update.metric as RenderMetric);
        if (this.buffer.renders.length > this.options.bufferSize) {
          this.buffer.renders.shift();
        }
        break;
      case 'memory':
        this.buffer.memory.push(update.metric as MemoryMetric);
        if (this.buffer.memory.length > this.options.bufferSize) {
          this.buffer.memory.shift();
        }
        break;
      case 'network':
        this.buffer.network.push(update.metric as NetworkMetric);
        if (this.buffer.network.length > this.options.bufferSize) {
          this.buffer.network.shift();
        }
        break;
      case 'custom':
        this.buffer.custom.push(update.metric as CustomMetric);
        if (this.buffer.custom.length > this.options.bufferSize) {
          this.buffer.custom.shift();
        }
        break;
      default:
        console.warn(`Unknown metric type: ${(update as MetricsUpdate).type}`);
    }
  }

  private scheduleUpdate(): void {
    this.updateTimeout = setTimeout(() => {
      // Aggregate current buffer and notify listeners
      const aggregated = MetricsAggregator.aggregate(this.buffer);
      this.listeners.forEach((listener) => listener(aggregated));

      // Schedule next update if still running
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.scheduleUpdate();
      }
    }, this.options.updateInterval);
  }
}

// React hook for real-time metrics
export const useRealTimeMetrics = (options: RealTimeMetricsOptions) => {
  const [metrics, setMetrics] = React.useState<AggregatedMetrics | null>(null);
  const monitorRef = React.useRef<RealTimeMetricsMonitor | null>(null);

  React.useEffect(() => {
    // Create monitor instance
    monitorRef.current = new RealTimeMetricsMonitor(options);

    // Subscribe to updates
    const unsubscribe = monitorRef.current.subscribe(setMetrics);

    // Start monitoring
    monitorRef.current.start();

    return () => {
      unsubscribe();
      monitorRef.current?.stop();
      monitorRef.current = null;
    };
  }, [options.endpoint]); // Restart if endpoint changes

  return metrics;
};
