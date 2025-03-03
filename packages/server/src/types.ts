import { WebSocket } from 'ws';

export interface MetricsServerOptions {
  /**
   * Port number for the metrics server
   * @default 3001
   */
  port?: number;

  /**
   * WebSocket endpoint path
   * @default '/metrics'
   */
  path?: string;

  /**
   * Maximum number of concurrent WebSocket clients
   * @default 100
   */
  maxClients?: number;

  /**
   * Enable WebSocket compression
   * @default true
   */
  enableCompression?: boolean;
}

export interface MetricsUpdate {
  /**
   * Type of metric being reported
   */
  type: 'render' | 'memory' | 'network' | 'custom';

  /**
   * The actual metric data
   */
  metric: RenderMetric | MemoryMetric | NetworkMetric | CustomMetric;

  /**
   * Timestamp when the metric was collected
   */
  timestamp: number;
}

export interface RenderMetric {
  componentName: string;
  duration: number;
}

export interface MemoryMetric {
  usedHeapSize: number;
  totalHeapSize: number;
}

export interface NetworkMetric {
  url: string;
  duration: number;
  size: number;
}

export interface CustomMetric {
  name: string;
  value: number;
  labels?: Record<string, string>;
}

/**
 * Extended WebSocket client type with additional properties
 */
export type WebSocketClient = WebSocket;
