/**
 * Default configuration values and constants
 */

import type { MonitoringOptions, AlertThreshold } from '../types';

export const DEFAULT_OPTIONS: Required<MonitoringOptions> = {
  enabled: true,
  sampleRate: 1.0,
  customMetrics: true,
  development: process.env.NODE_ENV === 'development',
  bufferSize: 1000,
  memoryTracking: false,
  memoryInterval: 5000,
  networkTracking: true,
  alertThresholds: [],
  alerts: {
    enabled: false,
    thresholds: [],
  },
};

export const ALERT_LEVELS = {
  WARNING: 'warning',
  ERROR: 'error',
  CRITICAL: 'critical',
} as const;

export const METRIC_TYPES = {
  RENDER: 'render',
  MEMORY: 'memory',
  NETWORK: 'network',
  CUSTOM: 'custom',
} as const;

export const DEFAULT_THRESHOLDS = {
  RENDER_TIME: 16, // ms (60fps)
  MEMORY_USAGE: 100 * 1024 * 1024, // 100MB
  NETWORK_TIME: 1000, // 1s
  ERROR_RATE: 0.1, // 10%
} as const;

export const MEMORY_SAMPLING = {
  DEFAULT_INTERVAL: 5000, // 5s
  MIN_INTERVAL: 1000, // 1s
  MAX_INTERVAL: 60000, // 60s
} as const;

export const NETWORK_TRACKING = {
  MAX_URL_LENGTH: 2000,
  DEFAULT_TIMEOUT: 30000, // 30s
} as const;

export const BUFFER_LIMITS = {
  MIN_SIZE: 100,
  MAX_SIZE: 10000,
  DEFAULT_SIZE: 1000,
} as const;

export const DEFAULT_ALERT_THRESHOLDS: AlertThreshold[] = [
  {
    id: 'default_render_time',
    name: 'Slow Render',
    description: 'Component render time exceeded threshold',
    type: 'render',
    severity: 'warning',
    value: DEFAULT_THRESHOLDS.RENDER_TIME,
  },
  {
    id: 'default_memory_usage',
    name: 'High Memory Usage',
    description: 'Memory usage exceeded threshold',
    type: 'memory',
    severity: 'error',
    value: DEFAULT_THRESHOLDS.MEMORY_USAGE,
  },
  {
    id: 'default_network_time',
    name: 'Slow Network Request',
    description: 'Network request time exceeded threshold',
    type: 'network',
    severity: 'warning',
    value: DEFAULT_THRESHOLDS.NETWORK_TIME,
  },
];
