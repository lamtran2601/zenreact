/**
 * Core monitoring types
 */

// Metric Types
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

// Collection Types
export interface CollectedMetrics {
  renders: RenderMetric[];
  memory: MemoryMetric[];
  network: NetworkMetric[];
  custom: CustomMetric[];
}

export type MetricCallback = (value: number) => void;
export type MetricType = Metric['type'];

// Stats Types
export interface NetworkStats {
  requests: number;
  errors: number;
  averageTime: number;
}

export interface MemoryStats {
  used: number;
  total: number;
  limit: number;
}

export interface ComponentMetrics {
  lastRenderTime: number;
  averageRenderTime: number;
  renderCount: number;
}

export interface NetworkMetrics extends NetworkMetric {
  duration: number;
  url: string;
}

// Options Types
export interface NetworkTrackingOptions {
  urlPattern?: RegExp;
  onStats?: (stats: NetworkStats) => void;
}

export interface MonitoringOptions {
  enabled?: boolean;
  development?: boolean;
  bufferSize?: number;
  memoryTracking?: boolean;
  memoryInterval?: number;
  networkTracking?: boolean;
  alertThresholds?: AlertThreshold[];
  sampleRate?: number;
  customMetrics?: boolean;
  alerts?: {
    enabled?: boolean;
    thresholds?: AlertThreshold[];
  };
}

// Alert Types
export type AlertSeverity = 'info' | 'warning' | 'error' | 'critical';

export interface AlertThreshold {
  id: string;
  name: string;
  description: string;
  type: MetricType | 'custom';
  severity: AlertSeverity;
  value: number;
}

export interface Alert {
  id: string;
  thresholdId: string;
  message: string;
  severity: AlertSeverity;
  timestamp: number;
  value: number;
  resolved?: boolean;
  resolvedAt?: number;
}

export interface AlertConfig {
  threshold: number;
  level: AlertSeverity;
  description?: string;
  onTrigger?: (message: string, severity: AlertSeverity) => void;
  onResolve?: () => void;
}

// Custom Metric Types
export interface CustomMetricConfig {
  name: string;
  tags?: Record<string, string>;
  thresholds?: AlertThreshold[];
}
