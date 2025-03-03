import { AggregatedMetrics } from '../aggregator';

export interface AlertConfig {
  threshold: number;
  level: 'warning' | 'error' | 'critical';
  duration?: number; // Optional duration to wait before triggering
}

export interface AlertThreshold {
  id: string;
  name: string;
  description: string;
  type: 'render' | 'memory' | 'network' | 'custom';
  condition: (metrics: AggregatedMetrics) => boolean;
  severity: 'info' | 'warning' | 'error';
}

export interface Alert {
  id: string;
  thresholdId: string;
  timestamp: number;
  message: string;
  severity: 'info' | 'warning' | 'error';
  metrics: Partial<AggregatedMetrics>;
}

export interface AlertSubscriber {
  (alert: Alert): void;
}

export class AlertManager {
  private thresholds: Map<string, AlertThreshold> = new Map();
  private subscribers: Set<AlertSubscriber> = new Set();
  private alerts: Alert[] = [];
  private maxAlertHistory: number;

  constructor(options: { maxAlertHistory?: number } = {}) {
    this.maxAlertHistory = options.maxAlertHistory || 100;
  }

  /**
   * Add a new alert threshold
   */
  public addThreshold(threshold: AlertThreshold): void {
    this.thresholds.set(threshold.id, threshold);
  }

  /**
   * Remove an alert threshold
   */
  public removeThreshold(thresholdId: string): void {
    this.thresholds.delete(thresholdId);
  }

  /**
   * Subscribe to alerts
   */
  public subscribe(callback: AlertSubscriber): () => void {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  /**
   * Get alert history
   */
  public getAlerts(): Alert[] {
    return [...this.alerts];
  }

  /**
   * Clear alert history
   */
  public clearAlerts(): void {
    this.alerts = [];
  }

  /**
   * Check metrics against thresholds
   */
  public checkMetrics(metrics: AggregatedMetrics): void {
    for (const threshold of this.thresholds.values()) {
      try {
        if (threshold.condition(metrics)) {
          this.triggerAlert(threshold, metrics);
        }
      } catch (error) {
        console.error(`Error checking threshold ${threshold.id}:`, error);
      }
    }
  }

  private triggerAlert(threshold: AlertThreshold, metrics: AggregatedMetrics): void {
    const alert: Alert = {
      id: `alert_${Date.now()}_${threshold.id}`,
      thresholdId: threshold.id,
      timestamp: Date.now(),
      message: threshold.description,
      severity: threshold.severity,
      metrics: this.extractRelevantMetrics(threshold.type, metrics),
    };

    // Add to history
    this.alerts.unshift(alert);
    if (this.alerts.length > this.maxAlertHistory) {
      this.alerts.pop();
    }

    // Notify subscribers
    this.subscribers.forEach((subscriber) => {
      try {
        subscriber(alert);
      } catch (error) {
        console.error('Error in alert subscriber:', error);
      }
    });
  }

  private extractRelevantMetrics(
    type: AlertThreshold['type'],
    metrics: AggregatedMetrics
  ): Partial<AggregatedMetrics> {
    switch (type) {
      case 'render':
        return { renders: metrics.renders };
      case 'memory':
        return { memory: metrics.memory };
      case 'network':
        return { network: metrics.network };
      default:
        return {};
    }
  }
}

// Predefined threshold factories
export const createThresholds = {
  slowRender: (componentId: string, duration: number): AlertThreshold => ({
    id: `slow_render_${componentId}`,
    name: 'Slow Component Render',
    description: `${componentId} rendered slower than ${duration}ms`,
    type: 'render',
    severity: 'warning',
    condition: (metrics: AggregatedMetrics) => {
      const componentMetrics = metrics.renders.componentBreakdown[componentId];
      return componentMetrics && componentMetrics.averageDuration > duration;
    },
  }),

  highMemoryUsage: (threshold: number): AlertThreshold => ({
    id: 'high_memory_usage',
    name: 'High Memory Usage',
    description: `Memory usage exceeded ${threshold}MB`,
    type: 'memory',
    severity: 'error',
    condition: (metrics: AggregatedMetrics) =>
      metrics.memory.averageHeapUsed > threshold * 1024 * 1024,
  }),

  slowNetwork: (duration: number): AlertThreshold => ({
    id: 'slow_network',
    name: 'Slow Network Requests',
    description: `Network requests taking longer than ${duration}ms`,
    type: 'network',
    severity: 'warning',
    condition: (metrics: AggregatedMetrics) => metrics.network.averageDuration > duration,
  }),

  highErrorRate: (percentage: number): AlertThreshold => ({
    id: 'high_error_rate',
    name: 'High Error Rate',
    description: `Error rate exceeded ${percentage}%`,
    type: 'network',
    severity: 'error',
    condition: (metrics: AggregatedMetrics) => {
      const totalRequests = metrics.network.count;
      if (totalRequests === 0) return false;

      const errorCount = Object.entries(metrics.network.byStatus)
        .filter(([status]) => parseInt(status) >= 500)
        .reduce((sum, [, count]) => sum + count, 0);

      return (errorCount / totalRequests) * 100 > percentage;
    },
  }),
};
