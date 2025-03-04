import { AlertThreshold, AlertConfig, Alert, ComponentMetrics, NetworkMetrics } from '../types';
import { DEFAULT_ALERT_THRESHOLDS } from './constants';

type AlertCallback = (alert: Alert) => void;

export class AlertManager {
  private thresholds: Map<string, AlertThreshold>;
  private activeAlerts: Map<string, Alert>;
  private subscribers: Set<AlertCallback>;

  constructor() {
    this.thresholds = new Map();
    this.activeAlerts = new Map();
    this.subscribers = new Set();

    // Initialize default thresholds
    this.setupDefaultThresholds();
  }

  setupDefaultThresholds(): void {
    DEFAULT_ALERT_THRESHOLDS.forEach((threshold) => {
      this.addThreshold(threshold);
    });
  }

  addThreshold(threshold: AlertThreshold): void {
    this.thresholds.set(threshold.id, threshold);
  }

  removeThreshold(id: string): void {
    this.thresholds.delete(id);
    // Clean up any active alerts for this threshold
    this.activeAlerts.forEach((alert, alertId) => {
      if (alert.thresholdId === id) {
        this.activeAlerts.delete(alertId);
      }
    });
  }

  configureAlert(metricName: string, config: AlertConfig): () => void {
    const id = `${metricName}_${Date.now()}`;
    const threshold: AlertThreshold = {
      id,
      name: `${metricName} Alert`,
      description: config.description || `${metricName} exceeded threshold of ${config.threshold}`,
      type: 'custom',
      severity: config.level,
      value: config.threshold,
    };

    this.addThreshold(threshold);

    // Set up alert callbacks
    const unsubscribe = this.subscribe((alert) => {
      if (alert.thresholdId === id) {
        if (!alert.resolved) {
          config.onTrigger?.(alert.message, alert.severity);
        } else {
          config.onResolve?.();
        }
      }
    });

    return () => {
      unsubscribe();
      this.removeThreshold(id);
    };
  }

  checkThresholds(metrics: {
    components: Record<string, ComponentMetrics>;
    network: NetworkMetrics[];
    memory: { used: number; total: number };
    custom: Record<string, { value: number }>;
  }): void {
    this.thresholds.forEach((threshold) => {
      switch (threshold.type) {
        case 'render':
          this.checkRenderThresholds(threshold, metrics.components);
          break;
        case 'memory':
          this.checkMemoryThreshold(threshold, metrics.memory);
          break;
        case 'network':
          this.checkNetworkThresholds(threshold, metrics.network);
          break;
        case 'custom':
          this.checkCustomThresholds(threshold, metrics.custom);
          break;
      }
    });
  }

  private checkRenderThresholds(
    threshold: AlertThreshold,
    components: Record<string, ComponentMetrics>
  ): void {
    Object.entries(components).forEach(([componentId, metrics]) => {
      if (metrics.lastRenderTime > threshold.value) {
        this.triggerAlert(threshold, metrics.lastRenderTime, {
          componentId,
          renderTime: metrics.lastRenderTime,
        });
      } else {
        this.resolveComponentAlert(threshold.id, componentId);
      }
    });
  }

  private checkMemoryThreshold(
    threshold: AlertThreshold,
    memory: { used: number; total: number }
  ): void {
    const memoryUsagePercent = (memory.used / memory.total) * 100;
    if (memoryUsagePercent > threshold.value) {
      this.triggerAlert(threshold, memoryUsagePercent, {
        used: memory.used,
        total: memory.total,
        percentage: memoryUsagePercent,
      });
    } else {
      this.resolveTypeAlert(threshold.id, 'memory');
    }
  }

  private checkNetworkThresholds(threshold: AlertThreshold, requests: NetworkMetrics[]): void {
    const slowRequests = requests.filter((req) => req.duration > threshold.value);
    if (slowRequests.length > 0) {
      this.triggerAlert(threshold, slowRequests[0].duration, {
        url: slowRequests[0].url,
        duration: slowRequests[0].duration,
        count: slowRequests.length,
      });
    } else {
      this.resolveTypeAlert(threshold.id, 'network');
    }
  }

  private checkCustomThresholds(
    threshold: AlertThreshold,
    metrics: Record<string, { value: number }>
  ): void {
    const metricName = threshold.name.toLowerCase().replace(' alert', '');
    const metric = metrics[metricName];
    if (metric && metric.value > threshold.value) {
      this.triggerAlert(threshold, metric.value, {
        metricName,
        value: metric.value,
      });
    } else {
      this.resolveMetricAlert(threshold.id, metricName);
    }
  }

  private triggerAlert(
    threshold: AlertThreshold,
    value: number,
    context: Record<string, unknown>
  ): void {
    const alertId = `${threshold.id}_${JSON.stringify(context)}`;
    if (this.activeAlerts.has(alertId)) return;

    const alert: Alert = {
      id: alertId,
      thresholdId: threshold.id,
      message: this.formatAlertMessage(threshold, value, context),
      severity: threshold.severity,
      timestamp: Date.now(),
      value,
    };

    this.activeAlerts.set(alertId, alert);
    this.notifySubscribers(alert);
  }

  private resolveComponentAlert(thresholdId: string, componentId: string): void {
    this.resolveAlertsByContext(thresholdId, (alertId) => alertId.includes(componentId));
  }

  private resolveTypeAlert(thresholdId: string, type: string): void {
    this.resolveAlertsByContext(thresholdId, (alertId) => alertId.includes(type));
  }

  private resolveMetricAlert(thresholdId: string, metricName: string): void {
    this.resolveAlertsByContext(thresholdId, (alertId) => alertId.includes(metricName));
  }

  private resolveAlertsByContext(
    thresholdId: string,
    contextMatcher: (alertId: string) => boolean
  ): void {
    this.activeAlerts.forEach((alert, alertId) => {
      if (alert.thresholdId === thresholdId && contextMatcher(alertId) && !alert.resolved) {
        alert.resolved = true;
        alert.resolvedAt = Date.now();
        this.notifySubscribers(alert);
        this.activeAlerts.delete(alertId);
      }
    });
  }

  private formatAlertMessage(
    threshold: AlertThreshold,
    value: number,
    context: Record<string, unknown>
  ): string {
    let message = `${threshold.name}: ${threshold.description}`;
    message += ` (${value} > ${threshold.value})`;

    if (context.componentId) {
      message += ` in component ${context.componentId}`;
    }
    if (context.url) {
      message += ` for request ${context.url}`;
    }

    return message;
  }

  subscribe(callback: AlertCallback): () => void {
    this.subscribers.add(callback);
    return () => {
      this.subscribers.delete(callback);
    };
  }

  private notifySubscribers(alert: Alert): void {
    this.subscribers.forEach((callback) => {
      try {
        callback(alert);
      } catch (error) {
        console.error('Error in alert subscriber:', error);
      }
    });
  }

  getActiveAlerts(): Alert[] {
    return Array.from(this.activeAlerts.values());
  }
}
